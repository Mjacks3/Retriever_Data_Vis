var globalZoneDict;  
var orderedAreas;

var hourlyZoneDataCounts;
var cumulativeZoneDataCounts;


function initBuildingReportGeneration(building,report_type=1)
{
	setTimeout(function()
    {
	currentPage = building;
	document.getElementById("corr").disabled = false;
	//document.getElementById("corr").style.display = "inline";


	
	
	if (document.getElementById('count').checked)
	{
		 
		generateBuildingZones(building);
		requestCumulativeZoneDeviceCount();
		requestHourlyZoneDeviceCount();
		requestDwellBreakdownBuilding();
		
		document.getElementById("linecontainer").style.display = "block";
		document.getElementById("barcontainer").style.display = "block";
		document.getElementById("piecontainer").style.display = "block";
		document.getElementById("pathcontainer").style.display = "none";
		document.getElementById("corrcontainer").style.display = "none";
		
		
	}
	
	else{
		requestDevicePaths();
		document.getElementById("linecontainer").style.display = "none";
		document.getElementById("barcontainer").style.display  = "none";
		document.getElementById("piecontainer").style.display  = "none";
		document.getElementById("pathcontainer").style.display = "block";
		document.getElementById("corrcontainer").style.display = "block";
	}
	
	
	
	

	showPage();}, 250)
    showloader();
}


