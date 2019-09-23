require('@babel/polyfill');
const mongoose = require('mongoose');

const InstanceState = require('./InstanceState');
const doc = Symbol('document');

/*
 * Class Instance
 * Provides a wrapper around the native mongoose Document.
 * Holds a mongoose document, as well as the ClassModel of the document, and whether it has been saved previously 
 *   (i.e. is in the database) or deleted.Hides away the native mongoose document methods.
 * Provides save and delete methods to save and delete the underlying document.
 * Passes property set and get calls to properties listed in the related ClassModel schema to the underlying document.
 */
class Instance {

    // Constructs an instance of Instance. 
    // Should only be called by ClassModel methods, not in outside code.
    constructor(classModel, document=null) {
        this.constructorValidations(classModel, document);

        this.classModel = classModel;

        if (document) {
            this._id = document._id;
            this.__t = document.__t;
            this.previousState = new InstanceState(classModel, document);
            this.currentState = new InstanceState(classModel, document);
        }
        else {
            this._id = new mongoose.Types.ObjectId;
            this.__t = classModel.discrinatorSuperClass ? classModel.discriminatorSuperClass.className : undefined;
            this.previousState = null;
            this.currentState = new InstanceState(classModel);
        }

        const attributes = classModel.getAttributes();
        const attributeNames = attributes.map(attribute => attribute.name);
        const singularRelationships = classModel.getSingularRelationships();
        const singularRelationshipNames = singularRelationships.map(relationship => relationship.name);
        const nonSingularRelationships = classModel.getNonSingularRelationships();
        const nonSingularRelationshipNames = nonSingularRelationships.map(relationship => relationship.name);
        const documentProperties = attributeNames.concat(singularRelationshipNames, nonSingularRelationshipNames);
        const unSettableInstanceProperties = ['classModel', 'id', '_id', '__t']; 
        const instanceMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(this)); 

