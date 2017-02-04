exports.sum = function(array) {
    var sum = 0;
    for(var i=0; i<array.length; i++) {
        sum+=array[i];
    }
    return sum;
};

exports.odds = function(array) {
    var odds = [];
    for(var i=0; i<array.length; i++) {
        if(array[i]%2!=0)
            odds = odds.concat(array[i]);
    }
    return odds;
};

exports.find = function(array, func) {
    for(var i=0; i<array.length; i++) {
        if(func(array[i]))
            return array[i];
    }
};

//console.log(exports.find([1, 10, 50, -1], 50));