function generateBuildingZones(building)
{
	
    var xhttp = new XMLHttpRequest();  
    xhttp.open("GET","https://cmx.noc.umbc.edu/api/config/v1/heterarchy/allUserLevels?filterElements=false&_=1540573524517", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
	globalZoneDict = {};
	zone_names = [];
	var zone_registers = []
	 
	orderedAreas = "";
	
	var ix = 0;
	
    for (ix = 0; ix < response["userLevels"][3]["children"].length ;ix++)
    {      
		if (response["userLevels"][3]["children"][ix]["ancestors"][1] == building)
		{		
			globalZoneDict[response["userLevels"][3]["children"][ix]["name"]] = 
            [response["userLevels"][3]["children"][ix]["ancestors"][2],0];
         if (orderedAreas == ""){orderedAreas += String(response["userLevels"][3]["children"][ix]["id"]);}
        else {orderedAreas += "%2C"+ String(response["userLevels"][3]["children"][ix]["id"]) ;}
		}
		
			//Implemplemented these
			
     zone_registers.push(response["userLevels"][3]["children"][ix]["ancestors"][0]+"/"+
            response["userLevels"][3]["children"][ix]["ancestors"][1]+"/"+
            response["userLevels"][3]["children"][ix]["ancestors"][2]+"/"+
            response["userLevels"][3]["children"][ix]["name"]); 
    }
	
	for (ix = 0; ix < response["userLevels"][1]["children"].length ;ix++)
    {      
		if (response["userLevels"][1]["children"][ix]["name"] == building)
		{		
			currentBuildingId = response["userLevels"][1]["children"][ix]["id"];
		}
    }
	console.log(zone_registers);
	
}         

function requestCumulativeZoneDeviceCount(){	
	
	
	var connection_state;

   if (document.getElementById('all').checked){connection_state = "all";}
   else if (document.getElementById('detected').checked){connection_state = "detected";}
   else{connection_state = "connected";}
   
   var start = startDate.value;
   var end = endDate.value;
   var mid = "";  
   
   if (start == "" || end == ""){ start = "to"; end = "day";}
   else {mid = "%3B";}

	var cmxurl = "https://cmx.noc.umbc.edu/api/analytics/v1/deviceCount?"+
	"areas="+orderedAreas+"&"+
	"timeRange=00%3A00-23%3A59&"+
	"period="+start+mid+end+"&"+
	"granularity=Zone&durationCategories=5-1440&includeStationary=false&"+
	"connectionState="+connection_state+"&"+
	"type=deviceCount&_=1520953855762";
	
	
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET",cmxurl, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  cumulativeZoneDataCounts = response;
	
  generateZoneSummaryfromEntireDateSelection();
	
}


function requestHourlyZoneDeviceCount(){
	
    if (document.getElementById('all').checked){connection_state = "all";}
   else if (document.getElementById('detected').checked){connection_state = "detected";}
   else{connection_state = "connected";}
   
   var start = startDate.value;
   var end = endDate.value;
   var mid = "";  
   
   if (start == "" || end == ""){ start = "to"; end = "day";}
   else {mid = "%3B";}

	var cmxurl = "https://cmx.noc.umbc.edu/api/analytics/v1/deviceCount?"+
	"areas="+orderedAreas+"&"+
	"timeRange=00%3A00-23%3A59&"+
	"period="+start+mid+end+"&"+
	"granularity=Hourly&"+
	"durationCategories=0-1440&includeStationary=false&"+
	"connectionState="+connection_state+"&"+
	"type=deviceCount&_=1520953855762";

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET",cmxurl, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  
  hourlyZoneDataCounts = response; //Hold on to the data from the request for further analysis
	
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {dd = '0'+dd} 
  if(mm<10) { mm = '0'+mm} 
  today = yyyy + '-' + mm + '-' + dd;

  if (start == "to"){start = today;}
  if (end == "day"){var end = today;}

  var a = moment(start, 'YYYY-MM-DD');
  var b = moment(end, 'YYYY-MM-DD');
  var days = b.diff(a, 'days');
  days = days + 1;
  
  var overallcount = new Array(days);
  for (var i = 0; i <overallcount.length; i++){
    overallcount[i] = new Array(24);
    for (var j = 0; j < 24; j++){
		overallcount[i][j] = null;}}
  var countvalue;
  var quoindex;
  var remindex;

  for (var i = 0; i < response["results"][0]["data"].length; i++){
  	countvalue = 0;
  	for (var j = 0; j < response["results"].length; j++){
  		countvalue = countvalue + response["results"][j]["data"][i]["value"];
  	}
  	quoindex = Math.floor(i/24);
  	remindex = i%24;
  	overallcount[quoindex][remindex] = countvalue;
  }
  var overalldict = {};
  var newday = a;
  var date;
  var day;
  var month; 
  var year;
  
  for (var i = 0; i < overallcount.length; i++){
  	day = newday.format('DD');
	month = newday.format('MM');
	year = newday.format('YYYY');
	date = month + '.' + day + '.' + year;
  	overalldict[date] = overallcount[i];
  	newday = moment(newday, "YYYY-MM-DD").add(1, 'days');
  }

  generateZoneLineChart(overalldict);
}



function requestDwellBreakdownBuilding(){
	
	
	var connection_state;
   
   if (document.getElementById('all').checked){connection_state = "all";}
   else if (document.getElementById('detected').checked){connection_state = "detected";}
   else{connection_state = "connected";}
   
   var start = startDate.value;
   var end = endDate.value;
   var mid = "";  
   
   if (start == "" || end == ""){ start = "to"; end = "day";}
   else {mid = "%3B";}

   
   var cmxurl = "https://cmx.noc.umbc.edu/api/analytics/v1/dwellBreakdown?areas="+
   currentBuildingId + "&"+
   "granularity=hourly&"+
   "yAxis=absoluteVisits&"+
   "timeRange=00%3A00-23%3A59&"+
   "period="+start+mid+end+"&"+
   "durationCategories=5-480&"+
   "includeStationary=false&"+
   "connectionState="+connection_state+"&"+
   "dwellLimits=0-5min%3A5%2C5-20min%3A20%2C20-60min%3A60%2C60-120min%3A120%2C%3E120min%3A-1&_=1549905094173";
   
	
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET",cmxurl, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  console.log("Dwell Time");
  console.log(response);
  generateDwellBreakdownBuilding(response);
 
}

function generateDwellBreakdownBuilding(data)
{
	
	var matrix = [];
	for (var hourix=0; hourix<24; hourix++) 
	{
			for (var catix=0; catix<5; catix++){
				matrix.push([hourix,catix,0]);
			}	
	}

	for (var buildix=0; buildix < data['results'].length; buildix++) {	
		for (var hourix=0; hourix <data['results'][buildix]['data'].length; hourix++){
			
			if (hourix >= 24)
			 {
			   matrix[hourix %  24][2] +=  data['results'][buildix]['data'][hourix]['values']['0-5min'];
			   matrix[hourix + 1 %  24][2] += data['results'][buildix]['data'][hourix]['values']['5-20min'];
			   matrix[hourix + 2 %  24][2] += data['results'][buildix]['data'][hourix]['values']['20-60min'];
			   matrix[hourix + 3 %  24][2] += data['results'][buildix]['data'][hourix]['values']['60-120min']; 
			   matrix[hourix + 4 %  24][2] += data['results'][buildix]['data'][hourix]['values']['>120min'];
			 }
			else
			   {
			   matrix[hourix*5][2] +=  data['results'][buildix]['data'][hourix]['values']['0-5min'];
			   matrix[hourix*5+1][2] += data['results'][buildix]['data'][hourix]['values']['5-20min'];
			   matrix[hourix*5+2][2] += data['results'][buildix]['data'][hourix]['values']['20-60min'] ;
			   matrix[hourix*5+3][2] += data['results'][buildix]['data'][hourix]['values']['60-120min']; 
			   matrix[hourix*5+4][2] += data['results'][buildix]['data'][hourix]['values']['>120min'];
			   }
			   
				
		}	
	}

	

Highcharts.chart('heatmapcontainer', {

    chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
    },


    title: {
        text: '<b> Hourly Dwell Time Breakdown  </b>' 
    },

    xAxis: {
        categories: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', 
        '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM' ]
    },

    yAxis: {
        reversed: true,
        categories: ['0-5 Minutes', '5-20 Minutes', '20-60 Minutes', '60-120 Minutes', '>120 Minutes'],
        title: null
    },

    colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: '#FCD602'
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'bottom',
        y: 25,
        symbolHeight: 280
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.point.value + ' clients dwell ' + this.series.yAxis.categories[this.point.y] +
            ' during ' + this.series.xAxis.categories[this.point.x] + '</b>';
        }
    },

    series: [{
        name: 'Hourly DwellTime Breakdown',
        borderWidth: 1,
        data: matrix,
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }]

});

}


