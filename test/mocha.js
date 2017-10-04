var nconf = require('nconf');

nconf.overrides({
    "SERVICE_VEHICLE_MAKES": "master:autos:/apis/v/vehicle-makes",
    "LOCAL_VEHICLE_MODELS": __dirname + "/..:accounts:/apis/v/vehicle-models"
});