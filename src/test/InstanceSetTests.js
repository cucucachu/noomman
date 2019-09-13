
require("@babel/polyfill");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const database = require('../dist/models/database');
const ClassModel = require('../dist/models/ClassModel');
const Instance = require('../dist/models/Instance');
const InstanceSet = require('../dist/models/InstanceSet');
const TestClassModels = require('./TestClassModels');
const TestingFunctions = require('./TestingFunctions');
const testForError = TestingFunctions.testForError;
const testForErrorAsync = TestingFunctions.testForErrorAsync;

// Load all TestClassModels 
{
    // Compare Classes
    var CompareClass1 = TestClassModels.CompareClass1;
    var CompareClass2 = TestClassModels.CompareClass2;

    // Simple Classes
    var TestClassWithNumber = TestClassModels.TestClassWithNumber;
    var TestClassWithBoolean = TestClassModels.TestClassWithBoolean;
    var TestClassWithAllSimpleFields = TestClassModels.TestClassWithAllSimpleFields;

    // Validation Classes
    var AllFieldsRequiredClass = TestClassModels.AllFieldsRequiredClass;
    var AllFieldsInRequiredGroupClass = TestClassModels.AllFieldsInRequiredGroupClass;
    var AbstractClass = TestClassModels.AbstractClass;    var SuperClass = TestClassModels.SuperClass;
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
    var SubClassOfDiscriminatorSuperClass = TestClassModels.SubClassOfDiscriminatorSuperClass;
    var DiscriminatedSubClassOfSuperClass = TestClassModels.DiscriminatedSubClassOfSuperClass;
    var SubClassOfDiscriminatedSubClassOfSuperClass = TestClassModels.SubClassOfDiscriminatedSubClassOfSuperClass;
    var SubClassOfSubClassOfSuperClass = TestClassModels.SubClassOfSubClassOfSuperClass;
    var SubClassOfAbstractSubClassOfSuperClass = TestClassModels.SubClassOfAbstractSubClassOfSuperClass;
}

