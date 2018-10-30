function cmxNowDataRequest()
{  
    console.log("Now Request");
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://cmx.noc.umbc.edu/api/analytics/v1/now/connectedDetected", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
    
    var builds;
    var hillside_com = ["Sideling","Pocomoke","Manokin",
                        "Patuxent","Elk","Deepcreek",
                        "Casselman","Breton","Hillside"];
                        
    var patapsco = ["Patapsco Hall", "Patapsco Addition"]
                        
    builds = {"Hillside": [0],
              "Public Policy": [0],
              "Administration": [0],
              "Library": [0],
              "Biology": [0],
              "Chemistry": [0],
              "Erickson Hall": [0],
              "Event Center": [0],
              "Math_Psyc": [0],
              "Academic IV": [0],
              "PAHB": [0],
              "Commons": [0],
              "Dining Hall": [0],
              "Engineering": [0],
              "ITE": [0],
              "Fine Arts": [0],
              "Sondheim": [0],
              "Physics": [0],
              "University Center": [0],
              "RAC": [0],
              "Patapsco": [0],
              "Potomac Hall": [0],
              "Susquehanna": [0],
              "Chesapeake": [0],
              "Erickson Hall": [0],
              "Harbor Hall": [0],
              "Hillside": [0],
              "Terrace": [0],
              "Westhills": [0],
              "Walker AVE South": [0],
              "Walker AVE North": [0],
               };
               
               

    var connection_state;
    
    if (document.getElementById('all').checked)
    {connection_state = "all";}
    else if (document.getElementById('detected').checked)
    {connection_state = "detected";}
    else
    {connection_state = "connected";}
    
    var ix;
    
    for (ix = 0; ix < response["results"].length ;ix++)
    {
        if (hillside_com.includes(response["results"][ix]["ancestry"][0]["name"]))
        {
            builds["Hillside"][0] += 
            response["results"][ix]["data"][0]["values"][connection_state];
        }
        
        else if (patapsco.includes(response["results"][ix]["ancestry"][0]["name"]))
        {
            builds["Patapsco"][0] += 
            response["results"][ix]["data"][0]["values"][connection_state];
        }
        
        else if (Object.keys(builds).includes(response["results"][ix]["ancestry"][0]["name"]))
        {
    		builds[response["results"][ix]["ancestry"][0]["name"]][0] +=
        	response["results"][ix]["data"][0]["values"][connection_state];
    	} 
    }
     
     
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