 
 
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
        "durationCategories=0-240&"+
        "includeStationary=false&"+
        "connectionState=all&"+
        "type=deviceCount&"+
        "_=1520953855762"
        
    console.log("Opening request");
    xhttp.open("GET",restURL, false,"admin","HiddenFortress1958");
	console.log("Setting Header");
    xhttp.setRequestHeader("Content-type", "application/json");
	console.log("Sending");
    xhttp.send();
	console.log("Waiting for response");
	console.log(xhttp.status);
	
    // Get the raw header string
    var headers = xhttp.getAllResponseHeaders();
	console.log(headers);
    var response = JSON.parse(xhttp.responseText);
	console.log("Parsing responseText");
	console.log(response);
	console.log("Exiting CMX");
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
