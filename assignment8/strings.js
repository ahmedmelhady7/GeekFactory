exports.lengthOfLastWord = function(s) {
        var a = s.trim().split(" ");
        return a[a.length-1].length;
};