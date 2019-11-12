var nconf = require('nconf');

nconf.overrides({
    "SERVICE_CONFIGS": "master:www:/apis/v/configs",
    "SERVICE_CLIENTS": "master:accounts:/apis/v/clients",
    "SERVICE_USERS": "master:accounts:/apis/v/users",
    "SERVICE_TOKENS": "master:accounts:/apis/v/tokens",
    "SERVICE_VEHICLE_MAKES": "master:autos:/apis/v/vehicle-makes",
    "LOCAL_VEHICLE_MODELS": __dirname + "/..:accounts:/apis/v/vehicle-models"
});

require('pot');
