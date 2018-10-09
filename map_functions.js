var glbBuilds; 
var glbTotalnts;
var devisenum1;
var dashtotal = 0;
var infoWindow;
var all_buildings;

function getValues()
{
    return glbBuilds;
}

function initMap(start=null, end=null, time_idx=0, granularity="Building",
            timeRange="00%3A00-23%3A59&")
{
    setTimeout(function(){
    map = new google.maps.Map(document.getElementById('map'), 
        {
            tilt: 0,
            zoom: 16.5,
            center: {lat: 39.2558715, lng: -76.7118267},
            mapTypeId: 'satellite'
        });
    
    all_buildings = cmxDataRequest(start,end,time_idx,granularity,timeRange);
    
    console.log(all_buildings)
    data = timeframeOrganization(all_buildings);
    console.log(data);
    
    block = data[0];
    glbTotalnts = data[1];
    devisenum1 = glbTotalnts[0];
    
    heatmap = new google.maps.visualization.HeatmapLayer
        ({
            data: getPoints(block),
            map: map  
        })
    console.log(all_buildings);
    initPolygons();
    changeRadius();
    changeOpacity();
    glbBuilds = all_buildings;
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
    
    var connection_state;
    
    if (document.getElementById('all').checked)
    {connection_state = "all";}
    else if (document.getElementById('detected').checked)
    {connection_state = "detected";}
    else
    {connection_state = "connected";}
    
    var restURL = getrestURL(timeRange,start,mid,end,granularity,connection_state);
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET",restURL, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    console.log(response);

    var builds;
    var hillside_com = ["Sideling","Pocomoke","Manokin",
                        "Patuxent","Elk","Deepcreek",
                        "Casselman","Breton","Hillside"];
                        
    builds = {"Hillside": [0]};
    console.log(response["results"]);
    var ix;
    for (ix = 0; ix < response["results"].length ;ix++)
    {
        
        if (hillside_com.includes(response["results"][ix]["area"]))
        {
            builds["Hillside"][0] += 
            response["results"][ix]["data"][time_idx]["value"];
        }
        else
        {
            
    		builds[response["results"][ix]["area"]] =
        	[response["results"][ix]["data"][time_idx]["value"]];
    	} 	
    }
    console.log(builds);
	 builds['Chesapeake'].push([39.256729,-76.708521]);
	 builds['Public Policy'].push([39.255180,-76.709091]);
	 builds['Administration'].push([39.253047,-76.713489]);
	 builds['Library'].push([39.256588,-76.711768]);
	 builds['Biology'].push([39.2548479,-76.7122021]);
	 builds['Erickson Hall'].push([39.2570091,-76.7096952]);
	 builds['Event Center'].push([39.251967,-76.707406]);
	 
	 builds['Chemistry'].push([39.2548812,-76.7128226]);
	
	 builds['Math_Psyc'].push([39.2540944,-76.7125407]);
	 builds['Academic IV'].push([39.2536036,-76.7134087]);
	 builds['PAHB'].push([39.2552382,-76.7153259]);
	 builds['Commons'].push([39.2549006,-76.7109555]);
	 builds['Dining Hall'].push([39.255900,-76.707633]);
	 builds['Hillside'].push([39.258085,-76.709147]);
	 builds['Susquehanna'].push([39.25553,-76.7089886]);
	
	 builds['Patapsco'].push([39.2550174,-76.7064426]);
	 builds['Patapsco Addition'].push([39.2552908,-76.707214]);
	 builds['Engineering'].push([39.2546022,-76.7140627]);
	 builds['Fine Arts'].push([39.255161,-76.713649]);
	
	 builds['Sondheim'].push([39.2534773,-76.7128474]);
	 builds['Potomac Hall'].push([39.256020,-76.706618]);
	
	 builds['Walker AVE South'].push([39.2587439,-76.7150462]);
	 builds['Harbor Hall'].push([39.257229,-76.708013]);
	 builds['Physics'].push([39.254558,-76.709573]);
	 builds['ITE'].push([39.2538416,-76.714377]);
	 builds['University Center'].push([39.2543276,-76.7133115]);
	 builds['Walker AVE North'].push([39.2592171,-76.713810]);
	 builds['Terrace'].push([39.2573399,-76.7112603]);
	 builds['RAC'].push([39.252815,-76.712447]);
	 builds['Westhills'].push([39.258872,-76.712757]);
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
