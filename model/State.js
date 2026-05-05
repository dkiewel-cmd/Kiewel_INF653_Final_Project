const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    /*"state": {
        type: String,
        required: true
    },
    "slug": {
        type: String,
        required: true
    },*/
    code: {
        type: String,
        required: true,
        unique: true
    },/*
    "nickname": {
        type: String,
        required: true
    },
    "website": {
        type: String
    },
    "admission_date": {
        type: String,
        required: true
    },
    "admission_number": {
        type: Number
    },
    "capital_city": {
        type: String,
        required: true
    },
    "capital_url": {
        type: String
    },
    "population": {
        type: Number,
        required: true
    },
    "population_rank": {
        type: Number
    },
    "constitution_url": {
        type: String
    },
    "state_flag_url": {
        type: String
    },
    "state_seal_url": {
        type: String
    },
    "map_image_url": {
        type: String
    },
    "landscape_background_url": {
        type: String
    },
    "skyline_background_url": {
        type: String
    },
    "twitter_url": {
        type: String
    },
    "facebook_url": {
        type: String
    },*/
    funfacts: {
        type: Array,
    }
});

module.exports = mongoose.model('State', stateSchema);