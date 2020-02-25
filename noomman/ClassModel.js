

var database = require('./database');
const InstanceSet = require('./InstanceSet');
const Instance = require('./Instance');
const Attribute = require('./Attribute');
const Relationship = require('./Relationship');
const Diffable = require('./Diffable');
const SuperSet = require('./SuperSet');
const NoommanErrors = require('./NoommanErrors');

const AllClassModels = [];

/*
 * Class ClassModel
 * A class which defines the schema for a Class which will be stored in the mongo database.
 *    Has methods for querying the underlying database collections for instances of a ClassModel
 *    and its sub ClassModels. Enables inheritance of attributes, relationships, methods, etc.
 */
class ClassModel {

    /*
     * constructor(schema)
     * Creates an instance of ClassModel with the given schema.
     * Parameters: 
     * - schema - Object - A schema describing the properties of this ClassModel.
     *    {
     *       className: String (required),
     *       superClasses: [ ClassModel ],
     *       useSuperClassCollection: Boolean,
     *       abstract: Boolean,
     *       auditable: Boolean,
     *       attributes: [
     *          {
     *             name: String (required), 
     *             type: String (required), 
     *             list: Boolean,
     *             required: Boolean,
     *             unique: Boolean,
     *             sensitive: Boolean,
     *             mutex: String,
     *             requiredGroup: String,
     *          },
     *       ],
     *       relationships: [
     *          {
     *             name: String (required),
     *             toClass: String (required),
     *             singular: Boolean (required),
     *             required: Boolean,
     *             owns: Boolean,
     *             mirrorRelationship: String,
     *             mutex: String,
     *             requiredGroup: String,
     *          }
     *       ],
     *       privileges: {
     *          create: Function,
     *          read: Function,
     *          update: Function,
     *          delete: Function,
     *          sensitive: Function,
     *       },
     *       validations: [ Function ],
     *       indices: [ fieldOrSpec ], 
     *       staticMethods: {
     *          String: Function,
     *       },
     *       nonStaticMethods: {
     *          String: Function,
     *       },
     *    }
     * Returns
     * - ClassModel - The ClassModel created according to the given schema.
     * Throws
     * - NoommanConstructorError - If constructorValidations() method throws a NoommanConstructorError.
     */
    constructor(schema) {
        this.constructorValidations(schema);

        this.className = schema.className;
        this.subClasses = [];
        this.abstract = schema.abstract;
        this.useSuperClassCollection = schema.useSuperClassCollection;
        this.superClasses = schema.superClasses ? schema.superClasses : [];
        this.indices = schema.indices ? schema.indices : [];
        this.collection = schema.useSuperClassCollection ? schema.superClasses[0].collection : schema.className.toLowerCase();
        this.auditable = schema.auditable === true;
        this.staticMethods = schema.staticMethods ? schema.staticMethods : {};
        this.nonStaticMethods = schema.nonStaticMethods ? schema.nonStaticMethods : {};

        if (this.superClasses.length === 0 && this.className !== 'NoommanClassModel') {
            this.superClasses.push(NoommanClassModel);
        }

        if (!schema.useSuperClassCollection) {
            const lastLetter = schema.className.substr(-1).toLowerCase();
            this.collection = schema.className.toLowerCase();
            if (lastLetter === 's') {
                this.collection = this.collection + 'e';
            }
            this.collection = this.collection + 's';
        }
        
        this.attributes = [];
        this.relationships = [];

        if (schema.attributes) {
            for (const attribute of schema.attributes) {
                this.attributes.push(new Attribute(attribute));
            }
        }

        if (schema.relationships) {
            for (const relationship of schema.relationships) {
                this.relationships.push(new Relationship(relationship));
            }
        }

        this.createPrivilegeMethods = [];
        this.readPrivilegeMethods = [];
        this.updatePrivilegeMethods = [];
        this.deletePrivilegeMethods = [];
        this.sensitivePrivilegeMethods = [];

        if (schema.privileges) {
            if (schema.privileges.create) {
                this.createPrivilegeMethods.push(schema.privileges.create);
            }
            if (schema.privileges.read) {
                this.readPrivilegeMethods.push(schema.privileges.read);
            }
            if (schema.privileges.update) {
                this.updatePrivilegeMethods.push(schema.privileges.update);
            }
            if (schema.privileges.delete) {
                this.deletePrivilegeMethods.push(schema.privileges.delete);
            }
            if (schema.privileges.sensitive) {
                this.sensitivePrivilegeMethods.push(schema.privileges.sensitive);
            }
        }

        this.validations = [];

        if (schema.validations) {
            for (const validation of schema.validations) {
                this.validations.push(validation);
            }
        }

        if (schema.superClasses) {
            for (const superClass of schema.superClasses) {
                this.attributes = this.attributes.concat(superClass.attributes);
                this.relationships = this.relationships.concat(superClass.relationships);
                this.indices = this.indices.concat(superClass.indices);
                this.createPrivilegeMethods = this.createPrivilegeMethods.concat(superClass.createPrivilegeMethods);
                this.readPrivilegeMethods = this.readPrivilegeMethods.concat(superClass.readPrivilegeMethods);
                this.updatePrivilegeMethods = this.updatePrivilegeMethods.concat(superClass.updatePrivilegeMethods);
                this.deletePrivilegeMethods = this.deletePrivilegeMethods.concat(superClass.deletePrivilegeMethods);
                this.sensitivePrivilegeMethods = this.sensitivePrivilegeMethods.concat(superClass.sensitivePrivilegeMethods);
                this.validations = this.validations.concat(superClass.validations);
                this.auditable = superClass.auditable ? true : this.auditable;
                this.inheritStaticMethods(superClass);
                this.inheritNonStaticMethods(superClass);
                superClass.subClasses.push(this);
            }
        }

        for (const staticMethod of Object.keys(this.staticMethods)) {
            this[staticMethod] = this.staticMethods[staticMethod];
        }

        for (const nonStaticMethod of Object.keys(this.nonStaticMethods)) {
            this[nonStaticMethod] = this.nonStaticMethods[nonStaticMethod];
        }

        AllClassModels[this.className] = this;
    }

    /*
     * constructorValidations(schema)
     * Throws an error if the schema passed to constructor() is not of expected type or 
     *    is functionally invalid.
     * Parameters: 
     * - schema - Object - A schema describing the properties of this ClassModel. 
     *    See schema parameter or constructor() method.
     * Throws
     * - NoommanConstructorError - If parameterShapeConstructorValidations throws a NoommanConstructorError.
     * - NoommanConstructorError - If privilegesConstructorValidations throws a NoommanConstructorError.
     * - NoommanConstructorError - If sensitiveAttributesContructorValidations throws a NoommanConstructorError.
     * - NoommanConstructorError - If customMethodsContructorValidations throws a NoommanConstructorError.
     * - NoommanConstructorError - If inheritanceConstructorValidations throws a NoommanConstructorError.
     * - NoommanConstructorError - If attributeAndRelationshipNameValidations throws a NoommanConstructorError.
     */
    constructorValidations(schema) {
        ClassModel.paramterShapeConstructorValidations(schema);

        ClassModel.privilegesConstructorValidations(schema);

        ClassModel.sensitiveAttributesContructorValidations(schema);

        ClassModel.customMethodsContructorValidations(schema);

        ClassModel.inheritanceConstructorValidations(schema);

        ClassModel.attributeAndRelationshipNameValidations(schema);
    }

    /*
     * paramterShapeConstructorValidations(schema)
     * Validates that the schema passed to constructor() is the correct shape and property types.
     * Parameters
     * - schema - Object - See constructor parameter definition.
     * Throws
     * - NoommanConstructorError - If property className is omitted.
     * - NoommanConstructorError - If property attributes is provided and is not an Array.
     * - NoommanConstructorError - If property relationships is provided and is not an Array.
     * - NoommanConstructorError - If property superClasses is provided and is not an Array.
     * - NoommanConstructorError - If property superClasses is provided and is an empty Array.
     * - NoommanConstructorError - If property useSuperClassCollection is true and superClasses
     *    is omitted or contains more than one ClassModel.
     * - NoommanConstructorError - If property auditable is provided and is not a Boolean.
     * - NoommanConstructorError - If property indices is provided and is not an Array.
     * - NoommanConstructorError - If property validations is provided and is not an Array.
     */
    static paramterShapeConstructorValidations(schema) {        
        if (!schema.className)
            throw new NoommanErrors.NoommanConstructorError('className is required.');

        if (schema.attributes && !Array.isArray(schema.attributes))
            throw new NoommanErrors.NoommanConstructorError('If attributes is set, it must be an Array.');

        if (schema.relationships && !Array.isArray(schema.relationships))
            throw new NoommanErrors.NoommanConstructorError('If relationships is set, it must be an Array.');

        if (schema.superClasses && !Array.isArray(schema.superClasses))
            throw new NoommanErrors.NoommanConstructorError('If superClasses is set, it must be an Array.');

        if (schema.superClasses && schema.superClasses.length == 0)
            throw new NoommanErrors.NoommanConstructorError('If superClasses is set, it cannot be an empty Array.');

        if (schema.useSuperClassCollection && (!schema.superClasses || schema.superClasses.length !== 1)) {
            throw new NoommanErrors.NoommanConstructorError('If useSuperClassCollection is true, a single super class must be provided.');
        }

        if (schema.auditable !== undefined && typeof(schema.auditable) !== 'boolean') {
            throw new NoommanErrors.NoommanConstructorError('If auditable is provided, it must be a boolean.');
        }

        if (schema.indices !== undefined && !Array.isArray(schema.indices)) {
            throw new NoommanErrors.NoommanConstructorError('If indices are provided, indices must be an array.');
        }

        if (schema.validations && !Array.isArray(schema.validations))
            throw new NoommanErrors.NoommanConstructorError('If validations are provided, it must be an Array.');
    }

