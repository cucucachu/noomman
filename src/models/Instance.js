
require('@babel/polyfill');
const mongoose = require('mongoose');

const ClassModel = require('./ClassModel');

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
    constructor(classModel, document=null, saved=false) {
        this.constructorValidations(classModel, document, saved);

        this.classModel = classModel;
        this[doc] = document ? document : new classModel.Model({ _id: new mongoose.Types.ObjectId });
        this.saved = saved;
        this.deleted = false;

        const documentProperties = Object.keys(this.classModel.schema).concat(['id', '_id']);
        const unSettableInstanceProperties = ['classModel', doc, 'id', '_id'];     
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
                if (documentProperties.includes(key))
                    return key in trapTarget[doc]
                
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

    constructorValidations(classModel, document, saved) {
        if (!classModel) 
            throw new Error('Instance.constructor(), parameter classModel is required.');

        if (!(classModel instanceof ClassModel))
            throw new Error('Instance.constructor(), first parameter classModel must be an instance of ClassModel.');
        
        if (classModel.abstract) 
            throw new Error('Instance.constructor(), classModel cannot be abstract.');

        if (document && !(document instanceof classModel.Model))
            throw new Error('Instance.constructor(), given document is not an instance of the given classModel.');

        if (!document && saved)
            throw new Error('Instance.constructor(), if called without a document, parameter saved must be false.');

    }

    assign(object) {
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

    // Validation Methods

    validate() {
        this.classModel.validate(this[doc]);
    }

    validateSync() {
        return this[doc].validateSync();
    }

    // Update and Delete Methods Methods

    async save() {
        if (this.deleted) 
            throw new Error('instance.save(): You cannot save an instance which has been deleted.');

        const valid = this.validate();

        if (valid) {
            await this[doc].save();
            this.saved = true;
            return this;
        }
    }

    async delete() {
        await this[doc].delete();
        this.deleted = true;
        return true;
    }

    isInstanceOfClass(classModel) {
        return classModel.isInstanceOfClassOrSubClass(this[doc]);
    }
}

module.exports = Instance;