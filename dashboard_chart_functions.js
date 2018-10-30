var zone = {

"Commons_F1_Bookstore": ["First Floor", 83],
"Commons_F1_Food&Flag": ["First Floor", 393],
"Commons_F1_FrontDesk":  ["First Floor", 145],
"Commons_F1_Openarea": ["First Floor", 160],
"Commons_F1_Quad":  ["First Floor", 292],
"Commons_F2_FlatTuesday":  ["Second Floor", 88],
"Commons_F2_GameRoom":  ["Second Floor", 59],
"Commons_F2_Offices":  ["Second Floor", 34],
"Commons_F2_OpenArea":  ["Second Floor", 58],
"Commons_F2_SportsZone":  ["Mezzanen", 67],
"Commons_F2_StudentOrgSpace":  ["Second Floor", 90],
"Commons_F2_UpperFood": ["Mezzanen", 209]
}

function getbarcharts()
{
  Highcharts.chart('barcontainer', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Devices Number by Floor in Commons'
  },
  subtitle: {
    text: 'Click the columns to view versions. School Website: <a href="https://www.umbc.edu/" target="_blank">umbc.edu</a>'
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {
    title: {
      text: 'Total Number of Devices'
    }

  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '{point.y:.1f}'
      }
    }
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> Devices<br/>'
  },

  "series": [
    {
      "name": "UMBC Campus - Commons",
      "colorByPoint": true,
      "data": [
        {
          "name": "First Floor",
          "y": zone['Commons_F1_Bookstore'][1]+zone['Commons_F1_Food&Flag'][1]+
          zone['Commons_F1_FrontDesk'][1]+ zone['Commons_F1_Openarea'][1]+
         zone['Commons_F1_Quad'][1],
          "drilldown": "First Floor"
        },
    
        {
          "name": "Second Floor",
          "y": zone['Commons_F2_FlatTuesday'][1]+zone['Commons_F2_GameRoom'][1]+
          zone['Commons_F2_Offices'][1]+ zone['Commons_F2_OpenArea'][1]+
         zone['Commons_F2_StudentOrgSpace'][1],
          
          "drilldown": "Second Floor"
        },

        {
          "name": "Mezzanen",
          "y": zone['Commons_F2_SportsZone'][1]+zone['Commons_F2_UpperFood'][1],
          "drilldown": "Mezzanen"
        }

      ]
    }
  ],
  "drilldown": {
    "series": [
      {
        "name": "First Floor",
        "id": "First Floor",
        "data": [
          [
            "Book Store",
            zone['Commons_F1_Bookstore'][1]
          ],
          [
            "Open Area",
            zone['Commons_F1_Openarea'][1]
          ],
          [
            "Food & Under the Flag",
            zone['Commons_F1_Food&Flag'][1]
          ],
          [
            "Front Desk",
            zone['Commons_F1_FrontDesk'][1]
          ],
          [
            "Quad",
            zone['Commons_F1_Quad'][1]
          ]
        ]
      },
      
      {
        "name": "Second Floor",
        "id": "Second Floor",
        "data": [
          [
            "Flat Tuesday",
            zone['Commons_F2_FlatTuesday'][1]
          ],
          [
            "Game Room",
            zone['Commons_F2_GameRoom'][1]
          ],
          [
            "Offices Area",
            zone['Commons_F2_Offices'][1]
          ],
          [
            "Open Area",
            zone['Commons_F2_OpenArea'][1]
          ],
          [
            "Student Organizations Space",
            zone['Commons_F2_StudentOrgSpace'][1]
          ]
        ]
      
      },
      {
        "name": "Mezzanen",
        "id": "Mezzanen",
        "data": [
          [
            "Sports Zone",
             zone['Commons_F2_SportsZone'][1]
          ],
          
          [
            "Upper Floor Food Area",
            zone['Commons_F2_UpperFood'][1]
          ]
        ]
      }

    ]
  }
});



var resareatotal = all_buildings['Chesapeake'][0]+all_buildings['Erickson Hall'][0]+
          all_buildings['Hillside'][0]+ all_buildings['Susquehanna'][0]+
          all_buildings['Potomac Hall'][0]+ all_buildings['Patapsco'][0]+
          all_buildings['Walker AVE South'][0]+all_buildings['Harbor Hall'][0]+
          all_buildings['Walker AVE North'][0]+all_buildings['Terrace'][0]+ all_buildings['Westhills'][0];

var resareaper = Math.round(resareatotal/dashtotal*100*100)/100;

var acdareatotal = all_buildings['Public Policy'][0]+all_buildings['Administration'][0]+
          all_buildings['Biology'][0]+all_buildings['Chemistry'][0]+
          all_buildings['Math_Psyc'][0]+all_buildings['Academic IV'][0]+
          all_buildings['PAHB'][0]+all_buildings['Engineering'][0]+
          all_buildings['Fine Arts'][0]+all_buildings['Sondheim'][0]+
          all_buildings['Physics'][0]+all_buildings['ITE'][0];
          
