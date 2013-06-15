fs = require('fs')
var outfile = "total.json";
var files = [];
var i;
fs.writeFile(outfile, "");

fs.readdir(process.cwd(), function (err, files) {
  if (err) {
    console.log(err);
    return;
  }
	for (i=0; i<files.length;i++) {
		var x = files[i].split(".");
		var ext = x[x.length-1];
		if (ext == "json") {
			fs.readFile(files[i], 'utf8', function (err,data) {
		  	if (err) {
		  	  return console.log(err);
		  	}
			 	fs.appendFile(outfile, data.substring(1,data.length-1) + ",", function (f) {
			 		console.log("appended " +files[i] + " to " + outfile);
//	 				if (i<files.length-1) fs.appendFile(outfile, ",");
			 	});
			});
		}
	}
});

//fs.writeFile("total.json", "]");

