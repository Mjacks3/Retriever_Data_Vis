var banner_date;
var banner_time;


var globalcurrentDataSet;
var globalCurrentDataSetEntireSelection;

var hillside_com = ["Sideling","Pocomoke","Manokin", "Patuxent","Elk","Deepcreek","Casselman","Breton","Hillside"];                  
var patapsco = ["Patapsco", "Patapsco Addition"]

var residential_buildings = ["Chesapeake","Erickson Hall","Patapsco","Hillside", "Susquehanna","Potomac Hall","Walker AVE South",
							"Harbor Hall","Walker AVE North","Terrace","Westhills" ];
							
							
var academic_buildings = ["Public Policy","Administration","Biology","Chemistry","Math_Psyc","Academic IV",
                        "PAHB","Engineering","Fine Arts","Sondheim","Physics","ITE"];
						
var support_buildings = ["Library","Event Center","Commons","Dining Hall","University Center","RAC"];
	


function initCampusReportGeneration()
{
	
    setTimeout(function(){
		
	currentPage = "Campus";
	document.getElementById("corr").disabled = true;
	
	requestCumulativeDeviceCount();
	requestHourlyDeviceCount();
	requestDwellZones();
	
    showPage();}, 100)
	
    showloader();
}


function requestCumulativeDeviceCount(){
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
	"areas=118%2C185%2C211%2C239%2C304%2C488%2C587%2C614%2C629%2C657%2C664%2C1025%2C1118%2C1193%2C1206%2C1210%2C1260%2C1357%2C1389%"+
	"2C1421%2C1875%2C1880%2C1903%2C1564%2C1932%2C1960%2C2354%2C2376%2C2398%2C2438%2C2477%2C2690%2C2713%2C2743%2C2814%2C2915%2C2920%2C66&"+
	"timeRange=00%3A00-23%3A59&"+
	"period="+start+mid+end+"&"+
	"granularity=Building&"+
	"durationCategories=5-1440&"+
	"includeStationary=false&"+
	"connectionState="+connection_state+"&"+
	"type=deviceCount&_=1520953855762";
	
	
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET",cmxurl, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  console.log (response);

  globalCurrentDataSetEntireSelection = response;
	
  generateSummaryfromEntireDateSelection();
}




function requestHourlyDeviceCount(){
	   if (document.getElementById('all').checked){connection_state = "all";}
   else if (document.getElementById('detected').checked){connection_state = "detected";}
   else{connection_state = "connected";}
    
   var start = startDate.value;
   var end = endDate.value;
   var mid = "";  
   
   if (start == "" || end == ""){ start = "to"; end = "day";}
   else {mid = "%3B";}

	var cmxurl = "https://cmx.noc.umbc.edu/api/analytics/v1/deviceCount?"+
	"areas=118%2C185%2C211%2C239%2C304%2C488%2C587%2C614%2C629%2C657%2C664%2C1025%2C1118%2C1193%2C1206%2C1210%2C1260%2C1357%2C1389%2C1421%2C1875%2C1880%2C1903%2C1564%2C1932%2C1960%2C2354%2C2376%2C2398%2C2438%2C2477%2C2690%2C2713%2C2743%2C2814%2C2915%2C2920%2C66&"+
	"timeRange=00%3A00-23%3A59&"+
	"period="+start+mid+end+"&"+
	"granularity=Hourly&durationCategories=5-1440&yAxis=absoluteVisits&includeStationary=false&"+
	"connectionState="+connection_state+"&"+
	"type=deviceCount&_=1520953855762";
	

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET",cmxurl, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  console.log(response);
  globalcurrentDataSet = response; //Hold on to the data from the request for further analysis
  
  
  
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

  generatelinechart(overalldict);
}


function requestDwellZones(){
	
	
	var connection_state;
   
   if (document.getElementById('all').checked){connection_state = "all";}
   else if (document.getElementById('detected').checked){connection_state = "detected";}
   else{connection_state = "connected";}
   
   var start = startDate.value;
   var end = endDate.value;
   var mid = "";  
   
   if (start == "" || end == ""){ start = "to"; end = "day";}
   else {mid = "%3B";}

   
   var cmxurl = "https://cmx.noc.umbc.edu/api/analytics/v1/dwellBreakdown?areas=118%2C185%2C211%2C239%2C304%2C488%2C"+
   "587%2C614%2C629%2C657%2C664%2C1025%2C1118%2C1193%2C1206%2C1210%2C1260%2C1357%2C1389%2C1421%2C1875%2C1880%2C1903%2C"+
   "1564%2C1932%2C1960%2C2354%2C2376%2C2398%2C2438%2C2477%2C2690%2C2713%2C2743%2C2814%2C2915%2C2920%2C66&"+
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
  

	
}