function generateZoneLineChart(overalldict){
	var keyarray = Object.keys(overalldict);

	var seriesarray = [];
	for (var i = 0; i < keyarray.length; i++){
		seriesarray.push({});
		seriesarray[i]["name"] = keyarray[i];
		seriesarray[i]["data"] = overalldict[keyarray[i]];
}

 Highcharts.chart('linecontainer', {chart: {type: 'line'},
  title: {text: '<b> Hourly Device Count for ' + currentPage + '</b>'},
  subtitle: {text: 'Click a point to see a breakdown of device counts for that hour.'},
  xAxis: {categories: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM','1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM']},
  yAxis: {title: {text: 'Device Count'}},
  drilldown: {activeAxisLabelStyle: { textDecoration: 'none', fontStyle: 'italic'},
              activeDataLabelStyle: { textDecoration: 'none',fontStyle: 'italic'}},
  plotOptions: {line: {dataLabels: {enabled: true},enableMouseTracking: true},
  series:{allowPointSelect: true, point: {events:{ click: function() 
							{
								generateZoneSummaryFromPoint(this.series.index, this.index);
							}}}}
  
  
  },
  	colors:['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE','#DB843D',
	'#92A8CD', '#A47D7C', '#B5CA92','#307404','#e5ca9f','#2f26ad','#4d2018',
	'#cb5776','#a86fa8','#535b9e','#6f3fe4','#3ac6e6'],
  series: seriesarray});}


function generateZoneSummaryFromPoint(seriesindex, hourindex) {
	
	var totalCount = 0;
	
	var ix;
	for (ix = 0; ix  < hourlyZoneDataCounts["results"].length; ix ++){
		
		//Reset the previous Value
		globalZoneDict[hourlyZoneDataCounts["results"][ix]["area"]][1] = 0;
		
		//Set our New Value
	    globalZoneDict[hourlyZoneDataCounts["results"][ix]["area"]][1] =
		hourlyZoneDataCounts["results"][ix]["data"][ 24*seriesindex + hourindex]["value"]
		
		totalCount += hourlyZoneDataCounts["results"][ix]["data"][ 24*seriesindex + hourindex]["value"];

	}
	
	updateBannerText("hour", seriesindex, hourindex);
	document.getElementById("dashtotal").innerHTML = totalCount;
	
	//console.log(zoneDictionaryCount);
	generateZoneCharts(globalZoneDict);
	
}

function generateZoneCharts(dictionaryCount)
{

	//First we define all unique floors, which will be our initial columns
	floors = new Set();
	for (const [key, value] of Object.entries(dictionaryCount))
	{if( floors.has(value[0])  == false ){floors.add(value[0]); }}
	
	
	//We get totals for each floor from the dictionaryCount on the floor
	var overview = [];
	var ix;
	for (ix = 0 ;  ix < Array.from(floors).length ; ix++)
	{
		floorTotals = 0;
		for (const [key, value] of Object.entries(dictionaryCount))
		{if ( Array.from(floors)[ix] == value[0]){floorTotals+=value[1];}}
		
		overview.push({"name":  Array.from(floors)[ix],"y": floorTotals,
    		"drilldown": Array.from(floors)[ix]});
	}
	
	
	//Now we'll prepare totals of each zone on each floor
	var zoneDrilldownSeries = [];
	for (ix = 0 ;  ix < Array.from(floors).length ; ix++)
	{
		var data =  [];
		for (const [key, value] of Object.entries(dictionaryCount))
		{if ( Array.from(floors)[ix] == value[0]){data.push([key,value[1]])}}
		
    	zoneDrilldownSeries.push({"name": Array.from(floors)[ix],
            "id": Array.from(floors)[ix],"data": data})
   }
	
	
	
// Create the chart
Highcharts.chart('barcontainer', {
    chart: { type: 'column'},
    title: {text: 'Number of Devices by Floor'},
    subtitle: { text: 'Click the columns to see each floor\'s zone breakdown </a>'},
    xAxis: {type: 'category'},
    yAxis: {title: {text: 'Number of Devices Detected'}},
    legend: { enabled: false },
	drilldown: {activeAxisLabelStyle: { textDecoration: 'none', fontStyle: 'italic'},
              activeDataLabelStyle: { textDecoration: 'none',fontStyle: 'italic'}},
    plotOptions: { 	 series: { borderWidth: 0,dataLabels: { enabled: true, format: '{point.y:.1f}'}}},
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> Detected Devices<br/>'
            },
		colors:['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE','#DB843D',
	'#92A8CD', '#A47D7C', '#B5CA92','#307404','#e5ca9f','#2f26ad','#4d2018',
	'#cb5776','#a86fa8','#535b9e','#6f3fe4','#3ac6e6'],
    "series": [{ "name": currentPage, "colorByPoint": true,"data": overview}],
    "drilldown": { "series": zoneDrilldownSeries }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PIECHART
	
var pie_data_array = [];
var colors = Highcharts.getOptions().colors
var total_detected = 0;

//First we'll get a total count of all devices
var ix;
for (const [key, value] of Object.entries(dictionaryCount))
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
	
	for (const [key, value] of Object.entries(dictionaryCount))
	{
		if (Array.from(floors)[ix] == value[0])
		{
			categories.push(key);
			data.push(Number(((value[1]/total_detected) *100).toFixed(2)));
			floor_total += value[1];
		}
	}
	//console.log(total_detected);
	//console.log(floor_total);
	
	pie_data_array.push({
		"y": Number( ((floor_total/total_detected) *100).toFixed(2)) ,
		"color": colors[ix],
		"drilldown":{"name": Array.from(floors)[ix],"categories":categories,"data":data}
	})
}
	
var colors = ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE','#DB843D',
	'#92A8CD', '#A47D7C', '#B5CA92','#307404','#e5ca9f','#2f26ad','#4d2018',
	'#cb5776','#a86fa8','#535b9e','#6f3fe4','#3ac6e6'],

    categories = Array.from(floors),
    data = pie_data_array,
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
        color: colors[i]
    });

    // add version data
    drillDataLen = data[i].drilldown.data.length;
    for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        versionsData.push({
            name: data[i].drilldown.categories[j],
            y: data[i].drilldown.data[j],
            color: colors[i]
        });
    }
}


