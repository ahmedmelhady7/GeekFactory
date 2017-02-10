module.exports = function (category, title, priority, estimate) {
  this.category = category;
  this.title = title;
  this.priority = priority;
  this.estimate = estimate;
  this.spent = 0;
  this.remaining = estimate;
  this.track = function (n) {
    if (typeof n === 'number' && n > 0) {
      this.spent += n;
      this.remaining -= n;
    }
  }
  this.done = function () {
    if (this.remaining === 0)
      this.done = true;
    else
      this.done = false;
    return this.done;

  }
  this.complete = function (n) {
    this.spent += this.estimate;
    this.remaining -= this.estimate;
  }
}