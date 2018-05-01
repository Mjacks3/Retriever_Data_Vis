 
 
 // This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
//<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

var map, heatmap;
console.log("File Linked!");

initMap()

function initMap() {
  console.log("Entered InitMap Function");
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: {lat: 37.775, lng: -122.434},
    mapTypeId: 'satellite'
  });
  
   
   //document.write("Hello World");
   //window.alert("Hello World 1");
   
   cmx();
   heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map   
	
 })
 console.log("Exiting InitMap Function");
}

function cmx() {
	console.log("Entered CMX Function");
    var xhttp = new XMLHttpRequest();
    var restURL= "https://cmx.noc.umbc.edu/api/analytics/v1/deviceCount?"+
        "areas=118%2C185%2C304%2C488%2C587%"+
        "2C629%2C664%2C1025%2C1193%2C1206%2C1210%2C1260%2C1357"+
        "%2C1421%2C1875%2C1880%2C1564%2C1932%2C2354%2C2376%2C2398%2C2477"+
        "%2C2690%2C2713%2C2743%2C2814%2C2915%2C2920%2C66&"+
        "timeRange=00%3A00-11%3A59&"+
        "period=today&"+
		"granularity=hourly&"+
        "durationCategories=0-1440&"+
        "includeStationary=false&"+
        "connectionState=all&"+
        "type=deviceCount&"+
        "_=1520953855762"
        
    xhttp.open("GET",restURL, false,"admin","HiddenFortress1958");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    // Get the raw header string
    var response = JSON.parse(xhttp.responseText);
	console.log("Output");
	
	var builds; 
	builds = {};
	var ix;
	for (ix = 0; ix < response["results"].length ;ix++)
	{
		var captures;
		captures = [];
		
		var ind;
		for (ind = 0; ind < response["results"][ix]["data"].length ;ind++)
		{
			captures.push(response["results"][ix]["data"][ind]["value"]);
		}
		builds[response["results"][ix]["area"]] = [captures];

	}
	
	builds['Chesapeake'].push((39.2567085,-76.7086843));
	builds['Public Policy'].push((39.255092,-76.7094311));
	builds['Administration'].push((39.2533135,-76.7136622));
	builds['Library'].push((39.25623,-76.7118938));
	builds['Biology'].push((39.2548479,-76.7122021));
	builds['Erickson Hall'].push((39.2570091,-76.7096952));
	builds['Chemistry'].push((39.2548812,-76.7128226));
	
	builds['Math_Psyc'].push((39.2540944,-76.7125407));
	builds['Academic IV'].push((39.2536036,-76.7134087));
	builds['PAHB'].push((39.2552382,-76.7153259));
	builds['Commons'].push((39.2549006,-76.7109555));
	builds['Dining Hall'].push((39.255887,-76.7078899));
	builds['Hillside'].push((39.2578306,-76.7094585));
	builds['Susquehanna'].push((39.25553,-76.7089886));
	
	builds['Patapsco'].push((39.2550174,-76.7064426));
	builds['Patapsco Addition'].push((39.2552908,-76.707214));
	builds['Engineering'].push((39.2546022,-76.7140627));
	builds['Fine Arts'].push((39.2549059,-76.7137036));
	builds['Sondheim'].push((39.2534773,-76.7128474));
	builds['Potomac Hall'].push((39.2560987,-76.707022));
	builds['Chesapeake'].push((39.2587439,-76.7150462));
	builds['Chesapeake'].push((39.2572848,-76.7084016));
	//Finish mappings and then move on
	
	console.log(builds);
	console.log("Exiting CMX");
	
	return builds;
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
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

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

// Heatmap data: 500 Points
function getPoints() {
  return [
    new google.maps.LatLng(37.782551, -122.445368),
    new google.maps.LatLng(37.782745, -122.444586),
    new google.maps.LatLng(37.751266, -122.403355)
  ];
}