// Create the chart
Highcharts.chart('piecontainer', {
	
    chart: {type: 'pie'},
    title: {text: 'Device Count Percentage Pie Chart for  ' + currentPage},
    subtitle: {text: 'Outer ring represents percentages of zones in each floor'},
    yAxis: {title: {text: 'Total percent Detected Devices'}},
	drilldown: {activeAxisLabelStyle: { textDecoration: 'none', fontStyle: 'italic'},
              activeDataLabelStyle: { textDecoration: 'none',fontStyle: 'italic'}},
    plotOptions: { 
	pie:
	{

		shadow: true,
	center: ['50%', '50%']
	
	}},
	
    tooltip: {valueSuffix: '%'},
    series: [{name: currentPage,data: browserData, size: '60%',
        dataLabels: 
        {formatter: function () {return this.y > 5 ? this.point.name : null;},
        color: '#ffffff',distance: -30}}, 
            {
        name: 'Zones',
        data: versionsData,

        size: '100%',
        innerSize: '60%',
        dataLabels: {
         formatter: function () {
                // display only if larger than 1
                return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                    this.y + '%' : null; }},
        id: 'versions'}],
    responsive: {rules: [{condition: {},chartOptions: {series: [{
                    id: 'versions',dataLabels: { enabled: true} }]}}]}
});

}

