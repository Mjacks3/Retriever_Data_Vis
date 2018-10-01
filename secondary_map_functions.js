function initPolygons()
{
  // Define the LatLng coordinates for each building
  
  var coord_pub = [ 
      {lat: 39.255418, lng: -76.709376},{lat:39.255183,  lng: -76.708687},
      {lat: 39.255023,  lng: -76.708776},{lat:39.255163, lng: -76.709465}];
 
  var coord_admin = [ 
      {lat:39.253140 , lng:-76.713256 },{lat: 39.252876, lng: -76.713395  },
      {lat:39.252977 , lng: -76.713717 },{lat:39.253241 , lng: -76.713581}];  
   
  var coord_library = [ 
      {lat: 39.256603, lng:  -76.712439},{lat:39.257080,  lng: -76.711591},
      {lat: 39.256735,  lng: -76.710717},{lat:39.256098, lng:-76.711853}];
      
  var coord_bio = [ 
      {lat:39.255344, lng:-76.711639 },{lat:39.254439,  lng: -76.712203  },
      {lat:39.254529, lng: -76.712395},{lat:39.255405, lng: -76.711905}];  
  
  var coord_event_center = [ 
      {lat:39.252427, lng: -76.707566},{lat:39.252061 ,  lng: -76.706816  },
     {lat:39.251546, lng: -76.707277},{lat:39.251899, lng:-76.708003 }];   
    

  var coord_chem = [ 
      {lat:39.255186, lng:-76.712295},{lat:39.254531,  lng: -76.712638 },
      {lat:39.254734, lng:-76.713257},{lat:39.255319, lng: -76.712964}];    
      
      
  var coord_math_psych = [ 
      {lat:39.254363, lng:-76.712121},{lat:39.253821, lng:-76.712389},
      {lat:39.253848, lng:-76.712653 },{lat:39.254420, lng: -76.712389}];
      
  var coord_sherman = [ 
      {lat:39.253788, lng:-76.712977 },{lat: 39.253276,  lng: -76.713204  },
      {lat:39.253470, lng: -76.713893 },{lat:39.254031, lng: -76.713605}]; 
      
  var coord_pahb = [ 
      {lat:39.255199, lng: -76.714615 },{lat:39.254784 ,  lng:-76.715090  },
      {lat: 39.255156, lng:-76.716089 },{lat:39.255837, lng: -76.715750   }];

  var coord_commons = [ 
      {lat: 39.255338, lng: -76.711567},{lat:39.255005,  lng:  -76.710423},
      {lat: 39.254384, lng: -76.710953},{lat:39.254548, lng: -76.711976}];
  
  
  var coord_dining = [ 
      {lat:39.256377,  lng: -76.707814  },{lat:39.256197, lng: -76.707160},
      {lat:39.255480, lng: -76.707518},{lat:39.255646, lng: -76.708234 }];   
  
  var coord_eng = [ 
      {lat: 39.254185, lng: -76.713790 },{lat:39.254722,  lng: -76.713498 },
      {lat:39.254881 , lng: -76.714116},{lat:39.254347 , lng: -76.714373   }];   
  
   var coord_fine_art = [ 
      {lat:39.254822 , lng:-76.713460 },{lat:39.255364 ,  lng:-76.713178  },
      {lat:39.255560, lng: -76.713848 },{lat:39.254993 , lng: -76.714120  }];   
  
   var coord_sondheim = [ 
      {lat:39.254025 , lng: -76.713632 },{lat:39.253973,  lng: -76.713364},
      {lat:39.253416, lng: -76.713640},{lat: 39.253471, lng: -76.713896  }];   
  
   var coord_physics = [ 
      {lat:39.254646 , lng:-76.709218 },{lat: 39.254217,  lng: -76.709671 },
      {lat: 39.254245, lng: -76.709901},{lat: 39.254787 , lng:-76.709662   }];   
  
  
   var coord_ite = [ 
      {lat: 39.254057, lng:-76.713787 },{lat: 39.253473,  lng:-76.714085  },
      {lat:39.253636 , lng: -76.714701 },{lat:39.254205 , lng:-76.714508   }];
      
      
   var coord_university_cen = [ 
      {lat:39.254677, lng:-76.713330 },{lat:39.254545 ,  lng: -76.712808 },
      {lat:39.253933, lng:-76.713130 },{lat:39.254076, lng: -76.713653  }]; 
      
   var coord_rac = [ 
      {lat:39.253411 , lng:-76.712452 },{lat:39.253280 ,  lng:-76.711886  },
      {lat:39.252297 , lng:-76.712441 },{lat: 39.252618, lng:  -76.713209  }];   
        
        
  var region_pub = new google.maps.Polygon({
    paths: coord_pub,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});
    
  var region_admin = new google.maps.Polygon({
    paths: coord_admin,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});  
    
  var region_library = new google.maps.Polygon({
    paths: coord_library,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});
       
  var region_bio = new google.maps.Polygon({
    paths: coord_bio,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});   
    
  var region_event_center = new google.maps.Polygon({
    paths: coord_event_center,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});    
    
  var region_chem = new google.maps.Polygon({
    paths: coord_chem,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});    
    
  var region_math_psych = new google.maps.Polygon({
    paths: coord_math_psych,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});  
    
  var region_sherman = new google.maps.Polygon({
    paths: coord_sherman,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0}); 
    
  var region_pahb = new google.maps.Polygon({
    paths: coord_pahb,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});   
    
  var region_commons = new google.maps.Polygon({
    paths: coord_commons,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0}); 
    
  var region_dining = new google.maps.Polygon({
    paths: coord_dining,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});       
    
  var region_eng = new google.maps.Polygon({
    paths: coord_eng,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});    
    
  var region_fine_art = new google.maps.Polygon({
    paths: coord_fine_art,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});   
    
  var region_sondheim = new google.maps.Polygon({
    paths: coord_sondheim,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});
    
  var region_physics = new google.maps.Polygon({
    paths: coord_physics,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});   
    
  var region_ite = new google.maps.Polygon({
    paths: coord_ite,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});    
    
  var region_university_cen = new google.maps.Polygon({
    paths: coord_university_cen,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});     
    
  var region_rac = new google.maps.Polygon({
    paths: coord_rac,strokeColor: '#9e942a',strokeOpacity: 0.9, 
    strokeWeight: 3.5, fillColor: '#9e942a',fillOpacity: 0.0});     
    
    
  var all_regions = {
  region_pub: "Public Policy",
  region_admin: "Administration",
  region_library: "Library",
  region_bio: "Biology",
  region_event_center: "Event Center",
  region_math_psych: "Math Psych",
  region_sherman: "Sherman",
  region_pahb: "Performing Arts",
  region_commons: "Commons",
  region_dining: "D-Hall (True Grits)",
  region_eng: "Engineering",
  region_fine_art: "Fine Arts",
  region_sondheim: "Sondheim",
  region_physics: "Physics",
  region_ite: "Information Technology",
  region_university_cen: "University Center",
  region_rac: "Retriever Activity Center",
  };
    

   region_pub.setMap(map); 
   region_admin.setMap(map);  
   region_library.setMap(map);
   region_bio.setMap(map); 
   region_event_center.setMap(map);
   region_chem.setMap(map);
   region_math_psych.setMap(map);
   region_sherman.setMap(map);
   region_pahb.setMap(map);
   region_commons.setMap(map);
   region_dining.setMap(map);
   region_eng.setMap(map);
   region_fine_art.setMap(map);
   region_sondheim.setMap(map);
   region_physics.setMap(map);
   region_ite.setMap(map);
   region_university_cen.setMap(map);
   region_rac.setMap(map);




   
    
    
    
  // Add a listener for the click event.
  //region_pub.addListener('mouseover',function(){ showArrays("hey");},"false");
  //region_pub.addListener('mouseout', clearArrays);
  

  
  google.maps.event.addListener(region_pub,"mouseover",function(evnt)
  {
  this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
  showArrays(evnt, "hey");
  
  }); 
  
  google.maps.event.addListener(region_pub,"mouseout",function(){
    this.setOptions({fillColor: "#9e942a", strokeColor: "#9e942a"});
  });
  
  

  infoWindow = new google.maps.InfoWindow;

}
	
function showArrays(event, contentString) {

  // Replace the info windows content and position.
  infoWindow.setContent(contentString); 
  infoWindow.setPosition(event.latLng);

  infoWindow.open(map);
}

function clearArrays(event) {
  infoWindow.close();
}