describe('InstanceSet Tests', () => {

    before(async () => {
        await database.connect();
    });

    after(() => {
        database.close();
    });


    describe('InstanceSet Constructor Tests', () => {

        describe('InstanceSet Constructor Validations', () => {
        
            it('Constructor throws an error first argument is not a ClassModel.', () => {
                const expectedErrorMessage = 'InstanceSet.constructor() first argument must be an instance of ClassModel.'
                testForError('new InstanceSet()', expectedErrorMessage, () => {
                    const instanceSet = new InstanceSet(1);
                });
            });
            
            it('Constructor throws an error if instances argument is not iterable.', () => {
                const expectedErrorMessage = 'instances argument must be iterable.';
                const instances = 1;
                testForError('new InstanceSet()', expectedErrorMessage, () => {
                    const instanceSet = new InstanceSet(TestClassWithNumber, instances);
                });
            });
            
            it('Constructor throws an error if instances argument is not an iterable of instances.', () => {
                const expectedErrorMessage = 'Illegal attempt to add something other than instances to an InstanceSet.'
                const instances = ['1', 2];
                testForError('new InstanceSet()', expectedErrorMessage, () => {
                    const instanceSet = new InstanceSet(TestClassWithNumber, instances);
                });
            });
            
            it('Constructor throws an error any instance is not an instance of the given ClassModel.', () => {
                const expectedErrorMessage = 'Illegal attempt to add instances of a different class to an InstanceSet.'
                const instance1 = new Instance(TestClassWithNumber);
                const instance2 = new Instance(TestClassWithBoolean);
                const instances = [instance1, instance2];
                testForError('new InstanceSet()', expectedErrorMessage, () => {
                    const instanceSet = new InstanceSet(TestClassWithNumber, instances);
                });
            });

        });

        describe('InstanceSet Constructor Creates an InstanceSet', () => {

            it('new InstanceSet() works on direct instances of the ClassModel', () => {
                const instance1 = new Instance(TestClassWithNumber);
                const instance2 = new Instance(TestClassWithNumber);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(TestClassWithNumber, instances);
            });

            it('new InstanceSet() works on with instances of a subclass of the ClassModel', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(SuperClass, instances);
            });

            it('new InstanceSet() is created an has the given instances.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(SuperClass, instances);

                if (!instanceSet.has(instance1) || !instanceSet.has(instance2) || !instanceSet.size == 2)
                    throw new Error('InstanceSet was created, but it does not contain the instances.');
            });

            it('new InstanceSet() sets the classModel property.', () => {
                const instanceSet = new InstanceSet(SuperClass);

                if (instanceSet.classModel !== SuperClass)
                    throw new Error('InstanceSet was created it\'s classModel property is not set.');
            });

            it('new InstanceSet() can create an empty InstanceSet.', () => {
                const instanceSet = new InstanceSet(SuperClass);

                if (instanceSet.size)
                    throw new Error('InstanceSet was created but is not empty.');
            });

            it('new InstanceSet() can accept an InstanceSet as an argument.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet1 = new InstanceSet(SuperClass, instances);
                const instanceSet2 = new InstanceSet(SuperClass, instanceSet1)

                if (!instanceSet2.has(instance1) || !instanceSet2.has(instance2) || !instanceSet2.size == 2)
                    throw new Error('InstanceSet was created, but it does not contain the instances.');
            });

        });

    });

    describe('Adding and Removing Instances from InstanceSets', () => {

        describe('InstanceSet.add()', () => {
    
            it('instanceSet.add() throws an error if argument is not an instance.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const expectedErrorMessage = 'Illegal attempt to add something other than instances to an InstanceSet.';
    
                testForError('instanceSet.add()', expectedErrorMessage, () => {
                    instanceSet.add(1);
                });
            });
    
            it('instanceSet.add() throws an error if argument is not an instance of the classModel of the InstanceSet.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const instance = new Instance(TestClassWithBoolean);
                const expectedErrorMessage = 'Illegal attempt to add instances of a different class to an InstanceSet.';
    
                testForError('instanceSet.add()', expectedErrorMessage, () => {
                    instanceSet.add(instance);
                });
            });
    
            it('instanceSet.add() does not change the instance set if no argument given.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                instanceSet.add();
                if (instanceSet.size)
                    throw new Error('Instance.add() added something to the InstanceSet even though argument was undefined.');
            });
    
            it('instanceSet.add() does not change the instance set if instance == null.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                instanceSet.add(null);
                if (instanceSet.size)
                    throw new Error('Instance.add() added something to the InstanceSet even though argument was null.');
            });
    
            it('instanceSet.add() can add an instance of the ClassModel of the InstanceSet', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const instance = new Instance(SuperClass);
                
                instanceSet.add(instance);
    
                if (instanceSet.size != 1) 
                    throw new Error('instanceSet size is not 1.');
                if (!instanceSet.has(instance)) 
                    throw new Error('instanceSet does not contain instance.');
            });
    
            it('instanceSet.add() can add an instance of a subclass of the ClassModel of the InstanceSet', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const instance = new Instance(SubClassOfSuperClass);
                
                instanceSet.add(instance);
    
                if (instanceSet.size != 1) 
                    throw new Error('instanceSet size is not 1.');
                if (!instanceSet.has(instance)) 
                    throw new Error('instanceSet does not contain instance.');
    
            });
    
            it('instanceSet.add() can be called multiple times.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                
                instanceSet.add(instance1);
    
                if (instanceSet.size != 1) 
                    throw new Error('instanceSet size is not 1.');
                if (!instanceSet.has(instance1)) 
                    throw new Error('instanceSet does not contain instance.');
                
                    instanceSet.add(instance2);
        
                    if (instanceSet.size != 2) 
                        throw new Error('instanceSet size is not 2.');
                    if (!instanceSet.has(instance2)) 
                        throw new Error('instanceSet does not contain instance.');
    
            });
    
            it('instanceSet.add() will not add the same instance twice', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const instance = new Instance(SubClassOfSuperClass);
                
                instanceSet.add(instance);
    
                if (instanceSet.size != 1) 
                    throw new Error('instanceSet size is not 1.');
                if (!instanceSet.has(instance)) 
                    throw new Error('instanceSet does not contain instance.');
                
                instanceSet.add(instance);
    
                if (instanceSet.size != 1) 
                    throw new Error('instanceSet size is not 1.');
                if (!instanceSet.has(instance)) 
                    throw new Error('instanceSet does not contain instance.');
    
            });
    
            it('instanceSet.add() will not add the same instance twice', () => {
                const instance = new Instance(SubClassOfSuperClass);
                const instanceSet = new InstanceSet(SuperClass, [instance]);
                
                instanceSet.add(instance);
    
                if (instanceSet.size != 1) 
                    throw new Error('instanceSet size is not 1.');
                if (!instanceSet.has(instance)) 
                    throw new Error('instanceSet does not contain instance.');
                
                instanceSet.add(instance);
    
                if (instanceSet.size != 1) 
                    throw new Error('instanceSet size is not 1.');
                if (!instanceSet.has(instance)) 
                    throw new Error('instanceSet does not contain instance.');
    
            });
    
        });
    
        describe('InstanceSet.addInstances()', () => {
    
            it('instanceSet.addInstances() throws an error if given instances are not instances.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const expectedErrorMessage = 'Illegal attempt to add something other than instances to an InstanceSet.';
    
                testForError('instanceSet.addInstances()', expectedErrorMessage, () => {
                    instanceSet.addInstances([1]);
                });
            });
    
            it('instanceSet.addInstances() throws an error if argument is not iterable.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const instance = new Instance(SuperClass);
                const expectedErrorMessage = 'instances argument must be iterable.';
    
                testForError('instanceSet.addInstances()', expectedErrorMessage, () => {
                    instanceSet.addInstances(instance);
                });
            });
    
            it('instanceSet.addInstances() throws an error if given instances are not of the right ClassModel.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const instance = new Instance(TestClassWithBoolean);
                const expectedErrorMessage = 'Illegal attempt to add instances of a different class to an InstanceSet.';
    
                testForError('instanceSet.addInstances()', expectedErrorMessage, () => {
                    instanceSet.addInstances([instance]);
                });
            });
    
            it('instanceSet.addInstances() throws an error if any given instance is not of the right ClassModel.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const instance1 = new Instance(SuperClass);
                const instance2 = new Instance(TestClassWithBoolean);
                const expectedErrorMessage = 'Illegal attempt to add instances of a different class to an InstanceSet.';
    
                testForError('instanceSet.addInstances()', expectedErrorMessage, () => {
                    instanceSet.addInstances([instance1, instance2]);
                });
            });
    
            it('instanceSet.addInstances() will be unchanged if passed null.', () => {
                const instanceSet = new InstanceSet(SuperClass);
    
                instanceSet.addInstances(null);
    
                if (instanceSet.size)
                    throw new Error('Something was added to the InstanceSet.')
            });
    
            it('instanceSet.addInstances() will be unchanged if passed undefined.', () => {
                const instanceSet = new InstanceSet(SuperClass);
    
                instanceSet.addInstances();
    
                if (instanceSet.size)
                    throw new Error('Something was added to the InstanceSet.')
            });
    
            it('instanceSet.addInstances() will add instances to the set.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                
                instanceSet.addInstances([instance1, instance2]);
    
                if (instanceSet.size != 2 || !instanceSet.has(instance1) || !instanceSet.has(instance2))
                    throw new Error('Instances were not added to set.')
            });
    
            it('instanceSet.addInstances() will add instances when passed another InstanceSet.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instanceSet1 = new InstanceSet(SuperClass, [instance1, instance2]);
                const instanceSet2 = new InstanceSet(SuperClass);
                
                instanceSet2.addInstances(instanceSet1);
    
                if (instanceSet2.size != 2 || !instanceSet2.has(instance1) || !instanceSet2.has(instance2))
                    throw new Error('Instances were not added to set.')
            });
    
            it('instanceSet.addInstances() will not add the same instance twice', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const instance = new Instance(SubClassOfSuperClass);
                
                instanceSet.addInstances([instance, instance]);
    
                if (instanceSet.size != 1 || !instanceSet.has(instance))
                    throw new Error('Instances were not added to set.')
            });
    
        });
    
        describe('InstanceSet.remove()', () => {
    
            it('instanceSet.remove() called with null does not affect the InstanceSet.', () => {
                const instance = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass, [instance]);
                instanceSet.remove(null);
    
                if(instanceSet.size != 1 || !instanceSet.has(instance))
                    throw new Error('InstanceSet had instance removed.');
            });
    
            it('instanceSet.remove() called with undefined does not affect the InstanceSet.', () => {
                const instance = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass, [instance]);
                instanceSet.remove();
    
                if(instanceSet.size != 1 || !instanceSet.has(instance))
                    throw new Error('InstanceSet had instance removed.');
            });
    
            it('instanceSet.remove() called on an empty InstanceSet does not affect the InstanceSet.', () => {
                const instance = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass);
                instanceSet.remove(instance);
    
                if(instanceSet.size != 0 || instanceSet.classModel != SuperClass)
                    throw new Error('Something happened to the InstanceSet.');
            });
    
            it('instanceSet.remove() called on an InstanceSet with an Instance not in the InstanceSet does not affect the InstanceSet.', () => {
                const instance1 = new Instance(SuperClass);
                const instance2 = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass, [instance1]);
                instanceSet.remove(instance2);
    
                if(instanceSet.size != 1 || !instanceSet.has(instance1))
                    throw new Error('InstanceSet had instance removed.');
    
            });
    
            it('instanceSet.remove() removes the given Instance from the InstanceSet.', () => {
                const instance = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass);
                instanceSet.add(instance);
                instanceSet.remove(instance);
    
                if(instanceSet.size != 0 || instanceSet.has(instance))
                    throw new Error('Instance was not removed from InstanceSet.');
    
            });
    
            it('instanceSet.remove() called twice with the same instance removes the given Instance from the InstanceSet.', () => {
                const instance = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass);
                instanceSet.add(instance);
                instanceSet.remove(instance);
                instanceSet.remove(instance);
    
                if(instanceSet.size != 0 || instanceSet.has(instance))
                    throw new Error('Instance was not removed from InstanceSet.');
            });
    
        });
    
        describe('InstanceSet.removeInstances()', () => {
    
            it('instanceSet.removeInstances() throws an error when passed an argument which is not iterable.', () => {
                const instance = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass, [instance]);
                const expectedErrorMessage = 'instances argument must be iterable.';
                testForError('instanceSet.removeInstances()', expectedErrorMessage, () => {
                    instanceSet.removeInstances(instance);
                });
            });
    
            it('instanceSet.removeInstances() called with null does not affect the InstanceSet.', () => {
                const instance = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass, [instance]);
                instanceSet.removeInstances(null);
    
                if(instanceSet.size != 1 || !instanceSet.has(instance))
                    throw new Error('InstanceSet had instance removed.');
            });
    
            it('instanceSet.removeInstances() called with undefined does not affect the InstanceSet.', () => {
                const instance = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass, [instance]);
                instanceSet.removeInstances();
    
                if(instanceSet.size != 1 || !instanceSet.has(instance))
                    throw new Error('InstanceSet had instance removed.');
            });
    
            it('instanceSet.removeInstances() called on an empty InstanceSet does not affect the InstanceSet.', () => {
                const instance = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass);
                instanceSet.removeInstances([instance]);
    
                if(instanceSet.size != 0 || instanceSet.classModel != SuperClass)
                    throw new Error('Something happened to the InstanceSet.');
            });
    
            it('instanceSet.removeInstances() called on an InstanceSet with Instances not in the InstanceSet does not affect the InstanceSet.', () => {
                const instance1 = new Instance(SuperClass);
                const instance2 = new Instance(SuperClass);
                const instance3 = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass, [instance1]);
                instanceSet.removeInstances([instance2, instance3]);
    
                if(instanceSet.size != 1 || !instanceSet.has(instance1))
                    throw new Error('InstanceSet had instance removed.');
    
            });
    
            it('instanceSet.removeInstances() removes the given Instances from the InstanceSet.', () => {
                const instance1 = new Instance(SuperClass);
                const instance2 = new Instance(SuperClass);
                const instance3 = new Instance(SuperClass);
                const instances = [instance1, instance2, instance3]
                const instanceSet = new InstanceSet(SuperClass);
                instanceSet.addInstances(instances);
                instanceSet.removeInstances(instances);
    
                if(instanceSet.size != 0 || instanceSet.has(instance1) || instanceSet.has(instance2) || instanceSet.has(instance3))
                    throw new Error('Instance was not removed from InstanceSet.');
    
            });
    
            it('instanceSet.removeInstances() can be called with an InstanceSet as an argument.', () => {
                const instance1 = new Instance(SuperClass);
                const instance2 = new Instance(SuperClass);
                const instance3 = new Instance(SuperClass);
                const instances = [instance1, instance2, instance3]
                const instanceSet = new InstanceSet(SuperClass);
                instanceSet.addInstances(instances);
                instanceSet.removeInstances(instanceSet);
    
                if(instanceSet.size != 0 || instanceSet.has(instance1) || instanceSet.has(instance2) || instanceSet.has(instance3))
                    throw new Error('Instance was not removed from InstanceSet.');
    
            });
    
            it('instanceSet.removeInstances() called twice with the same instance removes the given Instance from the InstanceSet.', () => {
                const instance = new Instance(SuperClass);
                const instanceSet = new InstanceSet(SuperClass);
                instanceSet.add(instance);
                instanceSet.removeInstances([instance]);
                instanceSet.removeInstances([instance]);
    
                if(instanceSet.size != 0 || instanceSet.has(instance))
                    throw new Error('Instance was not removed from InstanceSet.');
            });
    
        });

    });

    describe('Set Math Methods', () => {

        describe('InstanceSet.equals()', () => {
    
            it('Two InstanceSets with the same instances are equal.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet1 = new InstanceSet(SuperClass, instances);
                const instanceSet2 = new InstanceSet(SuperClass, instances);
    
                if (!instanceSet1.equals(instanceSet2))
                    throw new Error('InstanceSets are not equal.\n' + 
                        'setA: ' + instanceSet1 + '\n' + 
                        'setB: ' + instanceSet2
                    );
            });
    
            it('Two InstanceSets with the same instances are equal even if they are different classes.', () => {
                const instance1 = new Instance(DiscriminatedSubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet1 = new InstanceSet(SuperClass, instances);
                const instanceSet2 = new InstanceSet(DiscriminatedSubClassOfSuperClass, instances);
    
                if (!instanceSet1.equals(instanceSet2))
                    throw new Error('InstanceSets are not equal.\n' + 
                        'setA: ' + instanceSet1 + '\n' + 
                        'setB: ' + instanceSet2
                    );
            });
    
            it('Empty Sets are equal.', () => {
                const instanceSet1 = new InstanceSet(SuperClass);
                const instanceSet2 = new InstanceSet(SuperClass);
    
                if (!instanceSet1.equals(instanceSet2))
                    throw new Error('InstanceSets are not equal.\n' + 
                        'setA: ' + instanceSet1 + '\n' + 
                        'setB: ' + instanceSet2
                    );
            });
    
            it('Two InstanceSets with the different instances of the same class are not equal.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instance4 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2];
                const instances2 = [instance3, instance4];
                const instanceSet1 = new InstanceSet(SuperClass, instances1);
                const instanceSet2 = new InstanceSet(SuperClass, instances2);
    
                if (instanceSet1.equals(instanceSet2))
                    throw new Error('InstanceSets are equal.\n' + 
                        'setA: ' + instanceSet1 + '\n' + 
                        'setB: ' + instanceSet2
                    );
            });
    
            it('Two InstanceSets with the are not equal if one is a subset of the other.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2, instance3];
                const instances2 = [instance1, instance2];
                const instanceSet1 = new InstanceSet(SuperClass, instances1);
                const instanceSet2 = new InstanceSet(SuperClass, instances2);
    
                if (instanceSet1.equals(instanceSet2))
                    throw new Error('InstanceSets are equal.\n' + 
                        'setA: ' + instanceSet1 + '\n' + 
                        'setB: ' + instanceSet2
                    );
            });
    
            it('Two InstanceSets with the are not equal if one is a subset of the other.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2, instance3];
                const instances2 = [instance1, instance2];
                const instanceSet1 = new InstanceSet(SuperClass, instances2);
                const instanceSet2 = new InstanceSet(SuperClass, instances1);
    
                if (instanceSet1.equals(instanceSet2))
                    throw new Error('InstanceSets are equal.\n' + 
                        'setA: ' + instanceSet1 + '\n' + 
                        'setB: ' + instanceSet2
                    );
            });
    
        });
    
        describe('InstanceSet.difference()', () => {
    
            it('InstanceSet.difference() throws an error if passed something other than an instance set.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(SuperClass, instances);
                const expectedErrorMessage = 'InstanceSet.difference() argument is not an InstanceSet.';
    
                testForError('instanceSet.difference()', expectedErrorMessage, () => {
                    instanceSet.difference(2);
                });
            });
    
            it('InstanceSet.difference() returns a new InstanceSet', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet1 = new InstanceSet(SuperClass, instances);
                const instanceSet2 = new InstanceSet(SuperClass, instances);
                const difference = instanceSet1.difference(instanceSet2);
    
                if (!(difference instanceof InstanceSet))
                    throw new Error('difference did not return an InstanceSet.');
            });
    
            it('InstanceSet.difference() returns an empty InstanceSet when called with the same InstanceSet.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(SuperClass, instances);
    
                const difference = instanceSet.difference(instanceSet);
    
                if (difference.size)
                    throw new Error('difference returned an InstanceSet with instances in it.');
            });
    
            it('InstanceSet.difference() returns an empty InstanceSet when both InstanceSets are equal.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet1 = new InstanceSet(SuperClass, instances);
                const instanceSet2 = new InstanceSet(SuperClass, instances);
                const difference = instanceSet1.difference(instanceSet2);
                
                if (difference.size)
                    throw new Error('difference returned an InstanceSet with instances in it.');
            });
    
            it('InstanceSet.difference() returns an InstanceSet Equal to the first InstanceSet when InstanceSets do not overlap.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instance4 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2];
                const instances2 = [instance3, instance4];
                const instanceSet1 = new InstanceSet(SuperClass, instances1);
                const instanceSet2 = new InstanceSet(SuperClass, instances2);
                const difference = instanceSet1.difference(instanceSet2);
    
                if (!difference.equals(instanceSet1))
                    throw new Error('difference does not equal the first InstanceSet.');
            });
    
            it('InstanceSet.difference() returns an InstanceSet that is the difference of the two InstanceSets.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2];
                const instances2 = [instance2, instance3];
                const instanceSet1 = new InstanceSet(SuperClass, instances1);
                const instanceSet2 = new InstanceSet(SuperClass, instances2);
                const difference = instanceSet1.difference(instanceSet2);
                const expected = new InstanceSet(SuperClass, [instance1]);
    
                if (!difference.equals(expected))
                    throw new Error('difference is not what is expected.');
            });
    
            it('InstanceSet.difference() works even when InstanceSets are for different ClassModels', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2];
                const instances2 = [instance2, instance3];
                const instanceSet1 = new InstanceSet(SuperClass, instances1);
                const instanceSet2 = new InstanceSet(SubClassOfSuperClass, instances2);
                const difference = instanceSet1.difference(instanceSet2);
                const expected = new InstanceSet(SubClassOfSuperClass, [instance1]);
    
                if (!difference.equals(expected))
                    throw new Error('difference is not what is expected.');
            });
    
        });
    
        describe('InstanceSet.union()', () => {
    
            it('instanceSet.union() throws an error if argument is not an InstanceSet.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const expectedErrorMessage = 'instanceSet.union() called with argument which is not an InstanceSet';
                testForError('instanceSet.union()', expectedErrorMessage, () => {
                    instanceSet.union(1);
                });
            });
    
            it('Cannot Union two sets if second set constains instances of a ClassModel that is not the first InstanceSet\'s classModel.', () => {
                const instanceSet1 = new InstanceSet(SuperClass, [new Instance(SuperClass)]);
                const instanceSet2 = new InstanceSet(TestClassWithNumber, [new Instance(TestClassWithNumber)]);
                const expectedErrorMessage = 'Illegal attempt to add instances of a different class to an InstanceSet.';
    
                testForError('instanceSet.union()', expectedErrorMessage, () => {
                    instanceSet1.union(instanceSet2);
                });
            });
    
            it('instanceSet.union() returns an InstanceSet equal to the InstanceSet called with itself.', () => {
                const instanceSet = new InstanceSet(SuperClass, [new Instance(SuperClass)]);
                const union = instanceSet.union(instanceSet);
                if (!union.equals(instanceSet))
                    throw new Error('Union does not equal the original InstanceSet');
            });
    
            it('instanceSet.union() returns an InstanceSet equal to the InstanceSet called on if argument is null.', () => {
                const instanceSet = new InstanceSet(SuperClass, [new Instance(SuperClass)]);
                const union = instanceSet.union(null);
                if (!union.equals(instanceSet))
                    throw new Error('Union does not equal the original InstanceSet');
    
            });
    
            it('instanceSet.union() returns an InstanceSet equal to the InstanceSet called on if argument is undefined.', () => {
                const instanceSet = new InstanceSet(SuperClass, [new Instance(SuperClass)]);
                const union = instanceSet.union();
                if (!union.equals(instanceSet))
                    throw new Error('Union does not equal the original InstanceSet');
    
            });
    
            it('instanceSet.union() returns an InstanceSet.', () => {
                const instance1 = new Instance(SuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instanceSet1 = new InstanceSet(SuperClass, [instance1]);
                const instanceSet2 = new InstanceSet(SubClassOfSuperClass, [instance2]);
                const union = instanceSet1.union(instanceSet2);
                const expected = new InstanceSet(SuperClass, [instance1, instance2]);
    
                if (!union.equals(expected))
                    throw new Error('Union does not equal the expected InstanceSet');
            });
    
            it('instanceSet.union() returns an InstanceSet with the same classModel as the InstanceSet called on.', () => {
                const instance1 = new Instance(SuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instanceSet1 = new InstanceSet(SuperClass, [instance1]);
                const instanceSet2 = new InstanceSet(SubClassOfSuperClass, [instance2]);
                const union = instanceSet1.union(instanceSet2);
    
                if (union.classModel !== SuperClass) 
                    throw new Error('union returned an InstanceSet with an unexpected ClassModel.');
            });
    
        });

        describe('InstanceSet.intersection()', () => {
    
            it('InstanceSet.intersection() throws an error if passed something other than an instance set.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(SuperClass, instances);
                const expectedErrorMessage = 'InstanceSet.intersection() argument is not an InstanceSet.';
    
                testForError('instanceSet.intersection()', expectedErrorMessage, () => {
                    instanceSet.intersection(2);
                });
            });
    
            it('InstanceSet.intersection() returns a new InstanceSet', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet1 = new InstanceSet(SuperClass, instances);
                const instanceSet2 = new InstanceSet(SuperClass, instances);
                const intersection = instanceSet1.intersection(instanceSet2);
    
                if (!(intersection instanceof InstanceSet))
                    throw new Error('intersection did not return an InstanceSet.');
            });
    
            it('InstanceSet.intersection() returns a copy of the InstanceSet when called with the same InstanceSet.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(SuperClass, instances);
    
                const intersection = instanceSet.intersection(instanceSet);
    
                if (!intersection.equals(instanceSet))
                    throw new Error('intersection returned an InstanceSet which is different that the original InstanceSet.');
            });
    
            it('InstanceSet.intersection() returns an equal InstanceSet when both InstanceSets are equal.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet1 = new InstanceSet(SuperClass, instances);
                const instanceSet2 = new InstanceSet(SuperClass, instances);
                const intersection = instanceSet1.intersection(instanceSet2);
    
                if (!intersection.equals(instanceSet1))
                    throw new Error('intersection returned an InstanceSet which is different that the original InstanceSet.');
            });
    
            it('InstanceSet.intersection() returns an empty InstanceSet when InstanceSets do not overlap.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instance4 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2];
                const instances2 = [instance3, instance4];
                const instanceSet1 = new InstanceSet(SuperClass, instances1);
                const instanceSet2 = new InstanceSet(SuperClass, instances2);
                const intersection = instanceSet1.intersection(instanceSet2);
    
                if (intersection.size)
                    throw new Error('intersection has instances in it.');
            });
    
            it('InstanceSet.intersection() returns an InstanceSet that is the intersection of the two InstanceSets.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2];
                const instances2 = [instance2, instance3];
                const instanceSet1 = new InstanceSet(SuperClass, instances1);
                const instanceSet2 = new InstanceSet(SuperClass, instances2);
                const intersection = instanceSet1.intersection(instanceSet2);
                const expected = new InstanceSet(SuperClass, [instance2]);
    
                if (!intersection.equals(expected))
                    throw new Error('intersection is not what is expected.');
            });
    
            it('InstanceSet.intersection() works even when InstanceSets are for different ClassModels', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2];
                const instances2 = [instance2, instance3];
                const instanceSet1 = new InstanceSet(SuperClass, instances1);
                const instanceSet2 = new InstanceSet(SubClassOfSuperClass, instances2);
                const intersection = instanceSet1.intersection(instanceSet2);
                const expected = new InstanceSet(SubClassOfSuperClass, [instance2]);
    
                if (!intersection.equals(expected))
                    throw new Error('intersection is not what is expected.');
            });

        });

        describe('InstanceSet.symmetricDifference()', () => {
    
            it('InstanceSet.symmetricDifference() throws an error if passed something other than an instance set.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(SuperClass, instances);
                const expectedErrorMessage = 'InstanceSet.symmetricDifference() argument is not an InstanceSet.';
    
                testForError('instanceSet.symmetricDifference()', expectedErrorMessage, () => {
                    instanceSet.symmetricDifference(2);
                });
            });
    
            it('InstanceSet.symmetricDifference() returns a new InstanceSet', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet1 = new InstanceSet(SuperClass, instances);
                const instanceSet2 = new InstanceSet(SuperClass, instances);
                const symmetricDifference = instanceSet1.symmetricDifference(instanceSet2);
    
                if (!(symmetricDifference instanceof InstanceSet))
                    throw new Error('symmetricDifference did not return an InstanceSet.');
            });
    
            it('InstanceSet.symmetricDifference() returns an empty InstanceSet when called with the same InstanceSet.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(SuperClass, instances);
                const expected = new InstanceSet(SuperClass);
    
                const symmetricDifference = instanceSet.symmetricDifference(instanceSet);
    
                if (!symmetricDifference.equals(expected))
                    throw new Error('symmetricDifference returned an InstanceSet which is not empty.');
            });
    
            it('InstanceSet.symmetricDifference() returns an empty InstanceSet when both InstanceSets are equal.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet1 = new InstanceSet(SuperClass, instances);
                const instanceSet2 = new InstanceSet(SuperClass, instances);
                const expected = new InstanceSet(SuperClass);
                const symmetricDifference = instanceSet1.symmetricDifference(instanceSet2);
    
                if (!symmetricDifference.equals(expected))
                    throw new Error('symmetricDifference returned an InstanceSet which is not empty.');
            });
    
            it('InstanceSet.symmetricDifference() returns the union of the two InstanceSets when InstanceSets do not overlap.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instance4 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2];
                const instances2 = [instance3, instance4];
                const instanceSet1 = new InstanceSet(SuperClass, instances1);
                const instanceSet2 = new InstanceSet(SuperClass, instances2);
                const expected = instanceSet1.union(instanceSet2);
                const symmetricDifference = instanceSet1.symmetricDifference(instanceSet2);

                if (!symmetricDifference.equals(expected))
                    throw new Error('symmetricDifference returned an InstanceSet which is not the union of the two sets.');
            });
    
            it('InstanceSet.symmetricDifference() returns an InstanceSet that is the symmetricDifference of the two InstanceSets.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2];
                const instances2 = [instance2, instance3];
                const instanceSet1 = new InstanceSet(SuperClass, instances1);
                const instanceSet2 = new InstanceSet(SuperClass, instances2);
                const symmetricDifference = instanceSet1.symmetricDifference(instanceSet2);
                const expected = new InstanceSet(SuperClass, [instance1, instance3]);
    
                if (!symmetricDifference.equals(expected))
                    throw new Error('symmetricDifference is not what is expected.');
            });
    
            it('InstanceSet.symmetricDifference() works even when InstanceSets are for different ClassModels', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(SubClassOfSuperClass);
                const instances1 = [instance1, instance2];
                const instances2 = [instance2, instance3];
                const instanceSet1 = new InstanceSet(SuperClass, instances1);
                const instanceSet2 = new InstanceSet(SubClassOfSuperClass, instances2);
                const symmetricDifference = instanceSet1.symmetricDifference(instanceSet2);
                const expected = new InstanceSet(SuperClass, [instance1, instance3]);
    
                if (!symmetricDifference.equals(expected))
                    throw new Error('symmetricDifference is not what is expected.');
            });

        });

    });

    describe('ForEach, Map, Reduce, Filter', () => {

        describe('InstanceSet.forEach()', () => {

            it('forEach() used to build a new InstanceSet.', () => {
                const instance1 = new Instance(SuperClass);
                const instance2 = new Instance(SuperClass);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(SuperClass, instances);
                const newInstanceSet = new InstanceSet(SuperClass);

                instanceSet.forEach((instance) => {
                    newInstanceSet.add(instance);
                });

                if (!instanceSet.equals(newInstanceSet))
                    throw new Error('forEach did not work properly.');
                
            });

            it('forEach() used to filter an InstanceSet in place.', () => {
                const instance1 = new Instance(TestClassWithNumber);
                const instance2 = new Instance(TestClassWithNumber);
                instance1.number = 1;
                instance2.number = 2;
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(TestClassWithNumber, instances);
                const expected = new InstanceSet(TestClassWithNumber, [instance1]);

                instanceSet.forEach((instance) => {
                    if (instance.number != 1)
                        instanceSet.remove(instance);
                });

                if (!instanceSet.equals(expected))
                    throw new Error('forEach did not work properly.');
                
            });

            it('forEach() used to set a property on each Instance in an InstanceSet.', () => {
                const instance1 = new Instance(TestClassWithNumber);
                const instance2 = new Instance(TestClassWithNumber);
                instance1.number = 1;
                instance2.number = 2;
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(TestClassWithNumber, instances);

                instanceSet.forEach((instance) => {
                    instance.number = 3;
                });

                for (const instance of instanceSet) {
                    if (instance.number != 3)
                        throw new Error('properties were not changed.')
                }
                
            });

        });

        describe('InstanceSet.map()', () => {

            it('map() can return an array of some property of the instances in the set.', () => {
                const instance1 = new Instance(TestClassWithNumber);
                const instance2 = new Instance(TestClassWithNumber);
                instance1.number = 1;
                instance2.number = 2;
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(TestClassWithNumber, instances);

                const numbers = instanceSet.map(instance => instance.number);


                for (const instance of instanceSet) {
                    if (!numbers.includes(instance.number))
                        throw new Error('Not all numbers returned.');
                }

            });

        });

        describe('InstanceSet.mapToInstanceSet()', () => {
    
            it('instanceSet.mapToInstanceSet() returns an InstanceSet.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const mapped = instanceSet.mapToInstanceSet(x => x);
                if (!(mapped instanceof InstanceSet))
                    throw new Error('instanceSet.mapToInstanceSet() returned something other than an InstanceSet.');
            });
    
            it('instanceSet.mapToInstanceSet() returns an InstanceSet with the same ClassModel as the InstanceSet it was called on.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const mapped = instanceSet.mapToInstanceSet(x => x);
                if (mapped.classModel !== SuperClass)
                    throw new Error('instanceSet.mapToInstanceSet() returned an InstanceSet with a different ClassModel.');
            });
    
            it('instanceSet.mapToInstanceSet() throws an error if callback returns something that isn\'t an instance.', () => {
                const instanceSet = new InstanceSet(SuperClass, [new Instance(SuperClass)]);
                const expectedErrorMessage = 'Illegal attempt to add something other than instances to an InstanceSet.';
    
                testForError('instanceSet.mapToInstanceSet()', expectedErrorMessage, () => {
                    instanceSet.mapToInstanceSet(x => x.id);
                });
            });
    
            it('instanceSet.mapToInstanceSet() throws an error if callback returns an instance of a different ClassModel.', () => {
                const instanceSet = new InstanceSet(SuperClass, [new Instance(SuperClass)]);
                const expectedErrorMessage = 'Illegal attempt to add instances of a different class to an InstanceSet.';
    
                testForError('instanceSet.mapToInstanceSet()', expectedErrorMessage, () => {
                    instanceSet.mapToInstanceSet(() => {
                        return new Instance(TestClassWithNumber);
                    });
                });
            });
    
            it('instanceSet.mapToInstanceSet() works properly.', () => {
                const instanceSet = new InstanceSet(SuperClass, [new Instance(SuperClass), new Instance(SubClassOfSuperClass)]);
                const mapped = instanceSet.mapToInstanceSet(x => x);
                if (!mapped.equals(instanceSet))
                    throw new Error('instanceSet.mapToInstanceSet() did not work as expected.');
            });
    
        });

        describe('InstanceSet.reduce()', () => {

            it('reduce() can return the sum of some property of the instances in the set.', () => {
                const instance1 = new Instance(TestClassWithNumber);
                const instance2 = new Instance(TestClassWithNumber);
                instance1.number = 1;
                instance2.number = 2;
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(TestClassWithNumber, instances);

                const sum = instanceSet.reduce((acc, instance) => acc + instance.number, 0);


                if (sum != 3) 
                    throw new Error('reduce did not produce the correct sum. Expected: 3, Actual ' + sum);
            });
        });

        describe('InstanceSet.filter()', () => {

            it('filter() can return an array of all the numbers in a set.', () => {
                const instance1 = new Instance(TestClassWithNumber);
                const instance2 = new Instance(TestClassWithNumber);
                instance1.number = 1;
                instance2.number = 2;
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(TestClassWithNumber, instances);

                const filteredArray = instanceSet.filter((instance) => {
                    return instance.number == 1;
                });

                if (filteredArray.length != 1 || !(filteredArray[0].equals(instance1)))
                    throw new Error('Array returned is not what is expected. Actual array: ' + filteredArray);

            });

        });

        describe('InstanceSet.filterToInstanceSet()', () => {

            it('filterToInstanceSet() can return an array of all the numbers in a set.', () => {
                const instance1 = new Instance(TestClassWithNumber);
                const instance2 = new Instance(TestClassWithNumber);
                instance1.number = 1;
                instance2.number = 2;
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(TestClassWithNumber, instances);
                const expected = new InstanceSet(TestClassWithNumber, [instance1]);

                const filtered = instanceSet.filterToInstanceSet((instance) => {
                    return instance.number == 1;
                });

                if (!filtered.equals(expected))
                    throw new Error('filterToInstanceSet() did not filter as expected.');

            });

            it('filterToInstanceSet() returns an InstanceSet with the same ClassModel as the original InstanceSet', () => {
                const instance1 = new Instance(TestClassWithNumber);
                const instance2 = new Instance(TestClassWithNumber);
                instance1.number = 1;
                instance2.number = 2;
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(TestClassWithNumber, instances);

                const filtered = instanceSet.filterToInstanceSet((instance) => {
                    return instance.number == 1;
                });

                if (filtered.classModel !== instanceSet.classModel)
                    throw new Error('filterToInstanceSet() returned an InstanceSet with a difference ClassModel.');

            });

        });

        describe('InstanceSet.filterForClassModel.', () => {
            
            it('Throws an error if argument is empty.', () => {
                const expectedErrorMessage = 'instanceSet.filterForClassModel(): argument must be a ClassModel.';
                const instanceSet = new InstanceSet(SuperClass);
                testForError('instanceSet.filterForClassModel()', expectedErrorMessage, () => {
                    instanceSet.filterForClassModel();
                });
            });
            
            it('Throws an error if argument is not a ClassModel.', () => {
                const expectedErrorMessage = 'instanceSet.filterForClassModel(): argument must be a ClassModel.';
                const instanceSet = new InstanceSet(SuperClass);
                testForError('instanceSet.filterForClassModel()', expectedErrorMessage, () => {
                    instanceSet.filterForClassModel(1);
                });
            });
            
            it('Returned InstanceSet.classModel is the given ClassModel.', () => {
                const instanceSet = new InstanceSet(SuperClass);
                const filtered = instanceSet.filterForClassModel(SubClassOfSuperClass);
                if (filtered.classModel !== SubClassOfSuperClass)
                    throw new Error('Filtered InstanceSet has an unexpected ClassModel.');
            });

            it('Filtering for same ClassModel as the InstanceSet returns the same InstanceSet.', () => {
                const instance1 = new Instance(SuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(DiscriminatedSubClassOfSuperClass);
                const instance4 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2, instance3, instance4];
                const instanceSet = new InstanceSet(SuperClass, instances);
                const filtered = instanceSet.filterForClassModel(SuperClass);

                if (!filtered.equals(instanceSet))
                    throw new Error('Filtered InstanceSet does not equal original InstanceSet.');
            });

            it('Filtering for subclass works as expected.', () => {
                const instance1 = new Instance(SuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(DiscriminatedSubClassOfSuperClass);
                const instance4 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2, instance3, instance4];
                const instanceSet = new InstanceSet(SuperClass, instances);
                const expected = new InstanceSet(SubClassOfSuperClass, [instance2]);
                const filtered = instanceSet.filterForClassModel(SubClassOfSuperClass);

                if (!filtered.equals(expected))
                    throw new Error('Filtered InstanceSet does not equal original InstanceSet.');

            });

            it('Filtering for discriminated subclass works as expected.', () => {
                const instance1 = new Instance(DiscriminatedSubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(DiscriminatedSubClassOfSuperClass, instances);
                const expected = new InstanceSet(SubClassOfDiscriminatedSubClassOfSuperClass, [instance2]);
                const filtered = instanceSet.filterForClassModel(SubClassOfDiscriminatedSubClassOfSuperClass);

                if (!filtered.equals(expected))
                    throw new Error('Filtered InstanceSet does not equal original InstanceSet.');

            });

            it('Filtering for discriminated subclass works as expected.', () => {
                const instance1 = new Instance(SuperClass);
                const instance2 = new Instance(SubClassOfSuperClass);
                const instance3 = new Instance(DiscriminatedSubClassOfSuperClass);
                const instance4 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2, instance3, instance4];
                const instanceSet = new InstanceSet(SuperClass, instances);
                const expected = new InstanceSet(DiscriminatedSubClassOfSuperClass, [instance3, instance4]);
                const filtered = instanceSet.filterForClassModel(DiscriminatedSubClassOfSuperClass);

                if (!filtered.equals(expected))
                    throw new Error('Filtered InstanceSet does not equal original InstanceSet.');

            });

        });

    });

    describe('ClassModel Methods', () => {

        describe('InstanceSet.validate()', () => {

            describe('Required Validation', () => {
    
                it('All fields are required. All are set. No error thrown.', () => {
                    const instance1 = new Instance(AllFieldsRequiredClass);
                    instance1.assign({
                        string: 'String',
                        strings: ['String'],
                        date: new Date(),
                        boolean: true,
                        booleans: [true],
                        number: 1,
                        numbers: [1],
                        class1: CompareClass1.create(),
                        class2s: CompareClass2.create()
                    });
                    const instance2 = new Instance(AllFieldsRequiredClass);
                    instance2.assign({
                        string: 'String',
                        strings: ['String'],
                        date: new Date(),
                        boolean: true,
                        booleans: [true],
                        number: 1,
                        numbers: [1],
                        class1: CompareClass1.create(),
                        class2s: CompareClass2.create()
                    });
                    const instanceSet = new InstanceSet(AllFieldsRequiredClass, [instance1, instance2]);
                        
                    instanceSet.validate();
    
                    return true;
    
                });
    
                it('All fields are required. All but string are set. Error thrown.', () => {
                    const expectedErrorMessage = 'AllFieldsRequiredClass validation failed: string: Path `string` is required.';
                    const instance = new Instance(AllFieldsRequiredClass);
                    instance.assign({
                        strings: ['String'],
                        date: new Date(),
                        boolean: true,
                        booleans: [true],
                        number: 1,
                        numbers: [1],
                        class1: CompareClass1.create(),
                        class2s: CompareClass2.create()
                    });
                    const instanceSet = new InstanceSet(AllFieldsRequiredClass, [instance]);
    
                    testForError('instanceSet.validate()', expectedErrorMessage, () => {
                        instanceSet.validate();
                    });    
                });
    
                it('All fields are required. One instance is valid, the other is not. Error thrown.', () => {
                    const expectedErrorMessage = 'AllFieldsRequiredClass validation failed: string: Path `string` is required.';
                    const instance1 = new Instance(AllFieldsRequiredClass);
                    instance1.assign({
                        strings: ['String'],
                        date: new Date(),
                        boolean: true,
                        booleans: [true],
                        number: 1,
                        numbers: [1],
                        class1: CompareClass1.create(),
                        class2s: CompareClass2.create()
                    });
                    const instance2 = new Instance(AllFieldsRequiredClass);
                    instance2.assign({
                        string: 'String',
                        strings: ['String'],
                        date: new Date(),
                        boolean: true,
                        booleans: [true],
                        number: 1,
                        numbers: [1],
                        class1: CompareClass1.create(),
                        class2s: CompareClass2.create()
                    });
                    const instanceSet = new InstanceSet(AllFieldsRequiredClass, [instance1, instance2]);
    
                    testForError('instanceSet.validate()', expectedErrorMessage, () => {
                        instanceSet.validate();
                    });    
                });
    
            });
    
            describe('Required Group Validation', () => {
                    
                it('Multiple fields (one of each type) share a required group no fields are set. Error thrown.', () => {
                    const expectedErrorMessage = 'Required Group violations found for requirement group(s):  a';
                    const instance = new Instance(AllFieldsInRequiredGroupClass);
                    const instanceSet = new InstanceSet(AllFieldsInRequiredGroupClass, [instance]);
        
                    try {
                        instanceSet.validate();
                    }
                    catch (error) {
                        if (error.message == expectedErrorMessage) {
                            return true;
                        }
                        else {
                            throw new Error(
                                'instanceSet.validate returned the wrong error message.\n' + 
                                'Expected: ' + expectedErrorMessage + '\n' +
                                'Actual:   ' + error.message
                            );
                        }
                    }
        
                    throw new Error('instanceSet.validate did not throw an error when it should have.');
                });
                    
                it('Multiple fields (one of each type) share a required group boolean is set to false. Error thrown.', () => {
                    const expectedErrorMessage = 'Required Group violations found for requirement group(s):  a';
                    const instance = new Instance(AllFieldsInRequiredGroupClass);
                    const instanceSet = new InstanceSet(AllFieldsInRequiredGroupClass, [instance]);
    
                    instanceSet.boolean = false;
        
                    try {
                        instance.validate();
                    }
                    catch (error) {
                        if (error.message == expectedErrorMessage) {
                            return true;
                        }
                        else {
                            throw new Error(
                                'instanceSet.validate returned the wrong error message.\n' + 
                                'Expected: ' + expectedErrorMessage + '\n' +
                                'Actual:   ' + error.message
                            );
                        }
                    }
        
                    throw new Error('instanceSet.validate did not throw an error when it should have.');
                });
                    
                it('Multiple fields (one of each type) share a required group string is set to "". Error thrown.', () => {
                    const expectedErrorMessage = 'Required Group violations found for requirement group(s):  a';
                    const instance = new Instance(AllFieldsInRequiredGroupClass);
                    instance.string = '';
                    const instanceSet = new InstanceSet(AllFieldsInRequiredGroupClass, [instance]);
        
                    try {
                        instanceSet.validate();
                    }
                    catch (error) {
                        if (error.message == expectedErrorMessage) {
                            return true;
                        }
                        else {
                            throw new Error(
                                'instanceSet.validate returned the wrong error message.\n' + 
                                'Expected: ' + expectedErrorMessage + '\n' +
                                'Actual:   ' + error.message
                            );
                        }
                    }
        
                    throw new Error('instanceSet.validate did not throw an error when it should have.');
                });
                
                it('Multiple fields (one of each type) share a required group and strings is set. No error thrown.', () => {
                    const instance = new Instance(AllFieldsInRequiredGroupClass);
                    instance.strings = ['String'];
                    const instanceSet = new InstanceSet(AllFieldsInRequiredGroupClass, [instance]);
    
                    try {
                        instanceSet.validate();
                    }
                    catch (error) {
                        throw new Error(
                            'instanceSet.validate threw an error when it shouldn\'t have.\n' + 
                            'Error: ' + error.message
                        );
                    }
    
                    return true;
                });
                
                it('Multiple fields (one of each type) share a required group and boolean is set. No error thrown.', () => {
                    const instance = new Instance(AllFieldsInRequiredGroupClass);
                    instance.boolean = true;
                    const instanceSet = new InstanceSet(AllFieldsInRequiredGroupClass, [instance]);
    
                    try {
                        instanceSet.validate();
                    }
                    catch (error) {
                        throw new Error(
                            'instanceSet.validate threw an error when it shouldn\'t have.\n' + 
                            'Error: ' + error.message
                        );
                    }
    
                    return true;
                });
                
            });
    
            describe('Mutex Validation', () => {
                
                it('2 attribute fields (boolean, date) have a mutex and both are set. Error thrown.', () => {
                    const expectedErrorMessage = 'Mutex violations found for instance <ObjectId> Field boolean with mutex \'a\'. Field date with mutex \'a\'.';
                    let expectedErrorMutex = /^Mutex violations found for instance .* Field boolean with mutex \'a\'. Field date with mutex \'a\'.$/;
                    const instance = new Instance(MutexClassA);
;
                    instance.assign({
                        boolean: true,
                        date: new Date(),
                    });
                    const instanceSet = new InstanceSet(MutexClassA, [instance]);
    
                    try {
                        instanceSet.validate();
                    }
                    catch (error) {
                        if (expectedErrorMutex.test(error.message)) {
                            return true;
                        }
                        else {
                            throw new Error(
                                'instanceSet.validate returned the wrong error message.\n' + 
                                'Expected: ' + expectedErrorMessage + '\n' +
                                'Actual:   ' + error.message
                            );
                        }
                    }
    
                    throw new Error('instanceSet.validate did not throw an error when it should have.');
                });
                
                it('2 attribute fields (boolean, date) have a mutex and one (boolean) is set. No error thrown.', () => {    
                    const instance = new Instance(MutexClassA);
                    instance.boolean = true;
                    const instanceSet = new InstanceSet(MutexClassA, [instance]);
    
                    try {
                        instanceSet.validate();
                    }
                    catch (error) {
                        throw new Error(
                            'instanceSet.validate threw an error when it shouldn\'t have.\n' + 
                            'Error: ' + error.message
                        );
                    }
                    
                    return true;
                });
                
                it('2 singular relationship fields have a mutex and both are set. Error thrown.', () => {
                    const expectedErrorMessage = 'Mutex violations found for instance <ObjectId> Field class1 with mutex \'a\'. Field class2 with mutex \'a\'.';
                    let expectedErrorMutex = /^Mutex violations found for instance .* Field class1 with mutex \'a\'. Field class2 with mutex \'a\'.$/;  
                    const instance = new Instance(MutexClassB);
    
                    instance.class1 = CompareClass1.create()._id;
                    instance.class2 = CompareClass2.create()._id;
                    const instanceSet = new InstanceSet(MutexClassB, [instance]);
    
                    try {
                        instanceSet.validate();
                    }
                    catch (error) {
                        if (expectedErrorMutex.test(error.message)) {
                            return true;
                        }
                        else {
                            throw new Error(
                                'instanceSet.validate returned the wrong error message.\n' + 
                                'Expected: ' + expectedErrorMessage + '\n' +
                                'Actual:   ' + error.message
                            );
                        }
                    }
    
                    throw new Error('instanceSet.validate did not throw an error when it should have.');
                });
                
                it('2 singular relationship fields have a mutex and one is set. No error thrown.', () => {    
                    const instance = new Instance(MutexClassB);
                    instance.class1 = CompareClass1.create()._id;
                    const instanceSet = new InstanceSet(MutexClassB, [instance]);
    
                    try {
                        instanceSet.validate();
                    }
                    catch (error) {
                        throw new Error(
                            'instanceSet.validate threw an error when it shouldn\'t have.\n' + 
                            'Error: ' + error.message
                        );
                    }
    
                    return true;
                });
                
                it('2 non-singular relationship fields have a mutex and both are set. Error thrown.', () => {
                    const expectedErrorMessage = 'Mutex violations found for instance <ObjectId> Field class1s with mutex \'a\'. Field class2s with mutex \'a\'.';
                    let expectedErrorMutex = /^Mutex violations found for instance .* Field class1s with mutex \'a\'. Field class2s with mutex \'a\'.$/;
    
                    const instance = new Instance(MutexClassC);
    
                    instance.class1s = [CompareClass1.create()._id, CompareClass1.create()._id];
                    instance.class2s = [CompareClass2.create()._id, CompareClass2.create()._id];
                    const instanceSet = new InstanceSet(MutexClassC, [instance]);
    
                    try {
                        instanceSet.validate();
                    }
                    catch (error) {
                        if (expectedErrorMutex.test(error.message)) {
                            return true;
                        }
                        else {
                            throw new Error(
                                'instanceSet.validate returned the wrong error message.\n' + 
                                'Expected: ' + expectedErrorMessage + '\n' +
                                'Actual:   ' + error.message
                            );
                        }
                    }
    
                    throw new Error('instanceSet.validate did not throw an error when it should have.');
                });
    
            });

        });

        describe('InstanceSet.save()', () => {

            after(async() => {
                await AllFieldsRequiredClass.clear();
            });

            it('InstanceSet will not save any of the instances if any are invalid.', async () => {
                const expectedErrorMessage = 'Caught validation error when attempting to save InstanceSet: AllFieldsRequiredClass validation failed: string: Path `string` is required.';
                let instanceA = new Instance(AllFieldsRequiredClass);
                let instanceB = new Instance(AllFieldsRequiredClass);    
                instanceA.assign({
                    string: 'instanceA',
                    strings: ['instanceA'],
                    date: new Date(),
                    boolean: true,
                    booleans: [true],
                    number: 1,
                    numbers: [1],
                    class1: CompareClass1.create()._id,
                    class2s: [CompareClass2.create()._id],
                });
                instanceB.assign({
                    strings: ['instanceB'],
                    date: new Date(),
                    boolean: true,
                    booleans: [true],
                    number: 2,
                    numbers: [2],
                    class1: CompareClass1.create()._id,
                    class2s: [CompareClass2.create()._id],
                });
                let instanceSet = new InstanceSet(AllFieldsRequiredClass, [instanceA, instanceB]);

                await testForErrorAsync('instanceSet.save()', expectedErrorMessage, async() => {
                    return instanceSet.save();
                });

                const foundInstanceA = await AllFieldsRequiredClass.findInstanceById(instanceA.id);
                const foundInstanceB = await AllFieldsRequiredClass.findInstanceById(instanceB.id);

                if (foundInstanceA || foundInstanceB) 
                    throw new Error('Save threw an error, but one or more instances were saved anyway.');
            });

            it('InstanceSet saved properly.', async () => {
                let instanceA = new Instance(AllFieldsRequiredClass);
                let instanceB = new Instance(AllFieldsRequiredClass);    
                instanceA.assign({
                    string: 'instanceA',
                    strings: ['instanceA'],
                    date: new Date(),
                    boolean: true,
                    booleans: [true],
                    number: 1,
                    numbers: [1],
                    class1: CompareClass1.create()._id,
                    class2s: [CompareClass2.create()._id],
                });
                instanceB.assign({
                    string: 'instanceB',
                    strings: ['instanceB'],
                    date: new Date(),
                    boolean: true,
                    booleans: [true],
                    number: 2,
                    numbers: [2],
                    class1: CompareClass1.create()._id,
                    class2s: [CompareClass2.create()._id],
                });
                let instanceSet = new InstanceSet(AllFieldsRequiredClass, [instanceA, instanceB]);

                await instanceSet.save();
                const foundInstanceA = await AllFieldsRequiredClass.findInstanceById(instanceA.id);
                const foundInstanceB = await AllFieldsRequiredClass.findInstanceById(instanceB.id);

                if (!(foundInstanceA.equals(instanceA) && foundInstanceB.equals(instanceB))) 
                    throw new Error('Could not find the instances after save().');

                if (instanceA.saved != true || instanceB.saved != true)
                    throw new Error('Instances\'s saved properties were not set to true.' );

                if (foundInstanceA.saved != true || foundInstanceB.saved != true)
                    throw new Error('Found instances\'s saved properties were not set to true.' );
            });

        });

        describe('InstanceSet.walk()', () => {

        });

        describe('InstanceSet.delete()', () => {

        });

    });

    describe('Miscellanious Methods', () => {

        describe('InstanceSet.getInstanceIds()', () => {
    
            it('getInstanceIds returns an array of string object ids.', () => {
                const instance1 = new Instance(SubClassOfSuperClass);
                const instance2 = new Instance(SubClassOfDiscriminatedSubClassOfSuperClass);
                const instances = [instance1, instance2];
                const instanceSet = new InstanceSet(SuperClass, instances);
                const expected = instances.map(instance => instance.id);
                const ids = instanceSet.getInstanceIds();
                if (ids.length != expected.length)
                    throw new Error('Wrong number of ids returned.');
                
                for (const id of expected) {
                    if (!ids.includes(id))
                        throw new Error('Array of ids is missing ' + id + '.');
                }
            });
    
            it('getInstanceIds called on an empty set returns an empty array.', () => {
                const instanceSet = new InstanceSet(SuperClass,);
                const ids = instanceSet.getInstanceIds();
    
                if (!Array.isArray(ids))
                    throw new Error('getInstanceIds() returned a non array.');
                
                if (ids.length)
                    throw new Error('getInstanceIds() returned a non empty array. ' + ids);
            });
    
        });

    })

});