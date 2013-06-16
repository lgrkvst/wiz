fs = require('fs')

var inpath = 'logs/';
var outpath = 'json/';

fs.readdir(inpath, function (err, files) {
  if (err) {
    console.log(err);
    return;
  }
//  forEachFile("SEBmisc.log20130331");
	for (var i=0; i<files.length;i++) {
		forEachFile(files[i]);			
		}
});

function forEachFile(filename) {
	fs.readFile(inpath + filename, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  var JSONstring = lceslog2lcesjson(data);
		if (JSONstring.length > 2) {
			fs.writeFile(outpath+filename + ".json", JSONstring);
		}
	});
}

function lceslog2lcesjson(s) {
		var i,j;
		var json=[];
//Wed May 29 02:47:24 CEST 2013;INFO;SALJSTOD;AD;multiExMerge;/Applications/A7510/1.0/A7510.xdp;successful pages:3
//Wed May 29 06:41:56 CEST 2013;INFO;SALJSTOD;AD;multiExMerge;/Applications/A7510/1.0/A7510.xdp;successful pages:3
			var lines = s.split("\n");
			for (i=0;i<lines.length;i++) {
				var o = {};
				var line = lines[i].split(";");
				if (line[1] == "INFO") {
					if (line[2] == "SALJSTOD" && line[3] == "AD") {
						// get date
						if (line[0].match(/CEST/)) var timestamp = new Date(line[0].replace(/CEST/, '+0200'));
						else if (line[0].match(/CET/)) var timestamp = new Date(line[0].replace(/CET/, '+0100'));
					else {console.log("error in line " + line);}
						
						o.t = timestamp.getTime();
						// formid
						o.f = line[5].split("/")[2];
						// pages
						var temp;
						if (temp = line[6].match(/pages:(\d)/)) {
							o.p = temp[1];
						}
						// channel
						switch(line[4]) {
							case "xml2pdf": o.c = "T"; break;
							case "singleExMergeA7479": o.c = "T"; break;
							case "multiExMerge": o.c = "K"; break;
							case "multiExMergeA7479": o.c = "K"; break;
						}
						json.push(o);

					} else {
					//NOT ;SALJSTOD;
					}
				} else {
					//;ERROR;
					}
			}
			return JSON.stringify(json);
	}
	
	