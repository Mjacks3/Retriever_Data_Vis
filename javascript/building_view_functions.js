var zones;  
var orderedAreas;
var currentBuilding;


function generateBuildingZones(building)
{
    currentBuilding = building;
    var xhttp = new XMLHttpRequest();  
    xhttp.open("GET","https://cmx.noc.umbc.edu/api/config/v1/heterarchy/allUserLevels?filterElements=false&_=1540573524517", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
	 zones = {}
	 orderedAreas = "";
	 
    for (ix = 0; ix < response["userLevels"][3]["children"].length ;ix++)
    {
		if (response["userLevels"][3]["children"][ix]["ancestors"][1] == building)
		{		
			zones[response["userLevels"][3]["children"][ix]["name"]] = 
            [response["userLevels"][3]["children"][ix]["ancestors"][2],0];
            
            
         if (orderedAreas == ""){orderedAreas += String(response["userLevels"][3]["children"][ix]["id"]);}
        else {orderedAreas += "%2C"+ String(response["userLevels"][3]["children"][ix]["id"]) ;}
		}
    }
}         

function requestZoneData(start=null, end=null,now_view = false,time_idx=0, 
                    granularity="Zone", timeRange="00%3A00-23%3A59&")                                                                                                
{
    setTimeout(function()
    {
    if (now_view == true){console.log("Empty"); }
    
    else{cmxZoneDataRequest(start,end,timeRange,granularity,time_idx);} 
    
    console.log(zones);
    
    //Dashcharts
    getBuildingCharts();
    
    showPage();}, 700)
    showloader();
}


function cmxZoneDataRequest(start=null, end=null, timeRange="00%3A00-23%3A59&",
                                     granularity = "Zone", time_idx = 0)
{
    var mid = "";	
    if (start == null || end == null)
	 {
        start = "to";
        end = "day";	
    }
    else {mid = "%3B";}
    
    var connection_state;
    
    if (document.getElementById('all').checked)
    {connection_state = "all";}
    else if (document.getElementById('detected').checked)
    {connection_state = "detected";}
    else
    {connection_state = "connected";}
    
    var restURL = getZoneRestURL(timeRange,start,mid,end,granularity,connection_state);
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET",restURL, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);

    var ix;
    for (ix = 0; ix < response["results"].length ;ix++)
    {
    		zones[response["results"][ix]["area"]][1] =
    		response["results"][ix]["data"][time_idx]["value"];
    }
    

}




function getZoneRestURL(timeRange,start,mid,end,granularity,connection_state)
{   

    var restURL= "https://cmx.noc.umbc.edu/api/analytics/v1/deviceCount?"+
        "areas="+orderedAreas+"&"+
        "timeRange="+timeRange+
        "period="+start +mid+ end+"&"+
        "granularity="+ granularity +"&"+
        "durationCategories=0-1440&"+
        "includeStationary=false&"+
        "connectionState="+connection_state+"&"+
        "type=deviceCount&"+
        "_=1540585957657"   ;   
        return restURL; 
}


function getBuildingCharts()
{

	//First we define all unique floors, which will be our initial columns
	floors = new Set();
	for (const [key, value] of Object.entries(zones))
	{if( floors.has(value[0])  == false ){floors.add(value[0]); }}
	
	
	//We get totals for each floor from the zones on the floor
	var overview = [];
	var ix;
	for (ix = 0 ;  ix < Array.from(floors).length ; ix++)
	{
		floorTotals = 0;
		for (const [key, value] of Object.entries(zones))
		{if ( Array.from(floors)[ix] == value[0]){floorTotals+=value[1];}}
		
		overview.push({"name":  Array.from(floors)[ix],"y": floorTotals,
    		"drilldown": Array.from(floors)[ix]});
	}
	
	
	//Now we'll prepare totals of each zone on each floor
	var zoneDrilldownSeries = [];
	for (ix = 0 ;  ix < Array.from(floors).length ; ix++)
	{
		var data =  [];
		for (const [key, value] of Object.entries(zones))
		{if ( Array.from(floors)[ix] == value[0]){data.push([key,value[1]])}}
		
    	zoneDrilldownSeries.push({"name": Array.from(floors)[ix],
            "id": Array.from(floors)[ix],"data": data})
   }
	
	console.log(zoneDrilldownSeries);
	
	
	
	
// Create the chart
Highcharts.chart('barcontainer', {
    chart: { type: 'column'},
    title: {text: 'Number of Devices by Floor'},
    subtitle: { text: 'Click the columns to see each floor\'s zone\'s breakdown </a>'},
    xAxis: {type: 'category'},
    yAxis: {title: {text: 'Number of Devices Detected'}},
    legend: { enabled: false },
    plotOptions: { series: { borderWidth: 0,dataLabels: { enabled: true, format: '{point.y:.1f}'}}},
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> Detected Devices<br/>'
            },

    "series": [{ "name": currentBuilding, "colorByPoint": true,"data": overview}],
    "drilldown": { "series": zoneDrilldownSeries }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PIECHART
	
var pie_data_array = [];
var colors = Highcharts.getOptions().colors
var total_detected = 0;

//First we'll get a total count of all devices
var ix;
for (const [key, value] of Object.entries(zones))
	{
    	total_detected += value[1];
	}


//Next we'll build the arrays for our pie chart using percentages
for (ix = 0 ;  ix < Array.from(floors).length ; ix++)
{
	var categories = [];
	var data = [];
	var dataPercents = [];
	var floor_total = 0;
	
	for (const [key, value] of Object.entries(zones))
	{
		if (Array.from(floors)[ix] == value[0])
		{
			categories.push(key);
			data.push(Number(((value[1]/total_detected) *100).toFixed(2)));
			floor_total += value[1];
		}
	}
	console.log(total_detected);
	console.log(floor_total);
	
	pie_data_array.push({
		"y": Number( ((floor_total/total_detected) *100).toFixed(2)) ,
		"color": colors[Math.floor(Math.random() *colors.length)],
		"drilldown":{"name": Array.from(floors)[ix],"categories":categories,"data":data}
	})
}
	
var colors = Highcharts.getOptions().colors,
    categories = Array.from(floors),
    data = pie_data_array ,
    browserData = [],
    versionsData = [],
    i,
    j,
    dataLen = data.length,
    drillDataLen,
    brightness;


// Build the data arrays
for (i = 0; i < dataLen; i += 1) {

    // add browser data
    browserData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color
    });

    // add version data
    drillDataLen = data[i].drilldown.data.length;
    for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        versionsData.push({
            name: data[i].drilldown.categories[j],
            y: data[i].drilldown.data[j],
            color: Highcharts.Color(data[i].color).brighten(brightness).get()
        });
    }
}

// Create the chart
Highcharts.chart('piecontainer', {
    chart: {type: 'pie'},
    title: {text: 'Number of Devices by Zone within ' + currentBuilding},
    subtitle: {text: 'Source: <a href="http://statcounter.com" target="_blank">umbc.edu</a>'},
    yAxis: {title: {text: 'Total percent Detected Devices'}},
    plotOptions: { pie: {shadow: true, center: ['50%', '50%']}},
    tooltip: {valueSuffix: '%'},
    series: [{name: currentBuilding,data: browserData,size: '90%',
        dataLabels: 
        {formatter: function () {return this.y > 5 ? this.point.name : null;},
        color: '#ffffff',distance: -30}}, 
            {
        name: 'Zones',
        data: versionsData,
        size: '70%',
        innerSize: '50%',
        dataLabels: {
         formatter: function () {
                // display only if larger than 1
                return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                    this.y + '%' : null; }},
        id: 'versions'}],
    responsive: {rules: [{condition: {maxWidth: 400},chartOptions: {series: [{
                    id: 'versions',dataLabels: { enabled: true} }]}}]}
});

}
function getSum(total, num) {return total + num;}