    /*
     * privilegesConstructorValidations(schema)
     * If the property privileges is provided and any of the properties are not a Function, will
     *    throw an Error.
     * Parameters
     * - schema - Object - See constructor parameter definition.
     * Throws
     * - NoommanConstructorError - If property createPrivilege of property privileges is not a Function.
     * - NoommanConstructorError - If property readPrivilege of property privileges is not a Function.
     * - NoommanConstructorError - If property updatePrivilege of property privileges is not a Function.
     * - NoommanConstructorError - If property deletePrivilege of property privileges is not a Function.
     * - NoommanConstructorError - If property sensitivePrivilege of property privileges is not a Function.
     */
    static privilegesConstructorValidations(schema) {
        if (schema.privileges) {
            if (schema.privileges.read && typeof(schema.privileges.read) !== 'function') {
                throw new NoommanErrors.NoommanConstructorError('If a readPrivilege method is provided, it must be a function.');
            }
            if (schema.privileges.create && typeof(schema.privileges.create) !== 'function') {
                throw new NoommanErrors.NoommanConstructorError('If a createPrivilege method is provided, it must be a function.');
            }
            if (schema.privileges.update && typeof(schema.privileges.update) !== 'function') {
                throw new NoommanErrors.NoommanConstructorError('If a updatePrivilege method is provided, it must be a function.');
            }
            if (schema.privileges.delete && typeof(schema.privileges.delete) !== 'function') {
                throw new NoommanErrors.NoommanConstructorError('If a deletePrivilege method is provided, it must be a function.');
            }
            if (schema.privileges.sensitive && typeof(schema.privileges.sensitive) !== 'function') {
                throw new NoommanErrors.NoommanConstructorError('If a sensitivePrivilege method is provided, it must be a function.');
            }
        }
    }

    /*
     * sensitiveAttributesContructorValidations(schema)
     * Will throw an error if an attribute in ClassModel schema or parent ClassModel schema has an attribute
     *    marked sensitive, and this ClassModel does not ahve a sensitivePrivilege method, and vice versa.
     * Parameters
     * - schema - Object - See constructor parameter definition.
     * Throws
     * - NoommanConstructorError - If ClassModel has a sensitive attribute but no sensitivePrivilege method.
     * - NoommanConstructorError - If ClassModel has a sensitivePrivilege method but no sensitive attribute.
     */
    static sensitiveAttributesContructorValidations(schema) {
        let allAttributes = [];

        if (schema.superClasses) {
            for (const superClass of schema.superClasses) {
                allAttributes = allAttributes.concat(superClass.attributes);
            }
        }

        if (schema.attributes) {
            allAttributes = allAttributes.concat(schema.attributes)
        }

        if (allAttributes.length) {        
            let sensitiveAttributes = false;
            for (const attribute of allAttributes) {
                if (attribute.sensitive === true) {
                    sensitiveAttributes = true;
                    break;
                }
            }

            if (sensitiveAttributes) {
                if (!schema.privileges || !schema.privileges.sensitive) {
                    throw new NoommanErrors.NoommanConstructorError('At least one attribute is marked sensitive, but no sensitivePrivilege method is provided.');
                }
            }
            else {
                if (schema.privileges && schema.privileges.sensitive) {
                    throw new NoommanErrors.NoommanConstructorError('A sensitivePrivilege method was provided, but no attributes are marked sensitive.');
                }
            }
        }
        else {
            if (schema.privileges && schema.privileges.sensitive) {
                throw new NoommanErrors.NoommanConstructorError('A sensitivePrivilege method was provided, but no attributes are marked sensitive.');
            }
        }

    }

    /*
     * attributeAndRelationshipNameValidations(schema)
     * Will throw an error if ClassModel would be defined with multiple attributes or relationships with 
     *    the same name, either through inheritance or explicitly in the given schema.
     * Parameters
     * - schema - Object - See constructor parameter definition.
     * Throws
     * - NoommanConstructorError - If ClassModel inherits from multiple ClassModels with attributes or relationships
     *    with the same name.
     * - NoommanConstructorError - If ClassModel inherits an attribute or relationship from a super ClassModel with the
     *    the same name as an attribute or relationship defined in the schema.
     * - NoommanConstructorError - If schema contains multiple attributes or relationships with the same name.
     */
    static attributeAndRelationshipNameValidations(schema) {
        let superNames = [];
        const names = [];

        if (schema.superClasses) {
            for (const superClass of schema.superClasses) {
                for (const relationship of superClass.relationships) {
                    if (superNames.includes(relationship.name)) {
                        throw new NoommanErrors.NoommanConstructorError('Error creating ClassModel ' + schema.className + '. ' + 
                            'Inherriting from given superClasses causes a duplicate attribute or relationship name "' 
                            + relationship.name + '".');
                    }
                    superNames.push(relationship.name);
                }
                for (const attribute of superClass.attributes) {
                    if (superNames.includes(attribute.name)) {
                        throw new NoommanErrors.NoommanConstructorError('Error creating ClassModel ' + schema.className + '. ' + 
                            'Inherriting from given superClasses causes a duplicate attribute or relationship name "' 
                            + attribute.name + '".');
                    }
                    superNames.push(attribute.name);
                }
            }
        }

        if (schema.relationships) {
            for (const relationship of schema.relationships) {
                if (superNames.includes(relationship.name)) {
                    throw new NoommanErrors.NoommanConstructorError('Error creating ClassModel ' + schema.className + '. ' + 
                        'Inherriting from given superClasses causes a duplicate attribute or relationship name "' 
                        + relationship.name + '".');
                }
                if (names.includes(relationship.name)) {
                    throw new NoommanErrors.NoommanConstructorError('Error creating ClassModel ' + schema.className + '. ' + 
                        'Multiple attributes or relationships with the same name "' 
                        + relationship.name + '".');
                }
                names.push(relationship.name);
            }
        }

        if (schema.attributes) {
            for (const attribute of schema.attributes) {
                if (superNames.includes(attribute.name)) {
                    throw new NoommanErrors.NoommanConstructorError('Error creating ClassModel ' + schema.className + '. ' + 
                        'Inherriting from given superClasses causes a duplicate attribute or relationship name "' 
                        + attribute.name + '".');
                }
                if (names.includes(attribute.name)) {
                    throw new NoommanErrors.NoommanConstructorError('Error creating ClassModel ' + schema.className + '. ' + 
                        'Multiple attributes or relationships with the same name "' 
                        + attribute.name + '".');
                }
                names.push(attribute.name);
            }
        }
        
    }

    /*
     * customMethodsContructorValidations(schema)
     * Will throw an error if staticMethods and nonStaticMethods properties of schema are not Objects 
     *    (if provided) or if any of their properties are not functions.
     * Parameters
     * - schema - Object - See constructor parameter definition.
     * Throws
     * - NoommanConstructorError - If property staticMethods is provided but is not an Object.
     * - NoommanConstructorError - If property staticMethods is provided, and any of its properties is not a Function.
     * - NoommanConstructorError - If property staticMethods is provided, and any of its properties has the same
     *    name as a built in noomman method on class ClassModel.
     * - NoommanConstructorError - If property nonStaticMethods is provided but is not an Object.
     * - NoommanConstructorError - If property nonStaticMethods is provided, and any of its properties is not a Function.
     * - NoommanConstructorError - If property nonStaticMethods is provided, and any of its properties has the same
     *    name as a built in noomman method on class Instance.
     */
    static customMethodsContructorValidations(schema) {
        if (schema.staticMethods !== undefined) {
            if (typeof(schema.staticMethods) !== 'object') {
                throw new NoommanErrors.NoommanConstructorError('If staticMethods is provided, it must be an object.');
            }

            for (const staticMethod in schema.staticMethods) {
                if (typeof(schema.staticMethods[staticMethod]) !== 'function') {
                    throw new NoommanErrors.NoommanConstructorError('Each property of staticMethods object must be a function.');
                }

                if (Object.getOwnPropertyNames(ClassModel.prototype).includes(staticMethod)) {
                    throw new NoommanErrors.NoommanConstructorError('Attempt to add a static method with the same name as a built in Noomman method: ' + staticMethod + '.');
                }
            }
        }

        if (schema.nonStaticMethods !== undefined) {
            if (typeof(schema.nonStaticMethods) !== 'object') {
                throw new NoommanErrors.NoommanConstructorError('If nonStaticMethods is provided, it must be an object.');
            }

            for (const nonStaticMethod in schema.nonStaticMethods) {
                if (typeof(schema.nonStaticMethods[nonStaticMethod]) !== 'function') {
                    throw new NoommanErrors.NoommanConstructorError('Each property of nonStaticMethods object must be a function.');
                }

                if (Object.getOwnPropertyNames(Instance.prototype).includes(nonStaticMethod)) {
                    throw new NoommanErrors.NoommanConstructorError('Attempt to add a non-static method with the same name as a built in Noomman method: ' + nonStaticMethod + '.');
                }
            }
        }
    }

    /*
     * inheritanceConstructorValidations(schema)
     * Validates that inheritance related portions of the schema are of the correct types and
     *    do not logically conflict with one another.
     * Parameters
     * - schema - Object - See constructor parameter definition.
     * Throws
     * - NoommanConstructorError - If properties useSuperClassCollection and abstract are both true.
     * - NoommanConstructorError - If property superClasses is provided, and any super ClassModel has an attribute
     *    with the same name as a attribute defined in the attributes property of the schema.
     * - NoommanConstructorError - If property superClasses is provided, and any super ClassModel has an relationship
     *    with the same name as a relationship defined in the relationships property of the schema.
     * - NoommanConstructorError - If any ClassModel in the superClasses property has useSuperClassModel set to true.
     * - NoommanConstructorError - If property auditable is false, but a ClassModel in the superClasses property has
     *    auditable set to true.
     * - NoommanConstructorError - If properties abstract and useSuperClassCollection are both true.
     */
    static inheritanceConstructorValidations(schema) {
        if (schema.useSuperClassCollection && schema.abstract) {
            throw new NoommanErrors.NoommanConstructorError('If useSuperClassCollection is true, abstract cannot be true.')
        }

        if (schema.superClasses) {
            for (const superClass of schema.superClasses) {

                if (superClass.useSuperClassCollection) {
                    throw new NoommanErrors.NoommanConstructorError('You cannot create a sub class of a class which has useSuperClassCollection set to true.');
                }

                if (schema.auditable === false && superClass.auditable === true) {
                    throw new NoommanErrors.NoommanConstructorError('You cannot create a non-auditable sub class of an auditable super class.');
                }
            }
        } 

        if (schema.useSuperClassCollection && schema.abstract) 
            throw new NoommanErrors.NoommanConstructorError('If useSuperClassCollection is true, the class cannot be abstract.');
    }

