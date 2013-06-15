CF = require('../js/crossfilter.v1.min.js');
fs = require('fs');
d3 = require('../js/d3.v3.min.js');
//console.log(fs.version);
// cannot install d3 for node, hence d3.time.week (as in group()) has to take place in the browser.

/*
var outfile = "crossfilter.json";
fs.writeFile(outfile, "");

fs.readFile("SEBmisc.log20130117.json", 'utf8', function (err,rawdata) {
		  	if (err) {
		  	  return console.log(err);
		  	}
		  	var data = JSON.parse(rawdata);
				var cf = CF.crossfilter(data);
				dateDim = cf.dimension(function (d) {
					console.log(d.t);
					return new Date(d.t);
				});
				var dateGroup = dateDim.group(function (d) {
					console.log(PreviousMonday(d));
					return PreviousMonday(d);
				//preferred choice:	return d3.time.week(d);
				})
				
		//		console.log(dateGroup.all());
				
//			 	fs.appendFile(outfile, data.substring(1,data.length-1) + ",", function (f) {
//			 		console.log("appended " +files[i] + " to " + outfile);
//	 				if (i<files.length-1) fs.appendFile(outfile, ",");
//			 	});
});

// global helpers
function PreviousMonday(d) {
	var beforeOneWeek = new Date(d.getTime() - 60 * 60 * 24 * 7 * 1000);
	var day = beforeOneWeek.getDay();
	var diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1);
	return new Date(beforeOneWeek.setDate(diffToMonday));
}
*/