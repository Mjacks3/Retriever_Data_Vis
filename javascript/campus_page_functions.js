var glbBuilds; 
var glbTotalnts;
var devisenum1;
var dashtotal = 0;
var infoWindow;
var all_buildings;
var currentrequest = "";
var currentDataSet;

var residential_buildings = ["Chesapeake","Erickson Hall","Hillside","Susquehanna","Potomac Hall","Walker AVE South",
							"Harbor Hall","Walker AVE North","Terrace","Westhills" ];
var academic_buildings = ["Public Policy","Administration","Biology","Chemistry","Math_Psyc","Academic IV",
                        "PAHB","Engineering","Fine Arts","Sondheim","Physics","ITE"];
var support_buildings = ["Library","Event Center","Commons","Dining Hall","University Center","RAC"];
	

function getValues()
{
    return glbBuilds;
}

function initMap(start=null, end=null,now_view = false,time_idx=0, 
                    granularity="Building", timeRange="00%3A00-23%3A59&")
{
    setTimeout(function()
    {
    
    map = new google.maps.Map(document.getElementById('map'), 
    {tilt: 0,zoom: 17.2,center: {lat: 39.2558715, lng: -76.7118267},mapTypeId: 'satellite'});

    currentrequest = "Bop";
    all_buildings = cmxDataRequest(start,end,timeRange,granularity,time_idx);

    //console.log(all_buildings)
    data = timeframeOrganization(all_buildings);
    //console.log(data);
    
    block = data[0];
    glbTotalnts = data[1];
    devisenum1 = glbTotalnts[0];
    
    heatmap = new google.maps.visualization.HeatmapLayer({ data: getPoints(block), map: map })
    
    //console.log(all_buildings);
    initPolygons();
    changeRadius();
    changeOpacity();
    
    glbBuilds = all_buildings;
    getdashsum();
    getbarcharts();
    beginDataRequest();
    showPage();}, 1000)
    showloader();
}
	