    /* 
     * finalize()
     * For each defined ClassModel, runs post-constructor validations and applies indices.
     *    Run only after ALL class models have been created.
     * Returns
     * - Promise<undefined> - A Promise which resolves to undefined if successful.
     * Throws
     * - NoommanClassModelError - Validations errors thrown by validateRelationships()
     */
    static async finalize() {
        for (const className in AllClassModels) {
            const classModel = AllClassModels[className];
            classModel.validateRelationships();
        }

        for (const className in AllClassModels) {
            const classModel = AllClassModels[className];
            await classModel.index();

            if (classModel.abstract && !classModel.discriminated()) {
                delete classModel.collection;
            }
        }
    }

    /* 
     * index()
     * Adds any user defined or noomman automatic indices to the collection for this ClassModel.
     *    This method is called automatically as part of the finalize() static method.
     * Returns
     * - Promise<undefined> - A Promise which resolves to undefined if indexing is successful.
     */
    async index() {
        const indicesApplied = [];

        if (!this.collection) 
            return;

        for (const index of this.indices) {
            indicesApplied.push(await database.index(this.collection, index));
        }

        if (this.useSuperClassCollection) {
            indicesApplied.push(await database.index(this.collection, '__t'));
        }

        return indicesApplied;
    }

    /* 
     * validateRelationships()
     * Determines if all the relationships defined on this ClassModel are valid.
     *    This must be called only after all the ClassModels have been definied, as it checks
     *    that the toClass of each relationship is a defined ClassModel and that two way 
     *    relationships are correct on both sides of the relationship.
     * Throws 
     * - NoommanClassModelError - If no ClassModel exists with the value of a relationship's toClass property.
     * - NoommanClassModelError - If a two-way relationship is defined and the related ClassModel does not have
     *    a relationship a name matching the mirrorRelationship property of the relationship.
     * - NoommanClassModelError - If a two-way relationship is defined but the mirrorRelationship properties of 
     *    the two relationships are not the name of the other relationship.
     */
    validateRelationships() {
        for (const relationship of this.relationships) {
            const toClass = AllClassModels[relationship.toClass];
            if (toClass === undefined) {
                throw new NoommanErrors.NoommanClassModelError(
                    'Relationship ' + this.className + '.' + relationship.name + 
                    ' is a reference to a Class Model that does not exist: ' + relationship.toClass + '.'
                );
            }

            if (relationship.mirrorRelationship !== undefined) {
                const mirrorRelationship = toClass.getRelationship(relationship.mirrorRelationship);

                if (mirrorRelationship === null) {
                    throw new NoommanErrors.NoommanClassModelError('Invalid two-way relationship. ' + 
                        this.className + '.' + relationship.name + ' is missing mirror relationship ' + 
                        toClass.className + '.' + relationship.mirrorRelationship + '.'
                    );
                }

                if (mirrorRelationship.toClass !== this.className) {
                    throw new NoommanErrors.NoommanClassModelError('Invalid two-way relationship. ' + 
                        this.className + '.' + relationship.name + '. Mirror relationship ' + 
                        toClass.className + '.' + relationship.mirrorRelationship + 
                        ' has incorrect toClass: ' + mirrorRelationship.toClass + '.'
                    );
                }

                if (mirrorRelationship.mirrorRelationship !== relationship.name) {
                    throw new NoommanErrors.NoommanClassModelError('Invalid two-way relationship. ' + 
                        this.className + '.' + relationship.name + '. Mirror relationship ' + 
                        toClass.className + '.' + relationship.mirrorRelationship + 
                        ' has incorrect mirrorRelationship: ' + mirrorRelationship.mirrorRelationship + '.'
                    );
                }
            }
        }
    }

    /*
     * inheritStaticMethods(fromClass) 
     * Adds all staticMethods on the fromClass paramter to this ClassModel. Called by constructor(). 
     * Paramters
     * - fromClass - ClassModel - The classModel to inherit methods from.
     */
    inheritStaticMethods(fromClass) {
        for (const staticMethod of Object.keys(fromClass.staticMethods)) {
            if (!Object.keys(this.staticMethods).includes(staticMethod)) {
                this.staticMethods[staticMethod] = fromClass.staticMethods[staticMethod];
            }
        }
    }

    /* 
     * inheritNonStaticMethods(fromClass) 
     * Adds all monStaticMethods on the fromClass paramter to this ClassModel. Called by constructor(). 
     * Paramters
     * - fromClass - ClassModel - The classModel to inherit methods from.
     */
    inheritNonStaticMethods(fromClass) {
        for (const nonStaticMethod of Object.keys(fromClass.nonStaticMethods)) {
            if (!Object.keys(this.nonStaticMethods).includes(nonStaticMethod)) {
                this.nonStaticMethods[nonStaticMethod] = fromClass.nonStaticMethods[nonStaticMethod];
            }
        }
    }

    /* 
     * toString()
     * Returns 
     * - String - A string with this ClassModel's className, followed by a new line.
     */
    toString() {
        return this.className + '\n';
    }

    /* 
     * isInstanceOfThisClass(instance)
     * Determines if the given instance is an instance of this ClassModel or any of 
     *    this ClassModels children.
     * Parameters
     * - instance - Instance - An instance of noomman class Instance
     * Returns
     * - Boolean - True if the given Instance is an Instance for this ClassModel or its children, false otherwise.
     */
    isInstanceOfThisClass(instance) {
        if (instance.classModel === this)
            return true;

        return instance.classModel.allSuperClasses().map(c => c.className).includes(this.className);
    }

    /* 
     * isInstanceSetOfThisClass(instanceSet)
     * Determines if the given instanceSet is an InstanceSet of this ClassModel or any of 
     *    this ClassModel's children.
     * Parameters
     * - instanceSet - InstanceSet - An instance of noomman class InstanceSet
     * Returns
     * - Boolean - True if the given InstanceSet is an InstanceSet of this ClassModel or its children, false otherwise.
     */
    isInstanceSetOfThisClass(instanceSet) {
        if (instanceSet.classModel === this)
            return true;

        return instanceSet.classModel.allSuperClasses().map(c => c.className).includes(this.className);
    }

    /* 
     * getRelationship(relationshipName)
     * Retreives the relationship with the given relationshipName on this ClassModel.
     * Parameters
     * - relationshipName - String - A string matching the name property of one of the relationships of 
     *    this ClassModel.
     * Returns
     * - Relationship - The relationship matching the given relationshipName on this ClassModel. If no 
     *    relationship exists on this ClassModel with the given name, null is returned.
     */
    getRelationship(relationshipName) {
        const relationships = this.relationships.filter(r => r.name === relationshipName);
        return relationships.length ? relationships[0] : null;
    }

    /* 
     * getRelatedClassModel(relationshipName)
     * Retreives the ClassModel for the given relationshipName, corresponding to a relationship on this 
     *    ClassModel, from the internal static property AllCLassModels.
     * Parameters
     * - relationshipName - String - A string matching the name property of one of the relationships of 
     *    this ClassModel.
     * Returns
     * - ClassModel - The ClassModel with the className matching the toClass of the relationship with name
     *    matching the relationshipName parameter, defined for this ClassModel (or a parent). If no 
     *    ClassModel exists with the name matching the toClass of the relationship, undefined returned.
     * Throws
     * - NoommanArgumentError - If given relationshipName does not match a relationship on this ClassModel.
     */
    getRelatedClassModel(relationshipName) {
        const relationship = this.getRelationship(relationshipName);

        if (relationship === null) {
            throw new NoommanErrors.NoommanArgumentError('Attempt to get related ClassModel failed. ' 
                + this.className + '.' + relationshipName + ' is not a relationship.');
        }

        return AllClassModels[relationship.toClass];
    }

    /* 
     * getClassModel(className)
     * Retreives a ClassModel with the given name from the internal static property AllClassModels.
     * Parameters
     * - className - String - A string which should match the className property of the ClassModel one 
     *    wishes to retrieve.
     * Returns
     * - ClassModel - The ClassModel whose className property matches the given className.
     */
    static getClassModel(className) {
        return AllClassModels[className];
    }

    /* 
     * getAllClassModelNames()
     * Retrieves all the classNames of all created ClassModels, except NoommanClassModel.
     * Returns
     * - Array<String> - the classNames of all created ClassModels, except NoommanClassModel.
     */

    static getAllClassModelNames() {
        const names = [];
        for (const index in AllClassModels) {
            const classModel = AllClassModels[index];
            if (classModel.className !== 'NoommanClassModel') {
                names.push(classModel.className);
            }
        }
        
        return names;
    }

    /* 
     * validateAttribute(attributeName, value)
     * Validates that the given value is a valid value for the Attribute with the given attributeName.
     *    Calls method attribute.validate().
     * Parameters
     * - attributeName - String - The name of an attribute of this ClassModel to validate against.
     * - value - Any - A value to validate against the attribute of this ClassModel with the given name.
     * Throws
     * - NoommanValidationError - If the value is an invalid value for the attribute of this ClassModel with the given name. 
     *    See errors on method attribute.validate().
     */ 
    validateAttribute(attributeName, value) {
        const attribute = this.attributes.filter(attribute => attribute.name === attributeName);

        if (attribute.length === 0)
            throw new NoommanErrors.NoommanValidationError('classModel.validateAttribute() called with an invalid attribute name.');

        attribute[0].validate(value);
    }

