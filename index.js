var log = require('logger')('service-vehicle-models');
var express = require('express');
var bodyParser = require('body-parser');

var errors = require('errors');
var utils = require('utils');
var mongutils = require('mongutils');
var auth = require('auth');
var serandi = require('serandi');

var VehicleModels = require('model-vehicle-models');

// var validators = require('./validators');
var sanitizers = require('./sanitizers');

var paging = {
    start: 0,
    count: 1000,
    sort: ''
};

var fields = {
    '*': true
};

module.exports = function (router) {
    router.use(serandi.ctx);
    router.use(auth({
        GET: [
            '^\/$',
            '^\/.*'
        ]
    }));
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

    router.get('/:id', function (req, res) {
        VehicleModels.findOne({_id: req.params.id}).exec(function (err, model) {
            if (err) {
                log.error(err);
                return res.pond(errors.serverError());
            }
            if (!model) {
                return res.pond(errors.notFound());
            }
            res.send(model);
        });
    });


    /**
     * /users?data={}
     */
    router.get('/', function (req, res) {
        var data = req.query.data ? JSON.parse(req.query.data) : {};
        sanitizers.clean(data.query || (data.query = {}));
        utils.merge(data.paging || (data.paging = {}), paging);
        utils.merge(data.fields || (data.fields = {}), fields);
        VehicleModels.find(data.query)
            .skip(data.paging.start)
            .limit(data.paging.count)
            .sort(data.paging.sort)
            .exec(function (err, models) {
                if (err) {
                    log.error(err);
                    return res.pond(errors.serverError());
                }
                res.send(models);
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
};