/*
function generateheatchart()
{

Highcharts.chart('heatmapcontainer', {

    chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
    },


    title: {
        text: 'Device Count Per Day'
    },

    xAxis: {
        categories: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', 
        '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM' ]
    },

    yAxis: {
        reversed: true,
        categories: ['0-5 Mins', '5-20 Mins', '20-60 Mins', '60-120 Mins', '>120 Mins'],
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
            return '<b>' + this.point.value + ' clients reported on ' + this.series.yAxis.categories[this.point.y] +
            ' at ' + this.series.xAxis.categories[this.point.x] + '</b>';
        }
    },

    series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        data: [[0, 0, 10], [0, 1, 19],[0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78],
          [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52],
           [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8],
            [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13],
             [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32],
              [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], 
              [9, 2, 31], [9, 3, 48], [9, 4, 91]],
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }]

});

}




function generateheatchart2()
{

Highcharts.chart('heatmapcontainer2', {

    chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
    },


    title: {
        text: 'Device Count Per Day'
    },

    xAxis: {
        categories: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', 
        '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM' ]
    },

    yAxis: {
        reversed: true,
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',"Saturday"," sunday"],
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
            return '<b>' + this.point.value + ' clients reported on ' + this.series.yAxis.categories[this.point.y] +
            ' at ' + this.series.xAxis.categories[this.point.x] + '</b>';
        }
    },

    series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        data: [[0, 0, 10], [0, 1, 19],
         [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78],
          [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52],
           [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8],
            [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13],
             [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32],
              [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], 
              [9, 2, 31], [9, 3, 48], [9, 4, 91]],
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }]

});

}
*/