        return new Proxy(this, {
            set(trapTarget, key, value, receiver) {
                if (trapTarget.deleted()) 
                    throw new Error('Illegal Attempt to set a property after instance has been deleted.');

                if (unSettableInstanceProperties.includes(key))
                    throw new Error('Illegal attempt to change the ' + key + ' of an Instance.');
                
                if (value === undefined)
                    value = null;

                if (attributeNames.includes(key)) {
                    classModel.validateAttribute(key, value);
                    trapTarget.currentState[key] = value;
                    return true;
                }

                if (singularRelationshipNames.includes(key)) {
                    if (!classModel.valueValidForSingularRelationship(value, key)) 
                        throw new Error('Illegal attempt to set a singular relationship to a value which is not an Instance of the correct ClassModel.');
                    
                    trapTarget.currentState[key] = value;
                    return true;
                }

                if (nonSingularRelationshipNames.includes(key)) {
                    if (!classModel.valueValidForNonSingularRelationship(value, key))
                        throw new Error('Illegal attempt to set a non-singular relationship to a value which is not an InstanceSet of the correct ClassModel.');
                    
                    trapTarget.currentState[key] = value;
                    return true;
                }

                return Reflect.set(trapTarget, key, value, receiver);
            },

            get(trapTarget, key, receiver) {
                if (documentProperties.includes(key))
                    return trapTarget.currentState[key];

                if (key === 'id')
                    return trapTarget._id.toString();

                return Reflect.get(trapTarget, key, receiver);
            },

            has(trapTarget, key) {
                if (documentProperties.includes(key))
                    return key in trapTarget.currentState;

                return Reflect.has(trapTarget, key);
            },

            deleteProperty(trapTarget, key) {
                if (unSettableInstanceProperties.includes(key) || instanceMethods.includes(key) || Object.keys(trapTarget).includes(key)) {
                    throw new Error('Illegal attempt to delete the ' + key + ' property of an Instance.');
                }
                if (documentProperties.includes(key)){
                    return delete trapTarget.currentState[key];
                }

                return Reflect.deleteProperty(trapTarget, key);
            },

            ownKeys(trapTarget) {
                return Reflect.ownKeys(trapTarget).filter(key => typeof key !== 'symbol');
            }
        });
    }

    // Constructs an instance of Instance. 
    // Should only be called by ClassModel methods, not in outside code.
    constructor2(classModel, document=null, saved=false) {
        this.constructorValidations(classModel, document, saved);

        this.classModel = classModel;
        this[doc] = document ? document : new classModel.Model({ _id: new mongoose.Types.ObjectId });
        this.saved = saved;
        this.deleted = false;

        const documentProperties = Object.keys(this.classModel.schema).concat(['id', '_id', '__t']);
        const unSettableInstanceProperties = ['classModel', doc, 'id', '_id', '__t']; 
        const instanceMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(this)); 

        return new Proxy(this, {
            set(trapTarget, key, value, receiver) {
                if (this.deleted) 
                    throw new Error('Illegal Attempt to set a property after instance has been deleted.');

                if (unSettableInstanceProperties.includes(key))
                    throw new Error('Illegal attempt to change the ' + key + ' of an Instance.');

                if (documentProperties.includes(key)) {
                    trapTarget[doc][key] = value;
                    return true;
                }

                return Reflect.set(trapTarget, key, value, receiver);
            },

            get(trapTarget, key, receiver) {
                if (documentProperties.includes(key))
                    return trapTarget[doc][key];

                return Reflect.get(trapTarget, key, receiver);
            },

            has(trapTarget, key) {
                console.log('Instance Has Trap called.');
                if (documentProperties.includes(key)) {
                    console.log('Calling Instance State has trap.');
                    return (key in trapTarget.currentState);
                }
                
                return Reflect.has(trapTarget, key);
            },

            deleteProperty(trapTarget, key) {
                if (unSettableInstanceProperties.includes(key) || instanceMethods.includes(key) || Object.keys(trapTarget).includes(key)) 
                    throw new Error('Illegal attempt to delete the ' + key + ' property of an Instance.');

                if (documentProperties.includes(key)) {
                    trapTarget[doc][key] = undefined;
                    return true;
                }
                return Reflect.deleteProperty(trapTarget, key);
            },

            ownKeys(trapTarget) {
                return Reflect.ownKeys(trapTarget).filter(key => typeof key !== 'symbol');
            }
        });
    }

    constructorValidations(classModel, document) {
        if (!classModel) 
            throw new Error('Instance.constructor(), parameter classModel is required.');

        if (!(classModel.className))
            throw new Error('Instance.constructor(), first parameter classModel must be an instance of ClassModel.');
        
        if (classModel.abstract) 
            throw new Error('Instance.constructor(), classModel cannot be abstract.');

        if (document && !(document instanceof classModel.Model))
            throw new Error('Instance.constructor(), given document is not an instance of the given classModel.');

        if (document && !('_id' in document))
            throw new Error('Instance.constructor(), given document does not have an ObjectId.');

    }

    saved() {
        return this.previousState !== null;
    }

    deleted() {
        return this.currentState === null;
    }

    toString() {
        return 'Instance of ' + this.classModel.className + '\n' + 
        'saved:   ' + this.saved() + '\n' + 
        'deleted: ' + this.deleted() + '\n' + 
        'state:     ' + this.currentState
    }

    assign(object) {
        const documentProperties = this.classModel.getDocumentPropertyNames();
        for (const key in object) {
            if (documentProperties.includes(key))
                this[key] = object[key];
        }
    }

    assign2(object) {
        const documentProperties = Object.keys(this.classModel.schema);
        for (const key in object) {
            if (documentProperties.includes(key))
                this[key] = object[key];
        }
    }

    documentEquals(otherDocument) {
        return this[doc] == otherDocument;
    }

    getDocumentProperty(propertyName) {
        return this[doc][propertyName];
    }
    
    /* 
     * Walks a relationship from a given instance of this Class Model, returning the related instance or instances. 
     * @param required Object instance: An instance of this class model
     * @param required String relationship: the key for the desired relationship
     * @param optional Object filter: a filter Object used in the query to filter the returned instances.
     * @return Promise which when resolved returns the related instance if relationship is singular, or an Array of the related 
     *           instances if the relationship is non-singular.
     */ 
    async walk(relationship, filter=null, ...accessControlMethodParameters) {
        if (!relationship)
            throw new Error('instance.walk() called with insufficient arguments. Should be walk(relationship, <optional>filter).');
        
        if (typeof(relationship) != 'string')
            throw new Error('instance.walk(): First argument needs to be a String representing the name of the relationship.');
        
        if (!(relationship in this.classModel.schema))
            throw new Error('instance.walk(): First argument needs to be a relationship property in ' + this.classModel.className + '\'s schema.');
        
        if (!this.classModel.propertyIsARelationship(relationship))
            throw new Error('instance.walk(): property "' + relationship + '" is not a relationship.');
        
        if (filter && typeof(filter) !== "object")
            throw new Error('instance.walk(): Second argument needs to be an object.');
    
        const relatedClass = this.classModel.getRelatedClassModel(relationship);
        const singular = this.classModel.schema[relationship].type == mongoose.Schema.Types.ObjectId;
        filter = filter ? filter : {}

            // If relationship is to a singular instance, use findOne()
        if (singular) {
            if (this[relationship] == null) {
                return null;
            }
            else {
                Object.assign(filter, {
                    _id: this[relationship],
                });
                return relatedClass.findOne(filter, ...accessControlMethodParameters);
            }
        }
        // If nonsingular, use find()
        else {
            if (this[relationship] == null || this[relationship].length == 0) {
                return [];
            }
            else {
                Object.assign(filter, {
                    _id: {$in: this[relationship]}
                });

                return relatedClass.find(filter, ...accessControlMethodParameters);
            }
        }
    }

    // Validation Methods

    /*
     * Defines what it means for a property to be set. Valid values that count as 'set' are as follows:
     * boolean: True or False
     * number: Any value including 0.
     * string: Any thing of type string.
     * Array: Any array with a length greater than 0.
     * Object/Relationship: Any Value
     */
    propertyIsSet(key) {
        const property = this.classModel.getDocumentProperties().filter(property => property.name === key)[0];

        if (this.classModel.isAttribute(key) && property.list) {
            if (!Array.isArray(this[key]) || this[key].length === 0) {
                return false;
            }
        }
        else if (this.classModel.isNonSingularRelationship(key)) {
            if (Array.isArray(this[key]) && this[key].length === 0)
                return false;
        }
        else {
            if (this[key] === null)
                return false;
        }
        return true;
    }

    // Validations
    validate() {
        this.requiredValidation();
        //this.requiredGroupValidation();
        //this.mutexValidation();
    }

    mutexValidation() {
        let muti = [];
        let violations = [];
        let message = '';
        let classModel = this.classModel;
        let schema = classModel.schema;

        Object.keys(schema).forEach(key => {
            if (schema[key].mutex && this.propertyIsSet(key))
                    if (muti.includes(schema[key].mutex))
                        violations.push(schema[key].mutex);
                    else
                        muti.push(schema[key].mutex);
        });

        if (violations.length) {
            message = 'Mutex violations found for instance ' + this.id + '.';
            Object.keys(schema).forEach(key => {
                if (violations.includes(schema[key].mutex) && this.propertyIsSet(key)) {
                            message += ' Field ' + key + ' with mutex \'' + schema[key].mutex + '\'.'
                }
            });
            throw new Error(message);
        }
    }

    requiredValidation() {
        let documentProperties = this.classModel.getDocumentProperties();
        let message = '';
        let valid = true;

        for (const documentProperty of documentProperties) {
            if (!documentProperty.required)
                continue;
            if (!this.propertyIsSet(documentProperty.name)) {
                valid = false;
                message += this.classModel.className + ' validation failed: ' + documentProperty.name + ': Path \`' + documentProperty.name + '\` is required.'
            }
        }

        if (!valid)
            throw new Error(message);
    }

    requiredGroupValidation() {
        let requiredGroups = [];
        let message = '';
        let classModel = this.classModel;
        let schema = classModel.schema;

        // Iterate through the schema to find required groups.
        Object.keys(schema).forEach(key => {
            if (schema[key].requiredGroup && !requiredGroups.includes(schema[key].requiredGroup))
                requiredGroups.push(schema[key].requiredGroup);
        });

        // Iterate through the instance members to check that at least one member for each required group is set.
        Object.keys(schema).forEach(key => {
            if (schema[key].requiredGroup && this.propertyIsSet(key))
                requiredGroups = requiredGroups.filter(value => { return value != schema[key].requiredGroup; });
        });

        if (requiredGroups.length) {
            message = 'Required Group violations found for requirement group(s): ';
            requiredGroups.forEach(function(requiredGroup) {
                message += ' ' + requiredGroup;
            });

            throw new Error(message);
        }
    }

    propertyIsSet2(key) {
        let schema = this.classModel.schema;

        if (Array.isArray(schema[key].type))
            return this[key].length ? true : false;

        if (schema[key].type == Number)
            return (this[key] || this[key] == 0);

        if (schema[key].type == String)
            return this[key] ? true : false;
        
        return this[key] ? true : false;
    }

    // Validations
    validate2() {
        this.requiredValidation2();
        this.requiredGroupValidation2();
        this.mutexValidation2();
        this[doc].validateSync();
    }

    mutexValidation2() {
        let muti = [];
        let violations = [];
        let message = '';
        let classModel = this.classModel;
        let schema = classModel.schema;

        Object.keys(schema).forEach(key => {
            if (schema[key].mutex && this.propertyIsSet2(key))
                    if (muti.includes(schema[key].mutex))
                        violations.push(schema[key].mutex);
                    else
                        muti.push(schema[key].mutex);
        });

        if (violations.length) {
            message = 'Mutex violations found for instance ' + this.id + '.';
            Object.keys(schema).forEach(key => {
                if (violations.includes(schema[key].mutex) && this.propertyIsSet2(key)) {
                            message += ' Field ' + key + ' with mutex \'' + schema[key].mutex + '\'.'
                }
            });
            throw new Error(message);
        }
    }

    requiredValidation2() {
        let message = '';
        let valid = true;
        let schema = this.classModel.schema;

        // Iterate through the schema to find required groups.
        Object.keys(schema).forEach(key => {
            if (schema[key].required && !this.propertyIsSet2(key)) {
                valid = false;
                message += this.classModel.className + ' validation failed: ' + key + ': Path \`' + key + '\` is required.'
            }
        });

        if (!valid)
            throw new Error(message);
    }

    requiredGroupValidation2() {
        let requiredGroups = [];
        let message = '';
        let classModel = this.classModel;
        let schema = classModel.schema;

        // Iterate through the schema to find required groups.
        Object.keys(schema).forEach(key => {
            if (schema[key].requiredGroup && !requiredGroups.includes(schema[key].requiredGroup))
                requiredGroups.push(schema[key].requiredGroup);
        });

        // Iterate through the instance members to check that at least one member for each required group is set.
        Object.keys(schema).forEach(key => {
            if (schema[key].requiredGroup && this.propertyIsSet(key))
                requiredGroups = requiredGroups.filter(value => { return value != schema[key].requiredGroup; });
        });

        if (requiredGroups.length) {
            message = 'Required Group violations found for requirement group(s): ';
            requiredGroups.forEach(function(requiredGroup) {
                message += ' ' + requiredGroup;
            });

            throw new Error(message);
        }
    }

    // Update and Delete Methods Methods

    async save(...updateControlMethodParameters) {
        if (this.deleted) 
            throw new Error('instance.save(): You cannot save an instance which has been deleted.');
        
        try {
            this.validate();
            await this.classModel.updateControlCheck(this, ...updateControlMethodParameters);
        }
        catch (error) {
            throw new Error('Caught validation error when attempting to save Instance: ' + error.message);
        }

        await this[doc].save({validateBeforeSave: false});
        this.saved = true;

        return this;
    }

    async saveWithoutValidation() {
        if (this.deleted) 
            throw new Error('instance.save(): You cannot save an instance which has been deleted.');
        await this[doc].save({validateBeforeSave: false});
        this.saved = true;
        return this;
    }

    async delete() {
        if (!this.saved)
            throw new Error('instance.delete(): You cannot delete an instance which hasn\'t been saved yet');

        await this.classModel.delete(this[doc]);
        this.deleted = true;
        return true;
    }

    isInstanceOf(classModel) {
        return classModel.isInstanceOfThisClass(this);
    }

    equals(instance) {
        if (!(instance instanceof Instance))
            throw new Error('instance.equals called with something that is not an instance.');
        if (instance.classModel !== this.classModel)
            return false;
        if (instance.id != this.id)
            return false;
        return true;
    }

    isInstance() {
        return true;
    }
}

module.exports = Instance;