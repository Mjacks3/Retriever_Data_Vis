function initLiveDeviceCountGeneration()
{ 	
 console.log("Entered RequestLiveBuildingCounts");

    setTimeout(function(){

	requestLiveBuildingCounts();
	
    showPage();}, 100)	
    showloader();
}


function requestLiveBuildingCounts()
{
  console.log("Entered RequestLiveBuildingCounts");
  
  var cmxurl = "https://cmx.noc.umbc.edu/api/analytics/v1/now/connectedDetected";
  var xhttp = new XMLHttpRequest();
  
  xhttp.open("GET",cmxurl, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  
  var liveBuildingData = JSON.parse(xhttp.responseText);
  
  //console.log(liveBuildingData);
  
  liveZoneData = requestLiveZoneCounts();
  
  generateSungraphCounts(liveBuildingData,liveZoneData );
 
}
 
function requestLiveZoneCounts()
{
	console.log("Entered requestLiveZoneCounts");
	
	  var cmxurl ="https://cmx.noc.umbc.edu/api/location/v1/clients/count/byzone"
	  
	  var xhttp = new XMLHttpRequest();
	  xhttp.open("GET",cmxurl,false );
	  xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("Authorization", basicOath());

	  xhttp.send();
	  
	  var response = JSON.parse(xhttp.responseText);
	  console.log(response);

	return response;

}


function generateSungraphCounts(liveBuildingData, liveZoneData)
{
	
	var data2 =[];
	
	var data =
	[{'id': 'Academic and Support Buildings',
    'parent': '',
    'name': 'Academic and Support Buildings'},
	
	{'id': 'Support Buildings',
    'parent': 'Academic and Support Buildings',
    'name': 'Support Buildings'},
	
	{'id': 'Academic Buildings',
    'parent': 'Academic and Support Buildings',
    'name': 'Academic Buildings'},
	
	{'id': 'Commons',
    'parent': 'Support Buildings',
    'name': 'Commons'},
	
	{'id': 'Library',
    'parent': 'Support Buildings',
    'name': 'Library'},
	
	{'id': 'Dining Hall',
    'parent': 'Support Buildings',
    'name': 'Dining Hall'},
	
	{'id': 'University Center',
    'parent': 'Support Buildings',
    'name': 'University Center'},
	
	{'id': 'Event Center',
    'parent': 'Support Buildings',
    'name': 'Event Center'},
	
	{'id': 'RAC',
    'parent': 'Support Buildings',
    'name': 'RAC'},
	
	{'id': 'Biology',
    'parent': 'Academic Buildings',
    'name': 'Biology Science'},
	
	{'id': 'Chemistry',
    'parent': 'Academic Buildings',
    'name': 'Meyerhoff Chemistry'},
	
	{'id': 'Math_Psyc',
    'parent': 'Academic Buildings',
    'name': 'Math & Psyc'},
	
	{'id': 'Academic IV',
    'parent': 'Academic Buildings',
    'name': 'Sherman'},
	
	{'id': 'Sondheim',
    'parent': 'Academic Buildings',
    'name': 'Sondheim'},
	
	{'id': 'Administration',
    'parent': 'Academic Buildings',
    'name': 'Admin'},
	
	{'id': 'ITE',
    'parent': 'Academic Buildings',
    'name': 'ITE'},
	
	{'id': 'Engineering',
    'parent': 'Academic Buildings',
    'name': 'Engineering'},
	
	{'id': 'Fine Arts',
    'parent': 'Academic Buildings',
    'name': 'Fine Arts'},
	
	{'id': 'PAHB',
    'parent': 'Academic Buildings',
    'name': 'PAHB'},
	
	{'id': 'Public Policy',
    'parent': 'Academic Buildings',
    'name': 'Public Policy'},
	
	{'id': 'Physics',
    'parent': 'Academic Buildings',
    'name': 'Physics',}];
	 
	 
  var ix;
  for (ix = 0 ;  ix < liveBuildingData['results'].length; ix++){
	  
	if (support_buildings.includes(liveBuildingData['results'][ix]['ancestry'][0]['name'])
		||
	     academic_buildings.includes(liveBuildingData['results'][ix]['ancestry'][0]['name']))
	{
		//console.log(liveBuildingData['results'][ix]['data'][0]['values']['all']);
		
		data.push(
		{
			'id': liveBuildingData['results'][ix]['ancestry'][0]['name']+"/"+liveBuildingData['results'][ix]['area'],
			'parent': liveBuildingData['results'][ix]['ancestry'][0]['name'],
			'name': liveBuildingData['results'][ix]['area'],
			'value' :liveBuildingData['results'][ix]['data'][0]['values']['all']
				
		})
		
	}}
	
	
/*
	for (ix = 0 ;  ix < liveZoneData['ZoneCounts']['zoneCountList'].length; ix++){

		//console.log(liveZoneData['ZoneCounts']['zoneCountList'][ix]['hierarchy']);
		
		var parent = "";
		var chunk = liveZoneData['ZoneCounts']['zoneCountList'][ix]['hierarchy'].split("/");
		
		var ix2;
		for (ix2 = 1 ;  ix2 < chunk.length -1; ix2++){
			
			parent += chunk[ix2];
			if (ix2 +1 < chunk.length -1){parent +="/";}
		}
		
		//console.log(parent);   
		
		data.push(
		{
			'id': liveZoneData['ZoneCounts']['zoneCountList'][ix]['hierarchy'],
			'parent': parent,
			'name': liveZoneData['ZoneCounts']['zoneCountList'][ix]['zoneName'],
			'value' :liveZoneData['ZoneCounts']['zoneCountList'][ix]['zoneCount']
				
		})
		
	}*/
	
	console.log(data);

// Splice in transparent for the center circle
Highcharts.getOptions().colors.splice(0, 0, 'transparent');


Highcharts.chart('SungraphContainer', {

    chart: {
        height: '60%'
    },

    title: {
        text: 'World population 2017'
    },
    subtitle: {
        text: 'Source <href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">Wikipedia</a>'
    },
	
	drilldown: {
//for axis label
        activeAxisLabelStyle: {
            textDecoration: 'none',
            fontStyle: 'italic'
        },
//for datalabel
        activeDataLabelStyle: {
            textDecoration: 'none',
            fontStyle: 'italic'
        }
},
    series: [{
		
        type: "sunburst",
        data: data,
        allowDrillToNode: false,
        cursor: 'pointer',
        dataLabels: {
            format: '{point.name}',
            filter: {
                property: 'innerArcLength',
                operator: '>',
                value: 16
            }
        },
        levels: [{
            level: 1,
            levelIsConstant: true,
            dataLabels: {
                filter: {
                    property: 'outerArcLength',
                    operator: '>',
                    value: 64
                }
            }
        }, {
            level: 2,
            colorByPoint: true
        },
        {
            level: 3,
            colorVariation: {
                key: 'brightness',
                to: -0.5
            }
        }, {
            level: 4,
            colorVariation: {
                key: 'brightness',
                to: 0.5
            }
        }]

    }],
    tooltip: {
        headerFormat: "",
        pointFormat: 'The population of <b>{point.name}</b> is <b>{point.value}</b>'
    }
});
	
}


var _0xc3db=["\x64\x65\x6D\x6F\x75\x73\x65\x72","\x3A","\x64\x65\x6D\x6F\x70\x61\x73\x73\x77\x6F\x72\x64\x30\x31\x33","\x42\x61\x73\x69\x63\x20"];
function basicOath(){var _0xdf82x2=_0xc3db[0]+ _0xc3db[1]+ _0xc3db[2];var _0xdf82x3=btoa(_0xdf82x2);return _0xc3db[3]+ _0xdf82x3}



