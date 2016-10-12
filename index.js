var log = require('logger')('vehicle-model-service');
var utils = require('utils');
var VehicleModel = require('vehicle-model');
var mongoose = require('mongoose');
var mongutils = require('mongutils');
var sanitizer = require('./sanitizer');

var express = require('express');
var router = express.Router();

module.exports = router;

var paging = {
    start: 0,
    count: 10,
    sort: ''
};

var fields = {
    '*': true
};

/**
 * {"name": "serandives app"}
 */
router.post('/vehicle-models', function (req, res) {
    VehicleModel.create(req.body, function (err, model) {
        if (err) {
            log.error(err);
            res.status(500).send([{
                code: 500,
                message: 'Internal Server Error'
            }]);
            return;
        }
        res.send(model);
    });
});

router.get('/vehicle-models/:id', function (req, res) {
    VehicleModel.findOne({_id: req.params.id}).exec(function (err, model) {
        if (err) {
            log.error(err);
            res.status(500).send([{
                code: 500,
                message: 'Internal Server Error'
            }]);
            return;
        }
        if (!model) {
            res.status(404).send([{
                code: 404,
                message: 'Vehicle Model Not Found'
            }]);
            return;
        }
        res.send(sanitizer.clean(model));
    });
});


/**
 * /users?data={}
 */
router.get('/vehicle-models', function (req, res) {
    var data = req.query.data ? JSON.parse(req.query.data) : {};
    sanitizer.clean(data.criteria || (data.criteria = {}));
    utils.merge(data.paging || (data.paging = {}), paging);
    utils.merge(data.fields || (data.fields = {}), fields);
    VehicleModel.find(data.criteria)
        .skip(data.paging.start)
        .limit(data.paging.count)
        .sort(data.paging.sort)
        .exec(function (err, models) {
            if (err) {
                log.error(err);
                res.status(500).send([{
                    code: 500,
                    message: 'Internal Server Error'
                }]);
                return;
            }
            res.send(models);
        });
});

router.delete('/vehicle-models/:id', function (req, res) {
    if (!mongutils.objectId(req.params.id)) {
        res.status(404).send([{
            code: 404,
            message: 'Vehicle Model Not Found'
        }]);
        return;
    }
    VehicleModel.findOne({_id: req.params.id}).exec(function (err, model) {
        if (err) {
            log.error(err);
            res.status(500).send([{
                code: 500,
                message: 'Internal Server Error'
            }]);
            return;
        }
        if (!model) {
            res.status(404).send([{
                code: 404,
                message: 'Vehicle Model Not Found'
            }]);
            return;
        }
        model.remove();
        res.status(204).end();
    });
});