function cmxDataRequest(start=null, end=null, timeRange="00%3A00-23%3A59&",
                                     granularity = "Building", time_idx = 0)
{
    var mid = "";	
    if (start == null || end == null){
        start = "to";
        end = "day";	
    }
    else {mid = "%3B";}
    
    
    var connection_state;
    if (document.getElementById('all').checked){connection_state = "all";}
    else if (document.getElementById('detected').checked){connection_state = "detected";}
    else{connection_state = "connected";}
    
    //console.log(timeRange);
    var restURL = getrestURL(timeRange,start,mid,end,granularity,connection_state);
    
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET",restURL, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    //console.log(response);

    var builds;
    builds = {"Hillside": [0],"Patapsco": [0]};
    var hillside_com = ["Sideling","Pocomoke","Manokin", "Patuxent","Elk","Deepcreek","Casselman","Breton","Hillside"];                  
    var patapsco = ["Patapsco", "Patapsco Addition"]
                    
    //console.log(response["results"]);
    
    var ix;
    for (ix = 0; ix < response["results"].length ;ix++){
  
        if (hillside_com.includes(response["results"][ix]["area"])){
            builds["Hillside"][0] += response["results"][ix]["data"][time_idx]["value"];
        }
        
        else if ( patapsco.includes(response["results"][ix]["area"])){
            builds["Patapsco"][0] += response["results"][ix]["data"][time_idx]["value"];
        }
        
        else{   
    		builds[response["results"][ix]["area"]] = [response["results"][ix]["data"][time_idx]["value"]];
    	  }
    }
    
    //console.log(builds);
	 builds['Chesapeake'].push([39.256729,-76.708521]);
	 builds['Public Policy'].push([39.255180,-76.709091]);
	 builds['Administration'].push([39.253047,-76.713489]);
	 builds['Library'].push([39.256588,-76.711768]);
	 builds['Biology'].push([39.2548479,-76.7122021]);
	 builds['Erickson Hall'].push([39.2570091,-76.7096952]);
	 builds['Event Center'].push([39.251967,-76.707406]);
	 builds['Chemistry'].push([39.2548812,-76.7128226]);
	 builds['Math_Psyc'].push([39.254104,-76.712457]);
	 builds['Academic IV'].push([39.2536036,-76.7134087]);
	 builds['PAHB'].push([39.2552382,-76.7153259]);
	 builds['Commons'].push([39.2549006,-76.7109555]);
	 builds['Dining Hall'].push([39.255900,-76.707633]);
	 builds['Hillside'].push([39.258085,-76.709147]);
	 builds['Susquehanna'].push([39.255695,-76.708620]);
	 builds['Patapsco'].push([39.255138,-76.706791]);
	 builds['Engineering'].push([39.254517,-76.713951]);
	 builds['Fine Arts'].push([39.255161,-76.713649]);
	 builds['Sondheim'].push([39.2534773,-76.7128474]);
	 builds['Potomac Hall'].push([39.256020,-76.706618]);
	 builds['Walker AVE South'].push([39.259463,-76.713824]);
	 builds['Harbor Hall'].push([39.257229,-76.708013]);
	 builds['Physics'].push([39.254558,-76.709573]);
	 builds['ITE'].push([39.2538416,-76.714377]);
	 builds['University Center'].push([39.254320,-76.713233]);
	 builds['Walker AVE North'].push([39.258806,-76.714932]);
	 builds['Terrace'].push([39.2573399,-76.7112603]);
	 builds['RAC'].push([39.252815,-76.712447]);
	 builds['Westhills'].push([39.258872,-76.712757]);
	 return builds;
}
function getrestURL(timeRange,start,mid,end,granularity,connection_state)
{
    var restURL= "https://cmx.noc.umbc.edu/api/analytics/v1/deviceCount?"+
        "areas=118%2C185%2C211%2C239%2C304%2C488%2C587%2C614%2C629%2C657%2C664%2C1025"+
        "%2C1118%2C1193%2C1206%2C1210%2C1260%2C1357%2C1389%2C1421%2C1875%2C1880"+
        "%2C1903%2C1564%2C1932%2C1960%2C2354%2C2376%2C2398%2C2438%2C2477"+
        "%2C2690%2C2713%2C2743%2C2814%2C2915%2C2920%2C66&"+
        "timeRange="+timeRange+
        "period="+start +mid+ end+"&"+
        "granularity="+ granularity +"&"+
        "durationCategories=0-1440&"+
        "includeStationary=false&"+
        "connectionState="+connection_state+"&"+
        "type=deviceCount&"+
        "_=1520953855762"   
    return restURL; 
} 
function timeframeOrganization(builds) 
{
	 lat_longs_block = [] ;
	 totalCounts = [];
	 
	 for (const [key, value] of Object.entries(builds))
	 {	  
		  totalCounts.push(value[0]);
	  
		  var counter; 
		  for (counter = 0; counter < value[0] ; counter ++)
		  {	
    		  lat_longs_block.push(value[1]);
		  }	
	  
	 }
    return [lat_longs_block, totalCounts] ;
}

