var moment = require('moment')
var startDate = moment('2017-06-01', 'YYYY-MM-DD')
console.log(startDate);
var targetDate = startDate.add(200, 'days');
console.log(targetDate.format())