    /* 
     * valueValidForSingularRelationship(value, relationshipName)
     * Determines if the given value is a valid value for the singular relationship on this ClassModel
     *    with the given relationshipName. Value is considered valid if it is an Instance of the ClassModel
     *    that has the same name as the toClass property of the reltaionship on this ClassModel matching
     *    the given relationshipName (or any sub-ClassModel thereof). Null is also a valid value.
     * Parameters
     * - value - Any - A value to validate.
     * - relationshipName - String - The name of a singular relationship on this ClassModel.
     * Returns
     * - Boolean - True if value is valid for the relationship on this ClassModel matching relationshipName,
     *    false otherwise.
     * Throws
     * - NoommanValidationError - If relationshipName does not match the name property of a singular relationship defined 
     *    for this ClassModel.
     */
    valueValidForSingularRelationship(value, relationshipName) {
        const relationship = this.relationships.filter(relationship => relationship.name === relationshipName && relationship.singular);
        if (relationship.length === 0)
            throw new NoommanErrors.NoommanValidationError('classModel.valueValidForSingularRelationship() called with an invalid relationship name.');

        const toClass = AllClassModels[relationship[0].toClass];

        if (value === null)
            return true;

        if (!(value instanceof Instance))
            return false;

        if (!toClass.isInstanceOfThisClass(value))
            return false;

        return true;
    }

    /* 
     * valueValidForNonSingularRelationship(value, relationshipName)
     * Determines if the given value is a valid value for the non-singular relationship on this ClassModel
     *    with the given relationshipName. Value is considered valid if it is an InstanceSet of the ClassModel
     *    that has the same name as the toClass property of the reltaionship on this ClassModel matching
     *    the given relationshipName (or any sub-ClassModel thereof). Null is also a valid value.
     * Parameters
     * - value - Any - A value to validate.
     * - relationshipName - String - The name of a non-singular relationship on this ClassModel.
     * Returns
     * - Boolean - True if value is valid for the relationship on this ClassModel matching relationshipName,
     *    false otherwise.
     * Throws
     * - NoommanValidationError - If relationshipName does not match the name property of a non-singular relationship defined 
     *    for this ClassModel.
     */
    valueValidForNonSingularRelationship(value, relationshipName) {
        const relationship = this.relationships.filter(relationship => relationship.name === relationshipName && !relationship.singular);
        if (relationship.length === 0)
            throw new NoommanErrors.NoommanValidationError('classModel.valueValidForNonSingularRelationship() called with an invalid relationship name.');

        const toClass = AllClassModels[relationship[0].toClass];

        if (value === null)
            return true;

        if (!(value instanceof InstanceSet))
            return false;

        if (!toClass.isInstanceSetOfThisClass(value))
            return false;

        return true;
    }

    /* 
     * cardinalityOfRelationship(relationshipName)
     * Returns an object representing the cardinality of the relationship on this ClassModel matching the
     *    given relationshipName.
     * Parameters
     * - relationshipName - String - A string matching the name property of a relationship defined for this
     *    ClassModel
     * Returns
     * - Object - An object with two properties, to and from. 
     * {
     *    to: String - Either '1', or 'many',
     *    from: String - Either null, '1', or 'many',
     * }
     * Throws
     * - NoommanArgumentError - If no relationship exists on this ClassModel matching the given relationshipName.
     * - NoommanClassModelError - If the relationship with given relationshipName has a toClass property which does
     *    not match a ClassModel.
     * - NoommanClassModelError - If the relationship with given relationshipName references a mirrorRelationship 
     *    which does not exist on the related ClassModel.
     */
    cardinalityOfRelationship(relationshipName) {
        const relationship = this.getRelationship(relationshipName);

        if (relationship === null) {
            throw new NoommanErrors.NoommanArgumentError('ClassModel.cardinalityOfRelationship() called with invalid relationship ' 
                + this.className + '.' + relationshipName + '.');
        }

        const cardinality = {
            from: null,
            to: null,
        };

            
        if (relationship.singular) {
            cardinality.to = '1';
        }
        else {
            cardinality.to = 'many';
        }
            
        if (relationship.mirrorRelationship !== undefined) {
            const toClass = this.getRelatedClassModel(relationship.name);

            if (toClass === undefined) {
                throw new NoommanErrors.NoommanClassModelError('ClassModel.cardinalityOfRelationship() called with invalid relationship ' 
                    + this.className + '.' + relationshipName + '. Relationship\'s toClass is not a known ClassModel.');
            }

            const mirrorRelationship = toClass.getRelationship(relationship.mirrorRelationship);

            if (mirrorRelationship === null) {
                throw new NoommanErrors.NoommanClassModelError('ClassModel.cardinalityOfRelationship() called with invalid relationship ' 
                    + this.className + '.' + relationshipName + '. Relationship\'s mirrorRelationship "' + relationship.mirrorRelationship 
                    + '" does not exist on the toClass ' + relationship.toClass + '.');
            }

            if (mirrorRelationship.singular) {
                cardinality.from = '1';
            }
            else {
                cardinality.from = 'many';
            }
        }

        return cardinality;
    }

    /*
     * validatePath(path)
     * Validates that the given path array contains valid relationship names for the relavant ClassModels.
     * Parameters
     * - path - Array<String> - An array of strings that represent a sequence or relationships to walk from 
     *    this ClassModel.
     * Throws
     * - NoommanArgumentError - If given path is not an Array.
     * - NoommanArgumentError - If given path is an Array containing any item that is not a string.
     * - NoommanArgumentError - If given path Array contains any string is not a valid relationship name for
     *    the relavant ClassModel.
     */
    validatePath(path) {
        const errorMessage = 'Error walking path from '
            + this.className + '. Invalid path given: ' + path + '.';

        if (!Array.isArray(path)) {
            throw new NoommanErrors.NoommanArgumentError(errorMessage);
        }

        for (const item of path) {
            if (typeof(item) !== 'string') {
                throw new NoommanErrors.NoommanArgumentError(errorMessage);
            }
        }

        let classModel = this;
        for (const index in path) {
            const relationship = classModel.getRelationship(path[index]);
            if (relationship === null) {
                throw new NoommanErrors.NoommanArgumentError(errorMessage);
            }
            classModel = classModel.getRelatedClassModel(path[index]);
        }
    }

    /*
     * discriminated()
     * Determines if this ClassModel is discriminated. This ClassModel is considered discriminated if 
     *    it has a direct sub-ClassModel with its 'useSuperClassCollection' property set to true.
     * Returns
     * - Boolean - True if at least one of this ClassModel's direct sub-ClassModels has useSuperClassCollection 
     *    property equal to true. False otherwise.
     */
    discriminated() {
        for (const subClass of this.subClasses) {
            if (subClass.useSuperClassCollection)
                return true;
        }
        return false;
    }

    /*
     * firstNonNullPromiseResolution(promises)
     * Loops through given promises one at a time and returns the first non null resolution. 
     *    Will break the loop on the first non-null resolution. If none of the promises return 
     *    a non-null value, null is returned.
     * Parameters
     * - promises - Array<Promise> - An array of promises to wait for.
     * Returns 
     * - Promise<Any> - The resolved value of the first promise to resolve with a non-null value. Returns null
     *    if all promises resolve to null.
     * Throws
     * - Error - If any of the given promises reject with an error before another promise
     *    resolves with a non-null promise.
     */
    static async firstNonNullPromiseResolution(promises) {
        for (var index in promises) {
            let foundInstance = await promises[index];

            if (foundInstance != null) {
                return foundInstance;
                break;
            }
            else if (index == promises.length - 1) {
                return null;
            }
        }
    }

    /*
     * allPromiseResolutionsInstanceSets(promises)
     * Loops through and waits for the given promises one at a time. Each promise is expected to resolve
     *    to an InstanceSet. The promise resolutions are combined into a single InstanceSet with ClassModel
     *    of this ClassModel.
     * Parameters
     * - promises - Array<Promise> - An array of promises to wait for.
     * Returns 
     * - Promise<InstanceSet> - A Promise which resolves to an InstanceSet containing all the Instances
     *    of each InstanceSet that each of the given promises resolves with.
     * Throws
     * - Error - If any of the given promises reject with an error.
     */
    async allPromiseResoltionsInstanceSets(promises) {
        let results = new InstanceSet(this);

        for (var promise of promises) {
            let singleResult = await promise;
            if (!singleResult.isEmpty())
                results.addInstances(singleResult);
        }

        return results;
    }

    /* 
     * asyncFilter(instances, asyncFilterFunction)
     * A function which can filter an array of instances using an asynchronus function.
     * Parameters
     * - instances - Iterable<Instance> - An iterable (InstanceSet, Array, etc.) of Instances to filter.
     * - asyncFilterFunction - Function - An asynchronous function which accepts a single Instance as
     *    and argument and which will resolve true or false.
     * Returns
     * - Promise<Instances> - The Instances for which the given asyncFilter resolves true.
     */
    static async asyncFilter(instances, asyncFilterFunction) {
        let filtered = [];
        let filterPromises = [];

        instances.forEach((instance) => {
            filterPromises.push(asyncFilterFunction(instance));
        });

        let instanceIndex;

        for (instanceIndex = 0; instanceIndex < instances.length; instanceIndex++)  
            if (await filterPromises[instanceIndex])
                filtered.push(instances[instanceIndex]);
            
        return filtered;
    }

    /* 
     * isSuperClass()
     * Use to determine if this ClassModel is a super ClassModel.
     * Returns
     * - Boolean - True if this ClassModel has any sub ClassModels, false otherwise.
     */
    isSuperClass() {
        return (this.subClasses && this.subClasses.length)
    }

