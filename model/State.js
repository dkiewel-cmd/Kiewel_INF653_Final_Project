const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    state: {
        type: String
    },
    slug: {
        type: String
    },
    code: {
        type: String
    },
    nickname: {
        type: String
    },
    website: {
        type: String
    },
    admission_date: {
        type: String
    },
    admission_number: {
        type: Number
    },
    capital_city: {
        type: String
    },
    capital_url: {
        type: String
    },
    population: {
        type: Number
    },
    population_rank: {
        type: Number
    },
    constitution_url: {
        type: String
    },
    state_flag_url: {
        type: String
    },
    state_seal_url: {
        type: String
    },
    map_image_url: {
        type: String
    },
    landscape_background_url: {
        type: String
    },
    skyline_background_url: {
        type: String
    },
    twitter_url: {
        type: String
    },
    facebook_url: {
        type: String
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