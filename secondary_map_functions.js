function initPolygons()
{
  // Define the LatLng coordinates for each building
  var coord_library = [ 
      {lat: 39.256603, lng:  -76.712439},{lat:39.257080,  lng: -76.711591},
      {lat: 39.256735,  lng: -76.710717},{lat:39.256098, lng:-76.711853}];
      
      

  var region = new google.maps.Polygon({
    paths: coord_library,
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