    /*
     * allSuperClasses()
     * Finds all the ClassModels which are a parent ClassModel to this ClassModel, 
     *    all the way up the inheritance tree.
     * Returns
     * - Array<ClassModel> - An array containing all the ClassModels that are a super ClassModel
     *    to this ClassModel.
     */
    allSuperClasses() {
        const superClasses = new SuperSet(this.superClasses);

        for (const superClass of this.superClasses) {
            superClasses.addFromIterable(superClass.allSuperClasses())
        }

        return [...superClasses];
    }

    /*
     * allSubClasses()
     * Finds all the ClassModels which are a child ClassModel to this ClassModel, 
     *    all the way down the inheritance tree.
     * Returns
     * - Array<ClassModel> - An array containing all the ClassModels that are a sub ClassModel
     *    of this ClassModel.
     */
    allSubClasses() {
        const subClasses = new SuperSet(this.subClasses);

        for (const subClass of this.subClasses) {
            subClasses.addFromIterable(subClass.allSubClasses())
        }

        return [...subClasses];
    }

    /*
     * emptyInstanceSet()
     * Creates a new empty InstanceSet of this classModel.
     * Returns
     * - An empty InstanceSet of this ClassModel.
     */
    emptyInstanceSet() {
        return new InstanceSet(this);
    }


    // Insert, Update, Delete Methods

    /*
     * insertOne(document)
     * Inserts a document into the collection for this ClassModel. Internal use only. 
     * Parameters
     * - document - Object - An object to insert into the collection for this ClassModel.
     * Returns
     * - Promise<insertOneWriteOpResult> - See https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#~insertOneWriteOpResult
     */
    async insertOne(document) {
        return database.insertOne(this.collection, document);
    }

    /*
     * insertMany(documents)
     * Inserts multiple documents into the collection for this ClassModel. Internal use only. 
     * Parameters
     * - documents - Array<Object> - An array of objects to insert into the collection for this ClassModel.
     * Returns
     * - Promise<insertWriteOpResultObject> - See https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#~insertWriteOpResult
     */
    async insertMany(documents) {
        return database.insertMany(this.collection, documents);
    }

    /* 
     * update(instance)
     * Updates the given instance in this ClassModel's collection to match the current state of the instance.
     *    Internal use only.
     * Parameters
     * - instance - Instance - An instance of this ClassModel to update in the database.
     * Returns
     * - Promise<updateWriteOpResult> - See https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#~updateWriteOpResult
     */
    async update(instance) {
        return database.update(this.collection, instance);
    }

    /* 
     * overwrite(instance)
     * Overwrites an instance in the collection for this ClassModel. Do Not Use. Internal Use Only.
     * Parameters
     * - instance - Instance - An instance of this ClassModel to overwrite in the database.
     * Returns
     * - Promise<updateWriteOpResult> - See https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#~updateWriteOpResult
     */
    async overwrite(instance) {
        return database.overwrite(this.collection, instance);
    }

    /*
     * delete(instance)
     * Deletes an instance from the collection for this ClassModel.
     * Parameters
     * - instance - Instance - An instance to delete.
     * Returns
     * - Promise<deleteWriteOpResult> - See https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#~deleteWriteOpResult
     * Throws
     * - NoommanArgumentError - If the given Instance's ClassModel is not this ClassModel.
     */
    async delete(instance) {

        if (instance.classModel !== this)
            throw new NoommanErrors.NoommanArgumentError(this.className + '.delete() called on an instance of a different class.');

        return database.deleteOne(this.collection, instance);
    }

    // Query Methods

    /* 
     * find(queryFilter, readPrivilegeMethodParameter, sensitivePrivilegeMethodParameter)
     * Finds Instances of this ClassModel using the given query filter in the database. 
     *    If called on a super-ClassModel, will recursively check this ClassModel's collection, and then it's sub-ClassModels' collections.
     *    This method respects readPrivilege and sensitivePrivilege methods. If this ClassModel has read privileges set, Instances found
     *    during query will be filtered down to those which pass the readPrivilege method(s) for this ClassModel. If this ClassModel
     *    has sensitive privileges set, all Instances which do not pass the sensitivePrivilege method(s) for this ClassModel will be 
     *    stripped of any sensitive attributes.
     * Parameters
     * - queryFilter - Object - A mongo query object (required).
     * - readPrivilegeMethodParameter - Object - An object containing parameters that will be passed to the readPrivilege method(s)
     *    for this ClassModel.
     * - sensitivePrivilegeMethodParameter - Object - An object containing parameters that will be passed to the sensitivePrivilege
     *    method(s) for this ClassModel.
     * Returns 
     * - Promise<InstanceSet> - An InstanceSet of this ClassModel containing all instances of this ClassModel or its children
     *    which match the given query and pass the readPrivilege methods if applicable.
     */
    async find(queryFilter, readPrivilegeMethodParameter, sensitivePrivilegeMethodParameter) {
        const unfiltered = await this.pureFind(queryFilter);
        const filtered = await this.readPrivilegeFilter(unfiltered, readPrivilegeMethodParameter);
        await filtered.sensitivePrivilegeCheckAndStrip(sensitivePrivilegeMethodParameter);

        return filtered;
    }

    /* 
     * pureFind(queryFilter)
     * Finds instances of this ClassModel using the given query filter in the database. 
     *    If called on a super-ClassModel, will recursively check this ClassModel's collection, and then it's sub-ClassModels collections.
     *    This method DOES NOT do any readPrivilege or sensitivePrivilege filtering. 
     * Parameters
     * - queryFilter - Object - A mongo query object (required).
     * Returns 
     * - Promise<InstanceSet> - An InstanceSet of this ClassModel containing all instances of this ClassModel or its children
     *    which match the given query.
     * Throws
     * - NoommanClassModelError - If this ClassModel is abstract and has no sub-ClassModels.
     */
    async pureFind(queryFilter={}) {
        const foundInstances = new InstanceSet(this);

        const subClassesWithDifferentCollections = this.subClasses ? this.subClasses.filter(subClass => !subClass.useSuperClassCollection) : [];

        // If this class is a non-discriminated abstract class and it doesn't have any sub classes, throw an error.
        if (this.abstract && !this.isSuperClass())
            throw new NoommanErrors.NoommanClassModelError('Error in ' + this.className + '.find(). This class is abstract and non-discriminated, but it has no sub-classes.');

        if (this.useSuperClassCollection) {
            queryFilter.__t = this.className;
        }

        if (this.collection) {
            const documentsFoundInThisCollection = await database.find(this.collection, queryFilter); 
            const instancesFoundInThisCollection = new InstanceSet(this, documentsFoundInThisCollection.map(document => { 
                if (document.__t)
                    return new Instance(AllClassModels[document.__t], document);
                return new Instance(this, document);
            }));
            foundInstances.addInstances(instancesFoundInThisCollection);
        }
        
        const promises = [];
  
        for (const subClass of subClassesWithDifferentCollections) {
            delete queryFilter.__t;
            promises.push(subClass.pureFind(queryFilter));
        }

        const instancesFoundOfSubClasses = await this.allPromiseResoltionsInstanceSets(promises);
        
        foundInstances.addInstances(instancesFoundOfSubClasses)
        return foundInstances;
    }

    /* 
     * findOne(queryFilter, readPrivilegeMethodParameter, sensitivePrivilegeMethodParameter)
     * Finds a single Instance of this ClassModel using the given query filter in the database. 
     *    If called on a super-ClassModel, will recursively check this ClassModel's collection, and then it's sub-ClassModels collections.
     *    This method respects readPrivilege and sensitivePrivilege methods. If this ClassModel has read privileges set, the Instance found
     *    during query will not be returned if it does not pass the readPrivilege method(s) for this ClassModel. If this ClassModel
     *    has sensitive privileges set, an Instance which does not pass the sensitivePrivilege method(s) for this ClassModel will be 
     *    stripped of any sensitive attributes.
     * Parameters
     * - queryFilter - Object - A mongo query object (required).
     * - readPrivilegeMethodParameter - Object - An object containing parameters that will be passed to the readPrivilege method(s)
     *    for this ClassModel.
     * - sensitivePrivilegeMethodParameter - Object - An object containing parameters that will be passed to the sensitivePrivilege
     *    method(s) for this ClassModel.
     * Returns 
     * - Promise<Instance> - The first Instance of this ClassModel or its children which matches the given query and passes the
     *    readPrivilege methods if applicable. Returns null if no Instance matches query or if matching Instance does not pass 
     *    readPrivilege method if applicable.
     */
    async findOne(queryFilter, readPrivilegeMethodParameter, sensitivePrivilegeMethodParameter) {
        const unfiltered = await this.pureFindOne(queryFilter);
        if (unfiltered === null) {
            return null;
        }

        const filtered = await this.readPrivilegeFilterInstance(unfiltered, readPrivilegeMethodParameter);
        if (filtered === null) {
            return null;
        }

        const needToStrip = await this.sensitivePrivilegeFilterInstance(filtered, sensitivePrivilegeMethodParameter);
        if (needToStrip !== null) {
            filtered.stripSensitiveAttributes();
        }

        return filtered;
    }

    /* 
     * pureFindOne(queryFilter)
     * Finds a single instance of this ClassModel using the given query filter in the database. 
     *    If called on a superclass, will recursively check this ClassModel's collection, and then it's sub-ClassModels collections.
     *    This method does not respect readPrivilege and sensitivePrivilege methods. 
     * Parameters
     * - queryFilter - Object - A mongo query object (required).
     * Returns 
     * - Promise<Instance> - The first Instance of this ClassModel or its children which matches the given query.
     * Throws
     * - NoommanClassModelError - If this ClassModel is abstract and has no sub-ClassModels.
     */
    async pureFindOne(queryFilter) {
        const subClassesWithDifferentCollections = this.subClasses ? this.subClasses.filter(subClass => !subClass.useSuperClassCollection) : [];

        // If this class is a non-discriminated abstract class and it doesn't have any sub classes, throw an error.
        if (this.abstract && !this.isSuperClass())
            throw new NoommanErrors.NoommanClassModelError('Error in ' + this.className + '.findOne(). This class is abstract and non-discriminated, but it has no sub-classes.');

        if (this.useSuperClassCollection) {
            queryFilter.__t = this.className;
        }

        if (this.collection) {
            const documentFoundInThisCollection = await database.findOne(this.collection, queryFilter);

            if (documentFoundInThisCollection !== null) {
                if (documentFoundInThisCollection.__t)
                    return new Instance(AllClassModels[documentFoundInThisCollection.__t], documentFoundInThisCollection);
                else 
                    return new Instance(this, documentFoundInThisCollection);
            }

            if (subClassesWithDifferentCollections.length == 0)
                return null;
        }

        delete queryFilter.__t;

        const promises = [];

        // Call findOne on our subclasses as well.
        for (let subClass of subClassesWithDifferentCollections)
            promises.push(subClass.pureFindOne(queryFilter));

        return ClassModel.firstNonNullPromiseResolution(promises);
    }