var acdareaper = Math.round(acdareatotal/dashtotal*10000)/100;


var supareatotal = all_buildings['Library'][0]+all_buildings['Event Center'][0]+
          all_buildings['Commons'][0]+ all_buildings['Dining Hall'][0]+
          all_buildings['University Center'][0]+all_buildings['RAC'][0];
          
var supareaper = Math.round(supareatotal/dashtotal*10000)/100;

var colors = Highcharts.getOptions().colors,
  categories = [
    "Residential <br /> Buildings",
    "Academic <br /> Buildings",
    "Support <br /> Facilities",
  ],
  data = [
    {
      "y": resareaper,
      "color": colors[0],
      "drilldown": {
        "name": "Residential Buildings",
        "categories": [
          "Chesapeake",
          "Erickson Hall",
          "Harbor Hall",
          "Hillside",
          "Patapsco",
          "Potomac",
          "Susquehanna",
          "Terrace",
          "Walker AVE North",
          "Walker AVE South",
          "Westhills"
        ],
        "data": [
          Math.round(all_buildings['Chesapeake'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Erickson Hall'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Harbor Hall'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Hillside'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Patapsco'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Potomac Hall'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Susquehanna'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Terrace'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Walker AVE North'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Walker AVE South'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Westhills'][0]/dashtotal*10000)/100
        ]
      }
    },
    {
      "y": acdareaper,
      "color": colors[1],
      "drilldown": {
        "name": "Academic Buildings",
        "categories": [
          "Academic IV",
          "Administration Building",
          "Biology",
          "Chemistry",
          "Engineering",
          "Fine Arts",
          "ITE",
          "Math_Psyc",
          "PAHB",
          "Sondheim",
          "Physics",
          "Public Policy"
        ],
        "data": [
          Math.round(all_buildings['Academic IV'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Administration'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Biology'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Chemistry'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Engineering'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Fine Arts'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['ITE'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Math_Psyc'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['PAHB'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Sondheim'][0]/dashtotal*10000)/100,
         Math.round(all_buildings['Physics'][0]/dashtotal*10000)/100,
         Math.round(all_buildings['Public Policy'][0]/dashtotal*10000)/100
        ]
      }
    },
    {
      "y": supareaper ,
      "color": colors[2],
      "drilldown": {
        "name": "Support Facilities",
        "categories": [
          "University Center",
          "RAC",
          "AOK Library",
          "Commons",
          "Dinning Hall",
          "Event Center"

        ],
        "data": [
         Math.round(all_buildings['University Center'][0]/dashtotal*10000)/100,
         Math.round(all_buildings['RAC'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Library'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Commons'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Dining Hall'][0]/dashtotal*10000)/100,
          Math.round(all_buildings['Event Center'][0]/dashtotal*10000)/100
        ]
      }
    },
    
    
    
  ],
  browserData = [],
  versionsData = [],
  i,
  j,
  dataLen = data.length,
  drillDataLen,
  brightness;


// Build the data arrays
for (i = 0; i < dataLen; i += 1) {

  // add browser data
  browserData.push({
    name: categories[i],
    y: data[i].y,
    color: data[i].color
  });

  // add version data
  drillDataLen = data[i].drilldown.data.length;
  for (j = 0; j < drillDataLen; j += 1) {
    brightness = 0.2 - (j / drillDataLen) / 5;
    versionsData.push({
      name: data[i].drilldown.categories[j],
      y: data[i].drilldown.data[j],
      color: Highcharts.Color(data[i].color).brighten(brightness).get()
    });
  }
}

// Create the chart
Highcharts.chart('piecontainer', {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Devices Count Percentage Pie Chart'
  },
  subtitle: {
    text: 'School Info: <a href="https://www.umbc.edu/" target="_blank">umbc.edu</a>'
  },
  yAxis: {
    title: {
      text: 'Total percent building/area share'
    }
  },
  plotOptions: {
    pie: {
      shadow: false,
      center: ['50%', '50%']
    }
  },
  tooltip: {
    valueSuffix: '%'
  },
  series: [{
    name: 'Areas',
    data: browserData,
    size: '60%',
    dataLabels: {
      formatter: function () {
        return this.y > 5 ? this.point.name : null;
      },
      color: '#ffffff',
      distance: -30
    }
  }, {
    name: 'Buildings',
    data: versionsData,
    size: '80%',
    innerSize: '60%',
    dataLabels: {
      formatter: function () {
        // display only if larger than 1
        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
          this.y + '%' : null;
      }
    },
    id: 'versions'
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 400
      },
      chartOptions: {
        series: [{
          id: 'versions',
          dataLabels: {
            enabled: false
          }
        }]
      }
    }]
  }
});

}

function getdashsum(){
  dashtotal = 0;
  for (var i = 0; i < glbTotalnts.length; i++){
    dashtotal += glbTotalnts[i];
  }
  document.getElementById("dashtotal").innerHTML = dashtotal;
}

function requestBarChart()
{
    getdashsum(); 
    getbarcharts();     
}                                                                                                                                          

