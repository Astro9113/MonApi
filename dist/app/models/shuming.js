'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var notify = require('../mailer');

// const Imager = require('imager');
// const config = require('../../config');
// const imagerConfig = require(config.root + '/config/imager.js');

var Schema = mongoose.Schema;

/**
 * Article Schema
 */

var ShumingSchema = new Schema({
    name: { type: String, default: '', trim: true },
    title: { type: String, default: '', trim: true },
    insertTime: { type: String, default: '', trim: true }
});

/**
 * Pre-remove hook
 */

ShumingSchema.pre('remove', function (next) {
    // const imager = new Imager(imagerConfig, 'S3');
    // const files = this.image.files;

    // if there are files associated with the item, remove from the cloud too
    // imager.remove(files, function (err) {
    //   if (err) return next(err);
    // }, 'article');

    next();
});

/**
 * Methods
 */

ShumingSchema.methods = {

    /**
     * Save article and upload image
     *
     * @param {Object} images
     * @api private
     */

    uploadAndSave: function uploadAndSave(image) {
        var err = this.validateSync();
        if (err && err.toString()) throw new Error(err.toString());
        return this.save();

        /*
        if (images && !images.length) return this.save();
        const imager = new Imager(imagerConfig, 'S3');
         imager.upload(images, function (err, cdnUri, files) {
          if (err) return cb(err);
          if (files.length) {
            self.image = { cdnUri : cdnUri, files : files };
          }
          self.save(cb);
        }, 'article');
        */
    },

    /**
     * Add comment
     *
     * @param {User} user
     * @param {Object} comment
     * @api private
     */

    addComment: function addComment(user, comment) {
        this.comments.push({
            body: comment.body,
            user: user._id
        });

        if (!this.user.email) this.user.email = 'email@product.com';

        notify.comment({
            article: this,
            currentUser: user,
            comment: comment.body
        });

        return this.save();
    },

    /**
     * Remove comment
     *
     * @param {commentId} String
     * @api private
     */

    removeComment: function removeComment(commentId) {
        var index = this.comments.map(function (comment) {
            return comment.id;
        }).indexOf(commentId);

        if (~index) this.comments.splice(index, 1);else throw new Error('Comment not found');
        return this.save();
    }
};

/**
 * Statics
 */

ShumingSchema.statics = {

    /**
     * Find article by id
     *
     * @param {ObjectId} id
     * @api private
     */

    load: function load(_id) {
        return this.findOne({ _id: _id }).populate('user', 'name email username').populate('comments.user').exec();
    },

    /**
     * List articles
     *
     * @param {Object} options
     * @api private
     */

    list: function list(options) {

        var criteria = options.criteria || {};
        var page = options.page || 0;
        var limit = options.limit || 30;

        return this.find()
        // .sort({ createdAt: -1 })
        // .limit(limit)
        // .skip(limit * page)
        .exec();
    }
};

mongoose.model('Shuming', ShumingSchema, 'shuming');
//# sourceMappingURL=shuming.js.map