function generatelinechart(overalldict){
	var keyarray = Object.keys(overalldict);

	var seriesarray = [];
	for (var i = 0; i < keyarray.length; i++){
		seriesarray.push({});
		seriesarray[i]["name"] = keyarray[i];
		seriesarray[i]["data"] = overalldict[keyarray[i]];
}

 Highcharts.chart('linecontainer', {chart: {type: 'line'},
  title: {text: '<b> Hourly Device Count for UMBC Campus</b>'},
  subtitle: {text: 'Click a point to see a breakdown of device counts for that hour.'},
  xAxis: {categories: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM','1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM']},
  yAxis: {title: {text: 'Device Count'}},
  	colors:['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE','#DB843D',
	'#92A8CD', '#A47D7C', '#B5CA92','#307404','#e5ca9f','#2f26ad','#4d2018',
	'#cb5776','#a86fa8','#535b9e','#6f3fe4','#3ac6e6'],
  plotOptions:
  {line: {dataLabels:
  {enabled: true},
  enableMouseTracking: true},
  series:{allowPointSelect: true, 
  point: {events:{ click: function() 
							{
								generateSummaryfromPoint(this.series.index, this.index);
							}}}}
 
  },series: seriesarray});

  }    
  
function generateSummaryfromPoint(seriesindex, hourindex) 
{
	var totalCounts = 0;
	
	//Clear the existing Dictionary and reset values/counts to zero 
	campusDictionaryCount = {
	"Chesapeake": [0,[39.256729,-76.708521]],
	"Public Policy": [0,[39.255180,-76.709091]],
	"Administration": [0,[39.253047,-76.713489]],
	"Library": [0,[39.256588,-76.711768]],
	"Biology": [0,[39.2548479,-76.7122021]],
	"Erickson Hall": [0,[39.2570091,-76.7096952]],
	"Event Center": [0,[39.251967,-76.707406]],
	"Chemistry": [0,[39.2548812,-76.7128226]],
	"Math_Psyc": [0,[39.254104,-76.712457]],
	"Academic IV": [0,[39.2536036,-76.7134087]],
	"PAHB": [0,[39.2552382,-76.7153259]],
	"Commons": [0,[39.2549006,-76.7109555]],
	"Dining Hall": [0,[39.255900,-76.707633]],
	"Hillside": [0,[39.258085,-76.709147]],
	"Susquehanna": [0,[39.255695,-76.708620]],
	"Patapsco": [0,[39.255138,-76.706791]],
	"Engineering": [0,[39.254517,-76.713951]],
	"Fine Arts": [0,[39.255161,-76.713649]],
	"Sondheim": [0,[39.2534773,-76.7128474]],
	"Potomac Hall": [0,[39.256020,-76.706618]],
	"Walker AVE South": [0,[39.259463,-76.713824]],
	"Harbor Hall": [0,[39.257229,-76.708013]],
	"Physics": [0,[39.254558,-76.709573]],
	"ITE": [0,[39.2538416,-76.714377]],
	"University Center": [0,[39.254320,-76.713233]],
	"Walker AVE North": [0,[39.258806,-76.714932]],
	"Terrace": [0,[39.2573399,-76.7112603]],
	"RAC": [0,[39.252815,-76.712447]],
	"Westhills": [0,[39.258872,-76.712757]],
	};
	
	//Now, Let's get the counts for the hour that got selected
	
	//console.log(globalcurrentDataSet);
	var ix;
	for (ix = 0; ix  < globalcurrentDataSet["results"].length; ix ++)
	{
		//We need to find the data corresponding to the 
		//correct day and the correct hour or the day
		//Math: Each line(series index) is one day = 24hours.
		//Each point in the line is an hour
		//To find the index of the given point including multiple days,
		//Multiply series index by 24 and then add the hour index
		//console.log(globalcurrentDataSet["results"][ix]["area"]);
		//console.log(campusDictionaryCount[globalcurrentDataSet["results"][ix]["area"]]);
 
 
		//The Hillside Communities are listed individiually, check for them by name and add them to the "Hillside" key value pair
        if (hillside_com.includes(globalcurrentDataSet["results"][ix]["area"])){
            campusDictionaryCount["Hillside"][0]+=
			globalcurrentDataSet["results"][ix]["data"][ 24*seriesindex + hourindex]["value"];
        }
        
		//Patapsco East and West are listed individiually, check for them by name and add them to the "Patapso" key value pair
        else if (patapsco.includes(globalcurrentDataSet["results"][ix]["area"])){
            campusDictionaryCount["Patapsco"][0]+=
			globalcurrentDataSet["results"][ix]["data"][ 24*seriesindex + hourindex]["value"];
        }
		
		//Otherwise just update The totals
		else{
		campusDictionaryCount[globalcurrentDataSet["results"][ix]["area"]][0] += 
		globalcurrentDataSet["results"][ix]["data"][ 24*seriesindex + hourindex]["value"];
		}
		
		totalCounts += globalcurrentDataSet["results"][ix]["data"][ 24*seriesindex + hourindex]["value"];
	}
	updateBannerText("hour",seriesindex, hourindex);
	document.getElementById("dashtotal").innerHTML = totalCounts;

	heatmapConfiguration(campusDictionaryCount);
	
	generateCharts(campusDictionaryCount);
}

function heatmapConfiguration(building_dictionary) 
{
	 lat_longs_block = [];
	 for (const [key, value] of Object.entries(building_dictionary))
	 {	  
		  var counter; 
		  for (counter = 0; counter < value[0] ; counter ++)
		  {	
    		  lat_longs_block.push(value[1]);
		  }	
	  
	 }
	
	map = new google.maps.Map(document.getElementById('map'), 
    {tilt: 0,zoom: 17.2,center: {lat: 39.2558715, lng: -76.7118267},mapTypeId: 'satellite'});
	heatmap = new google.maps.visualization.HeatmapLayer({ data: getPoints( lat_longs_block), map: map })
	
	initPolygons();
    changeRadius();
    changeOpacity();
	return 0;
}


function generateCharts(dictonaryCounts)
{
  var total_residential_count = 0;
  var residential_drilldown = [];
  var residential_percentage = []; 
  
  var total_academic_count = 0;
  var academic_drilldown = [];
  var academic_percentage = [];
  
  
  var total_support_count = 0;
  var support_drilldown = [];
  var support_percentage = [];
  
  var ix;
  for (ix = 0 ;  ix < residential_buildings.length ; ix++){
	total_residential_count += dictonaryCounts[residential_buildings[ix]][0];
  residential_drilldown.push([residential_buildings[ix], dictonaryCounts[residential_buildings[ix]][0]]);
  	residential_percentage.push( Math.round( dictonaryCounts[residential_buildings[ix]][0]/document.getElementById("dashtotal").innerHTML *10000)/100);

}
	

  
  for (ix = 0 ;  ix < academic_buildings.length ; ix++){
	total_academic_count += dictonaryCounts[academic_buildings[ix]][0];
    academic_drilldown.push([academic_buildings[ix], dictonaryCounts[academic_buildings[ix]][0]]);
    academic_percentage.push( Math.round( dictonaryCounts[academic_buildings[ix]][0]/document.getElementById("dashtotal").innerHTML *10000)/100);
  }
  
  for (ix = 0 ;  ix  < support_buildings.length ; ix++){
	total_support_count += dictonaryCounts[support_buildings[ix]][0];
	support_drilldown.push([support_buildings[ix] ,dictonaryCounts[support_buildings[ix]][0]]);
	support_percentage.push( Math.round( dictonaryCounts[support_buildings[ix]][0]/document.getElementById("dashtotal").innerHTML *10000)/100);
  }
  

  
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Bar Chart
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  Highcharts.chart('barcontainer', {
  chart: {type: 'column'},title:
  {text: 'Device Count by Area for UMBC Campus'},
  subtitle: {text: 'Click a category for a device count breakdown by building'},
  xAxis: {type: 'category'},
  yAxis: {title: {text: 'Total Number of Devices'}},
  legend: {enabled: false},
  plotOptions: {series: {borderWidth: 0, dataLabels: {enabled: true, format: '{point.y:.1f}'}}},
	colors:['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE','#DB843D',
	'#92A8CD', '#A47D7C', '#B5CA92','#307404','#e5ca9f','#2f26ad','#4d2018',
	'#cb5776','#a86fa8','#535b9e','#6f3fe4','#3ac6e6'],
  tooltip: {headerFormat: '<span style="font-size:11px">{series.name}</span><br>', 
  pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> Devices<br/>'},

  "series": [{
      "name": "UMBC Campus", "colorByPoint": true, "data":
	  [ {"name": "Residential Buildings","y": total_residential_count,"drilldown": "Residential Buildings"},
        {"name": "Academic Buildings", "y": total_academic_count,"drilldown": "Academic Buildings"},
        {"name": "Support Facilities", "y": total_support_count, "drilldown": "Support Facilities"}]
    }],
  "drilldown": {
    "series": [
      {"name": "Residential Buildings","id": "Residential Buildings","data": residential_drilldown},
      {"name": "Academic Buildings","id": "Academic Buildings","data": academic_drilldown},
      {"name": "Support Facilities","id": "Support Facilities","data": support_drilldown}]
  }});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Bar Chart
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Pie Chart Processing
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var resareaper = Math.round(total_residential_count/document.getElementById("dashtotal").innerHTML *100*100)/100;         
var acdareaper = Math.round(total_academic_count/document.getElementById("dashtotal").innerHTML *10000)/100;          
var supareaper = Math.round(total_support_count/document.getElementById("dashtotal").innerHTML *10000)/100;

var colors = ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE','#DB843D',
	'#92A8CD', '#A47D7C', '#B5CA92','#307404','#e5ca9f','#2f26ad','#4d2018',
	'#cb5776','#a86fa8','#535b9e','#6f3fe4','#3ac6e6'],
	
  categories = ["Residential <br /> Buildings","Academic <br /> Buildings","Support <br /> Facilities"],
  data = [{
      "y": resareaper,"color": colors[0],"drilldown": {"name": "Residential Buildings",
        "categories": ["Chesapeake","Erickson Hall","Harbor Hall","Hillside","Patapsco","Potomac","Susquehanna",
		  "Terrace","Walker AVE North","Walker AVE South","Westhills" ],
		  
        "data": residential_percentage
      }},
    {
      "y": acdareaper,
      "color": colors[1],
      "drilldown": {"name": "Academic Buildings","categories": ["Academic IV","Administration Building","Biology",
          "Chemistry","Engineering","Fine Arts","ITE","Math_Psyc","PAHB","Sondheim","Physics","Public Policy"],
        "data": academic_percentage
      }
    },
    {
      "y": supareaper ,
      "color": colors[2],
      "drilldown": {
        "name": "Support Facilities",
        "categories": ["University Center","RAC","AOK Library","Commons","Dinning Hall","Event Center"],
        "data": support_percentage
      }
    },  
  ], 
  browserData = [],versionsData = [], i,j,dataLen = data.length,drillDataLen,brightness;


// Build the data arrays
for (i = 0; i < dataLen; i += 1) 
{
  // add browser data
  browserData.push({name: categories[i],y: data[i].y,color: colors[i]});

  // add version data
  drillDataLen = data[i].drilldown.data.length;
  for (j = 0; j < drillDataLen; j += 1)
	{
    brightness = 0.2 - (j / drillDataLen) / 5;
    versionsData.push({
	name: data[i].drilldown.categories[j],
	y: data[i].drilldown.data[j],
	color: colors[i]
    });
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Pie Chart Processing
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Pie  Chart
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Highcharts.chart('piecontainer', {chart: {type: 'pie'},title: 
{text: 'Device Count Percentage Pie Chart for UMBC Campus'},
  subtitle: {text: ''},
  yAxis: {title: {text: 'Total percent building/area share'}},
  plotOptions: { pie: {shadow: false,center: ['50%', '50%']}},
  tooltip: {valueSuffix: '%'},
  series: [
  {name: 'Areas',
  data: browserData,
  size: '60%', 
  dataLabels: {formatter: function () {return this.y > 5 ? this.point.name : null;},color: '#ffffff',distance: -30}}, 
  {
    name: 'Buildings',data: versionsData,size: '80%',innerSize: '60%',
    dataLabels: {formatter: function () {return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +this.y + '%' : null; }},
	id: 'versions'}],
		  
  responsive: {rules: [{condition: {maxWidth: 400},chartOptions: {series: [{id: 'versions',dataLabels: {enabled: false}}]}}]}
  });
  
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Pie  Chart
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}



function generateSummaryfromEntireDateSelection() {
	
	
	var totalCounts = 0;
	
	campusDictionaryCount = {
	"Chesapeake": [0,[39.256729,-76.708521]],
	"Public Policy": [0,[39.255180,-76.709091]],
	"Administration": [0,[39.253047,-76.713489]],
	"Library": [0,[39.256588,-76.711768]],
	"Biology": [0,[39.2548479,-76.7122021]],
	"Erickson Hall": [0,[39.2570091,-76.7096952]],
	"Event Center": [0,[39.251967,-76.707406]],
	"Chemistry": [0,[39.2548812,-76.7128226]],
	"Math_Psyc": [0,[39.254104,-76.712457]],
	"Academic IV": [0,[39.2536036,-76.7134087]],
	"PAHB": [0,[39.2552382,-76.7153259]],
	"Commons": [0,[39.2549006,-76.7109555]],
	"Dining Hall": [0,[39.255900,-76.707633]],
	"Hillside": [0,[39.258085,-76.709147]],
	"Susquehanna": [0,[39.255695,-76.708620]],
	"Patapsco": [0,[39.255138,-76.706791]],
	"Engineering": [0,[39.254517,-76.713951]],
	"Fine Arts": [0,[39.255161,-76.713649]],
	"Sondheim": [0,[39.2534773,-76.7128474]],
	"Potomac Hall": [0,[39.256020,-76.706618]],
	"Walker AVE South": [0,[39.259463,-76.713824]],
	"Harbor Hall": [0,[39.257229,-76.708013]],
	"Physics": [0,[39.254558,-76.709573]],
	"ITE": [0,[39.2538416,-76.714377]],
	"University Center": [0,[39.254320,-76.713233]],
	"Walker AVE North": [0,[39.258806,-76.714932]],
	"Terrace": [0,[39.2573399,-76.7112603]],
	"RAC": [0,[39.252815,-76.712447]],
	"Westhills": [0,[39.258872,-76.712757]],
	};
		
	//Now, Let's get the counts for the hour that got selected

	var ix;
	for (ix = 0; ix  < globalCurrentDataSetEntireSelection["results"].length; ix ++)
	{
		//The Hillside Communities are listed individiually, check for them by name and add them to the "Hillside" key value pair
        if (hillside_com.includes(globalCurrentDataSetEntireSelection["results"][ix]["area"])){
			//console.log(globalCurrentDataSetEntireSelection["results"][ix]["area"]);
			//console.log(globalCurrentDataSetEntireSelection["results"][ix]["data"][0]["value"]);
            campusDictionaryCount["Hillside"][0]+=
			globalCurrentDataSetEntireSelection["results"][ix]["data"][0]["value"];
        }
        
		//Patapsco East and West are listed individiually, check for them by name and add them to the "Patapso" key value pair
        else if (patapsco.includes(globalCurrentDataSetEntireSelection["results"][ix]["area"])){
            campusDictionaryCount["Patapsco"][0]+=
			globalCurrentDataSetEntireSelection["results"][ix]["data"][0]["value"];
        }
		
		//Otherwise just update The totals
		else{
		campusDictionaryCount[globalCurrentDataSetEntireSelection["results"][ix]["area"]][0] += 
		globalCurrentDataSetEntireSelection["results"][ix]["data"][0]["value"];
		}
		

		totalCounts += globalCurrentDataSetEntireSelection["results"][ix]["data"][0]["value"];

	}

	updateBannerText();
	document.getElementById("dashtotal").innerHTML = totalCounts;

	heatmapConfiguration(campusDictionaryCount);
	generateCharts(campusDictionaryCount);
}




