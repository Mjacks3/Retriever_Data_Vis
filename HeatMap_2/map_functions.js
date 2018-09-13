var glbBuilds; 
var glbTotalnts;
var devisenum1;
var dashtotal = 0;

function getValues()
{
    return glbBuilds;
}


function initMap(start=null, end=null, startHour = 0, endHour = 0)
{
    setTimeout(function(){
    map = new google.maps.Map(document.getElementById('map'), 
        {
            zoom: 16.5,
            center: {lat: 39.2558715, lng: -76.7118267},
            mapTypeId: 'satellite'
        });
   
    builds = cmxDataRequest(start, end);
    data = timeframeOrganization(builds,startHour,endHour);
    block = data[0];
    glbTotalnts = data[1];
    devisenum1 = glbTotalnts[0];
    
    heatmap = new google.maps.visualization.HeatmapLayer
        ({
            data: getPoints(block),
            map: map  
        })
        /*
    // Define the LatLng coordinates for the polygon.
      var coord_antzuid = 
      [
      {lat: 39.256627, lng: -76.712462},
      {lat: 39.257084, lng: -76.711588},
      {lat: 39.256781, lng: -76.710724},
      {lat: 39.256021, lng: -76.711861}
      ]
      
   // Construct the polygon.
   var region = new google.maps.Polygon({
    paths: coord_antzuid,
    strokeColor: '#36688F',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#36688F',
    fillOpacity: 0.35
  });
  region.setMap(map);
  
    // Add a listener for the click event.
  region.addListener('click', showArrays);
  
  google.maps.event.addListener(region,"mouseover",function(){
   this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
  }); 
  
  google.maps.event.addListener(region,"mouseout",function(){
    this.setOptions({fillColor: "#36688F", strokeColor: "#36688F"});
  });

  infoWindow = new google.maps.InfoWindow;
}


/** @this {google.maps.Polygon} */
function showArrays(event) {
  // Since this polygon has only one path, we can call getPath() to return the
  // MVCArray of LatLngs.
 // var vertices = region.getPath();

  var contentString = '<h3>Antwerpen Zuid</h3>' +
      '<strong>Lorem Ipsum</strong><br>John Smith <br>Kerkstraat 01 <br>2000 <br>Antwerp <br>00 000 00 00 <br> john@smith.me'

  // Replace the info windows content and position.
  infoWindow.setContent(contentString); 
  infoWindow.setPosition(event.latLng);

  infoWindow.open(map);
}
      
*/
	
    changeRadius();
    changeOpacity();
    glbBuilds = builds;
    getdashsum();
    getbarcharts();
    
    showPage();}, 500)
    showloader();
}
	

