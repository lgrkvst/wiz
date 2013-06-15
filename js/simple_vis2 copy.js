
var dateBar, hourBar, formPie;
var IKP_auth;

// HISTOGRAM
d3.json("http://localhost:8888/vislab/data.json", function (rawson) { 
	
	var ndx = crossfilter(rawson);
	var date = ndx.dimension(function (d) {
		return new Date(d.timestamp);
	});
	var dates = date.group(function (d) {
		return d3.time.day(d);
	});
	
	var auth = ndx.dimension(function (d) {
	    if (typeof d.properties !== "undefined" && typeof d.properties.services !== "undefined") {
            var temp = d.properties.services;
            if (typeof temp.Digipass !== "undefined" && temp.Digipass == true) {
	            return "Digipass";
	        }
	        if (typeof temp.BankID !== "undefined" && temp.BankID == true) {
	            return "BankID";
	        }
	    }
	});

    var auths = auth.group();

    var hour = ndx.dimension(function(d) {
        var n = new Date(d.timestamp);        
        return n.getHours(); 
    });
    var hours = hour.group();
	
	var formidD = ndx.dimension(function (d) { return d.formid; });

    function PadDimADay(timestampD) {
        var startDate = new Date(timestampD.bottom(1)[0].timestamp);
        var endDate = new Date(timestampD.top(1)[0].timestamp);
        startDate.setDate(startDate.getDate() - 2);
        endDate.setDate(endDate.getDate() + 0);
        return [startDate, endDate];
    }


	dateBar = dc.barChart("#dateBar");
	dateBar.width(960)
	.height(180)
	.dimension(date)
	.group(dates)
	.centerBar(true)
	.title(function (r) {
	    console.log(r.value);
	    return r.value + " forms";})
	.renderTitle(true)	
	.x(d3.time.scale().domain(PadDimADay(date)))
 	.elasticY(true)
    .renderHorizontalGridLines(true)
    .renderVerticalGridLines(true)
 	.xUnits(d3.time.days)
	.xAxis().tickFormat(function (x) {
	    return x.getDate() + "/" + (x.getMonth()+1);
	});
    
	hourBar = dc.barChart("#hourBar");
	hourBar.dimension(hour)
	    .width(300)
	    .height(180)
	    .group(hours)
	    .x(d3.scale.linear()
	        .domain([0, 23])
	        .rangeRound([0, 10 * 23])
	        )
	    ;

// PIE CHART

   formPie = dc.pieChart("#formPie")
   .width(250)
   .height(250)
   .radius(100)
   .innerRadius(40)
   .dimension(formidD)
   .group(formidD.group())
   .title(function(d) {
   	return d.data.key + ": " + d.data.value;
   })
   .renderTitle(true);

   authPie = dc.pieChart("#authPie")
   .width(250)
   .height(250)
   .radius(100)
   .innerRadius(40)
   .dimension(auth)
   .group(auths)
   .title(function(d) {
   	return d.data.key + ": " + d.data.value;
   })
   .renderTitle(true);


	dc.renderAll();
});

