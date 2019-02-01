/* 
 ClassModel
 Model: Executive Action
 Abstract 
 Discriminated Sub Classes: Individual Executive Action, Group Executive Action
 Description: An official action taken by a Government Official with executive powers. This could be a presidential executive action (individual),
    or an action by an agency of a government (like the FCC killing net neutrality rules) (group).
*/

// MongoDB and Mongoose Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ClassModel = require('../../../ClassModel');

var ExecutiveAction = new ClassModel({
    className: 'ExecutiveAction',
    abstract: true,
    discriminated: true,
    schema: {
        name: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        passedDate: {
            type: Date
        },
        effectiveDate: {
            type: Date,
            validate: {
                validator: function(value) {
                    if (value < this.passedDate)
                        return false;
                    return true;
                },
                message: 'Effective Date must be greater than or equal to Passed Date.'
            }
        },
        executives: {
            type: [Schema.Types.ObjectId],
            ref: 'Executive'
        }
    }
});

module.exports = ExecutiveAction;
