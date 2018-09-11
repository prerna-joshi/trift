var tomorrow = new Date();
var dateFormat = require('dateformat');
var x=dateFormat(tomorrow, "mm/dd/yyyy");
tomorrow.setDate(x.getDate() + 5);
console.log(tomorrow);