function getSum(total, num) {return total + num;}




function generateZoneSummaryfromEntireDateSelection() {
	
	var totalCount = 0;

	
	var ix;
	for (ix = 0; ix  < cumulativeZoneDataCounts["results"].length; ix ++){
		
		//Reset the previous Value
		globalZoneDict[cumulativeZoneDataCounts["results"][ix]["area"]][1] = 0;
		
		//Set our New Value
	    globalZoneDict[cumulativeZoneDataCounts["results"][ix]["area"]][1] =
		cumulativeZoneDataCounts["results"][ix]["data"][0]["value"]
		
		totalCount += cumulativeZoneDataCounts["results"][ix]["data"][0]["value"];

	}
	
	updateBannerText();
	document.getElementById("dashtotal").innerHTML = totalCount; 
	
	
	generateZoneCharts(globalZoneDict);
}




function requestDevicePaths(){
	//Add optional parameters
	var connection_state;

   if (document.getElementById('all').checked){connection_state = "all";}
   else if (document.getElementById('detected').checked){connection_state = "detected";}
   else{connection_state = "connected";}
   
   var start = startDate.value;
   var end = endDate.value;
   var mid = "";  
   
   if (start == "" || end == ""){ start = "to"; end = "day";}
   else {mid = "%3B";}

	var cmxurl = "https://cmx.noc.umbc.edu/api/analytics/v1/deviceCrossover?"+
	"timeRange=00%3A00-23%3A59&"+
	"period="+start+mid+end+"&"+
	"allAreas=118%2C185%2C304%2C587%2C629%2C664%2C1118%2C1193%2C1260%2C1357%2C1421%2C1564%2C1932%2C2376%2C2398%2C2477%2C2743%2C66&"+
	"granularity=Building&"+
	"targetAreas="+ currentBuildingId +"&"+
	"durationCategories=0-1440&"+
	"entirePeriod=false&"+
	"yAxis=absoluteVisits&"+  
	"_=1550786923820";
	
	console.log(cmxurl);
	
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET",cmxurl, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  console.log("response");
  var response = JSON.parse(xhttp.responseText)
  console.log(response);

  generateDevicePaths(response);
}

