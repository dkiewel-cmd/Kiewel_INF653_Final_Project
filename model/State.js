const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    stateCode: {
        type: String,
        required: true,
        unique: true
    },
    funfacts: {
        type: [String]
    }
});

stateSchema.pre('save', function() {
    if (this.isNew) {
        if (!this.funfacts) {
            this.funfacts = [];
        } else if (!Array.isArray(this.funfacts)) {
            this.funfacts = [this.funfacts];
        }
    }
});

module.exports = mongoose.model('State', stateSchema);