    /* 
     * findById(id, readPrivilegeMethodParameter, sensitivePrivilegeMethodParameter)
     * Finds a single instance of this ClassModel with the given id. 
     *    If called on a superclass, will recursively check this ClassModel's collection, and then it's sub-ClassModels collections.
     *    This method respects readPrivilege and sensitivePrivilege methods. If this ClassModel has read privileges set, the Instance found
     *    during query will not be returned if it does not pass the readPrivilege method(s) for this ClassModel. If this ClassModel
     *    has sensitve privileges set, an instance which does not pass the sensitivePrivilege method(s) for this ClassModel will be 
     *    stripped of any sensitive attributes.
     * Parameters
     * - id - ObjectId | String - A mongo ObjectId (or hex string representation thereof) of the Instance you which to find.
     * - readPrivilegeMethodParameter - Object - An object containing parameters that will be passed to the readPrivilege method(s)
     *    for this ClassModel.
     * - sensitivePrivilegeMethodParameter - Object - An object containing parameters that will be passed to the sensitivePrivilege
     *    method(s) for this ClassModel.
     * Returns 
     * - Promise<Instance> - The first Instance of this ClassModel or its children
     *    which has the given id and passes the readPrivilege methods if applicable. Returns null if no Instance with the given id is 
     *    found, or if matching instance does not pass readPrivilege method (if applicable).
     * Throws
     * - NoommanArgumentError - If given id is a string which is not a valid mongodb id hex string.
     */
    async findById(id, readPrivilegeMethodParameter, sensitivePrivilegeMethodParameter) {
        if (typeof(id) === 'string') {
            try {
                id = database.ObjectId(id);
            }
            catch(error) {
                throw new NoommanErrors.NoommanArgumentError(this.className + '.findById() called with invalid Id string: ' + id + '.');
            }
        }

        return this.findOne({_id: id}, readPrivilegeMethodParameter, sensitivePrivilegeMethodParameter);
    }

    /* 
     * pureFindById(id)
     * Finds a single instance of this ClassModel with the given id.
     *    If called on a superclass, will recursively check this ClassModel's collection, and then it's sub-ClassModels collections.
     *    This method does not respect readPrivilege and sensitivePrivilege methods. 
     * Parameters
     * - id - ObjectId - A mongo ObjectId of the Instance you which to find.
     * Returns 
     * - Promise<Instance> - The Instance of this ClassModel or its children with the given id.
     */
    async pureFindById(id) {
        return this.pureFindOne({_id: id});
    }

    async findPage(queryFilter={}, page=0, pageSize=100, orderBy={_id: 1}, readPrivilegeMethodParameter, sensitivePrivilegeMethodParameter) {
        if (this.abstract && !this.isSuperClass())
            throw new NoommanErrors.NoommanClassModelError('Error in ' + this.className + '.findPage(). This class is abstract and non-discriminated, but it has no sub-classes.');

        if (page < 0 || pageSize <= 0) {
            throw new Error(this.className + '.findPage() called with negative page or pageSize value.');
        }

        queryFilter = queryFilter ? queryFilter : {};
        let documents = [];
        const cursors = await this.findPageRecursive(queryFilter, page, pageSize, orderBy);
       
        let index = 0;
        const startIndex = page * pageSize;
        const endIndex = ((page + 1) * pageSize) - 1;
        let documentsRemaining = pageSize;
        let totalNumberOfInstances = 0;

        for (const cursor of cursors) {
            totalNumberOfInstances += await cursor.cursor.count();
        }

        if (startIndex > totalNumberOfInstances) {
            return {
                instances: new InstanceSet(this),
                page,
                pageSize,
                hiddenInstances: 0, 
                totalNumberOfInstances,
            }
        }

        for (const cursor of cursors) {
            const cursorCount = await cursor.cursor.count();
            const cursorStart = index;
            const cursorEnd = index + cursorCount - 1;

            if (endIndex < cursorStart || startIndex > cursorEnd) {
                index += cursorCount;
                continue;
            }
            else {
                const skipValue = startIndex > cursorStart ? startIndex - cursorStart : 0;
                let limitValue = documentsRemaining;
                const documentsFromThisCursor = await cursor.cursor.skip(skipValue).limit(limitValue).toArray();

                for (const document of documentsFromThisCursor) {
                    documents.push({
                        document,
                        className: document.__t ? document.__t : cursor.className,
                    });
                }
            }

            documentsRemaining = pageSize - documents.length;
            index += cursorCount;

            if (documentsRemaining === 0 || index >= totalNumberOfInstances) {
                break;
            }
        }

        // convert documents to instances
        const instances = new InstanceSet(this);

        for (const document of documents) {
            const documentClassModel = AllClassModels[document.className];
            instances.add(new Instance(documentClassModel, document.document));
        }

        const filteredInstances = await instances.readPrivilegeFilter(readPrivilegeMethodParameter);
        await filteredInstances.sensitivePrivilegeCheckAndStrip(sensitivePrivilegeMethodParameter);

        const hiddenInstances = instances.size - filteredInstances.size;

        return {
            instances: filteredInstances,
            page,
            pageSize,
            hiddenInstances, 
            totalNumberOfInstances,
        }
    }

    async findPageRecursive(queryFilter, page, pageSize, orderBy) {
        let cursorsWithClassName = [];

        const subClassesWithDifferentCollections = this.subClasses ? this.subClasses.filter(subClass => !subClass.useSuperClassCollection) : [];

        if (this.useSuperClassCollection) {
            queryFilter.__t = this.className;
        }

        if (this.collection) {
            const cursorForThisCollection = await database.findCursor(this.collection, queryFilter); 
            if(orderBy !== null) {
                cursorForThisCollection.sort(orderBy);
            }

            cursorsWithClassName.push( {
                className: this.className,
                cursor: cursorForThisCollection,
            });
        }
        
        const promises = [];
  
        for (const subClass of subClassesWithDifferentCollections) {
            delete queryFilter.__t;
            promises.push(subClass.findPageRecursive(queryFilter, page, pageSize, orderBy));
        }

        if (promises.length) {
            const subClassCursors = await Promise.all(promises);
            for (const subClassCursor of subClassCursors) {
                cursorsWithClassName = cursorsWithClassName.concat(subClassCursor);
            }
        }

        return cursorsWithClassName;
    }

    /*
     * updateRelatedInstancesForInstance(instance) 
     * Analyzes the changes to two-way relationships for the given Instance to determine which related instances also
     *    need to be updated in order to maintain the consistency of the two-way relationships. Will make the updates
     *    to those related Instances as necessary and save the changes to those instances.
     *    Internal use only.
     * Parameters
     * - instance - Instance - An instance of this ClassModel to analyze and  update related instances for.
     * Returns
     * - Promise<Array<Instance>> - An array of all the related instances which were updated.
     * Throws
     * - NoommanSaveError - If InstanceSet.saveWithoutRelatedUpdates() throws a NoommanSaveError.
     * - NoommanValidationError - If InstanceSet.saveWithoutRelatedUpdates() throws a NoommanValidationError.
     */
    async updateRelatedInstancesForInstance(instance) {
        const relatedDiff = instance.relatedDiffs();
        const reducedRelatedDiff = instance.reducedRelatedDiffs(relatedDiff);
        const instanceSet = new InstanceSet(NoommanClassModel);

        // Retrieve all related instances and collect them in an instanceSet.
        for (const relationshipName of Object.keys(relatedDiff)) {
            const relationship = this.relationships.filter(r => r.name === relationshipName)[0];
            const relatedInstances = await instance.walk(relationshipName);
            const previousRelatedInstances = await instance.walk(relationshipName, true);

            if (relationship.singular) {
                if (relatedInstances !== null) {
                    instanceSet.add(relatedInstances);
                }
                if (previousRelatedInstances !== null) {
                    instanceSet.add(previousRelatedInstances);
                }
            }
            else {
                if (relatedInstances instanceof InstanceSet && !relatedInstances.isEmpty()) {
                    instanceSet.addInstances(relatedInstances);
                }
                if (previousRelatedInstances instanceof InstanceSet && !previousRelatedInstances.isEmpty()) {
                    instanceSet.addInstances(previousRelatedInstances);
                }
            }

        }

        // Apply changes to related instances
        for (const id of Object.keys(reducedRelatedDiff)) {
            const relatedInstance = instanceSet.getInstanceWithId(id);
            relatedInstance.applyChanges(reducedRelatedDiff[id]);
        }

        return instanceSet.saveWithoutRelatedUpdates();
    }

