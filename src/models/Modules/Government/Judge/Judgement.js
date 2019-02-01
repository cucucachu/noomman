/* 
 Class Model
 Model: Judgement 
 Description: Represents a collection of votes that were taken in the same session, for a particular JudicialCase. 
*/

// MongoDB and Mongoose Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ClassModel = require('../../../ClassModel');

var Judgement = new ClassModel({
	className: 'Judgement',
	schema: {
		date: {
			type: Date,
			required: true
		},
		judicialCase: {
			type: Schema.Types.ObjectId,
			ref: 'JudicialCase',
			required: true
		},
		individualJudgements: {
			type: [Schema.Types.ObjectId],
			ref: 'IndividualJudgement'
		}
	}
});

module.exports = Judgement;
