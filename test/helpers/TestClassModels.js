const ClassModel = require('../../noomman/ClassModel');
const NoommanErrors = require('../../noomman/NoommanErrors');
const NoommanValidationError = NoommanErrors.NoommanValidationError;

// Create Class Models that will be used across tests.
{

    // Compare Classes
    {        
        var CompareClass1 = new ClassModel({
            className: 'CompareClass1',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
                {
                    name: 'numbers',
                    type: Number,
                    list: true,
                }
            ],
            relationships: [
                {
                    name: 'class2',
                    toClass: 'CompareClass2',
                    singular: true,
                },
            ],
        });

        var CompareClass2 = new ClassModel({
            className: 'CompareClass2',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ],
            relationships: [
                {
                    name: 'class1s',
                    toClass: 'CompareClass1',
                    singular: false,
                },
            ],
        }); 
    }       

    // Simple Classes
    {   
        var TestClassWithNumber = new ClassModel({
            className: 'TestClassWithNumber',
            attributes: [
                {
                    name: 'number',
                    type: Number,
                },
            ],
        });

        var TestClassWithBoolean = new ClassModel({
            className: 'TestClassWithBoolean',
            attributes: [
                {
                    name: 'boolean',
                    type: Boolean,
                },
            ],
        });

        var TestClassWithAllSimpleFields = new ClassModel({
            className: 'TestClassWithAllSimpleFields',
            attributes: [
                {
                    name: 'string',
                    type: String,
                },
                {
                    name: 'strings',
                    type: String,
                    list: true,
                },
                {
                    name: 'date',
                    type: Date,
                },
                {
                    name: 'boolean',
                    type: Boolean,
                },
                {
                    name: 'booleans',
                    type: Boolean,
                    list: true,
                },
                {
                    name: 'number',
                    type: Number,
                },
                {
                    name: 'numbers',
                    type: Number,
                    list: true,
                },
            ],
        });       

        var AllAttributesAndRelationshipsClass = new ClassModel({
            className: 'AllAttributesAndRelationshipsClass', 
            attributes: [
                {
                    name: 'string',
                    type: String,
                },
                {
                    name: 'strings',
                    type: String,
                    list: true,
                },
                {
                    name: 'date',
                    type: Date,
                },
                {
                    name: 'dates',
                    type: Date,
                    list: true,
                },
                {
                    name: 'boolean',
                    type: Boolean,
                },
                {
                    name: 'booleans',
                    type: Boolean,
                    list: true,
                },
                {
                    name: 'number',
                    type: Number,
                },
                {
                    name: 'numbers',
                    type: Number,
                    list: true,
                },
            ],
            relationships: [
                {
                    name: 'class1',
                    toClass: 'CompareClass1',
                    singular: true,
                },
                {
                    name: 'class2s',
                    toClass: 'CompareClass2',
                    singular: false,
                }
            ],
        });
        
        var AbstractClass = new ClassModel({
            className: 'AbstractClass',
            abstract: true,
            attributes: [
                {
                    name: 'number',
                    type: Number,
                }
            ],
        });

        var UniqueNumberClass = new ClassModel({
            className: 'UniqueNumberClass',
            attributes: [
                {
                    name: 'number',
                    type: Number,
                    unique: true,
                }
            ],
        });

        var UniqueNumberSubClass = new ClassModel({
            className: 'UniqueNumberSubClass',
            superClasses: [UniqueNumberClass],
        });

        var UniqueNumberDiscriminatedSubSubClass = new ClassModel({
            className: 'UniqueNumberDiscriminatedSubSubClass',
            useSuperClassCollection: true,
            superClasses: [UniqueNumberSubClass],
        });
    }
    
    // Validation Classes
    {        
        var AllFieldsRequiredClass = new ClassModel({
            className: 'AllFieldsRequiredClass', 
            attributes: [
                {
                    name: 'string',
                    type: String,
                    required: true,
                },
                {
                    name: 'strings',
                    type: String,
                    list: true,
                    required: true,
                },
                {
                    name: 'date',
                    type: Date,
                    required: true,
                },
                {
                    name: 'boolean',
                    type: Boolean,
                    required: true,
                },
                {
                    name: 'booleans',
                    type: Boolean,
                    list: true,
                    required: true,
                },
                {
                    name: 'number',
                    type: Number,
                    required: true,
                },
                {
                    name: 'numbers',
                    type: Number,
                    list: true,
                    required: true,
                },
            ],
            relationships: [
                {
                    name: 'class1',
                    toClass: 'CompareClass1',
                    singular: true,
                    required: true,
                },
                {
                    name: 'class2s',
                    toClass: 'CompareClass2',
                    singular: false,
                    required: true,
                }
            ],
        });
    
        var AllFieldsMutexClass = new ClassModel({
            className: 'AllFieldsMutexClass', 
            attributes: [
                {
                    name: 'string',
                    type: String,
                    mutex: 'a'
                },
                {
                    name: 'strings',
                    type: String,
                    list: true,
                    mutex: 'a'
                },
                {
                    name: 'date',
                    type: Date,
                    mutex: 'a'
                },
                {
                    name: 'boolean',
                    type: Boolean,
                    mutex: 'a'
                },
                {
                    name: 'booleans',
                    type: Boolean,
                    list: true,
                    mutex: 'a'
                },
                {
                    name: 'number',
                    type: Number,
                    mutex: 'a'
                },
                {
                    name: 'numbers',
                    type: Number,
                    list: true,
                    mutex: 'a'
                },
            ],
            relationships: [
                {
                    name: 'class1',
                    toClass: 'CompareClass1',
                    singular: true,
                    mutex: 'a'
                },
                {
                    name: 'class2s',
                    toClass: 'CompareClass2',
                    singular: false,
                    mutex: 'a'
                }
            ],
        });
    
        var AllFieldsInRequiredGroupClass = new ClassModel({
            className: 'AllFieldsInRequiredGroupClass',
            attributes: [
                {
                    name: 'string',
                    type: String,
                    requiredGroup: 'a'
                },
                {
                    name: 'strings',
                    type: String,
                    list: true,
                    requiredGroup: 'a'
                },
                {
                    name: 'date',
                    type: Date,
                    requiredGroup: 'a'
                },
                {
                    name: 'boolean',
                    type: Boolean,
                    requiredGroup: 'a'
                },
                {
                    name: 'booleans',
                    type: Boolean,
                    list: true,
                    requiredGroup: 'a'
                },
                {
                    name: 'number',
                    type: Number,
                    requiredGroup: 'a'
                },
                {
                    name: 'numbers',
                    type: Number,
                    list: true,
                    requiredGroup: 'a'
                },
            ],
            relationships: [
                {
                    name: 'class1',
                    toClass: 'CompareClass1',
                    singular: true,
                    requiredGroup: 'a'
                },
                {
                    name: 'class2s',
                    toClass: 'CompareClass2',
                    singular: false,
                    requiredGroup: 'a'
                }
            ],
        });

        var MutexClassA = new ClassModel({
            className: 'MutexClassA', 
            attributes: [
                {
                    name: 'boolean',
                    type: Boolean,
                    mutex: 'a',
                },
                {
                    name: 'date',
                    type: Date,
                    mutex: 'a',
                }
            ],
        });

        var MutexClassB = new ClassModel({
            className: 'MutexClassB', 
            relationships: [
                {
                    name: 'class1',
                    toClass: 'CompareClass1',
                    singular: true,
                    mutex: 'a',
                },
                {
                    name: 'class2',
                    toClass: 'CompareClass2',
                    singular: true,
                    mutex: 'a',
                },
            ],
        });

        var MutexClassC = new ClassModel({
            className: 'MutexClassC',
            relationships: [
                {
                    name: 'class1s',
                    toClass: 'CompareClass1',
                    singular: false,
                    mutex: 'a',
                },
                {
                    name: 'class2s',
                    toClass: 'CompareClass2',
                    singular: false,
                    mutex: 'a',
                },
            ],
        });

    }

    // Inheritance Classes
    {
        var SuperClass = new ClassModel({
            className: "SuperClass",
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
                {
                    name: 'boolean',
                    type: Boolean,
                },
                {
                    name: 'number',
                    type: Number,
                },
            ],
        });

        var AbstractSuperClass = new ClassModel({
            className: "AbstractSuperClass",
            abstract: true,
            attributes: [
                {
                    name: 'abstractName',
                    type: String,
                },
                {
                    name: 'abstractBoolean',
                    type: Boolean,
                },
                {
                    name: 'abstractNumber',
                    type: Number,
                },
            ],
        });

        var DiscriminatedSuperClass = new ClassModel({
            className: "DiscriminatedSuperClass",
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
                {
                    name: 'boolean',
                    type: Boolean,
                },
                {
                    name: 'number',
                    type: Number,
                },
            ],
        });

        var AbstractDiscriminatedSuperClass = new ClassModel({
            className: "AbstractDiscriminatedSuperClass",
            abstract: true,
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
                {
                    name: 'boolean',
                    type: Boolean,
                },
                {
                    name: 'number',
                    type: Number,
                },
            ],
        });   

        var SubClassOfSuperClass = new ClassModel({
            className: 'SubClassOfSuperClass',
            superClasses: [SuperClass],
            attributes: [
                {
                    name: 'subBoolean',
                    type: Boolean,
                },
                {
                    name: 'subNumber',
                    type: Number,
                },
            ],
        });   

        var SubClassOfAbstractSuperClass = new ClassModel({
            className: 'SubClassOfAbstractSuperClass',
            superClasses: [AbstractSuperClass],
            attributes: [
                {
                    name: 'subBoolean',
                    type: Boolean,
                },
                {
                    name: 'subNumber',
                    type: Number,
                },
            ],
        });

        var AbstractSubClassOfSuperClass = new ClassModel({
            className: 'AbstractSubClassOfSuperClass',
            superClasses: [SuperClass],
            abstract: true,
            attributes: [
                {
                    name: 'abstractSubBoolean',
                    type: Boolean,
                },
                {
                    name: 'abstractSubNumber',
                    type: Number,
                },
            ],
        });      

        var SubClassOfMultipleSuperClasses = new ClassModel({
            className: 'SubClassOfMultipleSuperClasses',
            superClasses: [SuperClass, AbstractSuperClass],
            attributes: [
                {
                    name: 'subBoolean',
                    type: Boolean,
                    required: true,
                },
                {
                    name: 'subNumber',
                    type: Number,
                    required: true,
                },
            ],
        });   

        var SubClassOfDiscriminatedSuperClass = new ClassModel({
            className: 'SubClassOfDiscriminatedSuperClass',
            superClasses: [DiscriminatedSuperClass],
            useSuperClassCollection: true,
            attributes: [
                {
                    name: 'discriminatedBoolean',
                    type: Boolean,
                },
                {
                    name: 'discriminatedNumber',
                    type: Number,
                },
            ],
        });

        var DiscriminatedSubClassOfSuperClass = new ClassModel({
            className: 'DiscriminatedSubClassOfSuperClass',
            superClasses: [SuperClass],
            attributes: [
                {
                    name: 'discriminatedBoolean',
                    type: Boolean,
                },
                {
                    name: 'discriminatedNumber',
                    type: Number,
                },
            ],
        });

        var SubClassOfDiscriminatedSubClassOfSuperClass = new ClassModel({
            className: 'SubClassOfDiscriminatedSubClassOfSuperClass',
            superClasses: [DiscriminatedSubClassOfSuperClass],
            useSuperClassCollection: true,
            attributes: [
                {
                    name: 'subDiscriminatedBoolean',
                    type: Boolean,
                },
                {
                    name: 'subDiscriminatedNumber',
                    type: Number,
                },
            ],
        });     

        var SubClassOfSubClassOfSuperClass = new ClassModel({
            className: 'SubClassOfSubClassOfSuperClass',
            superClasses: [SubClassOfSuperClass],
            attributes: [
                {
                    name: 'subSubBoolean',
                    type: Boolean,
                },
                {
                    name: 'subSubNumber',
                    type: Number,
                },
            ],
        });

        var SubClassOfAbstractSubClassOfSuperClass = new ClassModel({
            className: 'SubClassOfAbstractSubClassOfSuperClass',
            superClasses: [AbstractSubClassOfSuperClass],
            attributes: [
                {
                    name: 'subAbstractSubBoolean',
                    type: Boolean,
                },
                {
                    name: 'subAbstractSubNumber',
                    type: Number,
                },
            ],
        });

    }

    // Relationship Classes
    {
        var SingularRelationshipClass = new ClassModel({
            className: 'SingularRelationshipClass',
            attributes: [
                {
                    name: 'boolean',
                    type: Boolean,
                },
                {
                    name: 'booleans',
                    type: Boolean,
                    list: true,
                },
            ],
            relationships: [
                {
                    name: 'singularRelationship',
                    toClass: 'NonSingularRelationshipClass',
                    singular: true,
                },
            ],
        });

        var NonSingularRelationshipClass = new ClassModel({
            className: 'NonSingularRelationshipClass',
            attributes: [
                {
                    name: 'boolean',
                    type: Boolean,
                },
            ],
            relationships: [
                {
                    name: 'nonSingularRelationship',
                    toClass: 'SingularRelationshipClass',
                    singular: false,
                },
            ],
        });

        var SubClassOfSingularRelationshipClass = new ClassModel({
            className: 'SubClassOfSingularRelationshipClass',
            superClasses: [SingularRelationshipClass] 
        });

        var SubClassOfNonSingularRelationshipClass = new ClassModel({
            className: 'SubClassOfNonSingularRelationshipClass',
            superClasses: [NonSingularRelationshipClass] 
        });

        var TwoWayRelationshipClass1 = new ClassModel({
            className: 'TwoWayRelationshipClass1',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ],
            relationships: [
                {
                    name: 'oneToOne',
                    toClass: 'TwoWayRelationshipClass2',
                    singular: true,
                    mirrorRelationship: 'oneToOne',
                },
                {
                    name: 'oneToMany',
                    toClass: 'TwoWayRelationshipClass2',
                    singular: false,
                    mirrorRelationship: 'manyToOne',
                },
                {
                    name: 'manyToOne',
                    toClass: 'TwoWayRelationshipClass2',
                    singular: true,
                    mirrorRelationship: 'oneToMany',
                },
                {
                    name: 'manyToMany',
                    toClass: 'TwoWayRelationshipClass2',
                    singular: false,
                    mirrorRelationship: 'manyToMany',
                },
            ],
        });

        var TwoWayRelationshipClass2 = new ClassModel({
            className: 'TwoWayRelationshipClass2',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ],
            relationships: [
                {
                    name: 'oneToOne',
                    toClass: 'TwoWayRelationshipClass1',
                    singular: true,
                    mirrorRelationship: 'oneToOne',
                },
                {
                    name: 'oneToMany',
                    toClass: 'TwoWayRelationshipClass1',
                    singular: false,
                    mirrorRelationship: 'manyToOne',
                },
                {
                    name: 'manyToOne',
                    toClass: 'TwoWayRelationshipClass1',
                    singular: true,
                    mirrorRelationship: 'oneToMany',
                },
                {
                    name: 'manyToMany',
                    toClass: 'TwoWayRelationshipClass1',
                    singular: false,
                    mirrorRelationship: 'manyToMany',
                },
            ],
        });

        var ClassOwnsOtherClass = new ClassModel({
            className: 'ClassOwnsOtherClass',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ],
            relationships: [
                {
                    name: 'singular',
                    toClass: 'ClassOwnedByOtherClass',
                    singular: true,
                    owns: true,
                },
                {
                    name: 'nonSingular',
                    toClass: 'ClassOwnedByOtherClass',
                    singular: false,
                    owns: true,
                },
            ],
        });

        var ClassOwnedByOtherClass = new ClassModel({
            className: 'ClassOwnedByOtherClass',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ]
        });

        var TreeClass = new ClassModel({
            className: 'TreeClass',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ],
            relationships: [
                {
                    name: 'parent',
                    toClass: 'TreeClass',
                    mirrorRelationship: 'children',
                    singular: true,
                },
                {
                    name: 'children',
                    toClass: 'TreeClass',
                    mirrorRelationship: 'parent',
                    singular: false,
                },
            ],
        })

    }

    // CreatePrivileged Classes
    {
        // A class which is createPrivileged by another instance. If that instance has a boolean attribute 'allowed' set to 
        // true, then the instance of this class can be viewed. 
        var CreatePrivilegedSuperClass = new ClassModel({
            className: 'CreatePrivilegedSuperClass',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ],
            relationships: [
                {
                    name: 'createPrivilegedBy',
                    toClass: 'ClassPrivilegesCreatePrivilegedSuperClass',
                    singular: true,
                },
            ],
            privileges: {
                create: async function() {
                    const relatedInstance = await this.createPrivilegedBy;
                    if (!relatedInstance)
                        return false;
                    return relatedInstance.allowed;
                },
            }
        });

        // A class which is createPrivileged by it's own boolean attribute. If the boolean is set to true, and it passes the 
        // its super class'es create filter, then the instance will be returned by create filter.
        var CreatePrivilegedSubClassOfCreatePrivilegedSuperClass = new ClassModel({
            className: 'CreatePrivilegedSubClassOfCreatePrivilegedSuperClass',
            superClasses: [CreatePrivilegedSuperClass],
            attributes: [
                {
                    name: 'boolean',
                    type: Boolean
                },
            ],
            privileges: {
                create: function() { 
                    return this.boolean 
                },
            },
        });

        // A class which is createPrivileged by it's own string attribute. If the string matches 'createPrivileged', and it passes all
        // it's super classes createfilters, than an instance of this class will be returned by createFilter().
        var CreatePrivilegedDiscriminatedSuperClass = new ClassModel({
            className: 'CreatePrivilegedDiscriminatedSuperClass',
            superClasses: [CreatePrivilegedSubClassOfCreatePrivilegedSuperClass],
            attributes: [
                {
                    name: 'string',
                    type: String,
                },
            ],
            privileges: {
                create:  function() {
                    return this.string == 'createPrivileged';
                },
            }
        });

        // A class which is createPrivileged by it's own number attribute. If the number is greater than 0, and it passes all
        // it's super classes createfilters, than an instance of this class will be returned by createFilter().
        var CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass = new ClassModel({
            className: 'CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass',
            superClasses: [CreatePrivilegedDiscriminatedSuperClass],
            useSuperClassCollection: true,
            attributes: [
                {
                    name: 'number',
                    type: Number,
                },
            ],
            privileges: {
                create: function() {
                    return this.number > 0;
                }
            },
        });

        // A class which is used to secure another class. If an instance of this class has its 'allowed' attribute
        // set to true, than instances of CreatePrivilegedSuperClass related to this instance will pass the createFilter.
        var ClassPrivilegesCreatePrivilegedSuperClass = new ClassModel({
            className: 'ClassPrivilegesCreatePrivilegedSuperClass',
            attributes: [
                {
                    name: 'allowed',
                    type: Boolean,
                },
            ],
        });

        // A class which is createPrivileged by parameters passed into the createFilter method. If the two numbers add up to a 
        // positive number, and the boolean is true, than the instance will pass the create filter. 
        var CreatePrivilegedClassCreatePrivilegedByParameters = new ClassModel({
            className: 'CreatePrivilegedClassCreatePrivilegedByParameters',
            privileges: {
                create: parameters => {
                    return (parameters.numberA + parameters.numberB > 0) && parameters.boolean;
                },
            },
        });
    }

    // ReadPrivileged Classes
    {
        // A class which is readPrivileged by another instance. If that instance has a boolean attribute 'allowed' set to 
        // true, then the instance of this class can be viewed. 
        var ReadPrivilegedSuperClass = new ClassModel({
            className: 'ReadPrivilegedSuperClass',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ],
            relationships: [
                {
                    name: 'readPrivilegedBy',
                    toClass: 'ClassPrivilegesReadPrivilegedSuperClass',
                    singular: true,
                    required: true,
                },
            ],
            privileges: {
                read: async function() {
                    return (await this.readPrivilegedBy).allowed;
                },
            }
        });

        // A class which is readPrivileged by it's own boolean attribute. If the boolean is set to true, and it passes the 
        // its super class'es read filter, then the instance will be returned by read filter.
        var ReadPrivilegedSubClassOfReadPrivilegedSuperClass = new ClassModel({
            className: 'ReadPrivilegedSubClassOfReadPrivilegedSuperClass',
            superClasses: [ReadPrivilegedSuperClass],
            attributes: [
                {
                    name: 'boolean',
                    type: Boolean,
                },
            ],
            privileges: {
                read: function() {
                    return this.boolean;
                },
            },
        });

        // A class which is readPrivileged by it's own string attribute. If the string matches 'readPrivileged', and it passes all
        // it's super classes readfilters, than an instance of this class will be returned by readFilter().
        var ReadPrivilegedDiscriminatedSuperClass = new ClassModel({
            className: 'ReadPrivilegedDiscriminatedSuperClass',
            superClasses: [ReadPrivilegedSubClassOfReadPrivilegedSuperClass],
            attributes: [
                {
                    name: 'string',
                    type: String,
                },
            ],
            privileges: {
                read: function() {
                    return this.string == 'readPrivileged';
                }
            },
        });

        // A class which is readPrivileged by it's own number attribute. If the number is greater than 0, and it passes all
        // it's super classes readfilters, than an instance of this class will be returned by readFilter().
        var ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass = new ClassModel({
            className: 'ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass',
            superClasses: [ReadPrivilegedDiscriminatedSuperClass],
            useSuperClassCollection: true,
            attributes: [
                {
                    name: 'number',
                    type: Number,
                },
            ],
            privileges: {
                read: function() {
                    return this.number > 0;
                }
            }
        });

        // A class which is used to secure another class. If an instance of this class has its 'allowed' attribute
        // set to true, than instances of ReadPrivilegedSuperClass related to this instance will pass the readFilter.
        var ClassPrivilegesReadPrivilegedSuperClass = new ClassModel({
            className: 'ClassPrivilegesReadPrivilegedSuperClass',
            attributes: [
                {
                    name: 'allowed',
                    type: Boolean,
                },
            ],
        });

        // A class which is readPrivileged by parameters passed into the readFilter method. If the two numbers add up to a 
        // positive number, and the boolean is true, than the instance will pass the read filter. 
        var ReadPrivilegedClassReadPrivilegedByParameters = new ClassModel({
            className: 'ReadPrivilegedClassReadPrivilegedByParameters',
            privileges: {
                read: (readControlMethodParameters) => {
                    return (readControlMethodParameters.numberA + readControlMethodParameters.numberB > 0) && readControlMethodParameters.boolean;
                },
            },
        });

        var SingularRelationshipToReadPrivilegedClassReadPrivilegedByParameters = new ClassModel({
            className: 'SingularRelationshipToReadPrivilegedClassReadPrivilegedByParameters',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ],
            relationships: [
                {
                    name: 'singularRelationship',
                    toClass: 'ReadPrivilegedClassReadPrivilegedByParameters',
                    singular: true,
                },
            ],
        });

        var NonSingularRelationshipToReadPrivilegedClassReadPrivilegedByParameters = new ClassModel({
            className: 'NonSingularRelationshipToReadPrivilegedClassReadPrivilegedByParameters',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ],
            relationships: [
                {
                    name: 'nonSingularRelationship',
                    toClass: 'ReadPrivilegedClassReadPrivilegedByParameters',
                    singular: false,
                },
            ],
        });
    }

    // UpdatePrivileged Classes
    {
        // A class which is updatePrivileged by another instance. If that instance has a boolean attribute 'allowed' set to 
        // true, then the instance of this class can be viewed. 
        var UpdatePrivilegedSuperClass = new ClassModel({
            className: 'UpdatePrivilegedSuperClass',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ],
            relationships: [
                {
                    name: 'updatePrivilegedBy',
                    toClass: 'ClassPrivilegesUpdatePrivilegedSuperClass',
                    singular: true,
                },
            ],
            privileges: {
                update: async function() {
                    return (await this.updatePrivilegedBy).allowed;
                },
            }
        });

        // A class which is updatePrivileged by it's own boolean attribute. If the boolean is set to true, and it passes the 
        // its super class'es update filter, then the instance will be returned by update filter.
        var UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass = new ClassModel({
            className: 'UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass',
            superClasses: [UpdatePrivilegedSuperClass],
            attributes: [
                {
                    name: 'boolean',
                    type: Boolean
                },
            ],
            privileges: {
                update: function() {
                    return this.boolean;
                }
            },
        });

        // A class which is updatePrivileged by it's own string attribute. If the string matches 'updatePrivileged', and it passes all
        // it's super classes updatefilters, than an instance of this class will be returned by updateFilter().
        var UpdatePrivilegedDiscriminatedSuperClass = new ClassModel({
            className: 'UpdatePrivilegedDiscriminatedSuperClass',
            superClasses: [UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass],
            attributes: [
                {
                    name: 'string',
                    type: String,
                },
            ],
            privileges: {
                update: function() {
                    return this.string === 'updatePrivileged';
                }
            }
        });

        // A class which is updatePrivileged by it's own number attribute. If the number is greater than 0, and it passes all
        // it's super classes updatefilters, than an instance of this class will be returned by updateFilter().
        var UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass = new ClassModel({
            className: 'UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass',
            superClasses: [UpdatePrivilegedDiscriminatedSuperClass],
            useSuperClassCollection: true,
            attributes: [
                {
                    name: 'number',
                    type: Number,
                },
            ],
            privileges: {
                update: function() {
                    return this.number > 0;
                },
            },
        });

        // A class which is used to secure another class. If an instance of this class has its 'allowed' attribute
        // set to true, than instances of UpdatePrivilegedSuperClass related to this instance will pass the updateFilter.
        var ClassPrivilegesUpdatePrivilegedSuperClass = new ClassModel({
            className: 'ClassPrivilegesUpdatePrivilegedSuperClass',
            attributes: [
                {
                    name: 'allowed',
                    type: Boolean,
                },
            ],
        });

        // A class which is updatePrivileged by parameters passed into the updateFilter method. If the two numbers add up to a 
        // positive number, and the boolean is true, than the instance will pass the update filter. 
        var UpdatePrivilegedClassUpdatePrivilegedByParameters = new ClassModel({
            className: 'UpdatePrivilegedClassUpdatePrivilegedByParameters',
            attributes: [
                {
                    name: 'name',
                    type: String,
                }
            ],
            privileges: {
                update: (updateControlMethodParameters) => {
                    return (updateControlMethodParameters.numberA + updateControlMethodParameters.numberB > 0) && updateControlMethodParameters.boolean;
                },
            },
        });
    }

    // DeletePrivileged Classes
    {
        // A class which is deletePrivileged by another instance. If that instance has a boolean attribute 'allowed' set to 
        // true, then the instance of this class can be viewed. 
        var DeletePrivilegedSuperClass = new ClassModel({
            className: 'DeletePrivilegedSuperClass',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
            ],
            relationships: [
                {
                    name: 'deletePrivilegedBy',
                    toClass: 'ClassPrivilegesDeletePrivilegedSuperClass',
                    singular: true,
                },
            ],
            privileges: {
                delete: async function() {
                    return (await this.deletePrivilegedBy).allowed;
                },
            }
        });

        // A class which is deletePrivileged by it's own boolean attribute. If the boolean is set to true, and it passes the 
        // its super class'es delete filter, then the instance will be returned by delete filter.
        var DeletePrivilegedSubClassOfDeletePrivilegedSuperClass = new ClassModel({
            className: 'DeletePrivilegedSubClassOfDeletePrivilegedSuperClass',
            superClasses: [DeletePrivilegedSuperClass],
            attributes: [
                {
                    name: 'boolean',
                    type: Boolean
                },
            ],
            privileges: {
                delete: function() {
                    return this.boolean;
                },
            },
        });

        // A class which is deletePrivileged by it's own string attribute. If the string matches 'deletePrivileged', and it passes all
        // it's super classes deletefilters, than an instance of this class will be returned by deleteFilter().
        var DeletePrivilegedDiscriminatedSuperClass = new ClassModel({
            className: 'DeletePrivilegedDiscriminatedSuperClass',
            superClasses: [DeletePrivilegedSubClassOfDeletePrivilegedSuperClass],
            attributes: [
                {
                    name: 'string',
                    type: String,
                },
            ],
            privileges: {
                delete: function() {
                    return this.string === 'deletePrivileged';
                },
            }
        });

        // A class which is deletePrivileged by it's own number attribute. If the number is greater than 0, and it passes all
        // it's super classes deletefilters, than an instance of this class will be returned by deleteFilter().
        var DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass = new ClassModel({
            className: 'DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass',
            superClasses: [DeletePrivilegedDiscriminatedSuperClass],
            useSuperClassCollection: true,
            attributes: [
                {
                    name: 'number',
                    type: Number,
                },
            ],
            privileges: {
                delete: function() {
                    return this.number > 0;
                },
            },
        });

        // A class which is used to secure another class. If an instance of this class has its 'allowed' attribute
        // set to true, than instances of DeletePrivilegedSuperClass related to this instance will pass the deleteFilter.
        var ClassPrivilegesDeletePrivilegedSuperClass = new ClassModel({
            className: 'ClassPrivilegesDeletePrivilegedSuperClass',
            attributes: [
                {
                    name: 'allowed',
                    type: Boolean,
                },
            ],
        });

        // A class which is deletePrivileged by parameters passed into the deleteFilter method. If the two numbers add up to a 
        // positive number, and the boolean is true, than the instance will pass the delete filter. 
        var DeletePrivilegedClassDeletePrivilegedByParameters = new ClassModel({
            className: 'DeletePrivilegedClassDeletePrivilegedByParameters',
            privileges: {
                delete: parameters => {
                    return (parameters.numberA + parameters.numberB > 0) && parameters.boolean;
                },
            },
        });
    }

    // SensitivePrivileged Classes
    {
        // A class which is sensitivePrivileged by another instance. If that instance has a boolean attribute 'allowed' set to 
        // true, then the instance of this class can be viewed. 
        var SensitivePrivilegedSuperClass = new ClassModel({
            className: 'SensitivePrivilegedSuperClass',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
                {
                    name: 'SSN',
                    type: String,
                    sensitive: true,
                },
            ],
            relationships: [
                {
                    name: 'sensitivePrivilegedBy',
                    toClass: 'ClassPrivilegesSensitivePrivilegedSuperClass',
                    singular: true,
                },
            ],
            privileges: {
                sensitive: async function() {
                    const controlledBy = await this.sensitivePrivilegedBy;
                    return controlledBy !== null ? controlledBy.allowed : false;
                },
            }
        });

        // A class which is sensitivePrivileged by it's own boolean attribute. If the boolean is set to true, and it passes the 
        // its super class'es sensitive filter, then the instance will be returned by sensitive filter.
        var SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass = new ClassModel({
            className: 'SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass',
            superClasses: [SensitivePrivilegedSuperClass],
            attributes: [
                {
                    name: 'boolean',
                    type: Boolean,
                },
            ],
            privileges: {
                sensitive: function() {
                    return this.boolean;
                },
            },
        });

        // A class which is sensitivePrivileged by it's own string attribute. If the string matches 'sensitivePrivileged', and it passes all
        // it's super classes sensitivefilters, than an instance of this class will be returned by sensitiveFilter().
        var SensitivePrivilegedDiscriminatedSuperClass = new ClassModel({
            className: 'SensitivePrivilegedDiscriminatedSuperClass',
            superClasses: [SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass],
            attributes: [
                {
                    name: 'string',
                    type: String,
                },
            ],
            privileges: {
                sensitive: function() {
                    return this.string == 'sensitivePrivileged';
                }
            },
        });

        // A class which is sensitivePrivileged by it's own number attribute. If the number is greater than 0, and it passes all
        // it's super classes sensitivefilters, than an instance of this class will be returned by sensitiveFilter().
        var SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass = new ClassModel({
            className: 'SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass',
            superClasses: [SensitivePrivilegedDiscriminatedSuperClass],
            useSuperClassCollection: true,
            attributes: [
                {
                    name: 'number',
                    type: Number,
                },
                {
                    name: 'DOB',
                    type: Date,
                    sensitive: true,
                }
            ],
            privileges: {
                sensitive: function() {
                    return this.number > 0;
                }
            }
        });

        // A class which is used to secure another class. If an instance of this class has its 'allowed' attribute
        // set to true, than instances of SensitivePrivilegedSuperClass related to this instance will pass the sensitiveFilter.
        var ClassPrivilegesSensitivePrivilegedSuperClass = new ClassModel({
            className: 'ClassPrivilegesSensitivePrivilegedSuperClass',
            attributes: [
                {
                    name: 'allowed',
                    type: Boolean,
                },
            ],
        });

        // A class which is sensitivePrivileged by parameters passed into the sensitiveFilter method. If the two numbers add up to a 
        // positive number, and the boolean is true, than the instance will pass the sensitive filter. 
        var SensitivePrivilegedClassSensitivePrivilegedByParameters = new ClassModel({
            className: 'SensitivePrivilegedClassSensitivePrivilegedByParameters',
            attributes: [
                {
                    name: 'SSN',
                    type: String,
                    sensitive: true,
                },
                {
                    name: 'DOB',
                    type: Date,
                    sensitive: true,
                }
            ],
            privileges: {
                sensitive: (parameters) => {
                    return (parameters.numberA + parameters.numberB > 0) && parameters.boolean;
                },
            },
        });
    }

    // Validation Classes
    {

        var ValidationSuperClass = new ClassModel({
            className: 'ValidationSuperClass',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
                {
                    name: 'number',
                    type: Number,
                },
            ],
            validations: [
                function() {
                    if (this.number <= 0)
                        throw new NoommanValidationError('Number must be greater than 0.', ['number']);
                },
                function() {
                    if (this.name === '')
                        throw new NoommanValidationError('Name cannot be empty.', ['name']);
                },
            ],
        });

        var SubClassOfValidationSuperClass = new ClassModel({
            className: 'SubClassOfValidationSuperClass',
            superClasses: [ValidationSuperClass],
            validations: [
                function() {
                    if (this.number > 10) {
                        throw new NoommanValidationError('Number must be less than or equal to 10.', ['number']);
                    }
                }
            ]
        });

        var ValidationDiscriminatedSuperClass = new ClassModel({
            className: 'ValidationDiscriminatedSuperClass',
            superClasses: [ValidationSuperClass],
            attributes: [
                {
                    name: 'boolean',
                    type: Boolean,
                    required: true,
                }
            ],
            validations: [
                function() {
                    if (!this.boolean) {
                        throw new NoommanValidationError('Boolean must be true.', ['boolean']);
                    }
                }
            ]
        });

        var SubClassOfValidationDiscriminatedSuperClass = new ClassModel({
            className: 'SubClassOfValidationDiscriminatedSuperClass',
            superClasses: [ValidationDiscriminatedSuperClass],
            useSuperClassCollection: true,
            attributes: [
                {
                    name: 'boolean2',
                    type: Boolean,
                    required: true,
                }
            ],
            validations: [
                function() {
                    if (!this.boolean2) {
                        throw new NoommanValidationError('Boolean2 must be true.', ['boolean2']);
                    }
                }
            ],
        });

        var AsyncValidationClass = new ClassModel({
            className: 'AsyncValidationClass',
            relationships: [
                {
                    name: 'relatedInstance',
                    toClass: 'RelatedValidationClass',
                    singular: true,
                }
            ],
            validations: [
                async function() {
                    const related = await this.walk('relatedInstance');
                    if (related === null || !related.valid)
                        throw new NoommanValidationError('Related instance is not valid.', ['relatedInstance']);
                },
            ],
        });

        var RelatedValidationClass = new ClassModel({
            className: 'RelatedValidationClass',
            attributes: [
                {
                    name: 'valid',
                    type: Boolean,
                    required: true,
                },
            ],
        });
    }

    // Auditable Classes
    {
        var AuditableSuperClass = new ClassModel({
            className: 'AuditableSuperClass',
            superClasses: [AllAttributesAndRelationshipsClass],
            auditable: true,
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
                {
                    name: 'updatedAt',
                    type: Date,
                },
            ],
        });

        var AuditableSubClass = new ClassModel({
            className: 'AuditableSubClass',
            superClasses: [AuditableSuperClass],
        });

        var AuditableDiscriminatedSubClass = new ClassModel({
            className: 'AuditableDiscriminatedSubClass',
            superClasses: [AuditableSuperClass],
            useSuperClassCollection: true,
        });
    }

    // Custom Static Method Classes
    {
        var StaticMethodClass = new ClassModel({
            className: 'StaticMethodClass',
            staticMethods: {
                sayHello: () => 'hello',
                sayClassName: function() {
                    return this.className;
                },
                customToString: function() {
                    return this.toString();
                },
                isInstanceOfThisClassCustom: function(instance) {
                    return this.isInstanceOfThisClass(instance);
                },
                findByIdCustom: async function(id) {
                    return this.findById(id);
                },
            }
        });
    }

    // Custom Non-Static Method Classes
    {
        var NonStaticMethodsClass = new ClassModel({
            className: 'NonStaticMethodsClass',
            attributes: [
                {
                    name: 'name',
                    type: String,
                },
                {
                    name: 'age',
                    type: Number,
                }
            ],
            relationships: [
                {
                    name: 'siblings',
                    singular: false,
                    toClass: 'NonStaticMethodsClass',
                    mirrorRelationship: 'siblings',
                }
            ],
            nonStaticMethods: {
                oldestSibling: async function() {
                    const siblings = await this.siblings;
                    let oldestSibling = this;
                    for (const sibling of siblings) {
                        if (sibling.age > oldestSibling.age) {
                            oldestSibling = sibling;
                        }
                    }
                    return oldestSibling.name;
                }
            }
        });
    }
}