    /*
     * updateRelatedInstancesForInstanceSet(instanceSet)
     * Analyzes the changes to two-way relationships for the Instances in the given InstanceSet to determine which 
     *    related Instances also need to be updated in order to maintain the consistency of the two-way relationships. 
     *    Will make the updates to those related instances as necessary and save the changes to those instances.
     *    Internal use only.
     * Parameters
     * - instanceSet - InstanceSet - An InstanceSet of this ClassModel to analyze and update related instances for.
     * Returns
     * - Promise<Array<Instance>> - An array of all the related instances which were updated.
     * Throws
     * - NoommanSaveError - If InstanceSet.saveWithoutRelatedUpdates() throws a NoommanSaveError.
     * - NoommanValidationError - If InstanceSet.saveWithoutRelatedUpdates() throws a NoommanValidationError.
     */
    async updateRelatedInstancesForInstanceSet(instanceSet) {
        const relationshipsNeedingUpdate = new SuperSet();
        const relatedDiffs = [];

        if (!(instanceSet instanceof InstanceSet) || instanceSet.isEmpty()) {
            return;
        }

        for (const instance of instanceSet) {
            const relatedDiff = instance.relatedDiffs();
            const relationshipsToUpdateForInstance = Object.keys(relatedDiff);
            for (const relationshipName of relationshipsToUpdateForInstance) {
                relationshipsNeedingUpdate.add(relationshipName);
            }
            if (relationshipsToUpdateForInstance.length) {
                relatedDiffs.push(relatedDiff);
            }
        }

        if (relationshipsNeedingUpdate.isEmpty()) {
            return;
        }

        const combinedDiff = Diffable.combineMultipleRelatedDiffs(relatedDiffs);
        const allRelatedInstances = new InstanceSet(NoommanClassModel);

        // Retrieve all related instances and collect them in an instanceSet.
        for (const relationshipName of relationshipsNeedingUpdate) {
            const relatedInstances = await instanceSet.walk(relationshipName);
            const previousRelatedInstances = await instanceSet.walk(relationshipName, true);

            if (relatedInstances instanceof InstanceSet && !relatedInstances.isEmpty()) {
                allRelatedInstances.addInstances(relatedInstances);
            }
            if (previousRelatedInstances instanceof InstanceSet && !previousRelatedInstances.isEmpty()) {
                allRelatedInstances.addInstances(previousRelatedInstances);
            }
        }

        // Apply changes to related instances
        for (const id of Object.keys(combinedDiff)) {
            const relatedInstance = allRelatedInstances.getInstanceWithId(id);
            relatedInstance.applyChanges(combinedDiff[id]);
        }

        return allRelatedInstances.saveWithoutRelatedUpdates();
    }

    // Privilege Methods

    /*
     * needsPrivilegeCheck(instanceSet, privilegeMethods)
     * Used to determine if we need to run a privilege check on the given InstanceSet for the 
     *    given privilegeMethods.
     * Parameters: 
     * - instanceSet - InstanceSet - An InstanceSet of this ClassModel to evaluate whether we need to run Privilege methods on.
     * - privilegeMethods - String - A string which determines which type of privilege methods to check for. Valid values
     *    are 'readPrivilegeMethods', 'createPrivilegeMethods', 'updatePrivilegeMethods', 'deletePrivilegeMethods',
     *    or 'sensitivePrivilegeMethods'.
     * Returns
     * - Boolean - True if there are Instances in the given InstanceSet that are for a ClassModel that has the given privilege 
     *    methods set.
     */
    needsPrivilegeCheck(instanceSet, privilegeMethods) {

        if (instanceSet.isEmpty()) {
            return false;
        }

        if (this[privilegeMethods].length) {
            return true;
        }

        for (const subClass of this.subClasses) {
            const subClassInstances = instanceSet.filterForClassModel(subClass);

            if (subClass.needsPrivilegeCheck(subClassInstances, privilegeMethods)) {
                return true;
            }
        }

        return false;
    }

    /*
     * evaluatePrivilegeMethods(instanceSet, privilegeMethods, methodParameter)
     * Runs the Privilege methods determined by the privilegeMethods parameter for each Instance in the 
     *    given InstanceSet that are applicable for each Instance's ClassModel, using the given methodParameter.
     *    Returns an InstanceSet of Instances which for which at least one privilegeMethod returns false.
     *    Internal use only.
     * Parameters
     * - instanceSet - InstanceSet - An InstanceSet of this ClassModel to evaluate Privilege methods on.
     * - privilegeMethods - String - A string which determines which type of privilege methods to run. Valid values
     *    are 'readPrivilegeMethods', 'createPrivilegeMethods', 'updatePrivilegeMethods', 'deletePrivilegeMethods',
     *    or 'sensitivePrivilegeMethods'.
     * - methodParameter - Object - An object containing any parameters that a particular Privilege method
     *    may need.
     * Returns
     * - Promise<InstanceSet> - An InstanceSet containing all the instances for which at least one Privilege
     *    method returns false.
     */
    async evaluatePrivilegeMethods(instanceSet, privilegeMethods, methodParameter) {
        let rejectedInstances = new InstanceSet(this);

        const instancesOfThisClass = instanceSet.filterToInstanceSet(instance => {
            return instance.classModel === this;
        });

        for (const instance of instancesOfThisClass) {
            for (const privilegeMethod of this[privilegeMethods]) {
                let result = privilegeMethod.call(instance, methodParameter);
                if (result instanceof Promise) {
                    result = await result;
                }
                if (!result) {
                    rejectedInstances.add(instance);
                    continue;
                }
            }
        }

        if (this.isSuperClass()) {
            for (let subClass of this.subClasses) {
                let instancesOfSubClass = instanceSet.filterForClassModel(subClass);

                if (!instancesOfSubClass.isEmpty()) {
                    const rejectedSubClassInstances = await subClass.evaluatePrivilegeMethods(instancesOfSubClass, privilegeMethods, methodParameter);
                    rejectedInstances.addFromIterable(rejectedSubClassInstances);
                }
            }
        }

        return rejectedInstances;
    }

    /*
     * createPrivilegeCheck(instanceSet, createPrivilegeMethodParameter)
     * Runs applicable createPrivilege methods for each Instance in the given InstanceSet, and throws an error if any
     *    createPrivilege method returns false for any of the Instances in the InstanceSet.
     * Parameters
     * - instanceSet - InstanceSet - An InstanceSet of this ClassModel to evaluate createPrivilege methods on.
     * - createPrivilegeMethodParameter - Object - An object containing any parameters that the createPrivilege method(s)
     *    may need.
     * Returns
     * - Promise<undefined> - A promise which resolves to undefined if all Instances pass the createPrivilege methods.
     * Throws
     * - NoommanArgumentError - If instanceSet parameter is not an InstanceSet.
     * - NoommanSaveError - If any createPrivilege method returns false for any of the Instances in the InstanceSet.
     */
    async createPrivilegeCheck(instanceSet, createPrivilegeMethodParameter) {
        if (!(instanceSet instanceof InstanceSet))
            throw new NoommanErrors.NoommanArgumentError('Incorrect parameters. ' + this.className + '.createPrivilegeCheck(InstanceSet instanceSet, createPrivilegeMethodParameter)');
        
        if (!this.needsPrivilegeCheck(instanceSet, 'createPrivilegeMethods'))
            return instanceSet;

        const rejectedInstances = await this.evaluatePrivilegeMethods(instanceSet, 'createPrivilegeMethods', createPrivilegeMethodParameter);

        if (!rejectedInstances.isEmpty())
            throw new NoommanErrors.NoommanSaveError('Illegal attempt to create instances: ' + rejectedInstances.getInstanceIds());
    }


    /*
     * createPrivilegeCheckInstance(instance, createPrivilegeMethodParameter)
     * Runs applicable createPrivilege methods for the given Instance, and throws an error if any
     *    createPrivilege method returns false for the Instance.
     * Parameters
     * - instance - Instance - An Instance of this ClassModel to evaluate createPrivilege methods on.
     * - createPrivilegeMethodParameter - Object - An object containing any parameters that the createPrivilege method(s)
     *    may need.
     * Returns
     * - Promise<undefined> - A promise which resolves to undefined if all Instances pass the createPrivilege methods.
     * Throws
     * - NoommanArgumentError - If instance is not an Instance of this ClassModel.
     * - NoommanSaveError - If any createPrivilege method returns false for the given Instance.
     */
    async createPrivilegeCheckInstance(instance, createPrivilegeMethodParameter) {
        const instanceSet = new InstanceSet(instance.classModel, [instance]);
        return this.createPrivilegeCheck(instanceSet, createPrivilegeMethodParameter);
    }

    /*
     * readPrivilegeFilter(instanceSet, readPrivilegeMethodParameter)
     * Runs applicable readPrivilege methods for each Instance in the given InstanceSet, and filters out any
     *    Instances for which any readPrivilege method returns false.
     * Parameters
     * - instanceSet - InstanceSet - An InstanceSet of this ClassModel to evaluate readPrivilege methods on.
     * - readPrivilegeMethodParameter - Object - An object containing any parameters that the readPrivilege method(s)
     *    may need.
     * Returns
     * - Promise<InstanceSet> - An InstanceSet containing those Instances for which all readPrivilege methods return true.
     * Throws
     * - NoommanArgumentError - If instanceSet parameter is not an InstanceSet.
     */
    async readPrivilegeFilter(instanceSet, readPrivilegeMethodParameter) {
        if (!(instanceSet instanceof InstanceSet))
            throw new NoommanErrors.NoommanArgumentError('Incorrect parameters. ' + this.className + '.readPrivilegeFilter(InstanceSet instanceSet, readPrivilegeMethodParameter)');
        
        if (!this.needsPrivilegeCheck(instanceSet, 'readPrivilegeMethods'))
            return instanceSet;

        const rejectedInstances = await this.evaluatePrivilegeMethods(instanceSet, 'readPrivilegeMethods', readPrivilegeMethodParameter);

        return instanceSet.difference(rejectedInstances);
    }

