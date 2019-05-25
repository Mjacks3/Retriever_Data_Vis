var liveSunchart;

//fix show loader problem

function initLiveDeviceCountGeneration()
{ 	
    setTimeout(function(){

	updateZoneRegisters()
	var liveBuildingData  = requestLiveBuildingCounts();
	var liveZoneData = requestLiveZoneCounts();
	  
	generateSungraphCounts(liveBuildingData,liveZoneData);
    showPage();
	
	//updateSungraphCounts();
	updateZoneRegisters();
	
	console.log("inside TIMEOUT");
	}, 100)
    
	
	console.log("outside TIMEOUT");
	showloader();
	

	
}

function updateSungraphCounts()
{
	console.log("entered updateSungraphCounts");
	
	var liveBuildingData  = requestLiveBuildingCounts();
	var liveZoneData = requestLiveZoneCounts();
	
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
		|| academic_buildings.includes(liveBuildingData['results'][ix]['ancestry'][0]['name']))
	{
		data.push(
		{
			'id': liveBuildingData['results'][ix]['ancestry'][0]['name']+"/"+liveBuildingData['results'][ix]['area'],
			'parent': liveBuildingData['results'][ix]['ancestry'][0]['name'],
			'name': liveBuildingData['results'][ix]['area'],
			'value' :liveBuildingData['results'][ix]['data'][0]['values']['all']
				
		})
	}}
	

    for (ix = 0 ;  ix < liveZoneData['ZoneCounts']['zoneCountList'].length; ix++){
		var parent = "";
		var chunk = liveZoneData['ZoneCounts']['zoneCountList'][ix]['hierarchy'].split("/");
		var ix2;
		for (ix2 = 1 ;  ix2 < chunk.length -1; ix2++){
			
			parent += chunk[ix2];
			if (ix2 +1 < chunk.length -1){parent +="/";}
		}
		
		data.push(
		{
			'id': liveZoneData['ZoneCounts']['zoneCountList'][ix]['hierarchy'],
			'parent': parent,
			'name': liveZoneData['ZoneCounts']['zoneCountList'][ix]['zoneName'],
			'value' :liveZoneData['ZoneCounts']['zoneCountList'][ix]['zoneCount']
				
		})
		
	}
	
	liveSunchart.series[0].setData(data);
	console.log("end updateSungraphCounts");
}


function requestLiveBuildingCounts()
{
	var cmxurl = "https://cmx.noc.umbc.edu/api/analytics/v1/now/connectedDetected";
	var xhttp = new XMLHttpRequest();

	xhttp.open("GET",cmxurl, false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();

	return JSON.parse(xhttp.responseText);
}
 
 
function requestLiveZoneCounts()
{
	var cmxurl ="https://cmx.noc.umbc.edu/api/location/v1/clients/count/byzone"

	var xhttp = new XMLHttpRequest();
	xhttp.open("GET",cmxurl,false );
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.setRequestHeader("Authorization", basicOath());
	xhttp.send();

	return  JSON.parse(xhttp.responseText);
}


function generateSungraphCounts(liveBuildingData, liveZoneData)
{
	var data =
	[{'id': 'Academic and Support Buildings',
    'parent': '',
    'name': 'All </n> Buildings'},
	
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
		|| academic_buildings.includes(liveBuildingData['results'][ix]['ancestry'][0]['name']))
	{
		data.push(
		{
			'id': liveBuildingData['results'][ix]['ancestry'][0]['name']+"/"+liveBuildingData['results'][ix]['area'],
			'parent': liveBuildingData['results'][ix]['ancestry'][0]['name'],
			'name': liveBuildingData['results'][ix]['area'],
			'value' :liveBuildingData['results'][ix]['data'][0]['values']['all']
				
		})
	}}
	

    for (ix = 0 ;  ix < liveZoneData['ZoneCounts']['zoneCountList'].length; ix++){
		var parent = "";
		var chunk = liveZoneData['ZoneCounts']['zoneCountList'][ix]['hierarchy'].split("/");
		var ix2;
		for (ix2 = 1 ;  ix2 < chunk.length -1; ix2++){
			
			parent += chunk[ix2];
			if (ix2 +1 < chunk.length -1){parent +="/";}
		}
		
		data.push(
		{
			'id': liveZoneData['ZoneCounts']['zoneCountList'][ix]['hierarchy'],
			'parent': parent,
			'name': liveZoneData['ZoneCounts']['zoneCountList'][ix]['zoneName'],
			'value' :liveZoneData['ZoneCounts']['zoneCountList'][ix]['zoneCount']
				
		})
		
	}
	


// Splice in transparent for the center circle
Highcharts.getOptions().colors.splice(0, 0, 'transparent');
liveSunchart = Highcharts.chart('SungraphContainer', {

    chart: {
        height: '60%'
    },

    title: {
        text: '<b> <font size="15"> Live Device Count of Academic and Support Buildings </b> </font>'
    },
    subtitle: {
        text: 'Click on a sublevel to get a breakdown of its heirarchy'
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
        allowDrillToNode: true,
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
            colorByPoint: true,
			rotation:2,
			borderWidth:100,
            colorVariation: {
                key: 'brightness',
                to: -.5
            }
        },
        {
            level: 3,
            colorVariation: {
                key: 'brightness',
                to: -.5
            }
        }, {
            level: 4,
            colorVariation: {
                key: 'brightness',
                to: -.5
		}},
	   {
            level: 5,
            colorVariation: {
                key: 'brightness',
                to: -.5
            }
        }]

    }],
    tooltip: {
        headerFormat: "",
        pointFormat: 'There are approximately <b>{point.value}</b> clients in  <b>{point.name}</b> right now'
    }
});

}


