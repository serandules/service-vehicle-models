module.exports.clean = function (o) {
    if (o.id) {
        o._id = o.id;
        delete o.id;
    }
    return o;
};