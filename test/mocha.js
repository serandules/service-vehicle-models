var nconf = require('nconf');

nconf.overrides({
    'services': [
        {"name": "service-vehicle-makes", "version": "master", "domain": "autos", "prefix": "/apis/v/vehicle-makes"},
        {"path": __dirname + '/..', "domain": "autos", "prefix": "/apis/v/vehicle-models"}
    ]
});