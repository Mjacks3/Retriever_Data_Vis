var glbBuilds; 
var glbTotalnts;
var devisenum1;
var dashtotal = 0;
var infoWindow;

function getValues()
{
    return glbBuilds;
}


function initMap(start=null, end=null, time_idx = 0, granularity="Building",
            timeRange="00%3A00-23%3A59&")
{
    setTimeout(function(){
    map = new google.maps.Map(document.getElementById('map'), 
        {
            zoom: 16.5,
            center: {lat: 39.2558715, lng: -76.7118267},
            mapTypeId: 'satellite'
        });
    
    builds = cmxDataRequest(start,end,time_idx,granularity,timeRange);
    
    console.log(builds)
    data = timeframeOrganization(builds, time_idx);
    console.log(data);
    
    block = data[0];
    glbTotalnts = data[1];
    devisenum1 = glbTotalnts[0];
    
    heatmap = new google.maps.visualization.HeatmapLayer
        ({
            data: getPoints(block),
            map: map  
        })
        
    initPolygons();
    changeRadius();
    changeOpacity();
    glbBuilds = builds;
    getdashsum();
    getbarcharts();
    
    showPage();}, 700)
    showloader();
}
	
function cmxDataRequest(start=null, end=null, time_idx = 0, granularity = "Building", 
                        timeRange="00%3A00-23%3A59&")
{
    var mid = "";	
    
    
    if (start == null || end == null)
	 {
        start = "to";
        end = "day";	
    }
    else {mid = "%3B";}

	 
    var xhttp = new XMLHttpRequest();
    var restURL= "https://cmx.noc.umbc.edu/api/analytics/v1/deviceCount?"+
        "areas=118%2C185%2C304%2C488%2C587%"+
        "2C629%2C664%2C1025%2C1118%2C1193%2C1206%2C1210%2C1260%2C1357"+
        "%2C1421%2C1875%2C1880%2C1564%2C1932%2C2354%2C2376%2C2398%2C2477"+
        "%2C2690%2C2713%2C2743%2C2814%2C2915%2C2920%2C66&"+
        "timeRange="+timeRange+
        "period="+start +mid+ end+"&"+
        "granularity="+ granularity + "&"+
        "durationCategories=0-1440&"+
        "includeStationary=false&"+
        "connectionState=connected&"+
        "type=deviceCount&"+
        "_=1520953855762"
        
       
    xhttp.open("GET",restURL, false,"admin","HiddenFortress1958");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    console.log(response);

    var builds; 
    builds = {};
    var ix;
    for (ix = 0; ix < response["results"].length ;ix++)
    {
		builds[response["results"][ix]["area"]] = 
    	[response["results"][ix]["data"][time_idx]["value"]]; 	
    }
    console.log(builds);
	 builds['Chesapeake'].push([39.2567085,-76.7086843]);
	 builds['Public Policy'].push([39.255092,-76.7094311]);
	 builds['Administration'].push([39.2533135,-76.7136622]);
	 builds['Library'].push([39.25623,-76.7118938]);
	 builds['Biology'].push([39.2548479,-76.7122021]);
	 builds['Erickson Hall'].push([39.2570091,-76.7096952]);
	 builds['Event Center'].push([39.252432,-76.707563]);
	 
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
	 return builds;
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