module.exports = {
    CompareClass1,
    CompareClass2,
    TestClassWithNumber,
    TestClassWithBoolean,
    TestClassWithAllSimpleFields,
    AllAttributesAndRelationshipsClass,
    AbstractClass,
    UniqueNumberClass,
    UniqueNumberSubClass,
    UniqueNumberDiscriminatedSubSubClass,
    AllFieldsRequiredClass,
    AllFieldsMutexClass,
    AllFieldsInRequiredGroupClass,
    MutexClassA,
    MutexClassB,
    MutexClassC,
    SuperClass,
    AbstractSuperClass,
    DiscriminatedSuperClass, 
    AbstractDiscriminatedSuperClass,
    SubClassOfSuperClass,
    SubClassOfAbstractSuperClass,
    AbstractSubClassOfSuperClass,
    SubClassOfMultipleSuperClasses,
    SubClassOfDiscriminatedSuperClass,
    DiscriminatedSubClassOfSuperClass,
    SubClassOfDiscriminatedSubClassOfSuperClass,
    SubClassOfSubClassOfSuperClass,
    SubClassOfAbstractSubClassOfSuperClass,
    SingularRelationshipClass,
    NonSingularRelationshipClass,
    SubClassOfSingularRelationshipClass,
    SubClassOfNonSingularRelationshipClass,
    TwoWayRelationshipClass1,
    TwoWayRelationshipClass2,
    TreeClass,
    ClassOwnsOtherClass,
    ClassOwnedByOtherClass,
    CreatePrivilegedSuperClass, 
    CreatePrivilegedSubClassOfCreatePrivilegedSuperClass,
    CreatePrivilegedDiscriminatedSuperClass,
    CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass,
    ClassPrivilegesCreatePrivilegedSuperClass,
    CreatePrivilegedClassCreatePrivilegedByParameters,
    ReadPrivilegedSuperClass,
    ReadPrivilegedSubClassOfReadPrivilegedSuperClass,
    ReadPrivilegedDiscriminatedSuperClass,
    ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass,
    ClassPrivilegesReadPrivilegedSuperClass,
    ReadPrivilegedClassReadPrivilegedByParameters,
    SingularRelationshipToReadPrivilegedClassReadPrivilegedByParameters,
    NonSingularRelationshipToReadPrivilegedClassReadPrivilegedByParameters,
    UpdatePrivilegedSuperClass, 
    UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass,
    UpdatePrivilegedDiscriminatedSuperClass,
    UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass,
    ClassPrivilegesUpdatePrivilegedSuperClass,
    UpdatePrivilegedClassUpdatePrivilegedByParameters,
    DeletePrivilegedSuperClass, 
    DeletePrivilegedSubClassOfDeletePrivilegedSuperClass,
    DeletePrivilegedDiscriminatedSuperClass,
    DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass,
    SensitivePrivilegedSuperClass,
    SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass,
    SensitivePrivilegedDiscriminatedSuperClass,
    SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass,
    ClassPrivilegesSensitivePrivilegedSuperClass,
    SensitivePrivilegedClassSensitivePrivilegedByParameters,
    ClassPrivilegesDeletePrivilegedSuperClass,
    DeletePrivilegedClassDeletePrivilegedByParameters,
    ValidationSuperClass,
    SubClassOfValidationSuperClass,
    ValidationDiscriminatedSuperClass,
    SubClassOfValidationDiscriminatedSuperClass,
    AsyncValidationClass,
    RelatedValidationClass,
    AuditableSuperClass,
    AuditableSubClass,
    AuditableDiscriminatedSubClass,
    StaticMethodClass,
    NonStaticMethodsClass,
}