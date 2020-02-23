const ClassModel = require('../noomman/ClassModel');
const InstanceSet = require('../noomman/InstanceSet');
const Instance = require('../noomman/Instance');
const database = require('../noomman/database');
const TestClassModels = require('./helpers/TestClassModels');
const TestingFunctions = require('./helpers/TestingFunctions');
const DatabaseConnection = require('./helpers/DatabaseConnection');
const testForError = TestingFunctions.testForError;
const testForErrorAsync = TestingFunctions.testForErrorAsync;
const arraysEqual = TestingFunctions.arraysEqual;

// Load all TestClassModels +
{
    // Compare Classes
    var CompareClass1 = TestClassModels.CompareClass1;
    var CompareClass2 = TestClassModels.CompareClass2;

    // Simple Classes
    var UniqueNumberClass = TestClassModels.UniqueNumberClass;
    var UniqueNumberSubClass = TestClassModels.UniqueNumberSubClass;
    var UniqueNumberDiscriminatedSubSubClass = TestClassModels.UniqueNumberDiscriminatedSubSubClass;

    // Validation Classes
    var AllFieldsRequiredClass = TestClassModels.AllFieldsRequiredClass;
    var AllFieldsMutexClass = TestClassModels.AllFieldsMutexClass;
    var AllFieldsInRequiredGroupClass = TestClassModels.AllFieldsInRequiredGroupClass;
    var MutexClassA = TestClassModels.MutexClassA;
    var MutexClassB = TestClassModels.MutexClassB;
    var MutexClassC = TestClassModels.MutexClassC;

    // Inheritance Classes
    var SuperClass = TestClassModels.SuperClass;
    var AbstractSuperClass = TestClassModels.AbstractSuperClass;
    var DiscriminatedSuperClass = TestClassModels.DiscriminatedSuperClass;
    var AbstractDiscriminatedSuperClass = TestClassModels.AbstractDiscriminatedSuperClass;
    var SubClassOfSuperClass = TestClassModels.SubClassOfSuperClass;
    var SubClassOfAbstractSuperClass = TestClassModels.SubClassOfAbstractSuperClass;
    var AbstractSubClassOfSuperClass = TestClassModels.AbstractSubClassOfSuperClass;
    var SubClassOfMultipleSuperClasses = TestClassModels.SubClassOfMultipleSuperClasses;
    var SubClassOfDiscriminatedSuperClass = TestClassModels.SubClassOfDiscriminatedSuperClass;
    var DiscriminatedSubClassOfSuperClass = TestClassModels.DiscriminatedSubClassOfSuperClass;
    var SubClassOfDiscriminatedSubClassOfSuperClass = TestClassModels.SubClassOfDiscriminatedSubClassOfSuperClass;
    var SubClassOfSubClassOfSuperClass = TestClassModels.SubClassOfSubClassOfSuperClass;
    var SubClassOfAbstractSubClassOfSuperClass = TestClassModels.SubClassOfAbstractSubClassOfSuperClass;

    // Relationship Classes
    var SingularRelationshipClass = TestClassModels.SingularRelationshipClass;
    var NonSingularRelationshipClass = TestClassModels.NonSingularRelationshipClass;
    var SubClassOfSingularRelationshipClass = TestClassModels.SubClassOfSingularRelationshipClass;
    var SubClassOfNonSingularRelationshipClass = TestClassModels.SubClassOfNonSingularRelationshipClass;
    var TwoWayRelationshipClass1 = TestClassModels.TwoWayRelationshipClass1;
    var TwoWayRelationshipClass2 = TestClassModels.TwoWayRelationshipClass2;

    // CreatePrivileged Classes
    var UnPrivilegedSuperClass = TestClassModels.UnPrivilegedSuperClass
    var CreatePrivilegedSuperClass = TestClassModels.CreatePrivilegedSuperClass;
    var CreatePrivilegedSubClassOfCreatePrivilegedSuperClass = TestClassModels.CreatePrivilegedSubClassOfCreatePrivilegedSuperClass;
    var CreatePrivilegedDiscriminatedSuperClass = TestClassModels.CreatePrivilegedDiscriminatedSuperClass;
    var CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass = TestClassModels.CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass;
    var ClassPrivilegesCreatePrivilegedSuperClass = TestClassModels.ClassPrivilegesCreatePrivilegedSuperClass;
    var CreatePrivilegedClassCreatePrivilegedByParameters = TestClassModels.CreatePrivilegedClassCreatePrivilegedByParameters;

    // ReadPrivileged Classes
    var ReadPrivilegedSuperClass = TestClassModels.ReadPrivilegedSuperClass;
    var ReadPrivilegedSubClassOfReadPrivilegedSuperClass = TestClassModels.ReadPrivilegedSubClassOfReadPrivilegedSuperClass;
    var ReadPrivilegedDiscriminatedSuperClass = TestClassModels.ReadPrivilegedDiscriminatedSuperClass;
    var ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass = TestClassModels.ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass;
    var ClassPrivilegesReadPrivilegedSuperClass = TestClassModels.ClassPrivilegesReadPrivilegedSuperClass;
    var ReadPrivilegedClassReadPrivilegedByParameters = TestClassModels.ReadPrivilegedClassReadPrivilegedByParameters;

    // UpdatePrivileged Classes
    var UpdatePrivilegedSuperClass = TestClassModels.UpdatePrivilegedSuperClass;
    var UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass = TestClassModels.UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass;
    var UpdatePrivilegedDiscriminatedSuperClass = TestClassModels.UpdatePrivilegedDiscriminatedSuperClass;
    var UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass = TestClassModels.UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass;
    var ClassPrivilegesUpdatePrivilegedSuperClass = TestClassModels.ClassPrivilegesUpdatePrivilegedSuperClass;
    var UpdatePrivilegedClassUpdatePrivilegedByParameters = TestClassModels.UpdatePrivilegedClassUpdatePrivilegedByParameters;

    // DeletePrivileged Classes
    var DeletePrivilegedSuperClass = TestClassModels.DeletePrivilegedSuperClass;
    var DeletePrivilegedSubClassOfDeletePrivilegedSuperClass = TestClassModels.DeletePrivilegedSubClassOfDeletePrivilegedSuperClass;
    var DeletePrivilegedDiscriminatedSuperClass = TestClassModels.DeletePrivilegedDiscriminatedSuperClass;
    var DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass = TestClassModels.DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass;
    var ClassPrivilegesDeletePrivilegedSuperClass = TestClassModels.ClassPrivilegesDeletePrivilegedSuperClass;
    var DeletePrivilegedClassDeletePrivilegedByParameters = TestClassModels.DeletePrivilegedClassDeletePrivilegedByParameters;

    // SensitivePrivileged Classes
    var SensitivePrivilegedSuperClass = TestClassModels.SensitivePrivilegedSuperClass;
    var SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass = TestClassModels.SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass;
    var SensitivePrivilegedDiscriminatedSuperClass = TestClassModels.SensitivePrivilegedDiscriminatedSuperClass;
    var SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass = TestClassModels.SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass;
    var ClassPrivilegesSensitivePrivilegedSuperClass = TestClassModels.ClassPrivilegesSensitivePrivilegedSuperClass;
    var SensitivePrivilegedClassSensitivePrivilegedByParameters = TestClassModels.SensitivePrivilegedClassSensitivePrivilegedByParameters;

    // Validation Classes
    
    var ValidationSuperClass = TestClassModels.ValidationSuperClass;
    var SubClassOfValidationSuperClass = TestClassModels.SubClassOfValidationSuperClass;
    var ValidationDiscriminatedSuperClass = TestClassModels.ValidationDiscriminatedSuperClass;
    var SubClassOfValidationDiscriminatedSuperClass = TestClassModels.SubClassOfValidationDiscriminatedSuperClass;
    var AsyncValidationClass = TestClassModels.AsyncValidationClass;
    var RelatedValidationClass = TestClassModels.RelatedValidationClass;

    // Auditable Classes
    
    var AuditableSuperClass = TestClassModels.AuditableSuperClass;
    var AuditableSubClass = TestClassModels.AuditableSubClass
    var AuditableDiscriminatedSubClass = TestClassModels.AuditableDiscriminatedSubClass;

    // Static Methods Classes
    var StaticMethodClass = TestClassModels.StaticMethodClass;
}

