var Task = function (category, title, priority, estimate) {
  this.category = category;
  this.title = title;
  this.priority = priority;
  this.estimate = estimate;
  this.spent = 0;
  this.remaining = estimate;
}

Task.prototype.track = function (n) {
  if (typeof n === 'number' && n > 0) {
    this.spent += n;
    this.remaining -= n;
  }
}
Task.prototype.done = function () {
  return this.remaining === 0
}
Task.prototype.complete = function (n) {
  this.spent += this.estimate;
  this.remaining -= this.estimate;
}