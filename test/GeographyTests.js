var assert = require('assert');
var expect = require('expect');
var promiseFinally = require('promise.prototype.finally');

// Add 'finally()' to 'Promis.prototype'
promiseFinally.shim();

process.on('unhandledRejection', error => {
	console.log('unhandledRejection', error.message);
});

var User = require('../models/Modules/User/User');
var GeographicArea = require('../models/Modules/Geography/GeographicArea');
var GeographicMap = require('../models/Modules/Geography/GeographicMap');
var MapType = require('../models/Modules/Geography/MapType');
var Address = require('../models/Modules/Geography/Address');
var User = require('../models/Modules/User/User');

describe('UserPost Module Tests', function() {
	
	before(function(done) {
		User.clear().then(
			function() {
				GeographicArea.clear().then(
					function() {
						GeographicMap.clear().then(
							function() {
								MapType.clear().then(
									function() {
										Address.clear().then(
											function() {
												User.clear().then(done, done);
											}, 
											done
										);
									},
									done								
								);
							}, 
							done
						);
					}, 
					done
				);
			}, 
			done
		);
	});

	describe('GeographicArea Model Tests', function() {

		describe('GeographicArea.create()', function() {
		
			it('GeographicArea.create() creates a GeographicArea instance.', function() {
				var geographicArea = GeographicArea.create();
				assert(typeof(geographicArea) === "object");
			});

			it('GeographicArea.create() creates a GeographicArea instance with _id field populated', function(){
				var geographicArea = GeographicArea.create();
				assert(typeof(geographicArea._id) === "object" && /^[a-f\d]{24}$/i.test(geographicArea._id));
			});
		});

		describe('GeographicArea.save()', function() {

			it('GeographicArea.save() throws an error if required fields are missing.', function(done) {
				var geographicArea = GeographicArea.create();
				var testFailed = 0;
				var error;
				var expectedErrorMessage = 'GeographicArea validation failed: geographicMap: Path `geographicMap` is required., name: Path `name` is required.';
				
				GeographicArea.save(geographicArea).then(
					function(result) {
						testFailed = 1;
					},
					function(rejectionErr) {
						error = rejectionErr;
					}
				)
				.finally(function() {
					if (testFailed) done(new Error('GeographicArea.save() promise resolved when it should have been rejected with Validation Error'));
					else {
						if (error != null && error.message == expectedErrorMessage) {
							done();
						}
						else{
							done(new Error(
								'GeographicArea.save() did not return the correct Validation Error.\n' +
								'   Expected: ' + expectedErrorMessage + '\n' +
								'   Actual:   ' + error.message
							));
						}
					}
				});
			});


			it('GeographicArea.geographicMap must be a valid ID.', function(done){
				var geographicArea = GeographicArea.create();
				var testFailed = 0;
				var error = null;

				var expectedErrorMessage ='GeographicArea validation failed: geographicMap: Cast to ObjectID failed for value "abcd1234efgh9876" at path "geographicMap"';

				geographicArea.name = 'California';
				geographicArea.geographicMap = 'abcd1234efgh9876';
				geographicArea.addresses = [Address.create()._id, Address.create()._id];
				

				GeographicArea.save(geographicArea).then(
					function(saved) {
						testFailed = 1;
					},
					function(saveErr) {
						error = saveErr;
					}
				).finally(function() {
					if(testFailed) {
						done(new Error('GeographicArea.save() promise resolved when it should have been rejected with Validation Error'));
					}
					else {
						if (error != null && error.message == expectedErrorMessage) {
							done();
						}
						else {
							done(new Error(
								'GeographicArea.save() did not return the correct Validation Error.\n' +
								'   Expected: ' + expectedErrorMessage + '\n' +
								'   Actual:   ' + error.message
							));
						}
					}
				});
			});


			it('GeographicArea.addresses must be a valid Array of IDs.', function(done){
				var geographicArea = GeographicArea.create();
				var testFailed = 0;
				var error = null;

				var expectedErrorMessage ='GeographicArea validation failed: addresses: Cast to Array failed for value "[ \'abcd1234efgh9876\' ]" at path "addresses"';

				geographicArea.name = 'California';
				geographicArea.geographicMap = GeographicMap.create()._id;
				geographicArea.addresses = ['abcd1234efgh9876'];
				

				GeographicArea.save(geographicArea).then(
					function(saved) {
						testFailed = 1;
					},
					function(saveErr) {
						error = saveErr;
					}
				).finally(function() {
					if(testFailed) {
						done(new Error('GeographicArea.save() promise resolved when it should have been rejected with Validation Error'));
					}
					else {
						if (error != null && error.message == expectedErrorMessage) {
							done();
						}
						else {
							done(new Error(
								'GeographicArea.save() did not return the correct Validation Error.\n' +
								'   Expected: ' + expectedErrorMessage + '\n' +
								'   Actual:   ' + error.message
							));
						}
					}
				});
			});					

			it('Valid Call Saves GeographicArea.', function(done){
				var geographicArea = GeographicArea.create();
				var error = null;
				var compareResult;

				geographicArea.name = 'California';
				geographicArea.geographicMap = GeographicMap.create()._id;
				geographicArea.addresses = [Address.create()._id, Address.create()._id];

				GeographicArea.save(geographicArea).then(
					function(saved) {
						GeographicArea.Model.findById(geographicArea._id, function(findError, found) {
							compareResult = GeographicArea.compare(geographicArea, found);

							if (compareResult.match == false)
								error = new Error(compareResult.message);
						});
					},
					function(saveErr) {
						testFailed = 1;
						error = saveErr;
					}
				).finally(function() {
					if (error)
						done(error);
					else
						done();
				});
			});

		});

	});
	
	describe('GeographicMap Model Tests', function() {

		describe('GeographicMap.create()', function() {
		
			it('GeographicMap.create() creates a GeographicMap instance.', function() {
				var geographicMap = GeographicMap.create();
				assert(typeof(geographicMap) === "object");
			});

			it('GeographicMap.create() creates a GeographicMap instance with _id field populated', function(){
				var geographicMap = GeographicMap.create();
				assert(typeof(geographicMap._id) === "object" && /^[a-f\d]{24}$/i.test(geographicMap._id));
			});
		});

		describe('GeographicMap.save()', function() {

			it('GeographicMap.save() throws an error if required fields are missing.', function(done) {
				var geographicMap = GeographicMap.create();
				var testFailed = 0;
				var error;
				var expectedErrorMessage = 'GeographicMap validation failed: mapType: Path `mapType` is required., ofGeographicArea: Path `ofGeographicArea` is required., name: Path `name` is required.';

				GeographicMap.save(geographicMap).then(
					function(result) {
						testFailed = 1;
					},
					function(rejectionErr) {
						error = rejectionErr;
					}
				)
				.finally(function() {
					if (testFailed) done(new Error('GeographicMap.save() promise resolved when it should have been rejected with Validation Error'));
					else {
						if (error != null && error.message == expectedErrorMessage) {
							done();
						}
						else{
							done(new Error(
								'GeographicMap.save() did not return the correct Validation Error.\n' +
								'   Expected: ' + expectedErrorMessage + '\n' +
								'   Actual:   ' + error.message
							));
						}
					}
				});
			});


			it('GeographicMap.mapType must be a valid ID.', function(done){
				var geographicMap = GeographicMap.create();
				var testFailed = 0;
				var error = null;

				var expectedErrorMessage = 'GeographicMap validation failed: mapType: Cast to ObjectID failed for value "abcd1234efgh9876" at path "mapType"';

				geographicMap.name = 'States of the United States';
				geographicMap.mapType = 'abcd1234efgh9876';
				geographicMap.ofGeographicArea = GeographicArea.create()._id;
				geographicMap.containsGeographicAreas = [GeographicArea.create()._id, GeographicArea.create()._id];
				

				GeographicMap.save(geographicMap).then(
					function(saved) {
						testFailed = 1;
					},
					function(saveErr) {
						error = saveErr;
					}
				).finally(function() {
					if(testFailed) {
						done(new Error('GeographicMap.save() promise resolved when it should have been rejected with Validation Error'));
					}
					else {
						if (error != null && error.message == expectedErrorMessage) {
							done();
						}
						else {
							done(new Error(
								'GeographicMap.save() did not return the correct Validation Error.\n' +
								'   Expected: ' + expectedErrorMessage + '\n' +
								'   Actual:   ' + error.message
							));
						}
					}
				});
			});	


			it('GeographicMap.ofGeographicArea must be a valid ID.', function(done){
				var geographicMap = GeographicMap.create();
				var testFailed = 0;
				var error = null;

				var expectedErrorMessage = 'GeographicMap validation failed: ofGeographicArea: Cast to ObjectID failed for value "abcd1234efgh9876" at path "ofGeographicArea"';

				geographicMap.name = 'States of the United States';
				geographicMap.mapType = MapType.create()._id;
				geographicMap.ofGeographicArea = 'abcd1234efgh9876';
				geographicMap.containsGeographicAreas = [GeographicArea.create()._id, GeographicArea.create()._id];
				

				GeographicMap.save(geographicMap).then(
					function(saved) {
						testFailed = 1;
					},
					function(saveErr) {
						error = saveErr;
					}
				).finally(function() {
					if(testFailed) {
						done(new Error('GeographicMap.save() promise resolved when it should have been rejected with Validation Error'));
					}
					else {
						if (error != null && error.message == expectedErrorMessage) {
							done();
						}
						else {
							done(new Error(
								'GeographicMap.save() did not return the correct Validation Error.\n' +
								'   Expected: ' + expectedErrorMessage + '\n' +
								'   Actual:   ' + error.message
							));
						}
					}
				});
			});	


			it('GeographicMap.containsGeographicAreas must be a valid Array of IDs.', function(done){
				var geographicMap = GeographicMap.create();
				var testFailed = 0;
				var error = null;

				var expectedErrorMessage = 'GeographicMap validation failed: containsGeographicAreas: Cast to Array failed for value "[ \'abcd1234efgh9876\' ]" at path "containsGeographicAreas"';

				geographicMap.name = 'States of the United States';
				geographicMap.mapType = MapType.create()._id;
				geographicMap.ofGeographicArea = GeographicArea.create()._id;
				geographicMap.containsGeographicAreas = ['abcd1234efgh9876'];
				
				GeographicMap.save(geographicMap).then(
					function(saved) {
						testFailed = 1;
					},
					function(saveErr) {
						error = saveErr;
					}
				).finally(function() {
					if(testFailed) {
						done(new Error('GeographicMap.save() promise resolved when it should have been rejected with Validation Error'));
					}
					else {
						if (error != null && error.message == expectedErrorMessage) {
							done();
						}
						else {
							done(new Error(
								'GeographicMap.save() did not return the correct Validation Error.\n' +
								'   Expected: ' + expectedErrorMessage + '\n' +
								'   Actual:   ' + error.message
							));
						}
					}
				});
			});				

			it('Valid Call Saves GeographicMap.', function(done){
				var geographicArea = GeographicMap.create();
				var error = null;
				var compareResult;

				geographicMap = GeographicMap.create();

				geographicMap.name = 'States of the United States';
				geographicMap.mapType = MapType.create()._id;
				geographicMap.ofGeographicArea = GeographicMap.create();
				geographicMap.containsGeographicAreas = [GeographicArea.create()._id, GeographicArea.create()._id];

				GeographicMap.save(geographicMap).then(
					function(saved) {
						GeographicMap.Model.findById(geographicMap._id, function(findError, found) {
							compareResult = GeographicMap.compare(geographicMap, found);

							if (compareResult.match == false)
								error = new Error(compareResult.message);
						});
					},
					function(saveErr) {
						testFailed = 1;
						error = saveErr;
					}
				).finally(function() {
					if (error)
						done(error);
					else
						done();
				});
			});

		});

	});
});