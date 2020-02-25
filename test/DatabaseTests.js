const database = require('../noomman/database');
const TestingFunctions = require('./helpers/TestingFunctions');
const testForError = TestingFunctions.testForError;
const testForErrorAsync = TestingFunctions.testForErrorAsync;
const DatabaseConnection = require('./helpers/DatabaseConnection');

describe('Database Tests', () => {

    const collection = 'databasetestcollection';

    describe('Connect and Close', () => {

        it('database.connect() connects to the database without error.', async () => {
            await database.connect(DatabaseConnection.mongo_uri, DatabaseConnection.testDatabase);
            await database.close();
        });

        it('Error thrown when attempting to connect to db twice without calling close.', async () => {
            const expectedErrorMessage = 'Attempt to connect to database twice.';
            await database.connect(DatabaseConnection.mongo_uri, DatabaseConnection.testDatabase);

            await testForErrorAsync('database.connect', expectedErrorMessage, async () => {
                await database.connect(DatabaseConnection.mongo_uri, DatabaseConnection.testDatabase);
            });

            await database.close();
        });

        describe('Methods throw error if database is not connected.', () => {

            it('database.close(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.close(): No connection to database.';
                await testForErrorAsync('database.close()', expectedErrorMessage, async () => {
                    return database.close();
                });
            });

            it('database.index(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.index(): No connection to database.';
                await testForErrorAsync('database.index()', expectedErrorMessage, async () => {
                    return database.index();
                });
            });

            it('database.insertOne(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.insertOne(): No connection to database.';
                await testForErrorAsync('database.insertOne()', expectedErrorMessage, async () => {
                    return database.insertOne();
                });
            });

            it('database.insertMany(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.insertMany(): No connection to database.';
                await testForErrorAsync('database.insertMany()', expectedErrorMessage, async () => {
                    return database.insertMany();
                });
            });

            it('database.overwrite(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.overwrite(): No connection to database.';
                await testForErrorAsync('database.overwrite()', expectedErrorMessage, async () => {
                    return database.overwrite();
                });
            });

            it('database.update(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.update(): No connection to database.';
                await testForErrorAsync('database.update()', expectedErrorMessage, async () => {
                    return database.update();
                });
            });

            it('database.find(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.find(): No connection to database.';
                await testForErrorAsync('database.find()', expectedErrorMessage, async () => {
                    return database.find();
                });
            });

            it('database.findOne(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.findOne(): No connection to database.';
                await testForErrorAsync('database.findOne()', expectedErrorMessage, async () => {
                    return database.findOne();
                });
            });

            it('database.findById(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.findById(): No connection to database.';
                await testForErrorAsync('database.findById()', expectedErrorMessage, async () => {
                    return database.findById();
                });
            });

            it('database.findCursor(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.findCursor(): No connection to database.';
                await testForErrorAsync('database.findCursor()', expectedErrorMessage, async () => {
                    return database.findCursor();
                });
            });

            it('database.deleteOne(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.deleteOne(): No connection to database.';
                await testForErrorAsync('database.deleteOne()', expectedErrorMessage, async () => {
                    return database.deleteOne();
                });
            });

            it('database.deleteMany(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.deleteMany(): No connection to database.';
                await testForErrorAsync('database.deleteMany()', expectedErrorMessage, async () => {
                    return database.deleteMany();
                });
            });

            it('database.clearCollection(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.clearCollection(): No connection to database.';
                await testForErrorAsync('database.clearCollection()', expectedErrorMessage, async () => {
                    return database.clearCollection();
                });
            });

            it('database.collection(): Error thrown if database is not connected.', async () => {
                const expectedErrorMessage = 'database.collection(): No connection to database.';
                await testForErrorAsync('database.collection()', expectedErrorMessage, async () => {
                    return database.collection();
                });
            });

        });

    });

    describe('index()', () => {

        it('Adding an index to a collection.', async () => {
            await database.connect(DatabaseConnection.mongo_uri, DatabaseConnection.testDatabase);
            const result = await database.index('testCollection', '__t');
            await database.close();
            if (result !== '__t_1') {
                throw new Error('Collection was not indexed correctly.');
            }
        });

    });

    describe('ObjectId', () => {

        it('db.ObjectId() returns an ObjectId.', () => {
            const id = database.ObjectId();
        });

    });

    describe('Insert and Update', () => {

        before(async () => {
            await database.connect(DatabaseConnection.mongo_uri, DatabaseConnection.testDatabase);
        });

        after(async () => {
            await database.clearCollection(collection);
            await database.close();
        });

        describe('database.insertOne()', () => {

            it('Inserting a new document into the database.', async () => {
                const id = database.ObjectId();
                const document = {
                    _id: id,
                    string: 'string',
                    number: 1,
                    boolean: false,
                    date: new Date(),
                }

                await database.insertOne(collection, document);

                const foundDocument = await database.findById(collection, id);

                if (!foundDocument) {
                    throw new Error('Could not find document after save.');
                }
            });

            it('Inserting a document twice throws an error.', async() => {
                const id = database.ObjectId();
                let errorThrown = false;
                const document = {
                    _id: id,
                    string: 'string',
                    number: 1,
                    boolean: false,
                    date: new Date(),
                }

                await database.insertOne(collection, document);

                try {
                    await database.insertOne(collection, document);
                }
                catch (error) {
                    errorThrown = true;
                }

                if (!errorThrown)
                    throw new Error('No error thrown.');
            });

        });

        describe('database.insertMany()', () => {

            it('Inserting multiple documents into the database.', async () => {
                const id1 = database.ObjectId();
                const id2 = database.ObjectId();
                const document1 = {
                    _id: id1,
                    string: 'string1',
                    number: 2,
                    boolean: false,
                    date: new Date(),
                }

                const document2 = {
                    _id: id2,
                    string: 'string2',
                    number: 3,
                    boolean: true,
                    date: new Date(),
                }

                await database.insertMany(collection, [document1, document2]);

                const foundDocument1 = await database.findById(collection, id1);
                const foundDocument2 = await database.findById(collection, id1);

                if (!foundDocument1 || !foundDocument2) {
                    throw new Error('Could not find documents after save.');
                }
            });

        });

        describe('database.overwrite()', () => {
            
            const id = database.ObjectId();

            before(async () => {
                const document = {
                    _id: id,
                    name: 'Bob',
                }

                await database.insertOne(collection, document);
            });

            it('Can find and overwrite a document.', async () => {
                const document = await database.findById(collection, id);

                document.name = 'Joe';

                await database.overwrite(collection, document);

                
                const documentAfterUpdate = await database.findById(collection, id);

                if (!documentAfterUpdate._id.equals(id) || documentAfterUpdate.name !== 'Joe') {
                    throw new Error('Document was not updated correctly.');
                }
            });

        });

    });

    describe('Queries', () => {

        const ids = [
            database.ObjectId(),
            database.ObjectId(),
            database.ObjectId(),
        ];

        before(async () => {
            await database.connect(DatabaseConnection.mongo_uri, DatabaseConnection.testDatabase);

            await database.insertMany(collection, [
                {
                    _id: ids[0],
                    name: 'Sally',
                    girl: true,
                },
                {
                    _id: ids[1],
                    name: 'Bill',
                    girl: false,
                },
                {
                    _id: ids[2],
                    name: 'Jane',
                    girl: true,
                },                
            ]);
        });

        after(async () => {
            await database.clearCollection(collection);
            await database.close();
        });

        describe('database.find()', () => {

            it('Find with empty query returns all.', async () => {
                const documents = await database.find(collection, {});

                if (documents.length != 3) 
                    throw new Error('Wrong number of documents returned.');
            });

            it('Find with a filter.', async () => {
                const documents = await database.find(collection, { girl: true });

                if (documents.length != 2) 
                    throw new Error('Wrong number of documents returned.');
            });

            it('Find with a filter.', async () => {
                const documents = await database.find(collection, { name: 'Jane' });

                if (documents.length != 1) 
                    throw new Error('Wrong number of documents returned.');

                if (documents[0].name !== 'Jane')
                    throw new Error('Wrong document returned.');
            });

        });

        describe('database.findOne()', () => {

            it('Null returned if no document found.', async () => {
                const document = await database.findOne(collection, { name: 'Gerald' });

                if (document !== null)
                    throw new Error('Document is not null.');
            });

            it('When no filter, a document is returned.', async () => {
                const document = await database.findOne(collection, {});

                if (document === null)
                    throw new Error('No document returned.');
            });

        });

        describe('database.findById()', () => {

            it('Null returned if no document found.', async () => {
                const document = await database.findById(collection, database.ObjectId());

                if (document !== null)
                    throw new Error('Document is not null.');
            });

            it('When filter is null, null returned.', async () => {
                const document = await database.findById(collection, null);

                if (document !== null)
                    throw new Error('A document was returned.');
            });

            it('When filter is undefined, null returned.', async () => {
                const document = await database.findById(collection, undefined);

                if (document !== null)
                    throw new Error('A document was returned.');
            });

            it('When filter is not an ObjectId, null returned.', async () => {
                const document = await database.findById(collection, ids[0].toString());

                if (document !== null)
                    throw new Error('A document was returned.');
            });

            it('Document can be found by Id.', async () => {
                const document = await database.findById(collection, ids[0]);

                if (!document || document.name !== 'Sally')
                    throw new Error('Correct document not returned.');
            });

        });

    });

    describe('Deleting', () => {

        const ids = [
            database.ObjectId(),
            database.ObjectId(),
            database.ObjectId(),
            database.ObjectId(),
        ];

        before(async () => {
            await database.connect(DatabaseConnection.mongo_uri, DatabaseConnection.testDatabase);

            await database.insertMany(collection, [
                {
                    _id: ids[0],
                    name: 'George',
                    girl: false,
                },
                {
                    _id: ids[1],
                    name: 'Billy',
                    girl: true,
                },
                {
                    _id: ids[2],
                    name: 'Jaque',
                    girl: false,
                },          
                {
                    _id: ids[3],
                    name: 'Alex',
                    girl: true,
                },                
            ]);
        });

        after(async () => {
            await database.clearCollection(collection);
            await database.close();
        });

        describe('database.deleteOne()', () => {

            it('Can delete a document.', async () => {
                const billy = await database.findOne(collection, { name: 'Billy' });

                await database.deleteOne(collection, billy);

                const found = await database.findOne(collection, { name: 'Billy' });

                if (found)
                    throw new Error('Document was not deleted.');
            });

        });

        describe('database.deleteMany()', () => {

            it('Can delete a document.', async () => {
                const documents = await database.find(collection, {
                    girl: false,
                });

                await database.deleteMany(collection, documents);

                const found = await database.find(collection, {
                    girl: false,
                });

                if (found.length)
                    throw new Error('Documents were not deleted.');
            });

        });
        
    });

});