function getbarcharts(){  
 
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
	total_residential_count += all_buildings[residential_buildings[ix]][0];
	residential_drilldown.push([residential_buildings[ix], all_buildings[residential_buildings[ix]][0]]);
	residential_percentage.push( Math.round( all_buildings[residential_buildings[ix]][0]/dashtotal*10000)/100);
   }
  
  for (ix = 0 ;  ix < academic_buildings.length ; ix++){
	total_academic_count += all_buildings[academic_buildings[ix]][0];
    academic_drilldown.push([academic_buildings[ix], all_buildings[academic_buildings[ix]][0]]);
    academic_percentage.push( Math.round( all_buildings[academic_buildings[ix]][0]/dashtotal*10000)/100);
  }
  
  for (ix = 0 ;  ix  < support_buildings.length ; ix++){
	total_support_count += all_buildings[support_buildings[ix]][0];
	support_drilldown.push(
	
	
	
	[  support_buildings[ix] ,
	all_buildings[support_buildings[ix]][0]
	]
	
	
	
	
	);
	
	support_percentage.push( Math.round( all_buildings[support_buildings[ix]][0]/dashtotal*10000)/100);
  }
  
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Bar Chart
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Highcharts.chart('barcontainer', {
  chart: {type: 'column'},title: {text: 'Devices Number by Areas on Campus'},
  subtitle: {text: 'Click the columns to view versions. School Website: <a href="https://www.umbc.edu/" target="_blank">umbc.edu</a>'},
  xAxis: {type: 'category'},
  yAxis: {title: {text: 'Total Number of Devices'}},
  legend: {enabled: false},
  plotOptions: {series: {borderWidth: 0, dataLabels: {enabled: true, format: '{point.y:.1f}'}}},

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

var resareaper = Math.round(total_residential_count/dashtotal*100*100)/100;         
var acdareaper = Math.round(total_academic_count/dashtotal*10000)/100;          
var supareaper = Math.round(total_support_count/dashtotal*10000)/100;

var colors = Highcharts.getOptions().colors,
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
  browserData.push({name: categories[i],y: data[i].y,color: data[i].color});

  // add version data
  drillDataLen = data[i].drilldown.data.length;
  for (j = 0; j < drillDataLen; j += 1)
	{
    brightness = 0.2 - (j / drillDataLen) / 5;
    versionsData.push({
	name: data[i].drilldown.categories[j],
	y: data[i].drilldown.data[j],
	color: Highcharts.Color(data[i].color).brighten(brightness).get()
    });
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Pie Chart Processing
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Pie  Chart
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Highcharts.chart('piecontainer', {chart: {type: 'pie'},title: {text: 'Devices Count Percentage Pie Chart'},
  subtitle: {text: 'School Info: <a href="https://www.umbc.edu/" target="_blank">umbc.edu</a>'},
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

function getdashsum(){
  dashtotal = 0;
  for (var i = 0; i < glbTotalnts.length; i++){dashtotal += glbTotalnts[i]; }
  document.getElementById("dashtotal").innerHTML = dashtotal;
}

function requestBarChart()
{
    getdashsum(); 
    getbarcharts();     
}                    


          
function beginDataRequest(){
	console.log("Entered Data Req");
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
	"areas=118%2C185%2C211%2C239%2C304%2C488%2C587%2C614%2C629%2C657%2C664%2C1025%2C1118%2C1193%2C1206%2C1210%2C1260%2C1357%2C1389%2C1421%2C1875%2C1880%2C1903%2C1564%2C1932%2C1960%2C2354%2C2376%2C2398%2C2438%2C2477%2C2690%2C2713%2C2743%2C2814%2C2915%2C2920%2C66&"+
	"timeRange=00%3A00-23%3A59&"+
	"period="+start+mid+end+"&"+
	"granularity=Hourly&durationCategories=0-1440&includeStationary=false&"+
	"connectionState="+connection_state+"&"+
	"type=deviceCount&_=1520953855762";
	processDataRequest(cmxurl, start, end);
} 

function processDataRequest(cmxurl, start, end){

  var xhttp = new XMLHttpRequest();

  xhttp.open("GET",cmxurl, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
   
  console.log("Data Response");
  console.log(response);
   
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
  console.log('overall dict');
  console.log(overalldict);
  getlinechart(overalldict);

}

function getlinechart(overalldict){
	var keyarray = Object.keys(overalldict);
	//var seriesdict = {};

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
  plotOptions: {line: {dataLabels: {enabled: true},enableMouseTracking: false},
  series:{allowPointSelect: true, point: {events:{ click: function() 
							{
								//alert('okk');
								
							}}}}
  
  
  },series: seriesarray});}    
  


