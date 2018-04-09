'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

var _require = require('co'),
    async = _require.wrap;

var Shuming = mongoose.model('Shuming');

/**
 * List
 */

exports.index = async( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var page, _id, limit, options, result, count;

    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    page = (req.query.page > 0 ? req.query.page : 1) - 1;
                    _id = req.query.item;
                    limit = 30;
                    options = {
                        limit: limit,
                        page: page
                    };


                    if (_id) options.criteria = { _id: _id };

                    _context.next = 7;
                    return Shuming.list(options);

                case 7:
                    result = _context.sent;
                    _context.next = 10;
                    return Shuming.count();

                case 10:
                    count = _context.sent;


                    res.send({
                        result: result,
                        page: page + 1,
                        pages: Math.ceil(count / limit)
                    });

                case 12:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}));
//# sourceMappingURL=novelList.js.map