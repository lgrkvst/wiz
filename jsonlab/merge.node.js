fs = require('fs')
crossfilter = require('crossfilter');
//d3 = require('d3');

var dir = "json/";
var outfile = "merge_of_logs.json";
var files = [];
var i;
var cf = crossfilter();
var formsarray = {};

function formsarray_aggregate(fid) {
	formsarray[fid] = true;
}

fs.readdir(dir, function (err, files) {
  if (err) {
    console.log(err);
    return;
  }
	for (i=0; i<files.length;i++) {
		var x = files[i].split(".");
		var ext = x[x.length-1];
		if (ext == "json" && files[i] != outfile) {
			var data = fs.readFileSync(dir + files[i], 'utf8');
			if (data.length) {
				var json = JSON.parse(data);
				cf.add(json);
			}
		}
	}
	var dim = cf.dimension(function (f) {
//		formsarray_aggregate(f.f);
		return f.t;
	});

	//console.log(dim.bottom(Infinity));

//	var group = dim.group(function (f) {return d3.time.day(f);});
//	console.log(dim.bottom(Infinity));
	fs.writeFileSync(dir + outfile, JSON.stringify(dim.bottom(Infinity)));
});
//fs.writeFile("total.json", "]");

