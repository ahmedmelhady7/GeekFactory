exports.tasks;
exports.create = function() {
    exports.tasks = [];
    return {
        create: function(category, title, priority, estimate) {
            exports.tasks.push({
                category: category,
                title: title,
                priority: priority,
                estimate: estimate,
                spent: 0,
                remaining: estimate
            });
            // console.log(exports.tasks[exports.tasks.length-1]);
            return exports.tasks[exports.tasks.length-1];
        },
        get: function(index) {
            return exports.tasks[index];
        },
        getAll: function(active) {
            var activeTasks = [];
            var len = exports.tasks.length;
            var tasks = exports.tasks;
            if(active) {
                for(var i=0; i<len; i++) {
                    if(tasks[i].remaining!=0)
                        activeTasks.push(tasks[i]);
                }
            }
            else {
                activeTasks = tasks;
            }
            return activeTasks;
        },
        find: function(titleOrCategory) {
            var foundTasks = [];
            var len = exports.tasks.length;
            var tasks = exports.tasks;
            for(var i=0; i<len; i++) {
                var re = new RegExp(titleOrCategory, 'gi'); 
                var titleMatch = tasks[i].title.match(re);
                if(titleMatch && titleMatch.length>=1)
                    foundTasks.push(tasks[i]);
                if(tasks[i].category===titleOrCategory)
                    foundTasks.push(tasks[i]);
            }
            return foundTasks;
        },
        remove: function(indexOrTask) {
            var len = exports.tasks.length;
            var tasks = exports.tasks;
            if(typeof indexOrTask === 'number' && indexOrTask < len) {
                exports.tasks.splice(indexOrTask, 1);
            } else if(typeof indexOrTask === 'object'){
                var index = tasks.indexOf(indexOrTask);
                exports.tasks.splice(index, 1);
            }
        }
    }
}