function generateDevicePaths(devicePathData){

	crossData = [{keys: ['from', 'to', 'weight'],data: [],
	colors:['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE','#DB843D',
	'#92A8CD', '#A47D7C', '#B5CA92','#307404','#e5ca9f','#2f26ad','#4d2018',
	'#cb5776','#a86fa8','#535b9e','#6f3fe4','#3ac6e6'],
	type: 'sankey',name: 'Sankey demo series'}];
	
	corPieData = [{
    'id': '0.0',
    'parent': '',
    'name': 'All Buildings'},
	{'id': '0.1',
    'parent': '0.0',
    'name': 'Academic Buildings'},
	{'id': '0.2',
    'parent': '0.0',
    'name': 'Support Buildings'},
];

	for (ix = 0; ix  < devicePathData["results"].length; ix ++){
		
		crossData[0]['data'].push(
		[devicePathData["results"][ix]["area"] +" (Starting)" , currentPage, 
		 devicePathData["results"][ix]["crossoverFromAreaIntoTarget"]]);
		 
		crossData[0]['data'].push(
		[currentPage, devicePathData["results"][ix]["area"] + " (Destination)",
		 devicePathData["results"][ix]["crossoverFromTargetIntoArea"]]);


		if (academic_buildings.includes(devicePathData["results"][ix]["area"]))
		{
		corPieData.push({
		'id': (.3+ (.1*ix)).toString(),
		'parent': '0.1',
		'name': devicePathData["results"][ix]["area"],
		'value':devicePathData["results"][ix]["crossover"] });
		}
		
		else
		{
		corPieData.push({
		'id': (.3+ (.1*ix)).toString(),
		'parent': '0.2',
		'name': devicePathData["results"][ix]["area"],
		'value':devicePathData["results"][ix]["crossover"] });
		}
		 

		
		
		
	}
	console.log(corPieData);
	
	Highcharts.chart('pathcontainer', {
	title: {text: 'Device Path Data for ' + currentPage},
	drilldown: {activeAxisLabelStyle: { textDecoration: 'none', fontStyle: 'italic'},
              activeDataLabelStyle: { textDecoration: 'none',fontStyle: 'italic'}},
	subtitle: { text: 'This chart displays the number of devices travelling between paths centered around ' + currentPage},
    series: crossData,
    plotOptions: {
        series: {
            colorByPoint: true
        }
    },
});


// Splice in transparent for the center circle
Highcharts.getOptions().colors.splice(0, 0, 'transparent');


Highcharts.chart('corrcontainer', {


    title: {
        text: 'Device Correlation data for '  + currentPage
    },
    subtitle: {
        text:  'This chart displays the union of device path data between each building and '+ currentPage 
    },
	colors:['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE','#DB843D',
	'#92A8CD', '#A47D7C', '#B5CA92','#307404','#e5ca9f','#2f26ad','#4d2018',
	'#cb5776','#a86fa8','#535b9e','#6f3fe4','#3ac6e6'],
	 drilldown: {activeAxisLabelStyle: { textDecoration: 'none', fontStyle: 'italic'},
              activeDataLabelStyle: { textDecoration: 'none',fontStyle: 'italic'}},
    series: [{
        type: "sunburst",
        data: corPieData,
        allowDrillToNode: true,
        cursor: 'pointer',
        dataLabels: {
            format: '{point.name}',
            filter: {
                property: 'innerArcLength',
                operator: '>',
                value: 16
            }
        },
        levels: [{
            level: 1,
            levelIsConstant: true,
            dataLabels: {
                filter: {
                    property: 'outerArcLength',
                    operator: '>',
                    value: 100
                }
            }
        }, {
            level: 2,
            colorByPoint: true
        },
        {
            level: 3,
            colorVariation: {
                key: 'brightness',
                to: -0.5
            }
        }, {
            level: 4,
            colorVariation: {
                key: 'brightness',
                to: 0.5
            }
        }]

    }],
	
    tooltip: {
		
        headerFormat: "<b>{point.name}</b>",
        pointFormat: '<b>{point.value}</b> device paths bewtween <b>{point.name}</b> and ' +currentPage + ' (& vice vera)'
    }
});

}
  
  