var _0xc3db=["\x64\x65\x6D\x6F\x75\x73\x65\x72","\x3A","\x64\x65\x6D\x6F\x70\x61\x73\x73\x77\x6F\x72\x64\x30\x31\x33","\x42\x61\x73\x69\x63\x20"];
function basicOath(){var _0xdf82x2=_0xc3db[0]+ _0xc3db[1]+ _0xc3db[2];var _0xdf82x3=btoa(_0xdf82x2);return _0xc3db[3]+ _0xdf82x3}



var _0x288b=["\x75\x73\x65\x20\x73\x74\x72\x69\x63\x74","\x61\x64\x6D\x69\x6E","\x3A","\x43\x6C\x6F\x77\x6E\x73\x61\x72\x65\x70\x65\x6F\x70\x6C\x65\x32","\x42\x61\x73\x69\x63\x20"];_0x288b[0];var _0xc3db=[_0x288b[1],_0x288b[2],_0x288b[3],_0x288b[4]];
function basicOath2(){var _0xf6d7x3=_0xc3db[0]+ _0xc3db[1]+ _0xc3db[2];var _0xf6d7x4=btoa(_0xf6d7x3);return _0xc3db[3]+ _0xf6d7x4}



function updateZoneRegisters()
{ 
// delete then refreshand add.clear the olds

    var xhttp = new XMLHttpRequest();  
    xhttp.open("GET","https://cmx.noc.umbc.edu/api/config/v1/heterarchy/allUserLevels?filterElements=false&_=1540573524517", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    var response = JSON.parse(xhttp.responseText);

	
	 zones = {};
	 zone_names = [];
	 var zone_registers = []
	 
	 var cmx_input = "['";
	 orderedAreas = "";
    for (ix = 0; ix < response["userLevels"][3]["children"].length ;ix++)
    {
	
	//Implemplemented these
    zone_registers.push(response["userLevels"][3]["children"][ix]["ancestors"][0]+"/"+
           response["userLevels"][3]["children"][ix]["ancestors"][1]+"/"+
          response["userLevels"][3]["children"][ix]["ancestors"][2]+"/"+
           response["userLevels"][3]["children"][ix]["name"]);
	
	cmx_input += response["userLevels"][3]["children"][ix]["ancestors"][0]+"/"+
           response["userLevels"][3]["children"][ix]["ancestors"][1]+"/"+
          response["userLevels"][3]["children"][ix]["ancestors"][2]+"/"+
           response["userLevels"][3]["children"][ix]["name"]    +"','";
    }	
	//console.log(cmx_input);
	//console.log(zone_registers);
	//alert(zone_registers);
}      