describe('Class Model Tests', () => {

    before(async () => {
        await database.connect(DatabaseConnection.mongo_uri, DatabaseConnection.testDatabase);
        ClassModel.finalize();
    });

    after(async () => {
        await database.close();
    });

    describe('Class Model Constructor', () => {

        describe('Required constructor parameters', () => {

            it('ClassName is required.', () => { 
                testForError('ClassModel.constructor()', 'className is required.', () => {
                    new ClassModel({});
                });
            });
        });

        describe('Privileges Validations', () => {

            it('createPrivilege must be a function if provided.', () => {
                const expectedErrorMessage = 'If a createPrivilege method is provided, it must be a function.';
                testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'BadCreateControlMethod',
                        privileges: {
                            create: true,
                        }
                    });
                });
            });

            it('readPrivilege must be a function if provided.', () => {
                const expectedErrorMessage = 'If a readPrivilege method is provided, it must be a function.';
                testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'BadReadControlMethod',
                        privileges: {
                            read: true,
                        }
                    });
                });
            });

            it('updatePrivilege must be a function if provided.', () => {
                const expectedErrorMessage = 'If a updatePrivilege method is provided, it must be a function.';
                testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'BadUpdateControlMethod',
                        privileges: {
                            update: true,
                        }
                    });
                });
            });

            it('deletePrivilege must be a function if provided.', () => {
                const expectedErrorMessage = 'If a deletePrivilege method is provided, it must be a function.';
                testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'BadDeleteControlMethod',
                        privileges: {
                            delete: true,
                        }
                    });
                });
            });

            it('sensitivePrivilege must be a function if provided.', () => {
                const expectedErrorMessage = 'If a sensitivePrivilege method is provided, it must be a function.';
                testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'BadSensitiveControlMethod',
                        privileges: {
                            sensitive: true,
                        }
                    });
                });
            });

            it('If at least one attribute is marked sensitive, a sensitivePrivilege method must be provided.', () => {
                const expectedErrorMessage = 'At least one attribute is marked sensitive, but no sensitivePrivilege method is provided.';
                testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'NoSensitiveControlMethod',
                        attributes: [
                            {
                                name: 'Social',
                                type: String,
                                sensitive: true,
                            }
                        ]
                    });
                });
            });

            it('If a sensitivePrivilege method is provided, at least one attribute must be marked sensitive.', () => {
                const expectedErrorMessage = 'A sensitivePrivilege method was provided, but no attributes are marked sensitive.';
                testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'NoSensitiveAttributes',
                        privileges: {
                            sensitive: () => true,
                        }
                    });
                });
            });

        });

        describe('Validation Requirements', () => {

            it('If validations are provied, it must be an Array.', () => {
                const expectedErrorMessage = 'If validations are provided, it must be an Array.';

                testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'ValidationsClass1',
                        validations: {},
                    });
                });
            });

            it('If auditable is provided, it must be a boolean.', () => {
                testForError('ClassModel.constructor()', 'If auditable is provided, it must be a boolean.', () => {
                    new ClassModel({
                        className: 'BadAuditableClass',
                        auditable: 0,
                    });
                });
            });

        });

        describe('Inheritence Requirements', () => {

            it('If superClasses is set, it must be an Array.', () => {
                testForError('ClassModel.constructor()', 'If superClasses is set, it must be an Array.', () => {
                    new ClassModel({
                        className: 'SubClassModel',
                        superClasses: SuperClass
                    });
                });
            });
    
            it('If superClasses is set, it cannot be an empty Array.', () => {
                testForError('ClassModel.constructor()', 'If superClasses is set, it cannot be an empty Array.', () => {
                    new ClassModel({
                        className: 'SubClassModel',
                        superClasses: []
                    });
                });
            });
    
            it('If useSuperClassCollection is set, superClasses have only one class.', () => {
                testForError('ClassModel.constructor()', 'If useSuperClassCollection is true, a single super class must be provided.', () => {
                    new ClassModel({
                        className: 'SubClassModel',
                        superClasses: [SuperClass, DiscriminatedSuperClass],
                        useSuperClassCollection: true,
                    })
                });
            });
    
            it('If useSuperClassCollection is set, superClasses must be given.', () => {
                testForError('ClassModel.constructor()', 'If useSuperClassCollection is true, a single super class must be provided.', () => {
                    new ClassModel({
                        className: 'SubClassModel',
                        useSuperClassCollection: true,
                    })
                });
            });
    
            it('A sub class with useSuperClassCollection set to true cannot be abstract.', () => {
                testForError('ClassModel.constructor()', 'If useSuperClassCollection is true, abstract cannot be true.', () => {
                    new ClassModel({
                        className: 'SubClassModel',
                        abstract: true,
                        superClasses: [DiscriminatedSuperClass],
                        useSuperClassCollection: true,
                    });
                });
            });  
    
            it('A sub class of a class using super class collection cannot have a subclass.', () => {
                testForError('ClassModel.constructor()', 'You cannot create a sub class of a class which has useSuperClassCollection set to true.', () => {
                    new ClassModel({
                        className: 'SubClassModel',
                        superClasses: [SubClassOfDiscriminatedSuperClass],
                    });
                });
            });    
    
            it('If a sub class is created, it is pushed to the super class\'s "subClasses" array.', () => {
                if (SuperClass.subClasses.length == 0)
                    throw new Error('SuperClass.subClasses array has no entries in it.');
                if (!SuperClass.subClasses.includes(SubClassOfSuperClass)) 
                    throw new Error('SuperClass.subClasses does not contain sub class.');
                
                if (DiscriminatedSuperClass.subClasses.length == 0)
                    throw new Error('DiscriminatedSuperClass.subClasses array has no entries in it.');
                if (!DiscriminatedSuperClass.subClasses.includes(SubClassOfDiscriminatedSuperClass)) 
                    throw new Error('DiscriminatedSuperClass.subClasses does not contain sub class.');
    
                return true;
            });
    
            it('A subclass has all the same attributes as it\'s super class.', () => {
                for (const attribute of SuperClass.attributes) {
                    if (!SubClassOfSuperClass.attributes.map(attribute => attribute.name).includes(attribute.name)) {
                        throw new Error('Sub Sub Class is missing the attribute ' + attribute.name);
                    }
                }
                if (!SubClassOfSuperClass.attributes.map(attribute => attribute.name).includes('subNumber')) {
                    throw new Error('Sub Sub Class is missing it\'s own subSubNumber attribute.');
                }

                if (!SubClassOfSuperClass.attributes.map(attribute => attribute.name).includes('subBoolean')) {
                    throw new Error('Sub Sub Class is missing it\'s own subSubBoolean attribute.');
                }
            });
    
            it('A subclass schema is the combination of its direct schema with the schema the whole chain of Super Classes.', () => {
                for (const attribute of SuperClass.attributes) {
                    if (!SubClassOfSubClassOfSuperClass.attributes.map(attribute => attribute.name).includes(attribute.name)) {
                        throw new Error('Class is missing the attribute ' + attribute.name);
                    }
                }

                for (const attribute of SubClassOfSuperClass.attributes) {
                    if (!SubClassOfSubClassOfSuperClass.attributes.map(attribute => attribute.name).includes(attribute.name)) {
                        throw new Error('Class is missing the attribute ' + attribute.name);
                    }
                }

                if (!SubClassOfSubClassOfSuperClass.attributes.map(attribute => attribute.name).includes('subSubNumber')) {
                    throw new Error('Class is missing it\'s own subSubNumber attribute.');
                }

                if (!SubClassOfSubClassOfSuperClass.attributes.map(attribute => attribute.name).includes('subSubBoolean')) {
                    throw new Error('Class is missing it\'s own subSubBoolean attribute.');
                }
            });
    
            it('A subclass schema is the combination of its direct schema with the schema of each of its super classes.', () => {
                for (const attribute of SuperClass.attributes) {
                    if (!SubClassOfMultipleSuperClasses.attributes.map(attribute => attribute.name).includes(attribute.name)) {
                        throw new Error('Class is missing the attribute ' + attribute.name);
                    }
                }
                for (const attribute of AbstractSuperClass.attributes) {
                    if (!SubClassOfMultipleSuperClasses.attributes.map(attribute => attribute.name).includes(attribute.name)) {
                        throw new Error('Class is missing the attribute ' + attribute.name);
                    }
                }
                
                if (!SubClassOfMultipleSuperClasses.attributes.map(attribute => attribute.name).includes('subNumber')) {
                    throw new Error('Class is missing it\'s own subNumber attribute.');
                }

                if (!SubClassOfMultipleSuperClasses.attributes.map(attribute => attribute.name).includes('subBoolean')) {
                    throw new Error('Class is missing it\'s own subBoolean attribute.');
                }
            });
    
            it('A subclass schema is the combination of its direct schema with the schema of each of its discrimintated super classes.', () => {
                for (const attribute of SuperClass.attributes) {
                    if (!SubClassOfDiscriminatedSubClassOfSuperClass.attributes.map(attribute => attribute.name).includes(attribute.name)) {
                        throw new Error('Sub Sub Class is missing the attribute ' + attribute.name);
                    }
                }
                for (const attribute of DiscriminatedSubClassOfSuperClass.attributes) {
                    if (!SubClassOfDiscriminatedSubClassOfSuperClass.attributes.map(attribute => attribute.name).includes(attribute.name)) {
                        throw new Error('Sub Sub Class is missing the attribute ' + attribute.name);
                    }
                }
                
                if (!SubClassOfDiscriminatedSubClassOfSuperClass.attributes.map(attribute => attribute.name).includes('subDiscriminatedNumber')) {
                    throw new Error('Class is missing it\'s own subDiscriminatedNumber attribute.');
                }

                if (!SubClassOfDiscriminatedSubClassOfSuperClass.attributes.map(attribute => attribute.name).includes('subDiscriminatedBoolean')) {
                    throw new Error('Class is missing it\'s own subDiscriminatedBoolean attribute.');
                }
            });
    
            it('A class cannot be a sub class of a sub class of a discriminated class.', () => {
                testForError('ClassModel.constructor', 'You cannot create a sub class of a class which has useSuperClassCollection set to true.', () => {
                    new ClassModel({
                        className: 'SubClassModel',
                        superClasses: [SubClassOfDiscriminatedSuperClass]
                    });

                });
            });

            it('A sub class of an auditable class cannot have auditable set to false.', () => {
                testForError('ClassModel.constructor()', 'You cannot create a non-auditable sub class of an auditable super class.', () => {
                    new ClassModel({
                        className: 'BadAuditableSubClass',
                        superClasses: [AuditableSuperClass],
                        auditable: false,
                    })
                });
            });

            it('A sub class inherits indices from its parents.', () => {
                const IndexSuperClass = new ClassModel({
                    className: 'IndexSuperClass',
                    indices: ['name'],
                    attributes: [
                        {
                            name: 'name',
                            type: String,
                        }
                    ]
                });

                const IndexSubClass = new ClassModel({
                    className: 'IndexSubClass',
                    superClasses: [IndexSuperClass],
                });

                if (!IndexSubClass.indices.includes('name')) {
                    throw new Error('Sub class did not inherit the index.');
                }
            });
    
            it.skip('An abstract, non-discriminated class should have no collection.', () => {
                if (AbstractSuperClass.collection);
                    throw new Error('An abstract class should not have a collection.');
            });

        });

        describe('Duplicate Attribute and RelationshipNames Validations', () => {

            it('Error thrown if schema contains two attributes with the same name.', () => {
                const expectedErrorMessage = 'Error creating ClassModel DuplicateAttributeNames. Multiple attributes or relationships with the same name "name".';

                testForError('new ClassModel()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'DuplicateAttributeNames',
                        attributes: [
                            {
                                name: 'name',
                                type: String,
                            },
                            {
                                name: 'name',
                                type: Number,
                            },
                        ]
                    })
                });
            });

            it('Error thrown if schema contains two relationships with the same name.', () => {
                const expectedErrorMessage = 'Error creating ClassModel DuplicateRelationshipNames. Multiple attributes or relationships with the same name "relatedInstance".';

                testForError('new ClassModel()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'DuplicateRelationshipNames',
                        relationships: [
                            {
                                name: 'relatedInstance',
                                toClass: 'CompareClass1',
                                singular: true,
                            },
                            {
                                name: 'relatedInstance',
                                toClass: 'CompareClass1',
                                singular: true,
                            },
                        ]
                    })
                });
            });

            it('Error thrown if schema contains an attribute and a relationship with the same name.', () => {
                const expectedErrorMessage = 'Error creating ClassModel DuplicateAttributeAndRelationshipNames. Multiple attributes or relationships with the same name "relatedInstance".';

                testForError('new ClassModel()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'DuplicateAttributeAndRelationshipNames',
                        attributes: [
                            {
                                name: 'relatedInstance',
                                type: String,
                            },
                        ],
                        relationships: [
                            {
                                name: 'relatedInstance',
                                toClass: 'CompareClass1',
                                singular: true,
                            },
                        ]
                    })
                });
            });

            it('Error thrown if schema contains an attribute with the same name as a super ClassModel attribute.', () => {
                const expectedErrorMessage = 'Error creating ClassModel HasSameAttributeAsSuperClass. Inherriting from given superClasses causes a duplicate attribute or relationship name "name".';

                testForError('new ClassModel()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'HasSameAttributeAsSuperClass',
                        superClasses: [SuperClass],
                        attributes: [
                            {
                                name: 'name',
                                type: String,
                            },
                        ],
                    });
                });
            });

            it('Error thrown if schema contains a relationship with the same name as a super ClassModel attribute.', () => {
                const expectedErrorMessage = 'Error creating ClassModel HasSameRelationshipAsSuperClassAttribute. Inherriting from given superClasses causes a duplicate attribute or relationship name "name".';

                testForError('new ClassModel()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'HasSameRelationshipAsSuperClassAttribute',
                        superClasses: [SuperClass],
                        relationships: [
                            {
                                name: 'name',
                                toClass: 'SomeClass',
                                singular: true,
                            },
                        ],
                    })
                });
            });

            it('Error thrown if schema contains an attribute with the same name as a super ClassModel relationship.', () => {
                const expectedErrorMessage = 'Error creating ClassModel HasSameRelationshipAsSuperClassAttribute. Inherriting from given superClasses causes a duplicate attribute or relationship name "class2".';

                testForError('new ClassModel()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'HasSameRelationshipAsSuperClassAttribute',
                        superClasses: [CompareClass1],
                        attributes: [
                            {
                                name: 'class2',
                                type: String,
                            },
                        ],
                    })
                });
            });

            it('Error thrown if schema contains a relationship with the same name as a super ClassModel relationship.', () => {
                const expectedErrorMessage = 'Error creating ClassModel HasSameRelationshipAsSuperClass. Inherriting from given superClasses causes a duplicate attribute or relationship name "class2".';

                testForError('new ClassModel()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'HasSameRelationshipAsSuperClass',
                        superClasses: [CompareClass1],
                        relationships: [
                            {
                                name: 'class2',
                                toClass: 'SomeClass',
                                singular: true,
                            },
                        ],
                    })
                });
            });

            it('Error thrown if inheriting from multiple ClassModels with attributes of the same name.', () => {
                const expectedErrorMessage = 'Error creating ClassModel InheritsDuplicateAttributes. Inherriting from given superClasses causes a duplicate attribute or relationship name "name".';

                const SameAttributeAsSuperClass = new ClassModel({
                    className: 'SameAttributeAsSuperClass',
                    attributes: [
                        {
                            name: 'name',
                            type: String,
                        },
                    ],
                });

                testForError('new ClassModel()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'InheritsDuplicateAttributes',
                        superClasses: [SuperClass, SameAttributeAsSuperClass],
                    })
                });
            });

            it('Error thrown if inheriting from multiple ClassModels with relationships of the same name.', () => {
                const expectedErrorMessage = 'Error creating ClassModel InheritsDuplicateAttributes. Inherriting from given superClasses causes a duplicate attribute or relationship name "oneToOne".';

                testForError('new ClassModel()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'InheritsDuplicateAttributes',
                        superClasses: [TwoWayRelationshipClass1, TwoWayRelationshipClass2],
                    });
                });

            });

            it('Error thrown if inheriting from multiple ClassModels with an attribute and relationship of the same name.', () => {
                const expectedErrorMessage = 'Error creating ClassModel InheritsDuplicateAttributes. Inherriting from given superClasses causes a duplicate attribute or relationship name "oneToOne".';

                const OneTwoOneAttribute = new ClassModel({
                    className: 'OneTwoOneAttribute',
                    attributes: [
                        {
                            name: 'oneToOne',
                            type: String,
                        },
                    ],
                });

                testForError('new ClassModel()', expectedErrorMessage, () => {
                    new ClassModel({
                        className: 'InheritsDuplicateAttributes',
                        superClasses: [TwoWayRelationshipClass2, OneTwoOneAttribute],
                    })
                });
            });

        });

        describe('Static and Non Static Methods', () => {

            describe('Static and Non-Static Method Validations', () => {

                it('staticMethods must be an object if provided.', () => {
                    expectedErrorMessage = 'If staticMethods is provided, it must be an object.';
                    testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                       new ClassModel({
                           className: 'BadStaticsClass1',
                           staticMethods: true,
                       }); 
                    });
                });

                it('All properties of staticMethods must be functions if provided.', () => {
                    expectedErrorMessage = 'Each property of staticMethods object must be a function.';
                    testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                       new ClassModel({
                           className: 'BadStaticsClass2',
                           staticMethods: {
                               method1: () => true,
                               method2: true,
                           },
                       }); 
                    });
                });

                it('Attempting to overwrite a built in Noomman static method.', () => {
                    expectedErrorMessage = 'Attempt to add a static method with the same name as a built in Noomman method: find.';
                    testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                       new ClassModel({
                           className: 'BadStaticsClass3',
                           staticMethods: {
                               find: () => true,
                           },
                       }); 
                    });
                });

                it('nonStaticMethods must be an object if provided.', () => {
                    expectedErrorMessage = 'If nonStaticMethods is provided, it must be an object.';
                    testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                       new ClassModel({
                           className: 'BadNonStaticsClass1',
                           nonStaticMethods: true,
                       }); 
                    });
                });

                it('All properties of nonStaticMethods must be functions if provided.', () => {
                    expectedErrorMessage = 'Each property of nonStaticMethods object must be a function.';
                    testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                       new ClassModel({
                           className: 'BadNonStaticsClass2',
                           nonStaticMethods: {
                               method1: () => true,
                               method2: true,
                           },
                       }); 
                    });

                });

                it('Attempting to overwrite a built in Instance non-static method.', () => {
                    expectedErrorMessage = 'Attempt to add a non-static method with the same name as a built in Noomman method: save.';
                    testForError('ClassModel.constructor()', expectedErrorMessage, () => {
                       new ClassModel({
                           className: 'BadNonStaticsClass3',
                           nonStaticMethods: {
                               save: () => true,
                           },
                       }); 
                    });
                });

                it('Happy Path', () => {
                    new ClassModel({
                        className: 'GoodMethodsClass1',
                        staticMethods: {
                            method1: () => true,
                            method2: async function(number) {
                                return number;
                            },
                        },
                        nonStaticMethods: {
                            method1: () => true,
                            method2: async function() {
                                return this.number;
                            },
                        },
                    }); 
                });
                
            });

            describe('Method Inheritance', () => {

            });

        });

        describe('Happy Path', () => {

            it('Constructor excepts and sets parameters.', () => {    
                var SimpleClassModel = new ClassModel({
                    className: 'SimpleClassModel',
                    attributes: [
                        {
                            name: 'text',
                            type: String,
                            required: true,
                        },
                    ],
                    relationships: [
                        {
                            name: 'singularRelationship',
                            toClass: 'OtherClass',
                            singular: true,
                            required: true,
                        },
                        {
                            name: 'nonSingularRelationship',
                            toClass: 'OtherClass',
                            singular: false,
                        },
                    ],
                });
    
                if (SimpleClassModel.className != 'SimpleClassModel')
                    return false;

                if (!SimpleClassModel.attributes.map(attribute => attribute.name).includes('text'))
                    throw new Error('Attribute not set.');

                if (!SimpleClassModel.relationships.map(relationship => relationship.name).includes('singularRelationship'))
                    throw new Error('Attribute not set.');

                if (!SimpleClassModel.relationships.map(relationship => relationship.name).includes('nonSingularRelationship'))
                    throw new Error('Attribute not set.');
            });

        });

        describe('All ClassModels Inherit from NoommanClassModel', () => {

            it('Class Model with no super classes has NoommanClassModel as only super class.', () => {
                const testClassModel = new ClassModel({
                    className: 'testClassModelForNoommanClassModelInheritance',
                });

                if (testClassModel.superClasses.length !== 1)
                    throw new Error('Class Model did not inherit from NoommanClassModel.');
            });

            it('Sub Classes of other classes still have NoommanClassModel as a superClass.', () => {
                const superClasses = SubClassOfAbstractSubClassOfSuperClass.allSuperClasses().map(c => c.className);

                if (!superClasses.includes('NoommanClassModel')) {
                    throw new Error('Class Model did not inherit from NoommanClassModel.');
                }
            });

        });
        
    });

    describe('Class Model Finalize Methods', () => {

        describe('ClassModel.index()', () => {

            it('If you define a classModel with an index and then call index(), the index is added to the collection.', async () => {
                const IndexClass1 = new ClassModel({
                    className: 'IndexClass1',
                    indices: ['name'],
                    attributes: [
                        {
                            name: 'name',
                            type: String,
                        }
                    ]
                });

                const result = await IndexClass1.index();
                if (result[0] !== 'name_1') {
                    throw new Error('Index was not applied.');
                }

            });

            it('If a classModel is a discriminated sub-class, then it will have a __t index after index() is called.', async () => {
                const IndexDiscriminatedClass = new ClassModel({
                    className: 'IndexDiscriminatedClass',
                    superClasses: [DiscriminatedSuperClass],
                    useSuperClassCollection: true,
                });

                const result = await IndexDiscriminatedClass.index();

                if (result[0] !== '__t_1') {
                    throw new Error('Index was not applied.');
                }
            });

        });

        describe('ClassModel.validateRelationships()', () => {

            it('Two way relationship is to a class that doesn\'t exist.', () => {
                const expectedErrorMessage = 'Relationship BadTwoWayClass1.badRelationship is a reference to a Class Model that does not exist: NonExistantClass.'
                const BadTwoWayClass1 = new ClassModel({
                    className: 'BadTwoWayClass1',
                    relationships: [
                        {
                            name: 'badRelationship',
                            toClass: 'NonExistantClass',
                            mirrorRelationship: 'badRelationship',
                            singular: true,
                        }
                    ]
                });

                testForError('ClassModel.validateRelationships()', expectedErrorMessage, () => {
                    BadTwoWayClass1.validateRelationships();
                });
            });

            it('Two way relationship is missing mirror relationship on other ClassModel.', () => {
                const expectedErrorMessage = 'Invalid two-way relationship. BadTwoWayClass2.badRelationship is missing mirror relationship BadTwoWayClass3.badRelationship.';
                const BadTwoWayClass2 = new ClassModel({
                    className: 'BadTwoWayClass2',
                    relationships: [
                        {
                            name: 'badRelationship',
                            toClass: 'BadTwoWayClass3',
                            mirrorRelationship: 'badRelationship',
                            singular: true,
                        }
                    ]
                });
                const BadTwoWayClass3 = new ClassModel({
                    className: 'BadTwoWayClass3',
                });

                testForError('ClassModel.validateRelationships()', expectedErrorMessage, () => {
                    BadTwoWayClass2.validateRelationships();
                });
            });

            it('Two way relationship is has mirror relationship with incorrect toCLass.', () => {
                const expectedErrorMessage = 'Invalid two-way relationship. BadTwoWayClass4.badRelationship. Mirror relationship BadTwoWayClass5.badRelationship has incorrect toClass: BadTwoWayClassZ.';
                const BadTwoWayClass4 = new ClassModel({
                    className: 'BadTwoWayClass4',
                    relationships: [
                        {
                            name: 'badRelationship',
                            toClass: 'BadTwoWayClass5',
                            mirrorRelationship: 'badRelationship',
                            singular: true,
                        }
                    ]
                });
                const BadTwoWayClass5 = new ClassModel({
                    className: 'BadTwoWayClass5',
                    relationships: [
                        {
                            name: 'badRelationship',
                            toClass: 'BadTwoWayClassZ',
                            mirrorRelationship: 'badRelationship',
                            singular: true,
                        }
                    ]
                });

                testForError('ClassModel.validateRelationships()', expectedErrorMessage, () => {
                    BadTwoWayClass4.validateRelationships();
                });

            });

            it('Two way relationship is has mirror relationship that references the wrong mirror relationship.', () => {
                const expectedErrorMessage = 'Invalid two-way relationship. BadTwoWayClass6.badRelationship. Mirror relationship BadTwoWayClass7.badRelationship has incorrect mirrorRelationship: badRelationships.';
                const BadTwoWayClass6 = new ClassModel({
                    className: 'BadTwoWayClass6',
                    relationships: [
                        {
                            name: 'badRelationship',
                            toClass: 'BadTwoWayClass7',
                            mirrorRelationship: 'badRelationship',
                            singular: true,
                        }
                    ]
                });
                const BadTwoWayClass7 = new ClassModel({
                    className: 'BadTwoWayClass7',
                    relationships: [
                        {
                            name: 'badRelationship',
                            toClass: 'BadTwoWayClass6',
                            mirrorRelationship: 'badRelationships',
                            singular: true,
                        }
                    ]
                });

                testForError('ClassModel.validateRelationships()', expectedErrorMessage, () => {
                    BadTwoWayClass6.validateRelationships();
                });

            });

            it('Happy Path.', () => {
                const GoodTwoWayClass1 = new ClassModel({
                    className: 'GoodTwoWayClass1',
                    relationships: [
                        {
                            name: 'goodRelationship',
                            toClass: 'GoodTwoWayClass2',
                            mirrorRelationship: 'goodRelationship',
                            singular: true,
                        }
                    ]
                });
                const GoodTwoWayClass2 = new ClassModel({
                    className: 'GoodTwoWayClass2',
                    relationships: [
                        {
                            name: 'goodRelationship',
                            toClass: 'GoodTwoWayClass1',
                            mirrorRelationship: 'goodRelationship',
                            singular: true,
                        }
                    ]
                });

                GoodTwoWayClass1.validateRelationships();
                GoodTwoWayClass2.validateRelationships();
            });

        });

    });

    describe('Class Model Save and Update Methods', () => {

        after(async () => {
            await SuperClass.clear();
            await DiscriminatedSuperClass.clear();
            await TwoWayRelationshipClass1.clear();
            await TwoWayRelationshipClass2.clear();
        });

        describe('ClassModel.insertOne()', () => {

            it('ClassModel.insertOne() saves an instance in the proper collection.', async () => {
                const id = database.ObjectId();
                const document = {
                    _id: id,
                    name: 'insertSuperClass',
                    number: 1,
                    boolean: false,
                }

                await SuperClass.insertOne(document);

                const found = await database.findById(SuperClass.collection, id);

                if (!found) {
                    throw new Error('Could not find the document after save.');
                }
            });

            it('ClassModel.insertOne() saves an discriminated sub class instance in the parent collection.', async () => {
                const id = database.ObjectId();
                const document = {
                    _id: id,
                    name: 'insertDiscriminatedSubClass',
                    number: 1,
                    boolean: false,
                }

                await SubClassOfDiscriminatedSuperClass.insertOne(document);

                const found = await database.findById(DiscriminatedSuperClass.collection, id);

                if (!found) {
                    throw new Error('Could not find the document after save.');
                }
            });

        });

        describe('ClassModel.insertMany()', () => {

            it('Multiple documents can be inserted', async () => {
                const id1 = database.ObjectId();
                const id2 = database.ObjectId();
                const document1 = {
                    _id: id1,
                    name: '1',
                    number: 1,
                    boolean: false,
                }
                const document2 = {
                    _id: id2,
                    name: '2',
                    number: 2,
                    boolean: false,
                }

                await SuperClass.insertMany([document1, document2]);

                const found = await database.find(SuperClass.collection, {
                    _id: {
                        $in: [id1, id2],
                    },
                });

                if (!found || found.length !== 2) {
                    throw new Error('Could not find the documents after save.');
                }

            });

            it('ClassModel.insertMany() saves an discriminated sub class instance in the parent collection.', async () => {
                const id1 = database.ObjectId();
                const id2 = database.ObjectId();
                const document1 = {
                    _id: id1,
                    name: '1',
                    number: 1,
                    boolean: false,
                }
                const document2 = {
                    _id: id2,
                    name: '2',
                    number: 2,
                    boolean: false,
                }

                await SubClassOfDiscriminatedSuperClass.insertMany([document1, document2]);

                const found = await database.find(DiscriminatedSuperClass.collection, {
                    _id: {
                        $in: [id1, id2],
                    },
                });

                if (!found || found.length !== 2) {
                    throw new Error('Could not find the documents after save.');
                }
            });


        });

        describe('ClassModel.overwrite()', () => {

            it('Can update a document.', async () => {
                const id = database.ObjectId();
                const document = {
                    _id: id,
                    name: 'updateSuperClass',
                    number: 1,
                    boolean: false,
                }

                await SuperClass.insertOne(document);
                document.boolean = true;
                await SuperClass.overwrite(document);

                const found = await database.findById(SuperClass.collection, id);

                if (found.boolean !== true) {
                    throw new Error('Document was not updated.');
                }
            });

            it('Can update a document of a discriminated sub class.', async () => {
                const id = database.ObjectId();
                const document = {
                    _id: id,
                    name: 'updateDiscriminatedSubClass',
                    number: 1,
                    boolean: false,
                }

                await SubClassOfDiscriminatedSuperClass.insertOne(document);
                document.boolean = true;
                await SubClassOfDiscriminatedSuperClass.overwrite(document);

                const found = await database.findById(DiscriminatedSuperClass.collection, id);

                if (found.boolean !== true) {
                    throw new Error('Document was not updated.');
                }
            });

        });

        describe('ClassModel.updateRelatedInstancesForInstance()', () => {

            describe('One to One Relationship', () => {

                describe('Instance and Related Instance(s) Are New', () => {

                    it('Creating one instance and one related instance.', async () => {
                        const relationship = 'oneToOne';
                        const mirrorRelationship = 'oneToOne';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstance = new Instance(TwoWayRelationshipClass2);

                        instance[relationship] = relatedInstance;
                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);
                        const foundRelatedInstance = await TwoWayRelationshipClass2.findById(relatedInstance._id);

                        if (foundRelatedInstance === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance.currentState[mirrorRelationship]).equals(instance._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });
    
                });
    
                describe('Instance Exists but Related Instance(s) do not.', () => {

                    it('Creating one instance and one related instance.', async () => {
                        const relationship = 'oneToOne';
                        const mirrorRelationship = 'oneToOne';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstance = new Instance(TwoWayRelationshipClass2);

                        await instance.save();

                        instance[relationship] = relatedInstance;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstance = await TwoWayRelationshipClass2.findById(relatedInstance._id);

                        if (foundRelatedInstance === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((await foundRelatedInstance[mirrorRelationship])._id.equals(instance._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });
    
                });

                describe('Instance does not exist but Related Instance(s) do.', () => {

                    it('Creating one instance and one related instance.', async () => {
                        const relationship = 'oneToOne';
                        const mirrorRelationship = 'oneToOne';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstance = new Instance(TwoWayRelationshipClass2);

                        await relatedInstance.save();

                        instance[relationship] = relatedInstance;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstance = await TwoWayRelationshipClass2.findById(relatedInstance._id);

                        if (foundRelatedInstance === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!(foundRelatedInstance.currentState[mirrorRelationship].equals(instance._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });
    
                });
    
                describe('Instance and Related Instances Already Exist.', () => {

                    it('Creating one instance and one related instance.', async () => {
                        const relationship = 'oneToOne';
                        const mirrorRelationship = 'oneToOne';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstance = new Instance(TwoWayRelationshipClass2);

                        await instance.save();
                        await relatedInstance.save();

                        instance[relationship] = relatedInstance;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstance = await TwoWayRelationshipClass2.findById(relatedInstance._id);

                        if (foundRelatedInstance === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((await foundRelatedInstance[mirrorRelationship])._id.equals(instance._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });
    
                });

            });

            describe('One to Many Relationship', () => {

                describe('Instance and Related Instance(s) Are New', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'oneToMany';
                        const mirrorRelationship = 'manyToOne';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstances = new InstanceSet(TwoWayRelationshipClass2, [new Instance(TwoWayRelationshipClass2), new Instance(TwoWayRelationshipClass2)]);

                        instance[relationship] = relatedInstances;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: {
                                $in: relatedInstances.getObjectIds(),
                            }
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship]).equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });
    
                describe('Instance Exists but Related Instance(s) do not.', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'oneToMany';
                        const mirrorRelationship = 'manyToOne';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstances = new InstanceSet(TwoWayRelationshipClass2, [new Instance(TwoWayRelationshipClass2), new Instance(TwoWayRelationshipClass2)]);

                        await instance.save();

                        instance[relationship] = relatedInstances;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: {
                                $in: relatedInstances.getObjectIds(),
                            }
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship]).equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });

                describe('Instance is New, Related Instance(s) Exist(s)', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'oneToMany';
                        const mirrorRelationship = 'manyToOne';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstances = new InstanceSet(TwoWayRelationshipClass2, [new Instance(TwoWayRelationshipClass2), new Instance(TwoWayRelationshipClass2)]);

                        await relatedInstances.save();

                        instance[relationship] = relatedInstances;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: {
                                $in: relatedInstances.getObjectIds(),
                            }
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship]).equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });
    
                describe('Instance and Related Instances Already Exist', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'oneToMany';
                        const mirrorRelationship = 'manyToOne';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstances = new InstanceSet(TwoWayRelationshipClass2, [new Instance(TwoWayRelationshipClass2), new Instance(TwoWayRelationshipClass2)]);

                        await instance.save();
                        await relatedInstances.save();

                        instance[relationship] = relatedInstances;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: {
                                $in: relatedInstances.getObjectIds(),
                            }
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship]).equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });

            });

            describe('Many to One Relationship', () => {

                describe('Instance and Related Instance(s) Are New', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'manyToOne';
                        const mirrorRelationship = 'oneToMany';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstance = new Instance(TwoWayRelationshipClass2);

                        instance[relationship] = relatedInstance;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: relatedInstance._id,
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship])[0].equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });
    
                describe('Instance Exists but Related Instance(s) do not.', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'manyToOne';
                        const mirrorRelationship = 'oneToMany';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstance = new Instance(TwoWayRelationshipClass2);

                        await instance.save();

                        instance[relationship] = relatedInstance;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: relatedInstance._id,
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship])[0].equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });

                describe('Instance is New, Related Instance(s) Exist(s)', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'manyToOne';
                        const mirrorRelationship = 'oneToMany';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstance = new Instance(TwoWayRelationshipClass2);

                        await relatedInstance.save();

                        instance[relationship] = relatedInstance;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: relatedInstance._id,
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship])[0].equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });
    
                describe('Instance and Related Instances Already Exist', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'manyToOne';
                        const mirrorRelationship = 'oneToMany';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstance = new Instance(TwoWayRelationshipClass2);

                        await instance.save();
                        await relatedInstance.save();

                        instance[relationship] = relatedInstance;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: relatedInstance._id,
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship])[0].equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });

            });

            describe('Many to Many Relationship', () => {

                describe('Instance and Related Instance(s) Are New', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'manyToMany';
                        const mirrorRelationship = 'manyToMany';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstances = new InstanceSet(TwoWayRelationshipClass2, [new Instance(TwoWayRelationshipClass2), new Instance(TwoWayRelationshipClass2)]);

                        instance[relationship] = relatedInstances;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: {
                                $in: relatedInstances.getObjectIds(),
                            }
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship])[0].equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });
    
                describe('Instance Exists but Related Instance(s) do not.', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'manyToMany';
                        const mirrorRelationship = 'manyToMany';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstances = new InstanceSet(TwoWayRelationshipClass2, [new Instance(TwoWayRelationshipClass2), new Instance(TwoWayRelationshipClass2)]);

                        await instance.save();

                        instance[relationship] = relatedInstances;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: {
                                $in: relatedInstances.getObjectIds(),
                            }
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship])[0].equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });

                describe('Instance is New, Related Instance(s) Exist(s)', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'manyToMany';
                        const mirrorRelationship = 'manyToMany';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstances = new InstanceSet(TwoWayRelationshipClass2, [new Instance(TwoWayRelationshipClass2), new Instance(TwoWayRelationshipClass2)]);

                        await relatedInstances.save();

                        instance[relationship] = relatedInstances;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: {
                                $in: relatedInstances.getObjectIds(),
                            }
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship])[0].equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });
    
                describe('Instance and Related Instances Already Exist', () => {

                    it('Creating one instance and two related instances.', async () => {
                        const relationship = 'manyToMany';
                        const mirrorRelationship = 'manyToMany';

                        const instance = new Instance(TwoWayRelationshipClass1);
                        const relatedInstances = new InstanceSet(TwoWayRelationshipClass2, [new Instance(TwoWayRelationshipClass2), new Instance(TwoWayRelationshipClass2)]);

                        await instance.save();
                        await relatedInstances.save();

                        instance[relationship] = relatedInstances;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstance(instance);

                        const foundRelatedInstances = await TwoWayRelationshipClass2.find({
                            _id: {
                                $in: relatedInstances.getObjectIds(),
                            }
                        });

                        if (foundRelatedInstances.isEmpty()) {
                            throw new Error('Related Instance was not saved.');
                        }

                        for (const foundRelatedInstance of foundRelatedInstances) {
                            if (!((foundRelatedInstance.currentState[mirrorRelationship])[0].equals(instance._id))) {
                                throw new Error('Reverse relationship not set.');
                            }
                        }
                    });
    
                });

            });            

        });

        describe('ClassModel.updateRelatedInstancesForInstanceSet()', () => {

            describe('One to One Relationship.', () => {

                describe('Instances and Related Instance(s) Are New', () => {

                    it('Creating two instances and one related instance.', async () => {
                        const relationship = 'oneToOne';
                        const mirrorRelationship = 'oneToOne';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);

                        instance1[relationship] = relatedInstance1;
                        instance2[relationship] = relatedInstance2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });
    
                });

                describe('Instance Exists but Related Instance(s) do not.', () => {

                    it('Creating two instances and one related instance.', async () => {
                        const relationship = 'oneToOne';
                        const mirrorRelationship = 'oneToOne';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);

                        await instanceSet.saveWithoutRelatedUpdates();

                        instance1[relationship] = relatedInstance1;
                        instance2[relationship] = relatedInstance2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

                describe('Instance does not exist but Related Instance(s) do.', () => {

                    it('Creating two instances and one related instance.', async () => {
                        const relationship = 'oneToOne';
                        const mirrorRelationship = 'oneToOne';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);

                        await relatedInstance1.save();
                        await relatedInstance2.save();

                        instance1[relationship] = relatedInstance1;
                        instance2[relationship] = relatedInstance2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

                describe('Instance and Related Instances Already Exist', () => {

                    it('Creating two instances and one related instance.', async () => {
                        const relationship = 'oneToOne';
                        const mirrorRelationship = 'oneToOne';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);

                        await instanceSet.saveWithoutRelatedUpdates();
                        await relatedInstance1.save();
                        await relatedInstance2.save();

                        instance1[relationship] = relatedInstance1;
                        instance2[relationship] = relatedInstance2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

            });

            describe('One to Many Relationship.', () => {

                describe('Instances and Related Instance(s) Are New', () => {

                    it('Creating two instances and two related instances for each.', async () => {
                        const relationship = 'oneToMany';
                        const mirrorRelationship = 'manyToOne';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance3 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance4 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstanceSet1 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2]);
                        const relatedInstanceSet2 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance3, relatedInstance4]);

                        instance1[relationship] = relatedInstanceSet1;
                        instance2[relationship] = relatedInstanceSet2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);
                        const foundRelatedInstance3 = await TwoWayRelationshipClass2.findById(relatedInstance3._id);
                        const foundRelatedInstance4 = await TwoWayRelationshipClass2.findById(relatedInstance4._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance3 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance3.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance4 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance4.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });
    
                });

                describe('Instance Exists but Related Instance(s) do not.', () => {

                    it('Creating two instances and two related instances for each.', async () => {
                        const relationship = 'oneToMany';
                        const mirrorRelationship = 'manyToOne';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance3 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance4 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstanceSet1 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2]);
                        const relatedInstanceSet2 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance3, relatedInstance4]);

                        await instanceSet.saveWithoutRelatedUpdates();

                        instance1[relationship] = relatedInstanceSet1;
                        instance2[relationship] = relatedInstanceSet2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);
                        const foundRelatedInstance3 = await TwoWayRelationshipClass2.findById(relatedInstance3._id);
                        const foundRelatedInstance4 = await TwoWayRelationshipClass2.findById(relatedInstance4._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance3 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance3.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance4 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance4.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

                describe('Instance does not exist but Related Instance(s) do.', () => {

                    it('Creating two instances and two related instances for each.', async () => {
                        const relationship = 'oneToMany';
                        const mirrorRelationship = 'manyToOne';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance3 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance4 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstanceSet1 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2]);
                        const relatedInstanceSet2 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance3, relatedInstance4]);

                        await relatedInstanceSet1.save();
                        await relatedInstanceSet2.save();

                        instance1[relationship] = relatedInstanceSet1;
                        instance2[relationship] = relatedInstanceSet2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);
                        const foundRelatedInstance3 = await TwoWayRelationshipClass2.findById(relatedInstance3._id);
                        const foundRelatedInstance4 = await TwoWayRelationshipClass2.findById(relatedInstance4._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance3 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance3.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance4 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance4.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

                describe('Instance and Related Instances Already Exist', () => {

                    it('Creating two instances and two related instances for each.', async () => {
                        const relationship = 'oneToMany';
                        const mirrorRelationship = 'manyToOne';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance3 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance4 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstanceSet1 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2]);
                        const relatedInstanceSet2 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance3, relatedInstance4]);

                        await instanceSet.saveWithoutRelatedUpdates();
                        await relatedInstanceSet1.save();
                        await relatedInstanceSet2.save();

                        instance1[relationship] = relatedInstanceSet1;
                        instance2[relationship] = relatedInstanceSet2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);
                        const foundRelatedInstance3 = await TwoWayRelationshipClass2.findById(relatedInstance3._id);
                        const foundRelatedInstance4 = await TwoWayRelationshipClass2.findById(relatedInstance4._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance3 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance3.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance4 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance4.currentState[mirrorRelationship]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

            });

            describe('Many to One Relationship.', () => {

                describe('Instances and Related Instance(s) Are New', () => {

                    it('Creating three instances, first two instances are related to a single instance, third is related to a different instance.', async () => {
                        const relationship = 'manyToOne';
                        const mirrorRelationship = 'oneToMany';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instance3 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2, instance3]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);

                        instance1[relationship] = relatedInstance1;
                        instance2[relationship] = relatedInstance1;
                        instance3[relationship] = relatedInstance2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][0]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][1]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][0]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });
    
                });

                describe('Instance Exists but Related Instance(s) do not.', () => {

                    it('Creating three instances, first two instances are related to a single instance, third is related to a different instance.', async () => {
                        const relationship = 'manyToOne';
                        const mirrorRelationship = 'oneToMany';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instance3 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2, instance3]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);

                        await instanceSet.saveWithoutRelatedUpdates();

                        instance1[relationship] = relatedInstance1;
                        instance2[relationship] = relatedInstance1;
                        instance3[relationship] = relatedInstance2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][0]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][1]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][0]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

                describe('Instance does not exist but Related Instance(s) do.', () => {

                    it('Creating three instances, first two instances are related to a single instance, third is related to a different instance.', async () => {
                        const relationship = 'manyToOne';
                        const mirrorRelationship = 'oneToMany';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instance3 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2, instance3]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);

                        await relatedInstance1.save();
                        await relatedInstance2.save();

                        instance1[relationship] = relatedInstance1;
                        instance2[relationship] = relatedInstance1;
                        instance3[relationship] = relatedInstance2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][0]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][1]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][0]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

                describe('Instance and Related Instances Already Exist', () => {

                    it('Creating three instances, first two instances are related to a single instance, third is related to a different instance.', async () => {
                        const relationship = 'manyToOne';
                        const mirrorRelationship = 'oneToMany';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instance3 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2, instance3]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);

                        await instanceSet.saveWithoutRelatedUpdates();
                        await relatedInstance1.save();
                        await relatedInstance2.save();

                        instance1[relationship] = relatedInstance1;
                        instance2[relationship] = relatedInstance1;
                        instance3[relationship] = relatedInstance2;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][0]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][1]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][0]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

            });

            describe('Many to Many Relationship.', () => {

                describe('Instances and Related Instance(s) Are New', () => {

                    it('Creating three instances and three related instances.', async () => {
                        const relationship = 'manyToMany';
                        const mirrorRelationship = 'manyToMany';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instance3 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2, instance3]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance3 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstanceSet1 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1]);
                        const relatedInstanceSet2 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2]);
                        const relatedInstanceSet3 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2, relatedInstance3]);

                        instance1[relationship] = relatedInstanceSet1;
                        instance2[relationship] = relatedInstanceSet2;
                        instance3[relationship] = relatedInstanceSet3;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);
                        const foundRelatedInstance3 = await TwoWayRelationshipClass2.findById(relatedInstance3._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][0]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][1]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][2]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][0]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][1]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance3 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance3.currentState[mirrorRelationship][0]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });
    
                });

                describe('Instance Exists but Related Instance(s) do not.', () => {

                    it('Creating three instances and three related instances.', async () => {
                        const relationship = 'manyToMany';
                        const mirrorRelationship = 'manyToMany';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instance3 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2, instance3]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance3 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstanceSet1 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1]);
                        const relatedInstanceSet2 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2]);
                        const relatedInstanceSet3 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2, relatedInstance3]);

                        await instanceSet.saveWithoutRelatedUpdates();

                        instance1[relationship] = relatedInstanceSet1;
                        instance2[relationship] = relatedInstanceSet2;
                        instance3[relationship] = relatedInstanceSet3;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);
                        const foundRelatedInstance3 = await TwoWayRelationshipClass2.findById(relatedInstance3._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][0]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][1]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][2]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][0]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][1]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance3 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance3.currentState[mirrorRelationship][0]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

                describe('Instance does not exist but Related Instance(s) do.', () => {

                    it('Creating three instances and three related instances.', async () => {
                        const relationship = 'manyToMany';
                        const mirrorRelationship = 'manyToMany';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instance3 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2, instance3]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance3 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstanceSet1 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1]);
                        const relatedInstanceSet2 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2]);
                        const relatedInstanceSet3 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2, relatedInstance3]);

                        await relatedInstanceSet3.saveWithoutRelatedUpdates();

                        instance1[relationship] = relatedInstanceSet1;
                        instance2[relationship] = relatedInstanceSet2;
                        instance3[relationship] = relatedInstanceSet3;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);
                        const foundRelatedInstance3 = await TwoWayRelationshipClass2.findById(relatedInstance3._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][0]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][1]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][2]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][0]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][1]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance3 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance3.currentState[mirrorRelationship][0]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

                describe('Instance and Related Instances Already Exist', () => {

                    it('Creating three instances and three related instances.', async () => {
                        const relationship = 'manyToMany';
                        const mirrorRelationship = 'manyToMany';

                        const instance1 = new Instance(TwoWayRelationshipClass1);
                        const instance2 = new Instance(TwoWayRelationshipClass1);
                        const instance3 = new Instance(TwoWayRelationshipClass1);
                        const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2, instance3]);
                        const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance2 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstance3 = new Instance(TwoWayRelationshipClass2);
                        const relatedInstanceSet1 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1]);
                        const relatedInstanceSet2 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2]);
                        const relatedInstanceSet3 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2, relatedInstance3]);

                        await instanceSet.saveWithoutRelatedUpdates();
                        await relatedInstanceSet3.saveWithoutRelatedUpdates();

                        instance1[relationship] = relatedInstanceSet1;
                        instance2[relationship] = relatedInstanceSet2;
                        instance3[relationship] = relatedInstanceSet3;

                        await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                        const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                        const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);
                        const foundRelatedInstance3 = await TwoWayRelationshipClass2.findById(relatedInstance3._id);

                        if (foundRelatedInstance1 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][0]).equals(instance1._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][1]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance1.currentState[mirrorRelationship][2]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance2 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][0]).equals(instance2._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (!((foundRelatedInstance2.currentState[mirrorRelationship][1]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }

                        if (foundRelatedInstance3 === null) {
                            throw new Error('Related Instance was not saved.');
                        }

                        if (!((foundRelatedInstance3.currentState[mirrorRelationship][0]).equals(instance3._id))) {
                            throw new Error('Reverse relationship not set.');
                        }
                    });

                });

            });

            describe('Combining Multiple Relationship Changes.', () => {

                it('One to One and Many to Many Relationships.', async () => {
                    const relationship1 = 'oneToOne';
                    const mirrorRelationship1 = 'oneToOne';
                    const relationship2 = 'manyToMany';
                    const mirrorRelationship2 = 'manyToMany';

                    const instance1 = new Instance(TwoWayRelationshipClass1);
                    const instance2 = new Instance(TwoWayRelationshipClass1);
                    const instance3 = new Instance(TwoWayRelationshipClass1);
                    const instanceSet = new InstanceSet(TwoWayRelationshipClass1, [instance1, instance2, instance3]);
                    const relatedInstance1 = new Instance(TwoWayRelationshipClass2);
                    const relatedInstance2 = new Instance(TwoWayRelationshipClass2);
                    const relatedInstance3 = new Instance(TwoWayRelationshipClass2);
                    const relatedInstanceSet1 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1]);
                    const relatedInstanceSet2 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2]);
                    const relatedInstanceSet3 = new InstanceSet(TwoWayRelationshipClass2, [relatedInstance1, relatedInstance2, relatedInstance3]);

                    instance1[relationship1] = relatedInstance1;
                    instance2[relationship1] = relatedInstance2;
                    instance3[relationship1] = relatedInstance3;

                    instance1[relationship2] = relatedInstanceSet1;
                    instance2[relationship2] = relatedInstanceSet2;
                    instance3[relationship2] = relatedInstanceSet3;

                    await TwoWayRelationshipClass1.updateRelatedInstancesForInstanceSet(instanceSet);

                    const foundRelatedInstance1 = await TwoWayRelationshipClass2.findById(relatedInstance1._id);
                    const foundRelatedInstance2 = await TwoWayRelationshipClass2.findById(relatedInstance2._id);
                    const foundRelatedInstance3 = await TwoWayRelationshipClass2.findById(relatedInstance3._id);

                    if (foundRelatedInstance1 === null) {
                        throw new Error('Related Instance was not saved.');
                    }

                    if (!((foundRelatedInstance1.currentState[mirrorRelationship1]).equals(instance1._id))) {
                        throw new Error('Reverse relationship not set.');
                    }

                    if (!((foundRelatedInstance1.currentState[mirrorRelationship2][0]).equals(instance1._id))) {
                        throw new Error('Reverse relationship not set.');
                    }

                    if (!((foundRelatedInstance1.currentState[mirrorRelationship2][1]).equals(instance2._id))) {
                        throw new Error('Reverse relationship not set.');
                    }

                    if (!((foundRelatedInstance1.currentState[mirrorRelationship2][2]).equals(instance3._id))) {
                        throw new Error('Reverse relationship not set.');
                    }

                    if (foundRelatedInstance2 === null) {
                        throw new Error('Related Instance was not saved.');
                    }

                    if (!((foundRelatedInstance2.currentState[mirrorRelationship1]).equals(instance2._id))) {
                        throw new Error('Reverse relationship not set.');
                    }

                    if (!((foundRelatedInstance2.currentState[mirrorRelationship2][0]).equals(instance2._id))) {
                        throw new Error('Reverse relationship not set.');
                    }

                    if (!((foundRelatedInstance2.currentState[mirrorRelationship2][1]).equals(instance3._id))) {
                        throw new Error('Reverse relationship not set.');
                    }

                    if (foundRelatedInstance3 === null) {
                        throw new Error('Related Instance was not saved.');
                    }

                    if (!((foundRelatedInstance3.currentState[mirrorRelationship1]).equals(instance3._id))) {
                        throw new Error('Reverse relationship not set.');
                    }

                    if (!((foundRelatedInstance3.currentState[mirrorRelationship2][0]).equals(instance3._id))) {
                        throw new Error('Reverse relationship not set.');
                    }

                });

            });

        });

    });

    describe('ClassModel Query Methods', () => {

        // Create Instances for tests.
        {
            var instanceOfAllFieldsMutexClass = new Instance(AllFieldsMutexClass);
            var instanceOfDiscriminatedSuperClass = new Instance(DiscriminatedSuperClass);
            var instanceOfSuperClass = new Instance(SuperClass);
            var instanceOfSubClassOfSuperClass = new Instance(SubClassOfSuperClass);
            var instanceOfSubClassOfAbstractSuperClass = new Instance(SubClassOfAbstractSuperClass);
            var instanceOfSubClassOfDiscriminatedSuperClass = new Instance(SubClassOfDiscriminatedSuperClass);
            var instanceOfSubClassOfDiscriminatedSubClassOfSuperClass = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
            var instanceOfSubClassOfSubClassOfSuperClass = new Instance(SubClassOfSubClassOfSuperClass);
            var instanceOfSubClassOfAbstractSubClassOfSuperClass = new Instance(SubClassOfAbstractSubClassOfSuperClass);
    
            instanceOfAllFieldsMutexClass.string = 'instanceOfAllFieldsMutexClass';
            instanceOfDiscriminatedSuperClass.name = 'instanceOfDiscriminatedSuperClass';
            instanceOfSuperClass.name = 'instanceOfSuperClass';
            instanceOfSubClassOfSuperClass.name = 'instanceOfSubClassOfSuperClass';
            instanceOfSubClassOfAbstractSuperClass.abstractName = 'instanceOfSubClassOfAbstractSuperClass';
            instanceOfSubClassOfDiscriminatedSuperClass.name = 'instanceOfSubClassOfDiscriminatedSuperClass';
            instanceOfSubClassOfDiscriminatedSubClassOfSuperClass.name = 'instanceOfSubClassOfDiscriminatedSubClassOfSuperClass';
            instanceOfSubClassOfSubClassOfSuperClass.name = 'instanceOfSubClassOfSubClassOfSuperClass';
            instanceOfSubClassOfAbstractSubClassOfSuperClass.name = 'instanceOfSubClassOfAbstractSubClassOfSuperClass';
        }

        before(async () => {
            await Promise.all([
                instanceOfAllFieldsMutexClass.save(),
                instanceOfDiscriminatedSuperClass.save(),
                instanceOfSuperClass.save(),
                instanceOfSubClassOfSuperClass.save(),
                instanceOfSubClassOfDiscriminatedSuperClass.save(),
                instanceOfSubClassOfAbstractSuperClass.save(),
                instanceOfSubClassOfDiscriminatedSubClassOfSuperClass.save(),
                instanceOfSubClassOfSubClassOfSuperClass.save(),
                instanceOfSubClassOfAbstractSubClassOfSuperClass.save(),
            ]);
        });

        after(async () => {
            await Promise.all([
                AllFieldsMutexClass.clear(),
                DiscriminatedSuperClass.clear(),
                SuperClass.clear(),
                SubClassOfSuperClass.clear(),
                SubClassOfDiscriminatedSuperClass.clear(),
                SubClassOfAbstractSuperClass.clear(),
                AllFieldsRequiredClass.clear(),
                DiscriminatedSubClassOfSuperClass.clear(),
                SubClassOfAbstractSubClassOfSuperClass.clear(),
                SubClassOfSubClassOfSuperClass.clear()
            ]);
        });

        describe('ClassModel.findOne()', () => {
    
            describe('Calling findOne on the Class of the instance you want to find. (Direct)', () => {

                it('An instance of a concrete class with no subclasses can be found.', async () => {
                    const classToCallFindOneOn = AllFieldsMutexClass;
                    const instanceToFind = instanceOfAllFieldsMutexClass;

                    const filter = {
                        string: 'instanceOfAllFieldsMutexClass'
                    }

                    const instanceFound = await classToCallFindOneOn.findOne(filter);

                    if (!instanceFound)
                        throw new Error('findOne() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findOne() returned the wrong instance.');
                });

                it('An instance of a concrete discriminated class can be found.', async () => {
                    const classToCallFindOneOn = SubClassOfDiscriminatedSuperClass;
                    const instanceToFind = instanceOfSubClassOfDiscriminatedSuperClass;

                    const filter = {
                        name: 'instanceOfSubClassOfDiscriminatedSuperClass'
                    }

                    const instanceFound = await classToCallFindOneOn.findOne(filter);

                    if (!instanceFound)
                        throw new Error('findOne() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findOne() returned the wrong instance.');
                });

                it('An instance of a concrete super class can be found.', async () => {
                    const classToCallFindOneOn = SuperClass;
                    const instanceToFind = instanceOfSuperClass;

                    const filter = {
                        name: 'instanceOfSuperClass'
                    }

                    const instanceFound = await classToCallFindOneOn.findOne(filter);

                    if (!instanceFound)
                        throw new Error('findOne() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findOne() returned the wrong instance.');
                });

                it('An instance of a concrete discriminated sub-class can be found.', async () => {
                    const classToCallFindOneOn = DiscriminatedSuperClass;
                    const instanceToFind = instanceOfDiscriminatedSuperClass;

                    const filter = {
                        name: 'instanceOfDiscriminatedSuperClass'
                    }

                    const instanceFound = await classToCallFindOneOn.findOne(filter);

                    if (!instanceFound)
                        throw new Error('findOne() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findOne() returned the wrong instance.');
                });
    
            });
    
            describe('Calling findOne on a super class of the class of the instance you want to find. (Indirect)', () => {

                it('An instance of a sub class of a discrimintated super class can be found from the super class.', async () => {
                    const classToCallFindOneOn = DiscriminatedSuperClass;
                    const instanceToFind = instanceOfSubClassOfDiscriminatedSuperClass;

                    const filter = {
                        name: 'instanceOfSubClassOfDiscriminatedSuperClass'
                    }

                    const instanceFound = await classToCallFindOneOn.findOne(filter);

                    if (!instanceFound) 
                        throw new Error('findOne() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findOne() returned the wrong instance.');
                });

                it('An instance of a concrete sub class of a non-discriminated super class can be found from the super class.', async () => {
                    const classToCallFindOneOn = SuperClass;
                    const instanceToFind = instanceOfSubClassOfSuperClass;

                    const filter = {
                        name: 'instanceOfSubClassOfSuperClass'
                    }

                    const instanceFound = await classToCallFindOneOn.findOne(filter);

                    if (!instanceFound) 
                        throw new Error('findOne() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findOne() returned the wrong instance.');
                });

                it('An instance of a concrete sub class of a non-discriminated abstract super class can be found from the super class.', async () => {
                    const classToCallFindOneOn = AbstractSuperClass;
                    const instanceToFind = instanceOfSubClassOfAbstractSuperClass;

                    const filter = {
                        abstractName: 'instanceOfSubClassOfAbstractSuperClass'
                    }

                    const instanceFound = await classToCallFindOneOn.findOne(filter);

                    if (!instanceFound) 
                        throw new Error('findOne() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findOne() returned the wrong instance.');
                });
    
            });
    
            describe('Calling findOne on a super class of the super class of the instance you want to find. (Recursive)', () => {

                it('SuperClass -> Discriminated Sub Class -> Sub Sub Class', async () => {
                    const classToCallFindOneOn = SuperClass;
                    const instanceToFind = instanceOfSubClassOfDiscriminatedSubClassOfSuperClass;

                    const filter = {
                        name: 'instanceOfSubClassOfDiscriminatedSubClassOfSuperClass'
                    }

                    const instanceFound = await classToCallFindOneOn.findOne(filter);

                    if (!instanceFound) 
                        throw new Error('findOne() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findOne() returned the wrong instance.');
                });

                it('SuperClass -> Sub Class -> Sub Sub Class', async () => {
                    const classToCallFindOneOn = SuperClass;
                    const instanceToFind = instanceOfSubClassOfSubClassOfSuperClass;

                    const filter = {
                        name: 'instanceOfSubClassOfSubClassOfSuperClass'
                    }

                    const instanceFound = await classToCallFindOneOn.findOne(filter);

                    if (!instanceFound) 
                        throw new Error('findOne() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findOne() returned the wrong instance.');
                });

                it('SuperClass -> Abstract Sub Class -> Sub Sub Class', async () => {
                    const classToCallFindOneOn = SuperClass;
                    const instanceToFind = instanceOfSubClassOfAbstractSubClassOfSuperClass;

                    const filter = {
                        name: 'instanceOfSubClassOfAbstractSubClassOfSuperClass'
                    }

                    const instanceFound = await classToCallFindOneOn.findOne(filter);

                    if (!instanceFound) 
                        throw new Error('findOne() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findOne() returned the wrong instance.');
                });
    
            });
    
        });

        describe('ClassModel.findById()', () => {

            it('Error thrown if findById called with invalid id string.', async () => {
                const expectedErrorMessage = 'CompareClass1.findById() called with invalid Id string: garbage.'
                await testForErrorAsync('ClassModel.findById', expectedErrorMessage, async () => {
                    return CompareClass1.findById('garbage');
                });
            });
    
            describe('Calling findById on the Class of the instance you want to find. (Direct)', () => {

                it('An instance of a concrete class with no subclasses can be found.', async () => {
                    const classToCallFindOneOn = AllFieldsMutexClass;
                    const instanceToFind = instanceOfAllFieldsMutexClass;

                    const instanceFound = await classToCallFindOneOn.findById(instanceToFind._id);

                    if (!instanceFound)
                        throw new Error('findById() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findById() returned the wrong instance.');
                });

                it('Calling findById with a string id.', async () => {
                    const classToCallFindOneOn = AllFieldsMutexClass;
                    const instanceToFind = instanceOfAllFieldsMutexClass;

                    const instanceFound = await classToCallFindOneOn.findById(instanceToFind.id);

                    if (!instanceFound)
                        throw new Error('findById() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findById() returned the wrong instance.');
                });

                it('An instance of a concrete discriminated class can be found.', async () => {
                    const classToCallFindInstanceByIdOn = SubClassOfDiscriminatedSuperClass;
                    const instanceToFind = instanceOfSubClassOfDiscriminatedSuperClass;

                    const instanceFound = await classToCallFindInstanceByIdOn.findById(instanceToFind._id);

                    if (!instanceFound)
                        throw new Error('findById() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findById() returned the wrong instance.');
                });

                it('An instance of a concrete super class can be found.', async () => {
                    const classToCallFindInstanceByIdOn = SuperClass;
                    const instanceToFind = instanceOfSuperClass;

                    const instanceFound = await classToCallFindInstanceByIdOn.findById(instanceToFind._id);

                    if (!instanceFound)
                        throw new Error('findById() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findById() returned the wrong instance.');
                });

                it('An instance of a concrete discriminated sub-class can be found.', async () => {
                    const classToCallFindInstanceByIdOn = DiscriminatedSuperClass;
                    const instanceToFind = instanceOfDiscriminatedSuperClass;

                    const instanceFound = await classToCallFindInstanceByIdOn.findById(instanceToFind._id);

                    if (!instanceFound)
                        throw new Error('findById() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findById() returned the wrong instance.');
                });
    
            });
    
            describe('Calling findById on a super class of the class of the instance you want to find. (Indirect)', () => {

                it('An instance of a sub class of a discrimintated super class can be found from the super class.', async () => {
                    const classToCallFindInstanceByIdOn = DiscriminatedSuperClass;
                    const instanceToFind = instanceOfSubClassOfDiscriminatedSuperClass;

                    const instanceFound = await classToCallFindInstanceByIdOn.findById(instanceToFind._id);

                    if (!instanceFound) 
                        throw new Error('findById() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findById() returned the wrong instance.');
                });

                it('An instance of a concrete sub class of a non-discriminated super class can be found from the super class.', async () => {
                    const classToCallFindInstanceByIdOn = SuperClass;
                    const instanceToFind = instanceOfSubClassOfSuperClass;

                    const instanceFound = await classToCallFindInstanceByIdOn.findById(instanceToFind._id);

                    if (!instanceFound) 
                        throw new Error('findById() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findById() returned the wrong instance.');
                });

                it('An instance of a concrete sub class of a non-discriminated abstract super class can be found from the super class.', async () => {
                    const classToCallFindInstanceByIdOn = AbstractSuperClass;
                    const instanceToFind = instanceOfSubClassOfAbstractSuperClass;

                    const instanceFound = await classToCallFindInstanceByIdOn.findById(instanceToFind._id);

                    if (!instanceFound) 
                        throw new Error('findById() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findById() returned the wrong instance.');
                });
    
            });
    
            describe('Calling findById on a super class of the super class of the instance you want to find. (Recursive)', () => {

                it('SuperClass -> Discriminated Sub Class -> Sub Sub Class', async () => {
                    const classToCallFindInstanceByIdOn = SuperClass;
                    const instanceToFind = instanceOfSubClassOfDiscriminatedSubClassOfSuperClass;

                    const instanceFound = await classToCallFindInstanceByIdOn.findById(instanceToFind._id);

                    if (!instanceFound) 
                        throw new Error('findById() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findById() returned the wrong instance.');
                });

                it('SuperClass -> Sub Class -> Sub Sub Class', async () => {
                    const classToCallFindInstanceByIdOn = SuperClass;
                    const instanceToFind = instanceOfSubClassOfSubClassOfSuperClass;

                    const instanceFound = await classToCallFindInstanceByIdOn.findById(instanceToFind._id);

                    if (!instanceFound) 
                        throw new Error('findById() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findById() returned the wrong instance.');
                });

                it('SuperClass -> Abstract Sub Class -> Sub Sub Class', async () => {
                    const classToCallFindInstanceByIdOn = SuperClass;
                    const instanceToFind = instanceOfSubClassOfAbstractSubClassOfSuperClass;

                    const instanceFound = await classToCallFindInstanceByIdOn.findById(instanceToFind._id);

                    if (!instanceFound) 
                        throw new Error('findById() did not return an instance.');
                    
                    if (!instanceToFind.equals(instanceFound))
                        throw new Error('findById() returned the wrong instance.');
                });
    
            });
    
        });

        describe('ClassModel.find()', () => {

            describe('Finding a single instance.', () => {
    
                describe('Calling find on the Class of the instance you want to find. (Direct)', () => {
        
                    it('An instance of a concrete class with no subclasses can be found.', async () => {
                        const classToCallFindOn = AllFieldsMutexClass;
                        const classOfInstance = AllFieldsMutexClass;
                        const instanceToFind = instanceOfAllFieldsMutexClass;
                        const expectedInstances = new InstanceSet(classOfInstance, [instanceToFind]);
    
                        const filter = {
                            string: 'instanceOfAllFieldsMutexClass'
                        }
    
                        const instancesFound = await classToCallFindOn.find(filter);
    
                        if (!instancesFound.equals(expectedInstances))
                            throw new Error('Returned instances are not what was expected.');
                    });
        
                    it('An instance of a concrete discriminated class can be found.', async () => {
                        const classToCallFindOn = SubClassOfDiscriminatedSuperClass;
                        const classOfInstance = SubClassOfDiscriminatedSuperClass;
                        const instanceToFind = instanceOfSubClassOfDiscriminatedSuperClass;
                        const expectedInstances = new InstanceSet(classOfInstance, [instanceToFind]);
    
                        const filter = {
                            name: 'instanceOfSubClassOfDiscriminatedSuperClass'
                        }
    
                        const instancesFound = await classToCallFindOn.find(filter);
    
                        if (!instancesFound.equals(expectedInstances))
                            throw new Error('Returned instances are not what was expected.');
                    });
        
                    it('An instance of a concrete super class can be found.', async () => {
                        const classToCallFindOn = SuperClass;
                        const classOfInstance = SuperClass;
                        const instanceToFind = instanceOfSuperClass;
                        const expectedInstances = new InstanceSet(classOfInstance, [instanceToFind]);
    
                        const filter = {
                            name: 'instanceOfSuperClass'
                        }
    
                        const instancesFound = await classToCallFindOn.find(filter);

                        if (!instancesFound.equals(expectedInstances))
                            throw new Error('Returned instances are not what was expected.');
                    });
        
                    it('An instance of a concrete discriminated sub-class can be found.', async () => {
                        const classToCallFindOn = DiscriminatedSuperClass;
                        const classOfInstance = DiscriminatedSuperClass;
                        const instanceToFind = instanceOfDiscriminatedSuperClass;
                        const expectedInstances = new InstanceSet(classOfInstance, [instanceToFind]);
    
                        const filter = {
                            name: 'instanceOfDiscriminatedSuperClass'
                        }
    
                        const instancesFound = await classToCallFindOn.find(filter);

                        if (!instancesFound.equals(expectedInstances))
                            throw new Error('Returned instances are not what was expected.');
                    });
        
                });
        
                describe('Calling find on a super class of the class of the instance you want to find. (Indirect)', () => {
        
                    it('An instance of a sub class of a discrimintated super class can be from the super class.', async () => {
                        const classToCallFindOn = DiscriminatedSuperClass;
                        const instanceToFind = instanceOfSubClassOfDiscriminatedSuperClass;
                        const expectedInstances = new InstanceSet(classToCallFindOn, [instanceToFind]);
    
                        const filter = {
                            name: 'instanceOfSubClassOfDiscriminatedSuperClass'
                        }
    
                        const instancesFound = await classToCallFindOn.find(filter);
    
                        if (!instancesFound.equals(expectedInstances))
                            throw new Error('InstanceSet returned does not match what was expected.');
                    });
        
                    it('An instance of a concrete sub class of a non-discriminated super class can be found from the super class.', async () => {
                        const classToCallFindOn = SuperClass;
                        const instanceToFind = instanceOfSubClassOfSuperClass;
                        const expectedInstances = new InstanceSet(classToCallFindOn, [instanceToFind]);
    
                        const filter = {
                            name: 'instanceOfSubClassOfSuperClass'
                        }
    
                        const instancesFound = await classToCallFindOn.find(filter);
    
                        if (!instancesFound.equals(expectedInstances))
                            throw new Error('InstanceSet returned does not match what was expected.');
                    });
        
                    it('An instance of a concrete sub class of a non-discriminated abstract super class can be found from the super class.', async () => {
                        const classToCallFindOn = AbstractSuperClass;
                        const instanceToFind = instanceOfSubClassOfAbstractSuperClass;
                        const expectedInstances = new InstanceSet(classToCallFindOn, [instanceToFind]);
    
                        const filter = {
                            abstractName: 'instanceOfSubClassOfAbstractSuperClass'
                        }
    
                        const instancesFound = await classToCallFindOn.find(filter);
    
                        if (!instancesFound.equals(expectedInstances))
                            throw new Error('InstanceSet returned does not match what was expected.');
                    });
        
                });
        
                describe('Calling find() on a super class of the super class of the instance you want to find. (Recursive)', () => {
        
                    it('SuperClass -> Discriminated Sub Class -> Sub Sub Class', async () => {
                        const classToCallFindOn = SuperClass;
                        const instanceToFind = instanceOfSubClassOfDiscriminatedSubClassOfSuperClass;
                        const expectedInstances = new InstanceSet(classToCallFindOn, [instanceToFind]);
    
                        const filter = {
                            name: 'instanceOfSubClassOfDiscriminatedSubClassOfSuperClass'
                        }
    
                        const instancesFound = await classToCallFindOn.find(filter);
    
                        if (!instancesFound.equals(expectedInstances))
                            throw new Error('InstanceSet returned does not match what was expected.');
                    });
        
                    it('SuperClass -> Sub Class -> Sub Sub Class', async () => {
                        const classToCallFindOn = SuperClass;
                        const instanceToFind = instanceOfSubClassOfSubClassOfSuperClass;
                        const expectedInstances = new InstanceSet(classToCallFindOn, [instanceToFind]);
    
                        const filter = {
                            name: 'instanceOfSubClassOfSubClassOfSuperClass'
                        }
    
                        const instancesFound = await classToCallFindOn.find(filter);
    
                        if (!instancesFound.equals(expectedInstances))
                            throw new Error('InstanceSet returned does not match what was expected.');
                    });
        
                    it('SuperClass -> Abstract Sub Class -> Sub Sub Class', async () => {
                        const classToCallFindOn = SuperClass;
                        const instanceToFind = instanceOfSubClassOfAbstractSubClassOfSuperClass;
                        const expectedInstances = new InstanceSet(classToCallFindOn, [instanceToFind]);
    
                        const filter = {
                            name: 'instanceOfSubClassOfAbstractSubClassOfSuperClass'
                        }
    
                        const instancesFound = await classToCallFindOn.find(filter);
    
                        if (!instancesFound.equals(expectedInstances))
                            throw new Error('InstanceSet returned does not match what was expected.');
                    });
        
                });
        
            });

            describe('Finding Multiple Instances.', () => {
        
                it('Find two instances of a super class. One is an instance of the super class itself, one is 2 levels deep.', async () => {
                    const classToCallFindOn = SuperClass;
                    const instancesToFind = [instanceOfSuperClass, instanceOfSubClassOfDiscriminatedSubClassOfSuperClass];
                    const expectedInstances = new InstanceSet(classToCallFindOn, instancesToFind);

                    const filter = {
                        name: {$in: ['instanceOfSuperClass', 'instanceOfSubClassOfDiscriminatedSubClassOfSuperClass']}
                    }; 

                    const instancesFound = await classToCallFindOn.find(filter);

                    if (!instancesFound.equals(expectedInstances))
                        throw new Error('InstanceSet returned does not match what was expected.');
                });
        
                it('Find all the instances of a super class. One is an instance of the super class itself, and the others are the instances of the various sub classes.', async () => {
                    const classToCallFindOn = SuperClass;
                    const instancesToFind = [
                        instanceOfSuperClass, 
                        instanceOfSubClassOfSuperClass,
                        instanceOfSubClassOfDiscriminatedSubClassOfSuperClass,
                        instanceOfSubClassOfSubClassOfSuperClass,
                        instanceOfSubClassOfAbstractSubClassOfSuperClass
                    ];
                    const expectedInstances = new InstanceSet(classToCallFindOn, instancesToFind);

                    const filter = {
                        name: {$in: [
                            'instanceOfSuperClass', 
                            'instanceOfSubClassOfSuperClass',
                            'instanceOfSubClassOfDiscriminatedSubClassOfSuperClass',
                            'instanceOfSubClassOfSubClassOfSuperClass',
                            'instanceOfSubClassOfAbstractSubClassOfSuperClass'
                        ]}
                    }; 

                    const instancesFound = await classToCallFindOn.find(filter);

                    if (!instancesFound.equals(expectedInstances))
                        throw new Error('InstanceSet returned does not match what was expected.');
                });

            });

        });

        describe('ClassModel.findPage()', () => {

            before(async () => {
                const uniuqeNumberInstancesToCreate = 300;
                await UniqueNumberSubClass.clear();

                if ((await UniqueNumberClass.find()).size !== uniuqeNumberInstancesToCreate) {
                    await UniqueNumberClass.clear();
    
                    const uniqueNumbers = new InstanceSet(UniqueNumberClass);
    
                    for (let i = 0; i < uniuqeNumberInstancesToCreate; i++) {
                        const instance = new Instance(UniqueNumberClass);
                        instance.number = i;
                        uniqueNumbers.add(instance);
                    }
    
                    await uniqueNumbers.save();
                }
            });

            describe('findPage() With No SubClasses or Read Control', () => {

                it('Can find all instances if page size is exactly the number of instances.', async () => {
                    const filter = {};
                    const page = 0;
                    const pageSize = 300;
                    const orderBy = undefined;

                    const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                    const instances = result.instances;

                    if (
                        instances.size !== 300 ||
                        result.page !== page ||
                        result.pageSize !== pageSize || 
                        result.hiddenInstances !== 0 ||
                        result.totalNumberOfInstances !== 300
                    ) {
                        throw new Error('Result is incorrect.');
                    }
                });

                it('Can order instances using the orderBy parameter.', async () => {
                    const filter = {};
                    const page = 0;
                    const pageSize = 300;
                    const orderBy = {
                        number: -1,
                    };

                    const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                    const instances = result.instances;

                    if (
                        instances.size !== 300 ||
                        result.page !== page ||
                        result.pageSize !== pageSize || 
                        result.hiddenInstances !== 0 ||
                        result.totalNumberOfInstances !== 300
                    ) {
                        throw new Error('Result is incorrect.');
                    }

                    let index = 299;
                    for (const instance of instances) {
                        if (instance.number !== index) {
                            throw new Error('Instances are out of order');
                        }
                        index--;
                    }
                });

                it('Can filter instances using the queryFilter parameter.', async () => {
                    const filter = {
                        number: {
                            $gte: 150,
                        },
                    };
                    const page = 0;
                    const pageSize = 150;
                    const orderBy = undefined;

                    const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                    const instances = result.instances;
                    if (
                        instances.size !== 150 ||
                        result.page !== page ||
                        result.pageSize !== pageSize || 
                        result.hiddenInstances !== 0 ||
                        result.totalNumberOfInstances !== 150
                    ) {
                        throw new Error('Result is incorrect.');
                    }
                });

                it('Can find the first page of instances.', async () => {
                    const filter = {};
                    const page = 0;
                    const pageSize = 20;
                    const orderBy = {
                        number: 1,
                    };

                    const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                    const instances = result.instances;

                    if (
                        instances.size !== 20 ||
                        result.page !== page ||
                        result.pageSize !== pageSize || 
                        result.hiddenInstances !== 0 ||
                        result.totalNumberOfInstances !== 300
                    ) {
                        throw new Error('Result is incorrect.');
                    }

                    let index = 0;
                    for (const instance of instances) {
                        if (instance.number !== index) {
                            throw new Error('Instances are out of order');
                        }
                        index++;
                    }
                });

                it('Can find a middle page of instances.', async () => {
                    const filter = {};
                    const page = 3;
                    const pageSize = 20;
                    const orderBy = {
                        number: 1,
                    };

                    const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                    const instances = result.instances;

                    if (
                        instances.size !== 20 ||
                        result.page !== page ||
                        result.pageSize !== pageSize || 
                        result.hiddenInstances !== 0 ||
                        result.totalNumberOfInstances !== 300
                    ) {
                        throw new Error('Result is incorrect.');
                    }

                    let index = 60;
                    for (const instance of instances) {
                        if (instance.number !== index) {
                            throw new Error('Instances are out of order');
                        }
                        index++;
                    }
                });

                it('Can find the last page of instances, exact fit.', async () => {
                    const filter = {};
                    const page = 14;
                    const pageSize = 20;
                    const orderBy = {
                        number: 1,
                    };

                    const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                    const instances = result.instances;

                    if (
                        instances.size !== 20 ||
                        result.page !== page ||
                        result.pageSize !== pageSize || 
                        result.hiddenInstances !== 0 ||
                        result.totalNumberOfInstances !== 300
                    ) {
                        throw new Error('Result is incorrect.');
                    }

                    let index = 280;
                    for (const instance of instances) {
                        if (instance.number !== index) {
                            throw new Error('Instances are out of order');
                        }
                        index++;
                    }
                });

                it('Can find the last page of instances, requesting more instances than exist.', async () => {
                    const filter = {};
                    const page = 7;
                    const pageSize = 40;
                    const orderBy = {
                        number: 1,
                    };

                    const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                    const instances = result.instances;

                    if (
                        instances.size !== 20 ||
                        result.page !== page ||
                        result.pageSize !== pageSize || 
                        result.hiddenInstances !== 0 ||
                        result.totalNumberOfInstances !== 300
                    ) {
                        throw new Error('Result is incorrect.');
                    }

                    let index = 280;
                    for (const instance of instances) {
                        if (instance.number !== index) {
                            throw new Error('Instances are out of order');
                        }
                        index++;
                    }
                });

                it('Can get very last instance with page size 1.', async () => {
                    const filter = {};
                    const page = 299;
                    const pageSize = 1;
                    const orderBy = {
                        number: 1,
                    };

                    const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                    const instances = result.instances;

                    if (
                        instances.size !== 1 ||
                        result.page !== page ||
                        result.pageSize !== pageSize || 
                        result.hiddenInstances !== 0 ||
                        result.totalNumberOfInstances !== 300
                    ) {
                        throw new Error('Result is incorrect.');
                    }

                    let index = 299;
                    for (const instance of instances) {
                        if (instance.number !== index) {
                            throw new Error('Instances are out of order');
                        }
                        index++;
                    }
                });

                it('No instances returned if requesting one past the last instance.', async () => {
                    const filter = {};
                    const page = 300;
                    const pageSize = 1;
                    const orderBy = {
                        number: 1,
                    };

                    const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                    const instances = result.instances;

                    if (
                        instances.size !== 0 ||
                        result.page !== page ||
                        result.pageSize !== pageSize || 
                        result.hiddenInstances !== 0 ||
                        result.totalNumberOfInstances !== 300
                    ) {
                        throw new Error('Result is incorrect.');
                    }
                });

                it('No instances returned if page * pageSize is greater than the total number of instances.', async () => {
                    const filter = {};
                    const page = 151;
                    const pageSize = 2;
                    const orderBy = {
                        number: 1,
                    };

                    const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                    const instances = result.instances;

                    if (
                        instances.size !== 0 ||
                        result.page !== page ||
                        result.pageSize !== pageSize || 
                        result.hiddenInstances !== 0 ||
                        result.totalNumberOfInstances !== 300
                    ) {
                        throw new Error('Result is incorrect.');
                    }                    
                });

            });

            describe('findPage() With Inheritance', () => {

                before(async () => {
                    await UniqueNumberSubClass.clear();

                    const uniuqeNumberSubClassInstancesToCreate = 100;
    
                    const uniqueSubNumbers = new InstanceSet(UniqueNumberSubClass);
    
                    for (let i = 300; i < uniuqeNumberSubClassInstancesToCreate + 300; i++) {
                        const instance = new Instance(UniqueNumberSubClass);
                        instance.number = i;
                        uniqueSubNumbers.add(instance);
                    }
    
                    await uniqueSubNumbers.save();
    
                    const uniuqeNumberDiscriminatedSubSubClassInstancesToCreate = 50;
    
                    const uniqueSubSubNumbers = new InstanceSet(UniqueNumberDiscriminatedSubSubClass);
    
                    for (let i = 400; i < uniuqeNumberDiscriminatedSubSubClassInstancesToCreate + 400; i++) {
                        const instance = new Instance(UniqueNumberDiscriminatedSubSubClass);
                        instance.number = i;
                        uniqueSubSubNumbers.add(instance);
                    }
    
                    await uniqueSubSubNumbers.save();
                });

                describe('Finding Instances of Top-level Class', () => {

                    it('Finding all instances with page size equal to total number of instances.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 450;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 450 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 450
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 0;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                    it('Instances have proper Class Model set.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 450;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        let index = 0;
                        for (const instance of instances) {
                            if (index < 300 && instance.classModel !== UniqueNumberClass) {
                                throw new Error('Super Class instances have incorrect class model.');
                            }
                            else if (index >= 300 && index < 400 && instance.classModel !== UniqueNumberSubClass) {
                                throw new Error('Sub Class instances have incorrect class model.');
                            }
                            else if (index >= 400 && instance.classModel !== UniqueNumberDiscriminatedSubSubClass){
                                throw new Error('Sub Sub Class instances have incorrect class model.');
                            }
                            index++;
                        }
                    });

                    it('Finding first page of instances.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 450;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 450 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 450
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 0;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                    it('Finding page of instances that crosses two cursors.', async () => {
                        const filter = {};
                        const page = 1;
                        const pageSize = 200;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 200 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 450
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 200;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                    it('Finding page of instances that goes past end of instances.', async () => {
                        const filter = {};
                        const page = 2;
                        const pageSize = 199;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 52 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 450
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 398;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                    it('Finding page of instances that has all instances and goes past end of instances.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 500;
                        const orderBy = {
                            number: 1,
                        };
                    
                        const result = await UniqueNumberClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 450 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 450
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 0;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                });

                describe('Finding Instances from Sub Class', () => {

                    it('Finding all instances with page size equal to total number of instances.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 150;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberSubClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 150 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 150
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 300;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                    it('Instances have proper Class Model set.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 150;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberSubClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        let index = 0;
                        for (const instance of instances) {
                            if (index < 100 && instance.classModel !== UniqueNumberSubClass) {
                                throw new Error('Sub Class instances have incorrect class model.');
                            }
                            else if (index > 100 && instance.classModel !== UniqueNumberDiscriminatedSubSubClass){
                                throw new Error('Sub Sub Class instances have incorrect class model.');
                            }
                            index++;
                        }
                    });

                    it('Finding first page of instances.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 50;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberSubClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 50 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 150
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 300;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                    it('Finding page of instances that crosses two cursors.', async () => {
                        const filter = {};
                        const page = 1;
                        const pageSize = 75;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberSubClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 75 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 150
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 375;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                    it('Finding page of instances that goes past end of instances.', async () => {
                        const filter = {};
                        const page = 1;
                        const pageSize = 80;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberSubClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 70 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 150
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 380;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                    it('Finding page of instances that has all instances and goes past end of instances.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 200;
                        const orderBy = {
                            number: 1,
                        };
                    
                        const result = await UniqueNumberSubClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 150 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 150
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 300;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                });

                describe('Finding Instances from Discriminated Sub Sub Class', () => {

                    it('Finding all instances with page size equal to total number of instances.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 50;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberDiscriminatedSubSubClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 50 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 50
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 400;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                    it('Instances have proper Class Model set.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 50;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberDiscriminatedSubSubClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        for (const instance of instances) {
                            if (instance.classModel !== UniqueNumberDiscriminatedSubSubClass){
                                throw new Error('Sub Sub Class instances have incorrect class model.');
                            }
                        }
                    });

                    it('Finding first page of instances.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 20;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberDiscriminatedSubSubClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 20 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 50
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 400;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                    it('Finding page of instances that goes past end of instances.', async () => {
                        const filter = {};
                        const page = 1;
                        const pageSize = 30;
                        const orderBy = {
                            number: 1,
                        };
    
                        const result = await UniqueNumberDiscriminatedSubSubClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 20 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 50
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 430;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                    it('Finding page of instances that has all instances and goes past end of instances.', async () => {
                        const filter = {};
                        const page = 0;
                        const pageSize = 60;
                        const orderBy = {
                            number: 1,
                        };
                    
                        const result = await UniqueNumberDiscriminatedSubSubClass.findPage(filter, page, pageSize, orderBy);
                        const instances = result.instances;
    
                        if (
                            instances.size !== 50 ||
                            result.page !== page ||
                            result.pageSize !== pageSize || 
                            result.hiddenInstances !== 0 ||
                            result.totalNumberOfInstances !== 50
                        ) {
                            throw new Error('Result is incorrect.');
                        }
    
                        let index = 400;
                        for (const instance of instances) {
                            if (instance.number !== index) {
                                throw new Error('Instances are out of order');
                            }
                            index++;
                        }
                    });

                });

            });

            describe('findPage() with Read Control Filter', () => {



            });

        });

    });

    describe('Privilege Methods', () => {

        {
            var instanceOfUnPrivilegedSuperClass = new Instance(UnPrivilegedSuperClass);
        }

        describe('ClassModel.createPrivilegeCheck()', () => {
    
            // Set up createPrivileged Instances
            // For each class, create on instance which will pass all create control filters, and one each that will fail due to one of the create control methods
            {

                // ClassPrivilegesCreatePrivilegedSuperClass Instances
                var instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed = new Instance(ClassPrivilegesCreatePrivilegedSuperClass);
                instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed.allowed = true;
                
                var instanceOfClassPrivilegesCreatePrivilegedSuperClassNotAllowed = new Instance(ClassPrivilegesCreatePrivilegedSuperClass);
                instanceOfClassPrivilegesCreatePrivilegedSuperClassNotAllowed.allowed = false;
    
                // CreatePrivilegedSuperClass Instances
                var instanceOfCreatePrivilegedSuperClassPasses = new Instance(CreatePrivilegedSuperClass);
                instanceOfCreatePrivilegedSuperClassPasses.name = 'instanceOfCreatePrivilegedSuperClassPasses';
                instanceOfCreatePrivilegedSuperClassPasses.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed;
    
                var instanceOfCreatePrivilegedSuperClassFailsRelationship = new Instance(CreatePrivilegedSuperClass);
                instanceOfCreatePrivilegedSuperClassFailsRelationship.name = 'instanceOfCreatePrivilegedSuperClassFailsRelationship';
                instanceOfCreatePrivilegedSuperClassFailsRelationship.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassNotAllowed;
    
                var instancesOfCreatePrivilegedSuperClass = new InstanceSet(CreatePrivilegedSuperClass, [
                    instanceOfCreatePrivilegedSuperClassPasses,
                    instanceOfCreatePrivilegedSuperClassFailsRelationship
                ]);
    
                // CreatePrivilegedSubClassOfCreatePrivilegedSuperClass Instances
                var instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses = new Instance(CreatePrivilegedSubClassOfCreatePrivilegedSuperClass);
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses.name = 'instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses';
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed;
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses.boolean = true;
    
                var instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship = new Instance(CreatePrivilegedSubClassOfCreatePrivilegedSuperClass);
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship.name = 'instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship';
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassNotAllowed;
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship.boolean = true;
    
                var instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean = new Instance(CreatePrivilegedSubClassOfCreatePrivilegedSuperClass);
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean.name = 'instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean'
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed;
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean.boolean = false;
                
                var instancesOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClass = new InstanceSet(CreatePrivilegedSubClassOfCreatePrivilegedSuperClass, [
                    instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses,
                    instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship,
                    instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean
                ]);
    
                // CreatePrivilegedDiscriminatedSuperClass Instances
                var instanceOfCreatePrivilegedDiscriminatedSuperClassPasses = new Instance(CreatePrivilegedDiscriminatedSuperClass);
                instanceOfCreatePrivilegedDiscriminatedSuperClassPasses.name = 'instanceOfCreatePrivilegedDiscriminatedSuperClassPasses';
                instanceOfCreatePrivilegedDiscriminatedSuperClassPasses.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed;
                instanceOfCreatePrivilegedDiscriminatedSuperClassPasses.boolean = true;
                instanceOfCreatePrivilegedDiscriminatedSuperClassPasses.string = 'createPrivileged';
    
                var instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship = new Instance(CreatePrivilegedDiscriminatedSuperClass);
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship.name = 'instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship';
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassNotAllowed;
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship.boolean = true;
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship.string = 'createPrivileged';
    
                var instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString = new Instance(CreatePrivilegedDiscriminatedSuperClass);
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString.name = 'instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString';
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed;
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString.boolean = true;
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString.string = 'not createPrivileged';
    
                var instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean = new Instance(CreatePrivilegedDiscriminatedSuperClass);
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean.name = 'instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean';
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed;
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean.boolean = false;
                instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean.string = 'createPrivileged';
                
                var instancesOfCreatePrivilegedDiscriminatedSuperClass = new InstanceSet(CreatePrivilegedDiscriminatedSuperClass, [
                    instanceOfCreatePrivilegedDiscriminatedSuperClassPasses,
                    instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                    instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                    instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean
                ]);
    
                // CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass Instances
                var instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses = new Instance(CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass);
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses.name = 'instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses';
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed;  
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses.boolean = true;
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses.string = 'createPrivileged';         
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses.number = 1;
    
                var instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship = new Instance(CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass);
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship.name = 'instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship';
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassNotAllowed;             
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship.number = 1;
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship.boolean = true;
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship.string = 'createPrivileged';
    
                var instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean = new Instance(CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass);
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean.name = 'instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean';
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed;     
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean.boolean = false;
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean.string = 'createPrivileged';
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean.number = 1;
    
                var instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString = new Instance(CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass);
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString.name = 'instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString';
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed;     
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString.boolean = true;
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString.string = 'not createPrivileged';            
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString.number = 1;
    
                var instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber = new Instance(CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass);
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber.name = 'instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber';
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber.createPrivilegedBy = instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed;
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber.boolean = true;
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber.string = 'createPrivileged';      
                instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber.number = -1;
                
                var instancesOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass = new InstanceSet(CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass, [
                    instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses,
                    instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                    instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                    instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                    instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber
                ]);
    
                var createPrivilegedInstances = new InstanceSet(CreatePrivilegedSuperClass);
                createPrivilegedInstances.addInstances(instancesOfCreatePrivilegedSuperClass);
                createPrivilegedInstances.addInstances(instancesOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClass);
                createPrivilegedInstances.addInstances(instancesOfCreatePrivilegedDiscriminatedSuperClass);
                createPrivilegedInstances.addInstances(instancesOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass);
    
                // CreatePrivilegedClassCreatePrivilegedByParameters Instances
                var instanceOfCreatePrivilegedClassCreatePrivilegedByParameters = new Instance(CreatePrivilegedClassCreatePrivilegedByParameters);
    
            }
    
            // Save all CreateControl Test Instances
            before(async () => {
                await instanceOfClassPrivilegesCreatePrivilegedSuperClassAllowed.save();
                await instanceOfClassPrivilegesCreatePrivilegedSuperClassNotAllowed.save();
            });
    
            after(async () => {
                await ClassPrivilegesCreatePrivilegedSuperClass.clear();
                await CreatePrivilegedSuperClass.clear();
                await CreatePrivilegedSubClassOfCreatePrivilegedSuperClass.clear();
                await CreatePrivilegedDiscriminatedSuperClass.clear();
                await CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass.clear();
                await CreatePrivilegedClassCreatePrivilegedByParameters.clear();
            });
    
            describe('Tests for invalid arguments.', () => {
    
                it('First Argument must be an InstanceSet', async () => {
                    let updatable;
                    const expectedErrorMessage = 'Incorrect parameters. ' + CreatePrivilegedSuperClass.className + '.createPrivilegeCheck(InstanceSet instanceSet, createPrivilegeMethodParameter)';
                    const instanceSet = new InstanceSet(CreatePrivilegedSuperClass, [instanceOfCreatePrivilegedSuperClassPasses, instanceOfCreatePrivilegedSuperClassPasses]);
    
                    try {
                        updatable = await CreatePrivilegedSuperClass.createPrivilegeCheck(instanceOfCreatePrivilegedSuperClassPasses);
                    }
                    catch (error) {
                        if (error.message != expectedErrorMessage) {
                            throw  new Error(
                                'createPrivilegeCheck() threw an unexpected error.\n' + 
                                'Expected: ' + expectedErrorMessage + '\n' + 
                                'Actual:   ' + error.message
                            );
                        }
                    }
    
                    if (updatable)
                        throw new Error ('ClassModel.createPrivilegeCheck() returned when it should have thrown an error.');
                });
    
            });
    
            describe('Create Control Methods Are Inherited', () => {
                
                it('A class with no supers has only it\'s own create control method.', () => {
                    if (CreatePrivilegedSuperClass.createPrivilegeMethods.length === 0)
                        throw new Error('Class is missing it\'s own create control method.');
    
                    if (CreatePrivilegedSuperClass.createPrivilegeMethods.length > 1)
                        throw new Error('Class has more than one create control method.');
                });
    
                it('A sub class has both it\'s own create control method, and the super class\' create control method.', () => {
                    if (CreatePrivilegedSubClassOfCreatePrivilegedSuperClass.createPrivilegeMethods.length < 2)
                        throw new Error('Class is missing a create control method.');
                    
                    if (CreatePrivilegedSubClassOfCreatePrivilegedSuperClass.createPrivilegeMethods.length != 2)
                        throw new Error('Class is has the wrong number of create control methods.');
                });
    
                it('A discriminated sub class has all the create control methods it should.', () => {
                    if (CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass.createPrivilegeMethods.length != 4)
                        throw new Error('Class is has the wrong number of create control methods.');
                });
            
            });
    
            describe('Test Create Control Check throws error when an instance doesn\'t pass check.', () => {
    
                describe('UnPrivilegedSuperClass.createPrivilegeCheck()', () => {
    
                    it('Create Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfUnPrivilegedSuperClass,
                        ]);

                        await UnPrivilegedSuperClass.createPrivilegeCheck(instanceSet);
                    });
    
                    it('Create Control Check called on Class with instances of class and sub class.', async () => {
                        const instanceSet = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  UnPrivilegedSuperClass.createPrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Create Control Check called on Class with instances of class and 3 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  UnPrivilegedSuperClass.createPrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('CreatePrivilegedSuperClass.createPrivilegeCheck()', () => {
    
                    it('Create Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(CreatePrivilegedSuperClass, [instanceOfCreatePrivilegedSuperClassFailsRelationship]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  CreatePrivilegedSuperClass.createPrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Create Control Check called on Class with instances of class and sub class.', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  CreatePrivilegedSuperClass.createPrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Create Control Check called on Class with instances of class and 3 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  CreatePrivilegedSuperClass.createPrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('CreatePrivilegedSubClassOfCreatePrivilegedSuperClass.createPrivilegeCheck()', () => {
    
                    it('Create Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship,
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  CreatePrivilegedSubClassOfCreatePrivilegedSuperClass.createPrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Create Control Check called on Class with instances of class and 1 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  CreatePrivilegedSubClassOfCreatePrivilegedSuperClass.createPrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Create Control Check called on Class with instances of 2 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  CreatePrivilegedSubClassOfCreatePrivilegedSuperClass.createPrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('CreatePrivilegedDiscriminatedSuperClass.createPrivilegeCheck()', () => {
    
                    it('Create Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  CreatePrivilegedDiscriminatedSuperClass.createPrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Create Control Check called on Class with instances of 1 layers of sub classes', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  CreatePrivilegedDiscriminatedSuperClass.createPrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass.createPrivilegeCheck()', () => {
    
                    it('Create Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(CreatePrivilegedSuperClass, [
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfCreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  CreatePrivilegedSubClassOfCreatePrivilegedDiscriminatedSuperClass.createPrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('CreatePrivilegedClassCreatePrivilegedByParameters.createPrivilegeCheck()', () => {
    
                    it('Create Control Check passes', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedClassCreatePrivilegedByParameters, [instanceOfCreatePrivilegedClassCreatePrivilegedByParameters]);
                        const parameters = {
                            numberA: 1,
                            numberB: 1,
                            boolean: true,
                        };
                        await CreatePrivilegedClassCreatePrivilegedByParameters.createPrivilegeCheck(instanceSet, parameters);
                    });
    
                    it('Instance fails create control check because of Numbers.', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedClassCreatePrivilegedByParameters, [
                            instanceOfCreatePrivilegedClassCreatePrivilegedByParameters,
                        ]);
                        const instancesExpectedToFail = new InstanceSet(CreatePrivilegedClassCreatePrivilegedByParameters, [instanceOfCreatePrivilegedClassCreatePrivilegedByParameters]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
                        const parameters = {
                            numberA: -2,
                            numberB: 1,
                            boolean: true,
                        };
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return CreatePrivilegedClassCreatePrivilegedByParameters.createPrivilegeCheck(instanceSet, parameters);
                        });
                    });
    
                    it('Instance fails create control check because of Boolean.', async () => {
                        const instanceSet = new InstanceSet(CreatePrivilegedClassCreatePrivilegedByParameters, [
                            instanceOfCreatePrivilegedClassCreatePrivilegedByParameters,
                        ]);
                        const instancesExpectedToFail = new InstanceSet(CreatePrivilegedClassCreatePrivilegedByParameters, [instanceOfCreatePrivilegedClassCreatePrivilegedByParameters]);
                        const expectedErrorMessage = 'Illegal attempt to create instances: ' + instancesExpectedToFail.getInstanceIds();
                        const parameters = {
                            numberA: 1,
                            numberB: 1,
                            boolean: false,
                        };
    
                        await testForErrorAsync('ClassModel.createPrivilegeCheck', expectedErrorMessage, async () => {
                            return  CreatePrivilegedClassCreatePrivilegedByParameters.createPrivilegeCheck(instanceSet, parameters);
                        });
                    });
    
                });
    
            });
    
        });
    
        describe('ClassModel.readPrivilegeFilter()', () => {
    
            // Set up readPrivileged Instances
            // For each class, create on instance which will pass all read control filters, and one each that will fail due to one of the read control methods
            {
                // ClassPrivilegesReadPrivilegedSuperClass Instances
                var instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed = new Instance(ClassPrivilegesReadPrivilegedSuperClass);
                instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed.allowed = true;
                
                var instanceOfClassPrivilegesReadPrivilegedSuperClassNotAllowed = new Instance(ClassPrivilegesReadPrivilegedSuperClass);
                instanceOfClassPrivilegesReadPrivilegedSuperClassNotAllowed.allowed = false;
    
                // ReadPrivilegedSuperClass Instances
                var instanceOfReadPrivilegedSuperClassPasses = new Instance(ReadPrivilegedSuperClass);
                instanceOfReadPrivilegedSuperClassPasses.name = 'instanceOfReadPrivilegedSuperClassPasses';
                instanceOfReadPrivilegedSuperClassPasses.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed;
    
                var instanceOfReadPrivilegedSuperClassFailsRelationship = new Instance(ReadPrivilegedSuperClass);
                instanceOfReadPrivilegedSuperClassFailsRelationship.name = 'instanceOfReadPrivilegedSuperClassFailsRelationship';
                instanceOfReadPrivilegedSuperClassFailsRelationship.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassNotAllowed;
    
                // ReadPrivilegedSubClassOfReadPrivilegedSuperClass Instances
                var instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses = new Instance(ReadPrivilegedSubClassOfReadPrivilegedSuperClass);
                instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses.name = 'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses';
                instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed;
                instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses.boolean = true;
    
                var instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship = new Instance(ReadPrivilegedSubClassOfReadPrivilegedSuperClass);
                instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship.name = 'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship';
                instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassNotAllowed;
                instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship.boolean = true;
    
                var instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean = new Instance(ReadPrivilegedSubClassOfReadPrivilegedSuperClass);
                instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean.name = 'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean'
                instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed;
                instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean.boolean = false;
    
                // ReadPrivilegedDiscriminatedSuperClass Instances
                var instanceOfReadPrivilegedDiscriminatedSuperClassPasses = new Instance(ReadPrivilegedDiscriminatedSuperClass);
                instanceOfReadPrivilegedDiscriminatedSuperClassPasses.name = 'instanceOfReadPrivilegedDiscriminatedSuperClassPasses';
                instanceOfReadPrivilegedDiscriminatedSuperClassPasses.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed;
                instanceOfReadPrivilegedDiscriminatedSuperClassPasses.boolean = true;
                instanceOfReadPrivilegedDiscriminatedSuperClassPasses.string = 'readPrivileged';
    
                var instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship = new Instance(ReadPrivilegedDiscriminatedSuperClass);
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship.name = 'instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship';
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassNotAllowed;
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship.boolean = true;
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship.string = 'readPrivileged';
    
                var instanceOfReadPrivilegedDiscriminatedSuperClassFailsString = new Instance(ReadPrivilegedDiscriminatedSuperClass);
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsString.name = 'instanceOfReadPrivilegedDiscriminatedSuperClassFailsString';
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsString.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed;
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsString.boolean = true;
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsString.string = 'not readPrivileged';
    
                var instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean = new Instance(ReadPrivilegedDiscriminatedSuperClass);
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean.name = 'instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean';
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed;
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean.boolean = false;
                instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean.string = 'readPrivileged';
    
                // ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass Instances
                var instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses = new Instance(ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass);
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses.name = 'instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses';
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed;  
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses.boolean = true;
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses.string = 'readPrivileged';         
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses.number = 1;
    
                var instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship = new Instance(ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass);
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship.name = 'instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship';
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassNotAllowed;             
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship.number = 1;
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship.boolean = true;
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship.string = 'readPrivileged';
    
                var instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean = new Instance(ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass);
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean.name = 'instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean';
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed;     
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean.boolean = false;
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean.string = 'readPrivileged';
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean.number = 1;
    
                var instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString = new Instance(ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass);
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString.name = 'instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString';
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed;     
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString.boolean = true;
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString.string = 'not readPrivileged';            
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString.number = 1;
    
                var instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber = new Instance(ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass);
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber.name = 'instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber';
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber.readPrivilegedBy = instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed;
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber.boolean = true;
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber.string = 'readPrivileged';      
                instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber.number = -1;
    
                // ReadPrivilegedClassReadPrivilegedByParameters Instances
                var instanceOfReadPrivilegedClassReadPrivilegedByParameters = new Instance(ReadPrivilegedClassReadPrivilegedByParameters);
    
            }
    
            // Save all SecurityFilter Test Instances
            before(async () => {
                await Promise.all([
                    instanceOfClassPrivilegesReadPrivilegedSuperClassAllowed.save(),
                    instanceOfClassPrivilegesReadPrivilegedSuperClassNotAllowed.save(),
                    instanceOfReadPrivilegedSuperClassPasses.save(),
                    instanceOfReadPrivilegedSuperClassFailsRelationship.save(),
                    instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses.save(),
                    instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship.save(),
                    instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean.save(),
                    instanceOfReadPrivilegedDiscriminatedSuperClassPasses.save(),
                    instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship.save(),
                    instanceOfReadPrivilegedDiscriminatedSuperClassFailsString.save(),
                    instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean.save(),
                    instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses.save(),
                    instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship.save(),
                    instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean.save(),
                    instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString.save(),
                    instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber.save(),
                ]);
            });
    
            after(async () => {
                await ClassPrivilegesReadPrivilegedSuperClass.clear();
                await ReadPrivilegedSuperClass.clear();
                await ReadPrivilegedSubClassOfReadPrivilegedSuperClass.clear();
                await ReadPrivilegedDiscriminatedSuperClass.clear();
                await ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass.clear();
                await ReadPrivilegedClassReadPrivilegedByParameters.clear();
            });
    
            describe('Tests for invalid arguments.', () => {
    
                it('First argument must be an InstanceSet.', async () => {
                    let expectedErrorMessage = 'Incorrect parameters. ' + ReadPrivilegedSuperClass.className + '.readPrivilegeFilter(InstanceSet instanceSet, readPrivilegeMethodParameter)';
                    await testForErrorAsync('ClassModel.readPrivilegeFilter()', expectedErrorMessage, async () => {
                        return ReadPrivilegedSuperClass.readPrivilegeFilter();
                    });
                });
    
                it('First argument must be an InstanceSet.', async () => {
                    let expectedErrorMessage = 'Incorrect parameters. ' + ReadPrivilegedSuperClass.className + '.readPrivilegeFilter(InstanceSet instanceSet, readPrivilegeMethodParameter)';
                    await testForErrorAsync('ClassModel.readPrivilegeFilter()', expectedErrorMessage, async () => {
                        return ReadPrivilegedSuperClass.readPrivilegeFilter({ some: 'object' });
                    });
                });
    
            });
    
            describe('Read Control Methods Are Inherited', () => {
                
                it('A class with no supers has only it\'s own read control method.', () => {
                    if (ReadPrivilegedSuperClass.readPrivilegeMethods.length === 0)
                        throw new Error('Class is missing it\'s own read control method.');
    
                    if (ReadPrivilegedSuperClass.readPrivilegeMethods.length > 1)
                        throw new Error('Class has more than one read control method.');
                });
    
                it('A sub class has both it\'s own read control method, and the super class\' read control method.', () => {
                    if (ReadPrivilegedSubClassOfReadPrivilegedSuperClass.readPrivilegeMethods.length < 2)
                        throw new Error('Class is missing a read control method.');
                    
                    if (ReadPrivilegedSubClassOfReadPrivilegedSuperClass.readPrivilegeMethods.length != 2)
                        throw new Error('Class is has the wrong number of read control methods.');
                });
    
                it('A discriminated sub class has all the read control methods it should.', () => {
                    if (ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass.readPrivilegeMethods.length != 4)
                        throw new Error('Class is has the wrong number of read control methods.');
                });
            
            });
    
            describe('Test filtering out instances that don\'t pass read control check.', () => {
    
                describe('UnPrivilegedSuperClass.readPrivilegeFilter()', () => {
    
                    it('Read Control Filter called on Class with only direct instances of Class.', async () => {
                        const classModel = UnPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Read Control Filter called on Class with instances of class and sub class.', async () => {
                        const classModel = UnPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Read Control Filter called on Class with instances of class and 2 layers of sub classes.', async () => {
                        const classModel = UnPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Read Control Filter called on Class with instances of 3 layers of sub classes.', async () => {
                        const classModel = UnPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses
                        ]);
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
    
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
                describe('ReadPrivilegedSuperClass.readPrivilegeFilter()', () => {
    
                    it('Read Control Filter called on Class with only direct instances of Class.', async () => {
                        const classModel = ReadPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSuperClassPasses
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Read Control Filter called on Class with instances of class and sub class.', async () => {
                        const classModel = ReadPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Read Control Filter called on Class with instances of class and 2 layers of sub classes.', async () => {
                        const classModel = ReadPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Read Control Filter called on Class with instances of 3 layers of sub classes.', async () => {
                        const classModel = ReadPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses
                        ]);
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
    
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
                describe('ReadPrivilegedSubClassOfReadPrivilegedSuperClass.readPrivilegeFilter()', () => {
    
                    it('Read Control Filter called on Class with only direct instances of Class.', async () => {
                        const classModel = ReadPrivilegedSubClassOfReadPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Read Control Filter called on Class with instances of class and 1 layers of sub classes.', async () => {
                        const classModel = ReadPrivilegedSubClassOfReadPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Read Control Filter called on Class with instances of 2 layers of sub classes.', async () => {
                        const classModel = ReadPrivilegedSubClassOfReadPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
                describe('ReadPrivilegedDiscriminatedSuperClass.readPrivilegeFilter()', () => {
    
                    it('Read Control Filter called on Class with only direct instances of Class.', async () => {
                        const classModel = ReadPrivilegedDiscriminatedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Read Control Filter called on Class with instances of 1 layers of sub classes.', async () => {
                        const classModel = ReadPrivilegedDiscriminatedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
                describe('ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass.readPrivilegeFilter()', () => {
    
                    it('Read Control Filter called on Class with only direct instances of Class.', async () => {
                        const classModel = ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses
                        ]);
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
                describe('ReadPrivilegedClassReadPrivilegedByParameters.readPrivilegeFilter()', () => {
    
                    it('Instance passes read control check', async () => {
                        const classModel = ReadPrivilegedClassReadPrivilegedByParameters;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedClassReadPrivilegedByParameters,
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedClassReadPrivilegedByParameters
                        ]);
                        const parameters = {
                            numberA: 1,
                            numberB: 1,
                            boolean: true,
                        }
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet, parameters);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Instance fails read control check because of Numbers.', async () => {
                        const classModel = ReadPrivilegedClassReadPrivilegedByParameters;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedClassReadPrivilegedByParameters,
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel);
                        const parameters = {
                            numberA: -2,
                            numberB: 1,
                            boolean: true,
                        }
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet, parameters);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Instance fails read control check because of Boolean.', async () => {
                        const classModel = ReadPrivilegedClassReadPrivilegedByParameters;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfReadPrivilegedClassReadPrivilegedByParameters,
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel);
                        const parameters = {
                            numberA: 1,
                            numberB: 1,
                            boolean: false,
                        }
    
                        const filteredInstanceSet = await classModel.readPrivilegeFilter(instanceSet, parameters);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.readPrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
            });
    
            describe('Test find methods for read filtering.', () => {
    
                describe('Test findById() with read filtering', () => {
    
                    it('Call findById() on an instance of an read controlled class. Instance passes filter.', async () => {
                        const classToCallFindByIdOn = ReadPrivilegedSuperClass;
                        const instanceToFind = instanceOfReadPrivilegedSuperClassPasses;
                        const instanceFound = await classToCallFindByIdOn.findById(instanceToFind._id);
    
                        if (!instanceFound)
                            throw new Error('findById() did not return an instance.');
    
                        if (!instanceFound._id.equals(instanceToFind._id))
                            throw new Error(
                                'An instance was returned, but it is not the correct one.\n' +
                                'Expected: \n' + instanceToFind + '\n' +
                                'Actual: \n' + instanceFound
                            );
                    });
    
                    it('Call findById() on an instance of an read controlled class, from super class. Instance passes filter.', async () => {
                        const classToCallFindByIdOn = ReadPrivilegedSuperClass;
                        const instanceToFind = instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses;
                        const instanceFound = await classToCallFindByIdOn.findById(instanceToFind._id);
    
                        if (!instanceFound)
                            throw new Error('findById() did not return an instance.');
    
                        if (!instanceFound._id.equals(instanceToFind._id))
                            throw new Error(
                                'An instance was returned, but it is not the correct one.\n' +
                                'Expected: \n' + instanceToFind + '\n' +
                                'Actual: \n' + instanceFound
                            );
    
                    });
    
                    it('Call findById() on an instance of an read controlled class. Instance does not pass filter.', async () => {
                        const classToCallFindByIdOn = ReadPrivilegedSuperClass;
                        const instanceToFind = instanceOfReadPrivilegedSuperClassFailsRelationship;
                        const instanceFound = await classToCallFindByIdOn.findById(instanceToFind._id);
    
                        if (instanceFound)
                            throw new Error('findById() returned an instance.');
                    });
    
                    it('Call findById() on an instance of an read controlled class, from super class. Instance does not pass filter based on super read control method.', async () => {
                        const classToCallFindByIdOn = ReadPrivilegedSuperClass;
                        const instanceToFind = instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship;
                        const instanceFound = await classToCallFindByIdOn.findById(instanceToFind._id);
    
                        if (instanceFound)
                            throw new Error('findById() returned an instance.');
    
                    });
    
                    it('Call findById() on an instance of an read controlled class, from super class. Instance does not pass filter based on it\'s own read control method.', async () => {
                        const classToCallFindByIdOn = ReadPrivilegedSuperClass;
                        const instanceToFind = instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean;
                        const instanceFound = await classToCallFindByIdOn.findById(instanceToFind._id);
    
                        if (instanceFound)
                            throw new Error('findById() returned an instance.');
    
                    });
    
                });
    
                describe('Test findOne() with read filtering', () => {
    
                    it('Call findOne() on an instance of an read controlled class. instance passes filter.', async () => {
                        const classToCallFindByIdOn = ReadPrivilegedSuperClass;
                        const instanceToFind = instanceOfReadPrivilegedSuperClassPasses;
    
                        const filter = {
                            name: 'instanceOfReadPrivilegedSuperClassPasses'
                        }
    
                        const instanceFound = await classToCallFindByIdOn.findOne(filter);
    
                        if (!instanceFound)
                            throw new Error('findOne() did not return an instance.');
    
                        if (!instanceFound._id.equals(instanceToFind._id))
                            throw new Error(
                                'An instance was returned, but it is not the correct one.\n' +
                                'Expected: \n' + instanceToFind + '\n' +
                                'Actual: \n' + instanceFound
                            );
                    });
    
                    it('Call findOne() on an instance of an read controlled class, from super class. Instance passes filter.', async () => {
                        const classToCallFindByIdOn = ReadPrivilegedSuperClass;
                        const instanceToFind = instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses;
    
                        const filter = {
                            name: 'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses'
                        }
    
                        const instanceFound = await classToCallFindByIdOn.findOne(filter);
    
                        if (!instanceFound)
                            throw new Error('findOne() did not return an instance.');
    
                        if (!instanceFound._id.equals(instanceToFind._id))
                            throw new Error(
                                'An instance was returned, but it is not the correct one.\n' +
                                'Expected: \n' + instanceToFind + '\n' +
                                'Actual: \n' + instanceFound
                            );
                    });
    
                    it('Call findOne() on an instance of an read controlled class. Instance does not pass filter.', async () => {
                        const classToCallFindByIdOn = ReadPrivilegedSuperClass;
    
                        const filter = {
                            name: 'instanceOfReadPrivilegedSuperClassFailsRelationship'
                        }
    
                        const instanceFound = await classToCallFindByIdOn.findOne(filter);
    
                        if (instanceFound)
                            throw new Error('findOne() returned an instance');
    
                    });
    
                    it('Call findOne() on an instance of an read controlled class, from super class. Instance does not pass filter based on super read control method.', async () => {
                        const classToCallFindByIdOn = ReadPrivilegedSuperClass;
    
                        const filter = {
                            name: 'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship'
                        }
    
                        const instanceFound = await classToCallFindByIdOn.findOne(filter);
    
                        if (instanceFound)
                            throw new Error('findOne() returned an instance');
    
                    });
    
                    it('Call findOne() on an instance of an read controlled class, from super class. Instance does not pass filter based on it\'s own read control method.', async () => {
                        const classToCallFindByIdOn = ReadPrivilegedSuperClass;
    
                        const filter = {
                            name: 'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean'
                        }
    
                        const instanceFound = await classToCallFindByIdOn.findOne(filter);
    
                        if (instanceFound)
                            throw new Error('findOne() returned an instance');
    
                    });
    
                });
    
                describe('Test find() with read filtering', () => {
    
                    it('Call find() on read controlled super class with a passing and not passing instance of each sub class.', async () => {
                        const instanceNames = [
                            'instanceOfReadPrivilegedSuperClassPasses',
                            'instanceOfReadPrivilegedSuperClassFailsRelationship',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean',
                            'instanceOfReadPrivilegedDiscriminatedSuperClassPasses',
                            'instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship',
                            'instanceOfReadPrivilegedDiscriminatedSuperClassFailsString',
                            'instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean',
                            'ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass',
                            'ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass'
                        ];
                        const expectedInstances = new InstanceSet(ReadPrivilegedSuperClass, [
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses
                        ]);
    
                        const instancesFound = await ReadPrivilegedSuperClass.find({name: {$in: instanceNames}});
    
                        if (!expectedInstances.equals(instancesFound)) 
                            throw new Error('find did not filter instances correctly.')
    
                    });
    
                });
    
                describe('Test findPage() with read filtering', () => {
    
                    it('Call findPage() on read controlled super class with a passing and not passing instance of each sub class.', async () => {
                        const instanceNames = [
                            'instanceOfReadPrivilegedSuperClassPasses',
                            'instanceOfReadPrivilegedSuperClassFailsRelationship',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsRelationship',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassFailsBoolean',
                            'instanceOfReadPrivilegedDiscriminatedSuperClassPasses',
                            'instanceOfReadPrivilegedDiscriminatedSuperClassFailsRelationship',
                            'instanceOfReadPrivilegedDiscriminatedSuperClassFailsString',
                            'instanceOfReadPrivilegedDiscriminatedSuperClassFailsBoolean',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsRelationship',
                            'instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassFailsBoolean',
                            'ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass',
                            'ReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClass'
                        ];
                        const expectedInstances = new InstanceSet(ReadPrivilegedSuperClass, [
                            instanceOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedSuperClassPasses,
                            instanceOfReadPrivilegedDiscriminatedSuperClassPasses,
                            instanceOfReadPrivilegedSubClassOfReadPrivilegedDiscriminatedSuperClassPasses
                        ]);
    
                        const instancesFound = (await ReadPrivilegedSuperClass.findPage({name: {$in: instanceNames}}, 0, 100,)).instances;
    
                        if (!expectedInstances.equals(instancesFound)) 
                            throw new Error('find did not filter instances correctly.');    
                    });
    
                });
    
            });
    
        });
    
        describe('ClassModel.updatePrivilegeCheck()', () => {
    
            // Set up updatePrivileged Instances
            // For each class, create on instance which will pass all update control filters, and one each that will fail due to one of the update control methods
            {
                // ClassPrivilegesUpdatePrivilegedSuperClass Instances
                var instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed = new Instance(ClassPrivilegesUpdatePrivilegedSuperClass);
                instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed.allowed = true;
                
                var instanceOfClassPrivilegesUpdatePrivilegedSuperClassNotAllowed = new Instance(ClassPrivilegesUpdatePrivilegedSuperClass);
                instanceOfClassPrivilegesUpdatePrivilegedSuperClassNotAllowed.allowed = false;
    
                // UpdatePrivilegedSuperClass Instances
                var instanceOfUpdatePrivilegedSuperClassPasses = new Instance(UpdatePrivilegedSuperClass);
                instanceOfUpdatePrivilegedSuperClassPasses.name = 'instanceOfUpdatePrivilegedSuperClassPasses';
                instanceOfUpdatePrivilegedSuperClassPasses.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed;
    
                var instanceOfUpdatePrivilegedSuperClassFailsRelationship = new Instance(UpdatePrivilegedSuperClass);
                instanceOfUpdatePrivilegedSuperClassFailsRelationship.name = 'instanceOfUpdatePrivilegedSuperClassFailsRelationship';
                instanceOfUpdatePrivilegedSuperClassFailsRelationship.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassNotAllowed;
    
                var instancesOfUpdatePrivilegedSuperClass = new InstanceSet(UpdatePrivilegedSuperClass, [
                    instanceOfUpdatePrivilegedSuperClassPasses,
                    instanceOfUpdatePrivilegedSuperClassFailsRelationship
                ]);
    
                // UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass Instances
                var instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses = new Instance(UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass);
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses.name = 'instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses';
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed;
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses.boolean = true;
    
                var instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship = new Instance(UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass);
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship.name = 'instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship';
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassNotAllowed;
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship.boolean = true;
    
                var instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean = new Instance(UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass);
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean.name = 'instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean'
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed;
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean.boolean = false;
                
                var instancesOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass = new InstanceSet(UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass, [
                    instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses,
                    instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship,
                    instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean
                ]);
    
                // UpdatePrivilegedDiscriminatedSuperClass Instances
                var instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses = new Instance(UpdatePrivilegedDiscriminatedSuperClass);
                instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses.name = 'instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses';
                instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed;
                instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses.boolean = true;
                instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses.string = 'updatePrivileged';
    
                var instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship = new Instance(UpdatePrivilegedDiscriminatedSuperClass);
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship.name = 'instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship';
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassNotAllowed;
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship.boolean = true;
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship.string = 'updatePrivileged';
    
                var instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString = new Instance(UpdatePrivilegedDiscriminatedSuperClass);
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString.name = 'instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString';
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed;
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString.boolean = true;
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString.string = 'not updatePrivileged';
    
                var instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean = new Instance(UpdatePrivilegedDiscriminatedSuperClass);
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean.name = 'instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean';
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed;
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean.boolean = false;
                instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean.string = 'updatePrivileged';
                
                var instancesOfUpdatePrivilegedDiscriminatedSuperClass = new InstanceSet(UpdatePrivilegedDiscriminatedSuperClass, [
                    instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                    instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                    instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                    instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean
                ]);
    
                // UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass Instances
                var instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses = new Instance(UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass);
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses.name = 'instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses';
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed;  
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses.boolean = true;
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses.string = 'updatePrivileged';         
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses.number = 1;
    
                var instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship = new Instance(UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass);
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship.name = 'instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship';
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassNotAllowed;             
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship.number = 1;
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship.boolean = true;
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship.string = 'updatePrivileged';
    
                var instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean = new Instance(UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass);
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean.name = 'instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean';
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed;     
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean.boolean = false;
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean.string = 'updatePrivileged';
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean.number = 1;
    
                var instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString = new Instance(UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass);
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString.name = 'instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString';
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed;     
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString.boolean = true;
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString.string = 'not updatePrivileged';            
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString.number = 1;
    
                var instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber = new Instance(UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass);
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber.name = 'instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber';
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber.updatePrivilegedBy = instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed;
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber.boolean = true;
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber.string = 'updatePrivileged';      
                instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber.number = -1;
                
                var instancesOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass = new InstanceSet(UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass, [
                    instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                    instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                    instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                    instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                    instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber
                ]);
    
                var updatePrivilegedInstances = new InstanceSet(UpdatePrivilegedSuperClass);
                updatePrivilegedInstances.addInstances(instancesOfUpdatePrivilegedSuperClass);
                updatePrivilegedInstances.addInstances(instancesOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass);
                updatePrivilegedInstances.addInstances(instancesOfUpdatePrivilegedDiscriminatedSuperClass);
                updatePrivilegedInstances.addInstances(instancesOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass);
    
                // UpdatePrivilegedClassUpdatePrivilegedByParameters Instances
                var instanceOfUpdatePrivilegedClassUpdatePrivilegedByParameters = new Instance(UpdatePrivilegedClassUpdatePrivilegedByParameters);
    
            }
    
            // Save all SecurityFilter Test Instances
            before(async () => {
                await instanceOfClassPrivilegesUpdatePrivilegedSuperClassAllowed.save();
                await instanceOfClassPrivilegesUpdatePrivilegedSuperClassNotAllowed.save();
    
            });
    
            after(async () => {
                await ClassPrivilegesUpdatePrivilegedSuperClass.clear();
                await UpdatePrivilegedSuperClass.clear();
                await UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass.clear();
                await UpdatePrivilegedDiscriminatedSuperClass.clear();
                await UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass.clear();
                await UpdatePrivilegedClassUpdatePrivilegedByParameters.clear();
            });
    
            describe('Tests for invalid arguments.', () => {
    
                it('First Argument must be an InstanceSet', async () => {
                    let updatable;
                    const expectedErrorMessage = 'Incorrect parameters. ' + UpdatePrivilegedSuperClass.className + '.updatePrivilegeCheck(InstanceSet instanceSet, updatePrivilegeMethodParameter)';
                    const instanceSet = new InstanceSet(UpdatePrivilegedSuperClass, [instanceOfUpdatePrivilegedSuperClassPasses, instanceOfUpdatePrivilegedSuperClassPasses]);
    
                    try {
                        updatable = await UpdatePrivilegedSuperClass.updatePrivilegeCheck(instanceOfUpdatePrivilegedSuperClassPasses);
                    }
                    catch (error) {
                        if (error.message != expectedErrorMessage) {
                            throw  new Error(
                                'updatePrivilegeCheck() threw an unexpected error.\n' + 
                                'Expected: ' + expectedErrorMessage + '\n' + 
                                'Actual:   ' + error.message
                            );
                        }
                    }
    
                    if (updatable)
                        throw new Error ('ClassModel.updatePrivilegeCheck() returned when it should have thrown an error.');
                });
    
            });
    
            describe('Update Control Methods Are Inherited', () => {
                
                it('A class with no supers has only it\'s own update control method.', () => {
                    if (UpdatePrivilegedSuperClass.updatePrivilegeMethods.length === 0)
                        throw new Error('Class is missing it\'s own update control method.');
    
                    if (UpdatePrivilegedSuperClass.updatePrivilegeMethods.length > 1)
                        throw new Error('Class has more than one update control method.');
                });
    
                it('A sub class has both it\'s own update control method, and the super class\' update control method.', () => {
                    if (UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass.updatePrivilegeMethods.length < 2)
                        throw new Error('Class is missing a update control method.');
                    
                    if (UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass.updatePrivilegeMethods.length != 2)
                        throw new Error('Class is has the wrong number of update control methods.');
                });
    
                it('A discriminated sub class has all the update control methods it should.', () => {
                    if (UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass.updatePrivilegeMethods.length != 4)
                        throw new Error('Class is has the wrong number of update control methods.');
                });
            
            });
    
            describe('Test Update Control Check throws error when an instance doesn\'t pass check.', () => {
    
                describe('UnPrivilegedSuperClass.updatePrivilegeCheck()', () => {
    
                    it('Update Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UnPrivilegedSuperClass, [instanceOfUpdatePrivilegedSuperClassFailsRelationship]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UnPrivilegedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Update Control Check called on Class with instances of class and sub class.', async () => {
                        const instanceSet = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UnPrivilegedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Update Control Check called on Class with instances of class and 3 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UnPrivilegedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('UpdatePrivilegedSuperClass.updatePrivilegeCheck()', () => {
    
                    it('Update Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UpdatePrivilegedSuperClass, [instanceOfUpdatePrivilegedSuperClassFailsRelationship]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UpdatePrivilegedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Update Control Check called on Class with instances of class and sub class.', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UpdatePrivilegedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Update Control Check called on Class with instances of class and 3 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UpdatePrivilegedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass.updatePrivilegeCheck()', () => {
    
                    it('Update Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship,
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Update Control Check called on Class with instances of class and 1 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Update Control Check called on Class with instances of 2 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UpdatePrivilegedSubClassOfUpdatePrivilegedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('UpdatePrivilegedDiscriminatedSuperClass.updatePrivilegeCheck()', () => {
    
                    it('Update Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UpdatePrivilegedDiscriminatedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Update Control Check called on Class with instances of 1 layers of sub classes', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UpdatePrivilegedDiscriminatedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass.updatePrivilegeCheck()', () => {
    
                    it('Update Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UpdatePrivilegedSuperClass, [
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfUpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UpdatePrivilegedSubClassOfUpdatePrivilegedDiscriminatedSuperClass.updatePrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('UpdatePrivilegedClassUpdatePrivilegedByParameters.updatePrivilegeCheck()', () => {
    
                    it('Update Control Check passes', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedClassUpdatePrivilegedByParameters, [instanceOfUpdatePrivilegedClassUpdatePrivilegedByParameters]);
                        const parameters = {
                            numberA: 1,
                            numberB: 1,
                            boolean: true,
                        };
                        await UpdatePrivilegedClassUpdatePrivilegedByParameters.updatePrivilegeCheck(instanceSet, parameters);
                    });
    
                    it('Instance fails update control check because of Numbers.', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedClassUpdatePrivilegedByParameters, [
                            instanceOfUpdatePrivilegedClassUpdatePrivilegedByParameters,
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UpdatePrivilegedClassUpdatePrivilegedByParameters, [instanceOfUpdatePrivilegedClassUpdatePrivilegedByParameters]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
                        const parameters = {
                            numberA: -2,
                            numberB: 1,
                            boolean: true,
                        };
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return UpdatePrivilegedClassUpdatePrivilegedByParameters.updatePrivilegeCheck(instanceSet, parameters);
                        });
                    });
    
                    it('Instance fails update control check because of Boolean.', async () => {
                        const instanceSet = new InstanceSet(UpdatePrivilegedClassUpdatePrivilegedByParameters, [
                            instanceOfUpdatePrivilegedClassUpdatePrivilegedByParameters,
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UpdatePrivilegedClassUpdatePrivilegedByParameters, [instanceOfUpdatePrivilegedClassUpdatePrivilegedByParameters]);
                        const expectedErrorMessage = 'Illegal attempt to update instances: ' + instancesExpectedToFail.getInstanceIds();
                        const parameters = {
                            numberA: 1,
                            numberB: 1,
                            boolean: false,
                        };
    
                        await testForErrorAsync('ClassModel.updatePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UpdatePrivilegedClassUpdatePrivilegedByParameters.updatePrivilegeCheck(instanceSet, parameters);
                        });
                    });
    
                });
    
            });
    
        });
    
        describe('ClassModel.deletePrivilegeCheck()', () => {
    
            // Set up deletePrivileged Instances
            // For each class, create on instance which will pass all delete control filters, and one each that will fail due to one of the delete control methods
            {
                // ClassPrivilegesDeletePrivilegedSuperClass Instances
                var instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed = new Instance(ClassPrivilegesDeletePrivilegedSuperClass);
                instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed.allowed = true;
                
                var instanceOfClassPrivilegesDeletePrivilegedSuperClassNotAllowed = new Instance(ClassPrivilegesDeletePrivilegedSuperClass);
                instanceOfClassPrivilegesDeletePrivilegedSuperClassNotAllowed.allowed = false;
    
                // DeletePrivilegedSuperClass Instances
                var instanceOfDeletePrivilegedSuperClassPasses = new Instance(DeletePrivilegedSuperClass);
                instanceOfDeletePrivilegedSuperClassPasses.name = 'instanceOfDeletePrivilegedSuperClassPasses';
                instanceOfDeletePrivilegedSuperClassPasses.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed;
    
                var instanceOfDeletePrivilegedSuperClassFailsRelationship = new Instance(DeletePrivilegedSuperClass);
                instanceOfDeletePrivilegedSuperClassFailsRelationship.name = 'instanceOfDeletePrivilegedSuperClassFailsRelationship';
                instanceOfDeletePrivilegedSuperClassFailsRelationship.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassNotAllowed;
    
                var instancesOfDeletePrivilegedSuperClass = new InstanceSet(DeletePrivilegedSuperClass, [
                    instanceOfDeletePrivilegedSuperClassPasses,
                    instanceOfDeletePrivilegedSuperClassFailsRelationship
                ]);
    
                // DeletePrivilegedSubClassOfDeletePrivilegedSuperClass Instances
                var instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses = new Instance(DeletePrivilegedSubClassOfDeletePrivilegedSuperClass);
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses.name = 'instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses';
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed;
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses.boolean = true;
    
                var instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship = new Instance(DeletePrivilegedSubClassOfDeletePrivilegedSuperClass);
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship.name = 'instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship';
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassNotAllowed;
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship.boolean = true;
    
                var instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean = new Instance(DeletePrivilegedSubClassOfDeletePrivilegedSuperClass);
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean.name = 'instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean'
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed;
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean.boolean = false;
                
                var instancesOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClass = new InstanceSet(DeletePrivilegedSubClassOfDeletePrivilegedSuperClass, [
                    instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses,
                    instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship,
                    instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean
                ]);
    
                // DeletePrivilegedDiscriminatedSuperClass Instances
                var instanceOfDeletePrivilegedDiscriminatedSuperClassPasses = new Instance(DeletePrivilegedDiscriminatedSuperClass);
                instanceOfDeletePrivilegedDiscriminatedSuperClassPasses.name = 'instanceOfDeletePrivilegedDiscriminatedSuperClassPasses';
                instanceOfDeletePrivilegedDiscriminatedSuperClassPasses.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed;
                instanceOfDeletePrivilegedDiscriminatedSuperClassPasses.boolean = true;
                instanceOfDeletePrivilegedDiscriminatedSuperClassPasses.string = 'deletePrivileged';
    
                var instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship = new Instance(DeletePrivilegedDiscriminatedSuperClass);
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship.name = 'instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship';
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassNotAllowed;
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship.boolean = true;
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship.string = 'deletePrivileged';
    
                var instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString = new Instance(DeletePrivilegedDiscriminatedSuperClass);
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString.name = 'instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString';
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed;
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString.boolean = true;
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString.string = 'not deletePrivileged';
    
                var instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean = new Instance(DeletePrivilegedDiscriminatedSuperClass);
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean.name = 'instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean';
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed;
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean.boolean = false;
                instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean.string = 'deletePrivileged';
                
                var instancesOfDeletePrivilegedDiscriminatedSuperClass = new InstanceSet(DeletePrivilegedDiscriminatedSuperClass, [
                    instanceOfDeletePrivilegedDiscriminatedSuperClassPasses,
                    instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                    instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                    instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean
                ]);
    
                // DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass Instances
                var instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses = new Instance(DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass);
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses.name = 'instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses';
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed;  
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses.boolean = true;
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses.string = 'deletePrivileged';         
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses.number = 1;
    
                var instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship = new Instance(DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass);
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship.name = 'instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship';
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassNotAllowed;             
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship.number = 1;
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship.boolean = true;
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship.string = 'deletePrivileged';
    
                var instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean = new Instance(DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass);
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean.name = 'instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean';
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed;     
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean.boolean = false;
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean.string = 'deletePrivileged';
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean.number = 1;
    
                var instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString = new Instance(DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass);
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString.name = 'instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString';
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed;     
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString.boolean = true;
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString.string = 'not deletePrivileged';            
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString.number = 1;
    
                var instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber = new Instance(DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass);
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber.name = 'instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber';
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber.deletePrivilegedBy = instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed;
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber.boolean = true;
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber.string = 'deletePrivileged';      
                instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber.number = -1;
                
                var instancesOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass = new InstanceSet(DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass, [
                    instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses,
                    instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                    instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                    instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                    instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber
                ]);
    
                var deletePrivilegedInstances = new InstanceSet(DeletePrivilegedSuperClass);
                deletePrivilegedInstances.addInstances(instancesOfDeletePrivilegedSuperClass);
                deletePrivilegedInstances.addInstances(instancesOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClass);
                deletePrivilegedInstances.addInstances(instancesOfDeletePrivilegedDiscriminatedSuperClass);
                deletePrivilegedInstances.addInstances(instancesOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass);
    
                // DeletePrivilegedClassDeletePrivilegedByParameters Instances
                var instanceOfDeletePrivilegedClassDeletePrivilegedByParameters = new Instance(DeletePrivilegedClassDeletePrivilegedByParameters);
    
            }
    
            // Save all SecurityFilter Test Instances
            before(async () => {
                await instanceOfClassPrivilegesDeletePrivilegedSuperClassAllowed.save();
                await instanceOfClassPrivilegesDeletePrivilegedSuperClassNotAllowed.save();
    
            });
    
            after(async () => {
                await ClassPrivilegesDeletePrivilegedSuperClass.clear();
                await DeletePrivilegedSuperClass.clear();
                await DeletePrivilegedSubClassOfDeletePrivilegedSuperClass.clear();
                await DeletePrivilegedDiscriminatedSuperClass.clear();
                await DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass.clear();
                await DeletePrivilegedClassDeletePrivilegedByParameters.clear();
            });
    
            describe('Tests for invalid arguments.', () => {
    
                it('First Argument must be an InstanceSet', async () => {
                    let updatable;
                    const expectedErrorMessage = 'Incorrect parameters. ' + DeletePrivilegedSuperClass.className + '.deletePrivilegeCheck(InstanceSet instanceSet, deletePrivilegeMethodParameter)';
                    const instanceSet = new InstanceSet(DeletePrivilegedSuperClass, [instanceOfDeletePrivilegedSuperClassPasses, instanceOfDeletePrivilegedSuperClassPasses]);
    
                    try {
                        updatable = await DeletePrivilegedSuperClass.deletePrivilegeCheck(instanceOfDeletePrivilegedSuperClassPasses);
                    }
                    catch (error) {
                        if (error.message != expectedErrorMessage) {
                            throw  new Error(
                                'deletePrivilegeCheck() threw an unexpected error.\n' + 
                                'Expected: ' + expectedErrorMessage + '\n' + 
                                'Actual:   ' + error.message
                            );
                        }
                    }
    
                    if (updatable)
                        throw new Error ('ClassModel.deletePrivilegeCheck() returned when it should have thrown an error.');
                });
    
            });
    
            describe('Delete Control Methods Are Inherited', () => {
                
                it('A class with no supers has only it\'s own delete control method.', () => {
                    if (DeletePrivilegedSuperClass.deletePrivilegeMethods.length === 0)
                        throw new Error('Class is missing it\'s own delete control method.');
    
                    if (DeletePrivilegedSuperClass.deletePrivilegeMethods.length > 1)
                        throw new Error('Class has more than one delete control method.');
                });
    
                it('A sub class has both it\'s own delete control method, and the super class\' delete control method.', () => {
                    if (DeletePrivilegedSubClassOfDeletePrivilegedSuperClass.deletePrivilegeMethods.length < 2)
                        throw new Error('Class is missing a delete control method.');
                    
                    if (DeletePrivilegedSubClassOfDeletePrivilegedSuperClass.deletePrivilegeMethods.length != 2)
                        throw new Error('Class is has the wrong number of delete control methods.');
                });
    
                it('A discriminated sub class has all the delete control methods it should.', () => {
                    if (DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass.deletePrivilegeMethods.length != 4)
                        throw new Error('Class is has the wrong number of delete control methods.');
                });
            
            });
    
            describe('Test Delete Control Check throws error when an instance doesn\'t pass check.', () => {
    
                describe('UnPrivilegedSuperClass.deletePrivilegeCheck()', () => {
    
                    it('Delete Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UnPrivilegedSuperClass, [instanceOfDeletePrivilegedSuperClassFailsRelationship]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UnPrivilegedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Delete Control Check called on Class with instances of class and sub class.', async () => {
                        const instanceSet = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UnPrivilegedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Delete Control Check called on Class with instances of class and 3 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(UnPrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  UnPrivilegedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('DeletePrivilegedSuperClass.deletePrivilegeCheck()', () => {
    
                    it('Delete Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(DeletePrivilegedSuperClass, [instanceOfDeletePrivilegedSuperClassFailsRelationship]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  DeletePrivilegedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Delete Control Check called on Class with instances of class and sub class.', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  DeletePrivilegedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Delete Control Check called on Class with instances of class and 3 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  DeletePrivilegedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('DeletePrivilegedSubClassOfDeletePrivilegedSuperClass.deletePrivilegeCheck()', () => {
    
                    it('Delete Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship,
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  DeletePrivilegedSubClassOfDeletePrivilegedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Delete Control Check called on Class with instances of class and 1 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  DeletePrivilegedSubClassOfDeletePrivilegedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Delete Control Check called on Class with instances of 2 layers of sub classes.', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  DeletePrivilegedSubClassOfDeletePrivilegedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('DeletePrivilegedDiscriminatedSuperClass.deletePrivilegeCheck()', () => {
    
                    it('Delete Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const instancesExpectedToFail = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  DeletePrivilegedDiscriminatedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                    it('Delete Control Check called on Class with instances of 1 layers of sub classes', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  DeletePrivilegedDiscriminatedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass.deletePrivilegeCheck()', () => {
    
                    it('Delete Control Check called on Class with only direct instances of Class.', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const instancesExpectedToFail = new InstanceSet(DeletePrivilegedSuperClass, [
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfDeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  DeletePrivilegedSubClassOfDeletePrivilegedDiscriminatedSuperClass.deletePrivilegeCheck(instanceSet);
                        });
                    });
    
                });
    
                describe('DeletePrivilegedClassDeletePrivilegedByParameters.deletePrivilegeCheck()', () => {
    
                    it('Delete Control Check passes', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedClassDeletePrivilegedByParameters, [instanceOfDeletePrivilegedClassDeletePrivilegedByParameters]);
                        const parameters = {
                            numberA: 1, 
                            numberB: 1,
                            boolean: true,
                        }
                        await DeletePrivilegedClassDeletePrivilegedByParameters.deletePrivilegeCheck(instanceSet, parameters);
                    });
    
                    it('Instance fails delete control check because of Numbers.', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedClassDeletePrivilegedByParameters, [
                            instanceOfDeletePrivilegedClassDeletePrivilegedByParameters,
                        ]);
                        const instancesExpectedToFail = new InstanceSet(DeletePrivilegedClassDeletePrivilegedByParameters, [instanceOfDeletePrivilegedClassDeletePrivilegedByParameters]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
                        const parameters = {
                            numberA: -2, 
                            numberB: 1,
                            boolean: true,
                        }
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return DeletePrivilegedClassDeletePrivilegedByParameters.deletePrivilegeCheck(instanceSet, parameters);
                        });
                    });
    
                    it('Instance fails delete control check because of Boolean.', async () => {
                        const instanceSet = new InstanceSet(DeletePrivilegedClassDeletePrivilegedByParameters, [
                            instanceOfDeletePrivilegedClassDeletePrivilegedByParameters,
                        ]);
                        const instancesExpectedToFail = new InstanceSet(DeletePrivilegedClassDeletePrivilegedByParameters, [instanceOfDeletePrivilegedClassDeletePrivilegedByParameters]);
                        const expectedErrorMessage = 'Illegal attempt to delete instances: ' + instancesExpectedToFail.getInstanceIds();
                        const parameters = {
                            numberA: 1, 
                            numberB: 1,
                            boolean: false,
                        }
    
                        await testForErrorAsync('ClassModel.deletePrivilegeCheck', expectedErrorMessage, async () => {
                            return  DeletePrivilegedClassDeletePrivilegedByParameters.deletePrivilegeCheck(instanceSet, parameters);
                        });
                    });
    
                });
    
            });
    
        });
    
        describe('ClassModel.sensitivePrivilegeFilter()', () => {
    
            // Set up sensitivePrivileged Instances
            // For each class, create on instance which will pass all sensitive control filters, and one each that will fail due to one of the sensitive control methods
            {
                // ClassPrivilegesSensitivePrivilegedSuperClass Instances
                var instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed = new Instance(ClassPrivilegesSensitivePrivilegedSuperClass);
                instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed.assign({
                    allowed: true,
                });
                
                var instanceOfClassPrivilegesSensitivePrivilegedSuperClassNotAllowed = new Instance(ClassPrivilegesSensitivePrivilegedSuperClass);
                instanceOfClassPrivilegesSensitivePrivilegedSuperClassNotAllowed.assign({
                    allowed: false,
                });
    
                // SensitivePrivilegedSuperClass Instances
                var instanceOfSensitivePrivilegedSuperClassPasses = new Instance(SensitivePrivilegedSuperClass);
                instanceOfSensitivePrivilegedSuperClassPasses.assign({
                    name: 'instanceOfSensitivePrivilegedSuperClassPasses',
                    SSN: '123456789',
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed,
                });
    
                var instanceOfSensitivePrivilegedSuperClassFailsRelationship = new Instance(SensitivePrivilegedSuperClass);
                instanceOfSensitivePrivilegedSuperClassFailsRelationship.assign({
                    name: 'instanceOfSensitivePrivilegedSuperClassFailsRelationship',
                    SSN: '123456789',
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassNotAllowed,
                });
    
                // SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass Instances
                var instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses = new Instance(SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass);
                instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses.assign({
                    name: 'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses',
                    SSN: '123456789',
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed,
                    boolean: true,
                });
    
                var instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship = new Instance(SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass);
                instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship.assign({
                    name: 'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship',
                    SSN: '123456789',
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassNotAllowed,
                    boolean: true,
                });
    
                var instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean = new Instance(SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass);
                instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean.assign({
                    name: 'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean',
                    SSN: '123456789',
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed,
                    boolean: false,
                });
    
                // SensitivePrivilegedDiscriminatedSuperClass Instances
                var instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses = new Instance(SensitivePrivilegedDiscriminatedSuperClass);
                instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses.assign({
                    name: 'instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses',
                    SSN: '123456789',
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed,
                    boolean: true,
                    string: 'sensitivePrivileged',
                });
    
                var instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship = new Instance(SensitivePrivilegedDiscriminatedSuperClass);
                instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship.assign({
                    name: 'instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship',
                    SSN: '123456789',
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassNotAllowed,
                    boolean: true,
                    string: 'sensitivePrivileged',
                });
    
                var instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString = new Instance(SensitivePrivilegedDiscriminatedSuperClass);
                instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString.assign({
                    name: 'instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString',
                    SSN: '123456789',
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed,
                    boolean: true,
                    string: 'not sensitivePrivileged',
                });
    
                var instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean = new Instance(SensitivePrivilegedDiscriminatedSuperClass);
                instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean.assign({
                    name: 'instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean',
                    SSN: '123456789',
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed,
                    boolean: false,
                    string: 'sensitivePrivileged',
                });
    
                // SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass Instances
                var instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses = new Instance(SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass);
                instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses.assign({
                    name: 'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses',
                    SSN: '123456789',
                    DOB: new Date('2000-01-01'),
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed,
                    boolean: true,
                    string: 'sensitivePrivileged',
                    number: 1,
                });
    
                var instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship = new Instance(SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass);
                instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship.assign({
                    name: 'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship',
                    SSN: '123456789',
                    DOB: new Date('2000-01-01'),
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassNotAllowed,
                    boolean: true,
                    string: 'sensitivePrivileged',
                    number: 1,
                });
    
                var instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean = new Instance(SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass);
                instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean.assign({
                    name: 'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean',
                    SSN: '123456789',
                    DOB: new Date('2000-01-01'),
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed,
                    boolean: false,
                    string: 'sensitivePrivileged',
                    number: 1,
                });
    
                var instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString = new Instance(SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass);
                instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString.assign({
                    name: 'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString',
                    SSN: '123456789',
                    DOB: new Date('2000-01-01'),
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed,
                    boolean: true,
                    string: 'not sensitivePrivileged',
                    number: 1,
                });
    
                var instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber = new Instance(SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass);
                instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber.assign({
                    name: 'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber',
                    SSN: '123456789',
                    DOB: new Date('2000-01-01'),
                    sensitivePrivilegedBy: instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed,
                    boolean: true,
                    string: 'sensitivePrivileged',
                    number: -1,
                });
    
                // SensitivePrivilegedClassSensitivePrivilegedByParameters Instances
                var instanceOfSensitivePrivilegedClassSensitivePrivilegedByParameters = new Instance(SensitivePrivilegedClassSensitivePrivilegedByParameters);
                instanceOfSensitivePrivilegedClassSensitivePrivilegedByParameters.assign({
                    SSN: '123456789',
                    DOB: new Date('2000-01-01'),
                });
    
            }
    
            // Save all SecurityFilter Test Instances
            before(async () => {
                await Promise.all([
                    instanceOfClassPrivilegesSensitivePrivilegedSuperClassAllowed.save(),
                    instanceOfClassPrivilegesSensitivePrivilegedSuperClassNotAllowed.save(),
                    instanceOfSensitivePrivilegedSuperClassPasses.save(),
                    instanceOfSensitivePrivilegedSuperClassFailsRelationship.save(),
                    instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses.save(),
                    instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship.save(),
                    instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean.save(),
                    instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses.save(),
                    instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship.save(),
                    instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString.save(),
                    instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean.save(),
                    instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses.save(),
                    instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship.save(),
                    instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean.save(),
                    instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString.save(),
                    instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber.save(),
                ]);
            });
    
            after(async () => {
                await ClassPrivilegesSensitivePrivilegedSuperClass.clear();
                await SensitivePrivilegedSuperClass.clear();
                await SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass.clear();
                await SensitivePrivilegedDiscriminatedSuperClass.clear();
                await SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass.clear();
                await SensitivePrivilegedClassSensitivePrivilegedByParameters.clear();
            });
    
            describe('Tests for invalid arguments.', () => {
    
                it('First argument must be an InstanceSet.', async () => {
                    let expectedErrorMessage = 'Incorrect parameters. ' + SensitivePrivilegedSuperClass.className + '.sensitivePrivilegeFilter(InstanceSet instanceSet, sensitivePrivilegeMethodParameter)';
                    await testForErrorAsync('ClassModel.sensitivePrivilegeFilter()', expectedErrorMessage, async () => {
                        return SensitivePrivilegedSuperClass.sensitivePrivilegeFilter();
                    });
                });
    
                it('First argument must be an InstanceSet.', async () => {
                    let expectedErrorMessage = 'Incorrect parameters. ' + SensitivePrivilegedSuperClass.className + '.sensitivePrivilegeFilter(InstanceSet instanceSet, sensitivePrivilegeMethodParameter)';
                    await testForErrorAsync('ClassModel.sensitivePrivilegeFilter()', expectedErrorMessage, async () => {
                        return SensitivePrivilegedSuperClass.sensitivePrivilegeFilter({ some: 'object' });
                    });
                });
    
            });
    
            describe('Sensitive Control Methods Are Inherited', () => {
                
                it('A class with no supers has only it\'s own sensitive control method.', () => {
                    if (SensitivePrivilegedSuperClass.sensitivePrivilegeMethods.length === 0)
                        throw new Error('Class is missing it\'s own sensitive control method.');
    
                    if (SensitivePrivilegedSuperClass.sensitivePrivilegeMethods.length > 1)
                        throw new Error('Class has more than one sensitive control method.');
                });
    
                it('A sub class has both it\'s own sensitive control method, and the super class\' sensitive control method.', () => {
                    if (SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass.sensitivePrivilegeMethods.length < 2)
                        throw new Error('Class is missing a sensitive control method.');
                    
                    if (SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass.sensitivePrivilegeMethods.length != 2)
                        throw new Error('Class is has the wrong number of sensitive control methods.');
                });
    
                it('A discriminated sub class has all the sensitive control methods it should.', () => {
                    if (SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass.sensitivePrivilegeMethods.length != 4)
                        throw new Error('Class is has the wrong number of sensitive control methods.');
                });
            
            });
    
            describe('Test instances that fail sensitive control check are returned.', () => {
    
                describe('SensitivePrivilegedSuperClass.sensitivePrivilegeFilter()', () => {
    
                    it('Sensitive Control Check called on Class with only direct instances of Class.', async () => {
                        const classModel = UnPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);

                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Sensitive Control Check called on Class with instances of class and sub class.', async () => {
                        const classModel = UnPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Sensitive Control Check called on Class with instances of class and 2 layers of sub classes.', async () => {
                        const classModel = UnPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Sensitive Control Check called on Class with instances of 3 layers of sub classes.', async () => {
                        const classModel = UnPrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfUnPrivilegedSuperClass,
                            instanceOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
    
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
                describe('SensitivePrivilegedSuperClass.sensitivePrivilegeFilter()', () => {
    
                    it('Sensitive Control Check called on Class with only direct instances of Class.', async () => {
                        const classModel = SensitivePrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Sensitive Control Check called on Class with instances of class and sub class.', async () => {
                        const classModel = SensitivePrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Sensitive Control Check called on Class with instances of class and 2 layers of sub classes.', async () => {
                        const classModel = SensitivePrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Sensitive Control Check called on Class with instances of 3 layers of sub classes.', async () => {
                        const classModel = SensitivePrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
    
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
                describe('SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass.sensitivePrivilegeFilter()', () => {
    
                    it('Sensitive Control Check called on Class with only direct instances of Class.', async () => {
                        const classModel = SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Sensitive Control Check called on Class with instances of class and 1 layers of sub classes.', async () => {
                        const classModel = SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Sensitive Control Check called on Class with instances of 2 layers of sub classes.', async () => {
                        const classModel = SensitivePrivilegedSubClassOfSensitivePrivilegedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
                describe('SensitivePrivilegedDiscriminatedSuperClass.sensitivePrivilegeFilter()', () => {
    
                    it('Sensitive Control Check called on Class with only direct instances of Class.', async () => {
                        const classModel = SensitivePrivilegedDiscriminatedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Sensitive Control Check called on Class with instances of 1 layers of sub classes.', async () => {
                        const classModel = SensitivePrivilegedDiscriminatedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber,
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
                describe('SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass.sensitivePrivilegeFilter()', () => {
    
                    it('Sensitive Control Check called on Class with only direct instances of Class.', async () => {
                        const classModel = SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsString,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean,
                            instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsNumber,
                        ]);
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
                describe('SensitivePrivilegedClassSensitivePrivilegedByParameters.sensitivePrivilegeFilter()', () => {
    
                    it('Instance passes sensitive control check and is not returned', async () => {
                        const classModel = SensitivePrivilegedClassSensitivePrivilegedByParameters;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedClassSensitivePrivilegedByParameters,
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel);
                        const parameters = {
                            numberA: 1,
                            numberB: 1,
                            boolean: true,
                        }
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet, parameters);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Instance fails sensitive control check because of Numbers and is returned.', async () => {
                        const classModel = SensitivePrivilegedClassSensitivePrivilegedByParameters;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedClassSensitivePrivilegedByParameters,
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedClassSensitivePrivilegedByParameters
                        ]);
                        const parameters = {
                            numberA: -2,
                            numberB: 1,
                            boolean: true,
                        }
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet, parameters);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                    it('Instance fails sensitive control check because of Boolean and is returned.', async () => {
                        const classModel = SensitivePrivilegedClassSensitivePrivilegedByParameters;
                        const instanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedClassSensitivePrivilegedByParameters,
                        ]);
                        const expectedInstanceSet = new InstanceSet(classModel, [
                            instanceOfSensitivePrivilegedClassSensitivePrivilegedByParameters
                        ]);
                        const parameters = {
                            numberA: 1,
                            numberB: 1,
                            boolean: false,
                        }
    
                        const filteredInstanceSet = await classModel.sensitivePrivilegeFilter(instanceSet, parameters);
                        
                        if (!expectedInstanceSet.equals(filteredInstanceSet))
                            throw new Error('classModel.sensitivePrivilegeFilter() did not return the expected InstanceSet.');
                    });
    
                });
    
            });
    
            describe('Test find methods for stripping of sensitive attributes.', () => {
    
                describe('Test findById() with sensitive filtering', () => {
    
                    it('Call findById() on an instance of an sensitive controlled class. Instance passes and attributes are not stripped.', async () => {
                        const classToCallFindByIdOn = SensitivePrivilegedSuperClass;
                        const instanceToFind = instanceOfSensitivePrivilegedSuperClassPasses;
                        const instanceFound = await classToCallFindByIdOn.findById(instanceToFind._id);
    
                        if (!instanceFound)
                            throw new Error('findById() did not return an instance.');

                        if (instanceFound.SSN !== '123456789') {
                            throw new Error('Attribute was stripped when it shouldn\'t have been.');
                        }
                    });
    
                    it('Call findById() on an instance of an sensitive controlled class, from super class. Instance passes and attributes are not stripped.', async () => {
                        const classToCallFindByIdOn = SensitivePrivilegedSuperClass;
                        const instanceToFind = instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses;
                        const instanceFound = await classToCallFindByIdOn.findById(instanceToFind._id);
    
                        if (!instanceFound)
                            throw new Error('findById() did not return an instance.');

                        if (instanceFound.SSN !== '123456789') {
                            throw new Error('Attribute was stripped when it shouldn\'t have been.');
                        }
    
                    });
    
                    it('Call findById() on an instance of an sensitive controlled class. Instance fails and attribute stripped.', async () => {
                        const classToCallFindByIdOn = SensitivePrivilegedSuperClass;
                        const instanceToFind = instanceOfSensitivePrivilegedSuperClassFailsRelationship;
                        const instanceFound = await classToCallFindByIdOn.findById(instanceToFind._id);
    
                        if (!instanceFound)
                            throw new Error('findById() did not return an instance.');

                        if (instanceFound.name === null) {
                            throw new Error('A non-sensitive attribute was stripped.');
                        }

                        if (instanceFound.SSN !== null) {
                            throw new Error('Attribute was not stripped when it should have been.');
                        }
                    });
    
                    it('Call findById() on an instance of an sensitive controlled class, from super class. Instance does not pass filter based on super sensitive control method. Attributes stripped.', async () => {
                        const classToCallFindByIdOn = SensitivePrivilegedSuperClass;
                        const instanceToFind = instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship;
                        const instanceFound = await classToCallFindByIdOn.findById(instanceToFind._id);
    
                        if (!instanceFound) {
                            throw new Error('findById() did not return an instance.');
                        }

                        if (instanceFound.name === null) {
                            throw new Error('A non-sensitive attribute was stripped.');
                        }

                        if (instanceFound.SSN !== null) {
                            throw new Error('Attribute was not stripped when it should have been.');
                        }
                    });
    
                    it('Call findById() on an instance of an sensitive controlled class, from super class. Instance does not pass filter based on it\'s own sensitive control method. Attributes stripped.', async () => {
                        const classToCallFindByIdOn = SensitivePrivilegedSuperClass;
                        const instanceToFind = instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean;
                        const instanceFound = await classToCallFindByIdOn.findById(instanceToFind._id);
    
                        if (!instanceFound) {
                            throw new Error('findById() did not return an instance.');
                        }
                        
                        if (instanceFound.name === null) {
                            throw new Error('A non-sensitive attribute was stripped.');
                        }
                        
                        if (instanceFound.SSN !== null) {
                            throw new Error('Attribute was not stripped when it should have been.');
                        }
                    });
    
                });
    
                describe('Test findOne() with sensitive filtering', () => {
    
                    it('Call findOne() on an instance of an sensitive controlled class. Instance passes filter. Attributes not stripped.', async () => {
                        const classToCallFindByIdOn = SensitivePrivilegedSuperClass;
                        const instanceToFind = instanceOfSensitivePrivilegedSuperClassPasses;
    
                        const filter = {
                            name: 'instanceOfSensitivePrivilegedSuperClassPasses'
                        }
    
                        const instanceFound = await classToCallFindByIdOn.findOne(filter);
    
                        if (!instanceFound) {
                            throw new Error('findOne() did not return an instance.');
                        }
                        if (instanceFound.SSN !== '123456789') {
                            throw new Error('Attribute was stripped when it should not have been.');
                        }
                    });
    
                    it('Call findOne() on an instance of an sensitive controlled class, from super class. Instance passes and attributes are not stripped.', async () => {
                        const classToCallFindByIdOn = SensitivePrivilegedSuperClass;
                        const instanceToFind = instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses;
    
                        const filter = {
                            name: 'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses'
                        }
    
                        const instanceFound = await classToCallFindByIdOn.findOne(filter);
    
                        if (!instanceFound) {
                            throw new Error('findOne() did not return an instance.');
                        }
                        if (instanceFound.SSN !== '123456789') {
                            throw new Error('Attribute was stripped when it should not have been.');
                        }
                    });
    
                    it('Call findOne() on an instance of an sensitive controlled class. Instance does not pass filter and attributes are stripped.', async () => {
                        const classToCallFindByIdOn = SensitivePrivilegedSuperClass;
    
                        const filter = {
                            name: 'instanceOfSensitivePrivilegedSuperClassFailsRelationship'
                        }
    
                        const instanceFound = await classToCallFindByIdOn.findOne(filter);
    
                        if (!instanceFound) {
                            throw new Error('findOne() did not return an instance.');
                        }
                        if (instanceFound.SSN !== null) {
                            throw new Error('Attribute was not stripped when it should have been.');
                        }
    
                    });
    
                    it('Call findOne() on an instance of an sensitive controlled class, from super class. Instance does not pass filter based on super sensitive control method and attributes are stripped.', async () => {
                        const classToCallFindByIdOn = SensitivePrivilegedSuperClass;
    
                        const filter = {
                            name: 'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship'
                        }
    
                        const instanceFound = await classToCallFindByIdOn.findOne(filter);
    
                        if (!instanceFound) {
                            throw new Error('findOne() did not return an instance.');
                        }
                        if (instanceFound.SSN !== null) {
                            throw new Error('Attribute was not stripped when it should have been.');
                        }
    
                    });
    
                    it('Call findOne() on an instance of an sensitive controlled class, from super class. Instance does not pass filter based on it\'s own sensitive control method and attributes are stripped.', async () => {
                        const classToCallFindByIdOn = SensitivePrivilegedSuperClass;
    
                        const filter = {
                            name: 'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean'
                        }
    
                        const instanceFound = await classToCallFindByIdOn.findOne(filter);
    
                        if (!instanceFound) {
                            throw new Error('findOne() did not return an instance.');
                        }
                        if (instanceFound.SSN !== null) {
                            throw new Error('Attribute was not stripped when it should have been.');
                        }
    
                    });
    
                });
    
                describe('Test find() with sensitive filtering', () => {
    
                    it('Call find() on sensitive controlled super class with a passing and not passing instance of each sub class.', async () => {
                        const instanceNames = [
                            'instanceOfSensitivePrivilegedSuperClassPasses',
                            'instanceOfSensitivePrivilegedSuperClassFailsRelationship',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean',
                            'instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses',
                            'instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship',
                            'instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString',
                            'instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean',
                            'SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass',
                            'SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass'
                        ];
    
                        const instancesFound = await SensitivePrivilegedSuperClass.find({name: {$in: instanceNames}});
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedSuperClassPasses._id).SSN !== '123456789') {
                            throw new Error('An instance was stripped when it should not have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses._id).SSN !== '123456789') {
                            throw new Error('An instance was stripped when it should not have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses._id).SSN !== '123456789') {
                            throw new Error('An instance was stripped when it should not have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses._id).SSN !== '123456789') {
                            throw new Error('An instance was stripped when it should not have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses._id).DOB === null) {
                            throw new Error('An instance was stripped when it should not have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedSuperClassFailsRelationship._id).SSN !== null) {
                            throw new Error('An instance was not stripped when it should have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship._id).SSN !== null) {
                            throw new Error('An instance was not stripped when it should have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString._id).SSN !== null) {
                            throw new Error('An instance was not stripped when it should have been.');
                        }
    
                    });
    
                });
    
                describe('Test findPage() with sensitive filtering', () => {
    
                    it('Call findPage() on sensitive controlled super class with a passing and not passing instance of each sub class.', async () => {
                        const instanceNames = [
                            'instanceOfSensitivePrivilegedSuperClassPasses',
                            'instanceOfSensitivePrivilegedSuperClassFailsRelationship',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsRelationship',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassFailsBoolean',
                            'instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses',
                            'instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship',
                            'instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString',
                            'instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship',
                            'instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassFailsBoolean',
                            'SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass',
                            'SensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClass'
                        ];
    
                        const instancesFound = (await SensitivePrivilegedSuperClass.findPage({name: {$in: instanceNames}}, 0, 100)).instances;
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedSuperClassPasses._id).SSN !== '123456789') {
                            throw new Error('An instance was stripped when it should not have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedSuperClassPasses._id).SSN !== '123456789') {
                            throw new Error('An instance was stripped when it should not have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedDiscriminatedSuperClassPasses._id).SSN !== '123456789') {
                            throw new Error('An instance was stripped when it should not have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses._id).SSN !== '123456789') {
                            throw new Error('An instance was stripped when it should not have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedSubClassOfSensitivePrivilegedDiscriminatedSuperClassPasses._id).DOB === null) {
                            throw new Error('An instance was stripped when it should not have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedSuperClassFailsRelationship._id).SSN !== null) {
                            throw new Error('An instance was not stripped when it should have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsRelationship._id).SSN !== null) {
                            throw new Error('An instance was not stripped when it should have been.');
                        }
                        
                        if (instancesFound.getInstanceWithId(instanceOfSensitivePrivilegedDiscriminatedSuperClassFailsString._id).SSN !== null) {
                            throw new Error('An instance was not stripped when it should have been.');
                        }
    
                    });
    
                });
    
            });
    
        });

    });

    describe('Validations', () => {

        describe('Validations are Inheritted', () => {

            it('Class has it\'s own validations set', () => {
                if (ValidationSuperClass.validations.length !== 2)
                    throw new Error('Class does not have the correct number of validations.');
            });

            it('Class has it\'s own validations set and inherits from direct parent class.', () => {
                if (SubClassOfValidationSuperClass.validations.length !== 3)
                    throw new Error('Class does not have the correct number of validations.');
            });

            it('Discriminated sub class inherits validations.', () => {
                if (SubClassOfValidationDiscriminatedSuperClass.validations.length !== 4)
                    throw new Error('Class does not have the correct number of validations.');
            });

        });

    });

    describe('Class Model Custom Static Methods', () => {

        after(async () => {
            await StaticMethodClass.clear();
        });

        it('Can call a basic custom static method.', () => {
            if (StaticMethodClass.sayHello() !== 'hello') {
                throw new Error('Static method did not work correctly');
            }
        });

        it('Can call a custom static method which uses this.', () => {
            if (StaticMethodClass.sayClassName() !== 'StaticMethodClass') {
                throw new Error('Static method did not work correctly');
            }
        });

        it('Can call a custom static method which uses this to call another function.', () => {
            if (StaticMethodClass.customToString() !== 'StaticMethodClass\n') {
                throw new Error('Static method did not work correctly');
            }
        });

        it('Can call a custom static method which uses this to call another function with parameters.', () => {
            const instance = new Instance(StaticMethodClass);

            if (StaticMethodClass.isInstanceOfThisClassCustom(instance) !== true) {
                throw new Error('Static method did not work correctly');
            }
        });

        it('Can call a custom static method which uses this to call another async function with parameters.', async () => {
            const instance = new Instance(StaticMethodClass);
            await instance.save();
            const foundInstance = await StaticMethodClass.findByIdCustom(instance._id);
            

            if (!instance.equals(foundInstance)) {
                throw new Error('Static method did not work correctly');
            }
        });

    });

    describe('ClassModel.cardinalityOfRelationship()', () => {

        it('null to one.', () => {
            const cardinality = SingularRelationshipClass.cardinalityOfRelationship('singularRelationship');

            if (cardinality.from !== null || cardinality.to !== '1')
                throw new Error('incorrect cardinallity: ' + JSON.stringify(cardinality));
        });

        it('null to many.', () => {
            const cardinality = NonSingularRelationshipClass.cardinalityOfRelationship('nonSingularRelationship');

            if (cardinality.from !== null || cardinality.to !== 'many')
                throw new Error('incorrect cardinallity: ' + JSON.stringify(cardinality));
        });

        it('one to one.', () => {
            const cardinality = TwoWayRelationshipClass1.cardinalityOfRelationship('oneToOne');

            if (cardinality.from !== '1' || cardinality.to !== '1')
                throw new Error('incorrect cardinallity: ' + JSON.stringify(cardinality));
        });

        it('one to many.', () => {
            const cardinality = TwoWayRelationshipClass1.cardinalityOfRelationship('oneToMany');

            if (cardinality.from !== '1' || cardinality.to !== 'many')
                throw new Error('incorrect cardinallity: ' + JSON.stringify(cardinality));            
        });

        it('many to one.', () => {
            const cardinality = TwoWayRelationshipClass1.cardinalityOfRelationship('manyToOne');

            if (cardinality.from !== 'many' || cardinality.to !== '1')
                throw new Error('incorrect cardinallity: ' + JSON.stringify(cardinality));       
        });

        it('many to many.', () => {
            const cardinality = TwoWayRelationshipClass1.cardinalityOfRelationship('manyToMany');

            if (cardinality.from !== 'many' || cardinality.to !== 'many')
                throw new Error('incorrect cardinallity: ' + JSON.stringify(cardinality));       
        });

    });

    describe('ClassModel.allSuperClasses()', () => {

        it('All super classes returns all super classes for class model. Discriminated Sub Class', () => {
            const superClasses = SubClassOfDiscriminatedSubClassOfSuperClass.allSuperClasses().map(c => c.className);

            if (superClasses.length !== 3) {
                throw new Error('Incorrect number of super classes.');
            }

            if (!superClasses.includes('NoommanClassModel')) {
                throw new Error('Class Model did not inherit from NoommanClassModel.');
            }
        });

        it('All super classes returns all super classes for class model. Class with multiple direct parent classes.', () => {
            const superClasses = SubClassOfMultipleSuperClasses.allSuperClasses().map(c => c.className);

            if (superClasses.length !== 3) {
                throw new Error('Incorrect number of super classes.');
            }

            if (!superClasses.includes('NoommanClassModel')) {
                throw new Error('Class Model did not inherit from NoommanClassModel.');
            }
        });

    });

    describe('ClassModel.allSubClasses()', () => {

        it('Returns all subclasses all the way down the inheritance tree.', () => {
            if (!arraysEqual(SuperClass.allSubClasses().map(c => c.className), [
                'SubClassOfSuperClass',
                'AbstractSubClassOfSuperClass',
                'SubClassOfMultipleSuperClasses',
                'DiscriminatedSubClassOfSuperClass',
                'SubClassOfSubClassOfSuperClass',
                'SubClassOfAbstractSubClassOfSuperClass',
                'SubClassOfDiscriminatedSubClassOfSuperClass',
            ])) {
                throw new Error('Subclasses are not as expected.');
            }
        });

    });

    describe('ClassModel.isInstanceOfThisClass', () => {

        it('All instances are instance of Class NoommanClassModel', () => {
            const instance = new Instance(SubClassOfSubClassOfSuperClass);
            const result = ClassModel.getClassModel('NoommanClassModel').isInstanceOfThisClass(instance);

            if (result !== true) {
                throw new Error('Returned false.');
            }
        });

        it('Returns true for instance of class model.', () => {
            const instance = new Instance(SubClassOfSubClassOfSuperClass);
            const result = SubClassOfSubClassOfSuperClass.isInstanceOfThisClass(instance);

            if (result !== true) {
                throw new Error('Returned false.');
            }
        });

        it('Returns true for instance of sub class of class model.', () => {
            const instance = new Instance(SubClassOfSubClassOfSuperClass);
            const result = SubClassOfSuperClass.isInstanceOfThisClass(instance);

            if (result !== true) {
                throw new Error('Returned false.');
            }
        });

        it('Returns true for instance of discriminated sub class of class model.', () => {
            const instance = new Instance(DiscriminatedSubClassOfSuperClass);
            const result = SuperClass.isInstanceOfThisClass(instance);

            if (result !== true) {
                throw new Error('Returned false.');
            }
        });

        it('Returns false for super class instances of sub class model.', () => {
            const instance = new Instance(SubClassOfSuperClass);
            const result = SubClassOfSubClassOfSuperClass.isInstanceOfThisClass(instance);

            if (result !== false) {
                throw new Error('Returned true.');
            }
        });

        it('Returns false for unrelated class models', () => {
            const instance = new Instance(SubClassOfSuperClass);
            const result = CompareClass1.isInstanceOfThisClass(instance);

            if (result !== false) {
                throw new Error('Returned true.');
            }
        });

    });

    describe('ClassModel.getAllClassModelNames()', () => {
    
        it('All classNames returned.', () => {
            const names = ClassModel.getAllClassModelNames();

            if (names.length == 0) {
                throw new Error('No names returned.');
            }
            if (names.includes('NoommanClassModel')) {
                throw new Error('Names includes NoommanClassModel.');
            }
        });

    });

    describe('ClassModel.validatePath()', () => {

        it('If path contains only valid relationships, no error thrown.', () => {
            const path = ['oneToOne', 'oneToMany', 'manyToOne', 'manyToMany'];
            TwoWayRelationshipClass1.validatePath(path);
        });

        it('If path is not an array, error thrown.', () => {
            const path = 'oneToOne';
            const expectedErrorMessage = 'Error walking path from TwoWayRelationshipClass1. Invalid path given: ' + path + '.';
            
            testForError('instance.validatePath()', expectedErrorMessage, () => {
                TwoWayRelationshipClass1.validatePath(path)
            });
        });

        it('If path is an array containing non-string elements, error thrown.', () => {
            const instance = new Instance(TwoWayRelationshipClass1);
            const path = ['oneToOne', 'oneToMany', 'manyToOne', 1];
            const expectedErrorMessage = 'Error walking path from TwoWayRelationshipClass1. Invalid path given: ' + path + '.';
            
            testForError('instance.validatePath()', expectedErrorMessage, () => {
                TwoWayRelationshipClass1.validatePath(path)
            });
        });

        it('If path contains any invalid relationship names, error thrown.', () => {
            const instance = new Instance(TwoWayRelationshipClass1);
            const path = ['oneToOne', 'oneToMany', 'manyToOne', 'manyTo1'];
            const expectedErrorMessage = 'Error walking path from TwoWayRelationshipClass1. Invalid path given: ' + path + '.';
            
            testForError('instance.validatePath()', expectedErrorMessage, () => {
                TwoWayRelationshipClass1.validatePath(path)
            });
        });

    });

});


