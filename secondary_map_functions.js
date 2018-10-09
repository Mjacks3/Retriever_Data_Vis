function initPolygons()
{
  // Define the LatLng coordinates for each building
  
  var coord_pub = [ 
      {lat: 39.255441, lng: -76.709444},{lat:39.255183,  lng: -76.708687},
      {lat: 39.255023,  lng: -76.708776},{lat:39.255133, lng: -76.709563}];
 
  var coord_admin =
      [{lat:39.253243, lng:-76.713598},{lat:39.253154, lng:-76.713274},
      {lat:39.252886, lng:-76.713400},{lat:39.252981, lng:-76.713718}]; 

  var coord_library =
   [{lat:39.256653, lng:-76.712451}, {lat:39.257083, lng:-76.711621},
    {lat:39.256834, lng:-76.711352},{lat:39.256949, lng:-76.711176},
     {lat:39.256772, lng:-76.710707},{lat:39.256737, lng:-76.710718},
    {lat:39.256082, lng:-76.711829},
    {lat:39.256084, lng:-76.711881},  {lat:39.256610, lng:-76.712448}];
  
  var coord_bio = [ 
      {lat:39.255344, lng:-76.711639 },{lat:39.254439,  lng: -76.712203  },
      {lat:39.254529, lng: -76.712395},{lat:39.255405, lng: -76.711905}];  
  
  var coord_event_center = 
      [{lat:39.252042, lng:-76.708075},{lat:39.252501, lng:-76.707449},
      {lat:39.251915, lng:-76.706049},{lat:39.251311, lng:-76.706459} ];

  var coord_chem = [ 
      {lat:39.255186, lng:-76.712295},{lat:39.254531,  lng: -76.712638 },
      {lat:39.254734, lng:-76.713257},{lat:39.255319, lng: -76.712964}];    
      
      
  var coord_math_psych = [ 
      {lat:39.254363, lng:-76.712121},{lat:39.253821, lng:-76.712389},
      {lat:39.253848, lng:-76.712653 },{lat:39.254420, lng: -76.712389}];
      
  var coord_sherman =
   [ {lat:39.253757, lng:-76.712989},{lat:39.253280, lng:-76.713218},
     {lat:39.253472, lng:-76.713903},{lat:39.254011, lng:-76.713642}];

      
  var coord_pahb = 
  [{lat:39.255838, lng:-76.715748}, {lat:39.255548, lng:-76.715218},
   {lat:39.255392, lng:-76.715290}, {lat:39.255199, lng:-76.714618},
   {lat:39.254973, lng:-76.714621}, {lat:39.254784, lng:-76.715088},
   {lat:39.254915, lng:-76.715554},  {lat:39.255159, lng:-76.716087},
    {lat:39.255334, lng:-76.716136}, {lat:39.2555336, lng:-76.716134}];
  

  var coord_commons = [ 
      {lat: 39.255338, lng: -76.711567},{lat:39.255005,  lng:  -76.710423},
      {lat: 39.254384, lng: -76.710953},{lat:39.254548, lng: -76.711976}];
  
  
  var coord_dining = 
  [{lat:39.256252, lng:-76.707366},{lat:39.255985, lng:-76.707495},
   {lat:39.255916, lng:-76.707266},{lat:39.255710, lng:-76.707370},
   {lat:39.255779, lng:-76.707588},{lat:39.255512, lng:-76.707726},
   {lat:39.255595, lng:-76.707995},{lat:39.255730, lng:-76.707928},
   {lat:39.255799, lng:-76.708182},{lat:39.255933, lng:-76.708115},
   {lat:39.255898, lng:-76.707975},{lat:39.256087, lng:-76.707886},
   {lat:39.256049, lng:-76.707774},{lat:39.256338, lng:-76.707643}];
  
  
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
       {lat:39.254645, lng:-76.709268},{lat:39.254475, lng:-76.709307},
       {lat:39.254456, lng:-76.709500},{lat:39.254197, lng:-76.709688},
       {lat:39.254250, lng:-76.709914},{lat:39.254764, lng:-76.709688}]

  
   var coord_ite = [ 
      {lat: 39.254057, lng:-76.713787 },{lat: 39.253473,  lng:-76.714085  },
      {lat:39.253636 , lng: -76.714701 },{lat:39.254205 , lng:-76.714508   }];
      
      
   var coord_university_cen = [ 
      {lat:39.254677, lng:-76.713330 },{lat:39.254545 ,  lng: -76.712808 },
      {lat:39.253933, lng:-76.713130 },{lat:39.254076, lng: -76.713653  }]; 
      
   var coord_rac =  [ 
      {lat:39.253411 , lng:-76.712452 },{lat:39.253280 ,  lng:-76.711886  },
      {lat:39.252297 , lng:-76.712441 },{lat: 39.252618, lng:  -76.713209  }];
      
   var coord_patapsco =  [ 
       {lat:39.255575, lng:-76.706228},{lat:39.255537, lng:-76.705992},
       {lat:39.254813, lng:-76.706253},	{lat:39.255169, lng:-76.707566},
       {lat:39.255714, lng:-76.707231},{lat:39.255684, lng:-76.707003},
       {lat:39.255318, lng:-76.707175},{lat:39.255109, lng:-76.706416}
    ];  
      
    var coord_potomac =  
       [{lat:39.256420, lng:-76.706789},{lat:39.256248, lng:-76.706858},
       {lat:39.256104, lng:-76.706432 },{lat:39.255760, lng:-76.706572},
       {lat:39.255706, lng:-76.706344 },{lat:39.255544, lng: -76.706438},
       {lat:39.255636, lng:-76.706832 },{lat:39.255981, lng:-76.706740 },
       {lat:39.256187, lng: -76.707129},{lat:39.256489, lng:-76.706960}
       ];
    
       var coord_susquehanna =  
     [{lat:39.256134, lng:-76.708385},{lat:39.256090, lng: -76.708221},
     {lat:39.256085, lng:-76.708180},
     {lat:39.255491, lng:-76.708441},{lat:39.255733, lng:-76.709306},
     {lat:39.255885, lng:-76.709211},{lat:39.255729, lng:-76.708596}];


    var coord_chesapeake =
        [{lat:39.256703, lng: -76.707819},{lat:39.256540, lng:-76.707910},
        {lat:39.256659, lng:-76.708527 },{lat:39.256276, lng:-76.708726 },
        {lat:39.256355, lng:-76.708988},{lat:39.256978, lng: -76.708729}]
       
    var coord_erickson = 
    [{lat:39.257306, lng:-76.708997},{lat:39.256539, lng:-76.709356},
    {lat:39.256837, lng:-76.710450},{lat:39.257231, lng:-76.710282},
    {lat:39.257166, lng:-76.709917},{lat:39.257538, lng:-76.709752}]
    
    
    var coord_harbor = 
    [{lat:39.256697, lng:-76.707732},{lat:39.257066, lng:-76.708824},
    {lat:39.257840, lng:-76.708493},{lat:39.257560, lng:-76.707348}]
    
    var coord_hillside = 
    [{lat:39.258225, lng:-76.709754},{lat:39.257755, lng:-76.709585},
    {lat:39.257699, lng:-76.708872},{lat:39.258115, lng:-76.708559},
    {lat:39.258437, lng:-76.708666},{lat:39.258741, lng:-76.709250},
    {lat:39.258314, lng:-76.709698}]
       
     var coord_terrace = 
     [{lat:39.258068, lng:-76.709739},{lat:39.257924, lng:-76.709758},
     {lat:39.257444, lng:-76.710451},{lat:39.257522, lng:-76.711017},
     {lat:39.257945, lng:-76.711718},{lat:39.258084, lng:-76.711612},
     {lat:39.258216, lng:-76.710192}]  
     
     var coord_west_hill = 
     [{lat:39.259303, lng:-76.712624},{lat:39.258817, lng:-76.712252},
     {lat:39.259086, lng:-76.711511},{lat:39.259013, lng:-76.711477},
     {lat:39.258416, lng:-76.712889},{lat:39.258997, lng:-76.713324}]
     
     var coord_walker_south =
     [{lat:39.259367, lng:-76.714421},{lat:39.259914, lng:-76.713846},
     {lat:39.259037, lng:-76.713785},{lat:39.259367, lng:-76.714426}]

     var coord_walker_north =
     [{lat:39.258665, lng:-76.715626},{lat:39.259314, lng:-76.714871},
     {lat:39.258887, lng:-76.714149},{lat:39.258240, lng:-76.714939}]
          
 //  {lat:, lng:}
        
  var region_pub = new google.maps.Polygon({
    paths: coord_pub,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
    
  var region_admin = new google.maps.Polygon({
    paths: coord_admin,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});  
    
  var region_library = new google.maps.Polygon({
    paths: coord_library,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
       
  var region_bio = new google.maps.Polygon({
    paths: coord_bio,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});   
    
  var region_event_center = new google.maps.Polygon({
    paths: coord_event_center,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});    
    
  var region_chem = new google.maps.Polygon({
    paths: coord_chem,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});    
    
  var region_math_psych = new google.maps.Polygon({
    paths: coord_math_psych,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});  
    
  var region_sherman = new google.maps.Polygon({
    paths: coord_sherman,strokeColor: '#0000FF ',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25}); 
    
  var region_pahb = new google.maps.Polygon({
    paths: coord_pahb,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});   
    
  var region_commons = new google.maps.Polygon({
    paths: coord_commons,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25}); 
    
  var region_dining = new google.maps.Polygon({
    paths: coord_dining,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});       
    
  var region_eng = new google.maps.Polygon({
    paths: coord_eng,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});    
    
  var region_fine_art = new google.maps.Polygon({
    paths: coord_fine_art,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});   
    
  var region_sondheim = new google.maps.Polygon({
    paths: coord_sondheim,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
    
  var region_physics = new google.maps.Polygon({
    paths: coord_physics,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});   
    
  var region_ite = new google.maps.Polygon({
    paths: coord_ite,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});    
    
  var region_university_cen = new google.maps.Polygon({
    paths: coord_university_cen,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});     
    
  var region_rac = new google.maps.Polygon({
    paths: coord_rac,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});     
    
  var region_patapsco = new google.maps.Polygon({
    paths: coord_patapsco,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
    
  var region_potomac = new google.maps.Polygon({
    paths: coord_potomac,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
    
   var region_susquehanna = new google.maps.Polygon({
    paths: coord_susquehanna,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
    
   var region_chesapeake = new google.maps.Polygon({
    paths: coord_chesapeake,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
    
  var region_erickson = new google.maps.Polygon({
    paths: coord_erickson,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});

  var region_harbor = new google.maps.Polygon({
    paths: coord_harbor,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});    
    
  var region_hillside = new google.maps.Polygon({
    paths: coord_hillside,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
    
  var region_terrace = new google.maps.Polygon({
    paths: coord_terrace,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
    
  var region_west_hill = new google.maps.Polygon({
    paths: coord_west_hill,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
    
  var region_walker_south = new google.maps.Polygon({
    paths: coord_walker_south,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
    
  var region_walker_north = new google.maps.Polygon({
    paths: coord_walker_north,strokeColor: '#0000FF',strokeOpacity: 0.75, 
    strokeWeight: 2.5, fillColor: '#0000FF',fillOpacity: 0.25});
    
  region_pub.setMap(map);
  region_admin.setMap(map);
  region_library.setMap(map);
  region_event_center.setMap(map);
  region_math_psych.setMap(map);
  region_sherman.setMap(map);
  region_pahb.setMap(map);
  region_commons.setMap(map);
  region_dining.setMap(map);
  region_eng.setMap(map);
  region_fine_art.setMap(map);
  region_sondheim.setMap(map);
  region_physics.setMap(map);
  region_university_cen.setMap(map);
  region_rac.setMap(map);
  region_patapsco.setMap(map);
  region_potomac.setMap(map);
  region_susquehanna.setMap(map);
  region_chesapeake.setMap(map);
  region_erickson.setMap(map);
  region_harbor.setMap(map);
  region_hillside.setMap(map);
  region_terrace.setMap(map);
  region_west_hill.setMap(map);
  region_walker_south.setMap(map);
  region_walker_north.setMap(map);
  
  google.maps.event.addListener( region_pub,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Public Policy") ;}); 
       
  google.maps.event.addListener( region_pub,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
      
      
  google.maps.event.addListener( region_admin,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Administration") ;}); 
       
  google.maps.event.addListener( region_admin,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
      

  google.maps.event.addListener( region_library,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Library") ;}); 
       
  google.maps.event.addListener( region_library,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
      
      
  google.maps.event.addListener( region_bio,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Biology") ;}); 
       
  google.maps.event.addListener( region_bio,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
      
  google.maps.event.addListener( region_event_center,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Event Center") ;}); 
       
  google.maps.event.addListener( region_event_center,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
      
  google.maps.event.addListener( region_math_psych,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Math&Psych") ;}); 
       
  google.maps.event.addListener( region_math_psych,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
      
      
  google.maps.event.addListener( region_sherman,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Sherman") ;}); 
       
  google.maps.event.addListener( region_sherman,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
      
  google.maps.event.addListener( region_pahb,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Performing Arts") ;}); 
       
  google.maps.event.addListener( region_pahb,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
      
  google.maps.event.addListener( region_commons,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Commons") ;}); 
       
  google.maps.event.addListener( region_commons,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
      
  google.maps.event.addListener( region_dining,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"D-Hall (True Grits)") ;}); 
       
  google.maps.event.addListener( region_dining,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
      
  google.maps.event.addListener( region_eng,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Engineering") ;}); 
       
  google.maps.event.addListener( region_eng,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});      
      
  google.maps.event.addListener( region_fine_art,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Fine Arts") ;}); 
       
  google.maps.event.addListener( region_fine_art,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
            
  google.maps.event.addListener( region_sondheim,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Sondheim") ;}); 
       
  google.maps.event.addListener( region_sondheim,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});      
      
  google.maps.event.addListener( region_physics,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Physics") ;}); 
       
  google.maps.event.addListener( region_physics,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
      
  google.maps.event.addListener( region_ite,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Information Technology") ;}); 
       
  google.maps.event.addListener( region_ite,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});      
      
  google.maps.event.addListener( region_university_cen,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"University Center") ;}); 
       
  google.maps.event.addListener( region_university_cen,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
            
  google.maps.event.addListener( region_rac,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Retriever Activity Center") ;}); 
       
  google.maps.event.addListener( region_rac,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});      
      
  google.maps.event.addListener( region_patapsco,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Patapsco") ;}); 
       
  google.maps.event.addListener( region_patapsco,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});      
      
  google.maps.event.addListener( region_potomac,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Potomac") ;}); 
       
  google.maps.event.addListener( region_potomac,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});      
      
  google.maps.event.addListener( region_susquehanna,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Susquehanna") ;}); 
       
  google.maps.event.addListener( region_susquehanna,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});
            
  google.maps.event.addListener( region_chesapeake,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Chesapeake") ;}); 
       
  google.maps.event.addListener( region_chesapeake,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});      
      
  google.maps.event.addListener( region_erickson,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Erickson") ;}); 
       
  google.maps.event.addListener( region_erickson,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});     

  google.maps.event.addListener( region_harbor,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Harbor") ;}); 
       
  google.maps.event.addListener( region_harbor,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});}); 

  google.maps.event.addListener( region_hillside,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Hillside") ;}); 
       
  google.maps.event.addListener( region_hillside,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});      
      
  google.maps.event.addListener( region_terrace,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Terrace") ;}); 
       
  google.maps.event.addListener( region_terrace,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});}); 
      
  google.maps.event.addListener( region_west_hill,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"West Hill") ;}); 
       
  google.maps.event.addListener( region_west_hill,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});      
      
  google.maps.event.addListener( region_walker_south,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Walker Ave South") ;}); 
       
  google.maps.event.addListener( region_walker_south,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});    
      
  google.maps.event.addListener( region_walker_north,"mouseover",function(evnt)
      {this.setOptions({fillColor: "#CC6633", strokeColor: "#CC6633"});
       showArrays(evnt,"Walker Ave North") ;}); 
       
  google.maps.event.addListener( region_walker_north,"mouseout",function()
      {this.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF"});});     
            
  infoWindow = new google.maps.InfoWindow;

}
	
function showArrays(event, contentString) {
  infoWindow.setContent(contentString); 
  infoWindow.setPosition(event.latLng);
  infoWindow.open(map);
}

function clearArrays(event) {
  infoWindow.close();
}
