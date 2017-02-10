Employee = function name(name, department) {
    this.name = name;
    this.department = department;
}

Employee.prototype.role = 'employee';

Employee.prototype.getInfo = function () {
    return 'My name is '+this.name+'. I am '+this.role+' in the '+this.department+' department.'
}

Manager = function(name, department, reports) {
    Employee.call(this, name, department);
    this.reports = reports;
}

Manager.prototype.__proto__ = Employee.prototype;

Manager.prototype.role = 'manager';

Manager.prototype.getInfo = function() {
    var that = this;
    return Employee.prototype.getInfo.call(that) + ' I manage '+this.reports+' employees.'
}

module.exports = {
    Employee: Employee,
    Manager: Manager
}