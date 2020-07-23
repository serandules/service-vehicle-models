var nconf = require('nconf');

nconf.overrides({
    "SERVICE_CONFIGS": "master:apis:/v/configs",
    "SERVICE_CLIENTS": "master:apis:/v/clients",
    "SERVICE_USERS": "master:apis:/v/users",
    "SERVICE_TOKENS": "master:apis:/v/tokens",
    "SERVICE_VEHICLE_MAKES": "master:apis:/v/vehicle-makes",
    "LOCAL_VEHICLE_MODELS": __dirname + "/..:apis:/v/vehicle-models"
});

require('pot');
