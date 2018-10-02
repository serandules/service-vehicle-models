var validators = require('validators');
var VehicleModels = require('model-vehicle-models');

exports.find = function (req, res, next) {
    validators.query(req, res, function (err) {
        if (err) {
            return next(err);
        }
        validators.find({
            model: VehicleModels
        }, req, res, next);
    });
};

exports.findOne = function (req, res, next) {
    validators.findOne({
        id: req.params.id,
        model: VehicleModels
    }, req, res, next);
};