function cmxDataRequest(start=null, end=null)
{
    var mid = "";	
    
    if (start == null || end == null)
	 {
        start = "to";
        end = "day";	
    }
    else
    {
		mid = "%3B" ;
    }
	
    var xhttp = new XMLHttpRequest();
    var restURL= "https://cmx.noc.umbc.edu/api/analytics/v1/deviceCount?"+
        "areas=118%2C185%2C304%2C488%2C587%"+
        "2C629%2C664%2C1025%2C1193%2C1206%2C1210%2C1260%2C1357"+
        "%2C1421%2C1875%2C1880%2C1564%2C1932%2C2354%2C2376%2C2398%2C2477"+
        "%2C2690%2C2713%2C2743%2C2814%2C2915%2C2920%2C66&"+
        "timeRange=00%3A00-23%3A59&"+
        "period="+start +mid+ end+"&"+
		  "granularity=hourly&"+
        "durationCategories=0-1440&"+
        "includeStationary=false&"+
        "connectionState=all&"+
        "type=deviceCount&"+
        "_=1520953855762"
        
    xhttp.open("GET",restURL, false,"admin","HiddenFortress1958");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);

    var builds; 
    builds = {};
    var ix;
    for (ix = 0; ix < response["results"].length ;ix++)
    {
		var captures;
		captures = new Array(24).fill(0);
		var ind;
		for (ind = 0; ind < response["results"][ix]["data"].length ;ind++)
		{
			captures[ ind % 24] = captures[ ind % 24] + response["results"][ix]["data"][ind]["value"];
		}
		builds[response["results"][ix]["area"]] = [captures];
    }

	 builds['Chesapeake'].push([39.2567085,-76.7086843]);
	 builds['Public Policy'].push([39.255092,-76.7094311]);
	 builds['Administration'].push([39.2533135,-76.7136622]);
	 builds['Library'].push([39.25623,-76.7118938]);
	 builds['Biology'].push([39.2548479,-76.7122021]);
	 builds['Erickson Hall'].push([39.2570091,-76.7096952]);
	 builds['Chemistry'].push([39.2548812,-76.7128226]);
	
	 builds['Math_Psyc'].push([39.2540944,-76.7125407]);
	 builds['Academic IV'].push([39.2536036,-76.7134087]);
	 builds['PAHB'].push([39.2552382,-76.7153259]);
	 builds['Commons'].push([39.2549006,-76.7109555]);
	 builds['Dining Hall'].push([39.255887,-76.7078899]);
	 builds['Hillside'].push([39.2578306,-76.7094585]);
	 builds['Susquehanna'].push([39.25553,-76.7089886]);
	
	 builds['Patapsco'].push([39.2550174,-76.7064426]);
	 builds['Patapsco Addition'].push([39.2552908,-76.707214]);
	 builds['Engineering'].push([39.2546022,-76.7140627]);
	 builds['Fine Arts'].push([39.2549059,-76.7137036]);
	
	 builds['Sondheim'].push([39.2534773,-76.7128474]);
	 builds['Potomac Hall'].push([39.2560987,-76.707022]);
	
	 builds['Walker AVE South'].push([39.2587439,-76.7150462]);
	 builds['Harbor Hall'].push([39.2572848,-76.7084016]);
	 builds['Physics'].push([39.2543472,-76.7099418]);
	 builds['ITE'].push([39.2538416,-76.714377]);
	 builds['University Center'].push([39.2543276,-76.7133115]);
	 builds['Walker AVE North'].push([39.2592171,-76.713879]);
	 builds['Terrace'].push([39.2573399,-76.7112603]);
	 builds['RAC'].push([39.2529955,-76.7128026]);
	 builds['Westhills'].push([39.2583289,-76.71274]);
	
	 console.log(builds);
	 console.log(Object.keys(builds));	
	 return builds;
}


function timeframeOrganization(builds, startHour = 0, endHour = 0) 
{
	 startHour = new Number( startHour);
	 endHour = new Number(endHour);
	 if ( endHour == 0 ) {endHour = 24;}	
	 if ( startHour > endHour ) 
	 {
		alert("Invalid Time fomat");
		return[[],[]];
	 } 

	 if (startHour == endHour) 
	 {
	  startHour = 0;
	  endHour = 24;
	 }
	
	 block = [] ;
	 totalCounts = [];
	 for (const [key, value] of Object.entries(builds))
	 {
        var totalBucket = 0;
        var timeslot;
		  for (timeslot = startHour; timeslot < endHour; timeslot++)
		  {
    		  totalBucket += value[0][timeslot];
		  }
		  totalCounts.push(totalBucket);
		  var counter; 
		  for (counter = 0; counter < totalBucket ; counter ++)
		  {	
    		  block.push(value[1]);
		  }	
	 }
    return [block,totalCounts] ;
}


function toggleHeatmap() 
{
    heatmap.setMap(heatmap.getMap() ? null : map);
}


function changeGradient() 
{
    var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}


function changeRadius()
{
    heatmap.set('radius', heatmap.get('radius') ? null : 57);
}


function changeOpacity() 
{
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.8);
}


function getPoints(block) 
{
    pts = [];
    var ind; 
    
    for (ind = 0;  ind < block.length ; ind++)
    {
        pts.push( new google.maps.LatLng(block[ind][0], block[ind][1]) ) ;
    }
    return pts;
}
	