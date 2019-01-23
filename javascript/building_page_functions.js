var globalZoneDict;  
var orderedAreas;
var globalCurrentZoneDataSet;
var globalCurrentZoneDataSetEntireSelection;


function initBuildingReportGeneration(building)
{
	setTimeout(function()
    {
	currentPage = building;
	
	
	generateBuildingZones(building);
	beginZoneDataRequest();
	

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
    for (ix = 0; ix < response["userLevels"][3]["children"].length ;ix++)
    {      
		if (response["userLevels"][3]["children"][ix]["ancestors"][1] == building)
		{		
			globalZoneDict[response["userLevels"][3]["children"][ix]["name"]] = 
            [response["userLevels"][3]["children"][ix]["ancestors"][2],0];
         if (orderedAreas == ""){orderedAreas += String(response["userLevels"][3]["children"][ix]["id"]);}
        else {orderedAreas += "%2C"+ String(response["userLevels"][3]["children"][ix]["id"]) ;}
		}
    }
		console.log(globalZoneDict);
}         


function beginZoneDataRequest(){
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
	"granularity=Zone&durationCategories=0-1440&includeStationary=false&"+
	"connectionState="+connection_state+"&"+
	"type=deviceCount&_=1520953855762";
	
	
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET",cmxurl, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  globalCurrentZoneDataSetEntireSelection = response;
	
  generateZoneSummaryfromEntireDateSelection();
	
	
	
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
	"granularity=Hourly&durationCategories=0-1440&includeStationary=false&"+
	"connectionState="+connection_state+"&"+
	"type=deviceCount&_=1520953855762";

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET",cmxurl, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  
  globalCurrentZoneDataSet = response; //Hold on to the data from the request for further analysis
  
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


function generateZoneLineChart(overalldict){
	var keyarray = Object.keys(overalldict);

	var seriesarray = [];
	for (var i = 0; i < keyarray.length; i++){
		seriesarray.push({});
		seriesarray[i]["name"] = keyarray[i];
		seriesarray[i]["data"] = overalldict[keyarray[i]];
}

 Highcharts.chart('linecontainer', {chart: {type: 'line'},
  title: {text: 'Hourly Device Count'},
  subtitle: {text: 'Each line represents the total device count  over the whole campus.'},
  xAxis: {categories: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM','1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM']},
  yAxis: {title: {text: 'Device Count'}},
  plotOptions: {line: {dataLabels: {enabled: true},enableMouseTracking: true},
  series:{allowPointSelect: true, point: {events:{ click: function() 
							{
								generateZoneSummaryFromPoint(this.series.index, this.index);
							}}}}
  
  
  },series: seriesarray});}


function generateZoneSummaryFromPoint(seriesindex, hourindex) {
	
	var totalCount = 0;
	
	var ix;
	for (ix = 0; ix  < globalCurrentZoneDataSet["results"].length; ix ++){
		
		//Reset the previous Value
		globalZoneDict[globalCurrentZoneDataSet["results"][ix]["area"]][1] = 0;
		
		//Set our New Value
	    globalZoneDict[globalCurrentZoneDataSet["results"][ix]["area"]][1] =
		globalCurrentZoneDataSet["results"][ix]["data"][ 24*seriesindex + hourindex]["value"]
		
		totalCount += globalCurrentZoneDataSet["results"][ix]["data"][ 24*seriesindex + hourindex]["value"];

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
    subtitle: { text: 'Click the columns to see each floor\'s zone\'s breakdown </a>'},
    xAxis: {type: 'category'},
    yAxis: {title: {text: 'Number of Devices Detected'}},
    legend: { enabled: false },
    plotOptions: { series: { borderWidth: 0,dataLabels: { enabled: true, format: '{point.y:.1f}'}}},
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> Detected Devices<br/>'
            },

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
    title: {text: 'Number of Devices by Zone within ' + currentPage},
    subtitle: {text: 'Source: <a href="http://statcounter.com" target="_blank">umbc.edu</a>'},
    yAxis: {title: {text: 'Total percent Detected Devices'}},
    plotOptions: { pie: {shadow: true, center: ['50%', '50%']}},
    tooltip: {valueSuffix: '%'},
    series: [{name: currentPage,data: browserData,size: '60%',
        dataLabels: 
        {formatter: function () {return this.y > 5 ? this.point.name : null;},
        color: '#ffffff',distance: -30}}, 
            {
        name: 'Zones',
        data: versionsData,
        size: '80%',
        innerSize: '60%',
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




function generateZoneSummaryfromEntireDateSelection() {
	
	var totalCount = 0;

	
	var ix;
	for (ix = 0; ix  < globalCurrentZoneDataSetEntireSelection["results"].length; ix ++){
		
		//Reset the previous Value
		globalZoneDict[globalCurrentZoneDataSetEntireSelection["results"][ix]["area"]][1] = 0;
		
		//Set our New Value
	    globalZoneDict[globalCurrentZoneDataSetEntireSelection["results"][ix]["area"]][1] =
		globalCurrentZoneDataSetEntireSelection["results"][ix]["data"][0]["value"]
		
		totalCount += globalCurrentZoneDataSetEntireSelection["results"][ix]["data"][0]["value"];

	}
	
	updateBannerText();
	document.getElementById("dashtotal").innerHTML = totalCount; 
	
	
	generateZoneCharts(globalZoneDict);
}





