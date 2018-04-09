'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Shuming = mongoose.model('Shuming');


/**
 * List
 */

exports.index = async(function* (req, res) {
    const page = (req.query.page > 0 ? req.query.page : 1) - 1;
    const _id = req.query.item;
    const limit = 30;
    const options = {
        limit: limit,
        page: page
    };

    if (_id) options.criteria = { _id };

    const result = yield Shuming.list(options);
    const count = yield Shuming.count();

    res.send({
        result: result,
        page: page + 1,
        pages: Math.ceil(count / limit)
    });

});

