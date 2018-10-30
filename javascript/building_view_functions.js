var zones;  
var orderedAreas;


function generateBuildingZones(building)
{
    var xhttp = new XMLHttpRequest();  
    xhttp.open("GET","https://cmx.noc.umbc.edu/api/config/v1/heterarchy/allUserLevels?filterElements=false&_=1540573524517", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
	 zones = {}
	 orderedAreas = "";
	 
    for (ix = 0; ix < response["userLevels"][3]["children"].length ;ix++)
    {
		if (response["userLevels"][3]["children"][ix]["ancestors"][1] == building)
		{		
			zones[response["userLevels"][3]["children"][ix]["name"]] = 
            [response["userLevels"][3]["children"][ix]["ancestors"][2],0];
            
            
         if (orderedAreas == ""){orderedAreas += String(response["userLevels"][3]["children"][ix]["id"]);}
        else {orderedAreas += "%2C"+ String(response["userLevels"][3]["children"][ix]["id"]) ;}
		}
    }

}         

function requestZoneData(start=null, end=null,now_view = false,time_idx=0, 
                    granularity="Zone", timeRange="00%3A00-23%3A59&")                                                                                                
{
    setTimeout(function()
    {
    if (now_view == true){console.log("Empty"); }
    
    else{cmxZoneDataRequest(start,end,timeRange,granularity,time_idx);} 
    
    console.log(zones);
    
    //Dashcharts
    
    showPage();}, 700)
    showloader();
}


function cmxZoneDataRequest(start=null, end=null, timeRange="00%3A00-23%3A59&",
                                     granularity = "Zone", time_idx = 0)
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
    
    var restURL = getZoneRestURL(timeRange,start,mid,end,granularity,connection_state);
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET",restURL, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);

    var ix;
    for (ix = 0; ix < response["results"].length ;ix++)
    {
    		zones[response["results"][ix]["area"]][1] =
    		response["results"][ix]["data"][time_idx]["value"];
    }
    

}

function getZoneRestURL(timeRange,start,mid,end,granularity,connection_state)
{   

    var restURL= "https://cmx.noc.umbc.edu/api/analytics/v1/deviceCount?"+
        "areas="+orderedAreas+"&"+
        "timeRange="+timeRange+
        "period="+start +mid+ end+"&"+
        "granularity="+ granularity +"&"+
        "durationCategories=0-1440&"+
        "includeStationary=false&"+
        "connectionState="+connection_state+"&"+
        "type=deviceCount&"+
        "_=1540585957657"   ;   
        return restURL; 
}