    /*
     * readPrivilegeFilterInstance(instance, readPrivilegeMethodParameter)
     * Runs applicable readPrivilege methods for the given Instance. If each readPrivilege method returns true for 
     *    the Instance, then the Instance is returned, otherwise null is returned.
     * Parameters
     * - instance - Instance - An Instance of this ClassModel to evaluate readPrivilege methods on.
     * - readPrivilegeMethodParameter - Object - An object containing any parameters that the readPrivilege method(s)
     *    may need.
     * Returns
     * - Promise<Instance> - The given Instance if all readPrivilege methods return true, otherwise null.
     * Throws
     * - NoommanArgumentError - If instance is not an Instance of this ClassModel.
     */
    async readPrivilegeFilterInstance(instance, readPrivilegeMethodParameter) {
        const instanceSet = new InstanceSet(this, [instance]);
        const filteredInstanceSet = await this.readPrivilegeFilter(instanceSet, readPrivilegeMethodParameter);
        return filteredInstanceSet.isEmpty() ? null : [...instanceSet][0];
    }

    /*
     * updatePrivilegeCheck(instanceSet, updatePrivilegeMethodParameter)
     * Runs applicable updatePrivilege methods for each Instance in the given InstanceSet, throws an error 
     *    if any updatePrivilege method returns false for any Instance.
     * Parameters
     * - instanceSet - InstanceSet - An InstanceSet of this ClassModel to evaluate updatePrivilege methods on.
     * - updatePrivilegeMethodParameter - Object - An object containing any parameters that the updatePrivilege method(s)
     *    may need.
     * Returns
     * - Promise<undefined> - A promise which resolves to undefined if all Instances pass the updatePrivilege methods.
     * Throws
     * - NoommanArgumentError - If instanceSet parameter is not an InstanceSet.
     * - NoommanSaveError - If any updatePrivilege method returns false for any of the Instances in the InstanceSet.
     */
    async updatePrivilegeCheck(instanceSet, updatePrivilegeMethodParameter) {
        if (!(instanceSet instanceof InstanceSet))
            throw new NoommanErrors.NoommanArgumentError('Incorrect parameters. ' + this.className + '.updatePrivilegeCheck(InstanceSet instanceSet, updatePrivilegeMethodParameter)');
        
        if (!this.needsPrivilegeCheck(instanceSet, 'updatePrivilegeMethods'))
            return;

        const rejectedInstances = await this.evaluatePrivilegeMethods(instanceSet, 'updatePrivilegeMethods', updatePrivilegeMethodParameter);

        if (!rejectedInstances.isEmpty())
            throw new NoommanErrors.NoommanSaveError('Illegal attempt to update instances: ' + rejectedInstances.getInstanceIds());
    }

    /*
     * updatePrivilegeCheckInstance(instance, updatePrivilegeMethodParameter)
     * Runs applicable updatePrivilege methods for the given Instance, throws an error 
     *    if any updatePrivilege method returns false for the Instance.
     * Parameters
     * - instance - Instance - An Instance of this ClassModel to evaluate updatePrivilege methods on.
     * - updatePrivilegeMethodParameter - Object - An object containing any parameters that the updatePrivilege method(s)
     *    may need.
     * Returns
     * - Promise<undefined> - A promise which resolves to undefined if the Instance passes the updatePrivilege methods.
     * Throws
     * - NoommanArgumentError - If instance is not an Instance of this ClassModel.
     * - NoommanSaveError - If any updatePrivilege method returns false for the given Instance.
     */
    async updatePrivilegeCheckInstance(instance, updatePrivilegeMethodParameter) {
        const instanceSet = new InstanceSet(instance.classModel, [instance]);
        return this.updatePrivilegeCheck(instanceSet, updatePrivilegeMethodParameter);
    }

    /*
     * deletePrivilegeCheck(instanceSet, deletePrivilegeMethodParameter)
     * Runs applicable deletePrivilege methods for each Instance in the given InstanceSet, throws an error 
     *    if any deletePrivilege method returns false for any Instance.
     * Parameters
     * - instanceSet - InstanceSet - An InstanceSet of this ClassModel to evaluate deletePrivilege methods on.
     * - deletePrivilegeMethodParameter - Object - An object containing any parameters that the deletePrivilege method(s)
     *    may need.
     * Returns
     * - Promise<undefined> - A promise which resolves to undefined if all Instances pass the deletePrivilege methods.
     * Throws
     * - NoommanArgumentError - If instanceSet parameter is not an InstanceSet.
     * - NoommanDeleteError - If any deletePrivilege method returns false for any of the Instances in the InstanceSet.
     */
    async deletePrivilegeCheck(instanceSet, deletePrivilegeMethodParameter) {
        if (!(instanceSet instanceof InstanceSet))
            throw new NoommanErrors.NoommanArgumentError('Incorrect parameters. ' + this.className + '.deletePrivilegeCheck(InstanceSet instanceSet, deletePrivilegeMethodParameter)');
        
        if (!this.needsPrivilegeCheck(instanceSet, 'deletePrivilegeMethods'))
            return;

        const rejectedInstances = await this.evaluatePrivilegeMethods(instanceSet, 'deletePrivilegeMethods', deletePrivilegeMethodParameter);

        if (!rejectedInstances.isEmpty())
            throw new NoommanErrors.NoommanDeleteError('Illegal attempt to delete instances: ' + rejectedInstances.getInstanceIds());
    }

    /*
     * deletePrivilegeCheckInstance(instance, deletePrivilegeMethodParameter)
     * Runs applicable deletePrivilege methods for the given Instance, throws an error 
     *    if any deletePrivilege method returns false for the Instance.
     * Parameters
     * - instance - Instance - An Instance of this ClassModel to evaluate deletePrivilege methods on.
     * - deletePrivilegeMethodParameter - Object - An object containing any parameters that the deletePrivilege method(s)
     *    may need.
     * Returns
     * - Promise<undefined> - A promise which resolves to undefined if the Instance passes the deletePrivilege methods.
     * Throws
     * - NoommanArgumentError - If instance is not an Instance of this ClassModel.
     * - NoommanDeleteError - If any deletePrivilege method returns false for the given Instance.
     */
    async deletePrivilegeCheckInstance(instance, deletePrivilegeMethodParameter) {
        const instanceSet = new InstanceSet(instance.classModel, [instance]);
        return this.deletePrivilegeCheck(instanceSet, deletePrivilegeMethodParameter);
    }

    /*
     * sensitivePrivilegeFilter(instanceSet, sensitivePrivilegeMethodParameter)
     * Runs applicable sensitivePrivilege methods for each Instance in the given InstanceSet, and returns those for which
     *    at least one sensitivePrivilege method fails.
     * Parameters
     * - instanceSet - InstanceSet - An InstanceSet of this ClassModel to evaluate sensitivePrivilege methods on.
     * - sensitivePrivilegeMethodParameter - Object - An object containing any parameters that the sensitivePrivilege method(s)
     *    may need.
     * Returns
     * - Promise<InstanceSet> - An InstanceSet containing those Instances for which any sensitivePrivilege method returns false.
     * Throws
     * - NoommanArgumentError - If instanceSet parameter is not an InstanceSet.
     */
    async sensitivePrivilegeFilter(instanceSet, sensitivePrivilegeMethodParameter) {
        if (!(instanceSet instanceof InstanceSet))
            throw new NoommanErrors.NoommanArgumentError('Incorrect parameters. ' + this.className + '.sensitivePrivilegeFilter(InstanceSet instanceSet, sensitivePrivilegeMethodParameter)');
        
        if (!this.needsPrivilegeCheck(instanceSet, 'sensitivePrivilegeMethods'))
            return instanceSet;

        const rejectedInstances = await this.evaluatePrivilegeMethods(instanceSet, 'sensitivePrivilegeMethods', sensitivePrivilegeMethodParameter);

        return rejectedInstances;
    }

    /*
     * sensitivePrivilegeFilterInstance(instance, sensitivePrivilegeMethodParameter)
     * Runs applicable sensitivePrivilege methods for the given Instance, and returns the instance if 
     *    any sensitivePrivilege method returns false. Returns null otherwise.
     * Parameters
     * - instance - Instance - An Instance of this ClassModel to evaluate sensitivePrivilege methods on.
     * - sensitivePrivilegeMethodParameter - Object - An object containing any parameters that the sensitivePrivilege method(s)
     *    may need.
     * Returns
     * - Promise<Instance> - The given Instance if any sensitivePrivilege method returns false, otherwise null.
     * Throws
     * - NoommanArgumentError - If instance is not an Instance of this ClassModel.
     */
    async sensitivePrivilegeFilterInstance(instance, sensitivePrivilegeMethodParameter) {
        const instanceSet = new InstanceSet(this, [instance]);
        const rejectedInstances = await this.sensitivePrivilegeFilter(instanceSet, sensitivePrivilegeMethodParameter);
        return rejectedInstances.size > 0 ? instance : null;
    }

    /*
     * deleteMany(instances)
     * Deletes all of the given instances from this ClassModel's collection.
     * Parameters
     * - instances - Iterable<Instance> - An Iterable (Array, InstanceSet, etc.) containing Instances to delete.
     * Returns 
     * - Promise<deleteWriteOpResult> - See https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#~deleteWriteOpResult
     */
    async deleteMany(instances) {
        return database.deleteMany(this.collection, instances);
    }

    /* 
     * clear() 
     * Deletes every document in the collection for this ClassModel. 
     *    This is for testing purposes only, never run in production.
     * Returns
     * - Promise<undefined> - A promise which resolves to undefined if no Errors are thrown.
     * Throws
     * - NoommanClassModelError - If this is an abstract, non-discriminated ClassModel.
     */
    async clear() {
        if (this.abstract && !this.discriminated())
            throw new NoommanErrors.NoommanClassModelError('Cannot call clear() on an abstract, non-discriminated class. Class: ' + classModel.className);

        if (this.useSuperClassCollection) {
            return database.collection(this.collection).deleteMany({ __t: this.className });
        }
        else {
            return database.collection(this.collection).deleteMany({});
        }        
    }
}

/* 
 * NoommanClassModel
 * An internal ClassModel which is the root of the ClassModel inheritance tree. Every
 *    ClassModel created will be considered a sub-ClassModel of the NoommanClassModel.
 */
const NoommanClassModel = new ClassModel({
    className: 'NoommanClassModel',
    abstract: true,
});

module.exports = ClassModel;