var log = require('logger')('service-vehicle-models');
var express = require('express');
var bodyParser = require('body-parser');

var errors = require('errors');
var utils = require('utils');
var mongutils = require('mongutils');
var auth = require('auth');
var throttle = require('throttle');
var serandi = require('serandi');

var VehicleModels = require('model-vehicle-models');

var validators = require('./validators');
var sanitizers = require('./sanitizers');

module.exports = function (router, done) {
    router.use(serandi.many);
    router.use(serandi.ctx);
    router.use(auth({
        GET: [
            '^\/$',
            '^\/.*'
        ]
    }));
    router.use(throttle.apis('vehicle-models'));
    router.use(bodyParser.json());
    /**
     * {"name": "serandives app"}
     */
    /*router.post('/', function (req, res) {
        VehicleModels.create(req.body, function (err, model) {
            if (err) {
                log.error(err);
                return res.pond(errors.serverError());
            }
            res.locate(model.id).status(201).send(model);
        });
    });*/

    router.get('/:id', validators.findOne, sanitizers.findOne, function (req, res, next) {
      mongutils.findOne(VehicleModels, req.query, function (err, model) {
        if (err) {
          return next(err);
        }
        res.send(model);
      });
    });


    /**
     * /users?data={}
     */
    router.get('/', validators.find, sanitizers.find, function (req, res, next) {
      mongutils.find(VehicleModels, req.query.data, function (err, models, paging) {
        if (err) {
          return next(err);
        }
        res.many(models, paging);
      });
    });

    /*router.delete('/:id', function (req, res) {
        if (!mongutils.objectId(req.params.id)) {
            return res.pond(errors.notFound());
        }
        VehicleModels.remove({_id: req.params.id}, function (err) {
            if (err) {
                log.error(err);
                return res.pond(errors.serverError());
            }
            res.status(204).end();
        });
    });*/

    done();
};

