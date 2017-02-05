exports.saveForLater = function(name) {
    return function() {
        return name;
    }
}

exports.executeLater = function(func) {
    return func;
}