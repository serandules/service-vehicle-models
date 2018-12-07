var log = require('logger')('service-vehicle-models');
var bodyParser = require('body-parser');

var auth = require('auth');
var throttle = require('throttle');
var serandi = require('serandi');

var model = require('model');

var VehicleModels = require('model-vehicle-models');

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

    router.get('/:id',
      serandi.findOne(VehicleModels),
      function (req, res, next) {
      model.findOne(req.ctx, function (err, model) {
        if (err) {
          return next(err);
        }
        res.send(model);
      });
    });


    /**
     * /users?data={}
     */
    router.get('/',
      serandi.find(VehicleModels),
      function (req, res, next) {
      model.find(req.ctx, function (err, models, paging) {
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

