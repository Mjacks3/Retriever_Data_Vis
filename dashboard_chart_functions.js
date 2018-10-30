function getbarcharts()
{
  Highcharts.chart('barcontainer', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Devices Number by Areas on Campus'
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
      "name": "UMBC Campus",
      "colorByPoint": true,
      "data": [
        {
          "name": "Residential Buildings",
          "y": all_buildings['Chesapeake'][0]+all_buildings['Erickson Hall'][0]+
          all_buildings['Hillside'][0]+ all_buildings['Susquehanna'][0]+
          all_buildings['Potomac Hall'][0]+
          all_buildings['Walker AVE South'][0]+all_buildings['Harbor Hall'][0]+
          all_buildings['Walker AVE North'][0]+all_buildings['Terrace'][0]+ all_buildings['Westhills'][0],
          "drilldown": "Residential Buildings"
        },
    
        {
          "name": "Academic Buildings",
          "y": all_buildings['Public Policy'][0]+all_buildings['Administration'][0]+
          all_buildings['Biology'][0]+all_buildings['Chemistry'][0]+
          all_buildings['Math_Psyc'][0]+all_buildings['Academic IV'][0]+
          all_buildings['PAHB'][0]+all_buildings['Engineering'][0]+
          all_buildings['Fine Arts'][0]+all_buildings['Sondheim'][0]+
          all_buildings['Physics'][0]+all_buildings['ITE'][0],
          
          "drilldown": "Academic Buildings"
        },

        {
          "name": "Support Facilities",
          "y": all_buildings['Library'][0]+all_buildings['Event Center'][0]+
          all_buildings['Commons'][0]+ all_buildings['Dining Hall'][0]+
          all_buildings['University Center'][0]+all_buildings['RAC'][0],
          "drilldown": "Support Facilities"
        }

      ]
    }
  ],
  "drilldown": {
    "series": [
      {
        "name": "Residential Buildings",
        "id": "Residential Buildings",
        "data": [
          [
            "Chesapeake",
            all_buildings['Chesapeake'][0]
          ],
          [
            "Erickson Hall",
            all_buildings['Erickson Hall'][0]
          ],
          [
            "Harbor Hall",
            all_buildings['Harbor Hall'][0]
          ],
          [
            "Hillside",
            all_buildings['Hillside'][0]
          ],
          [
            "Patapsco",
            all_buildings['Patapsco'][0]
          ],
     
          [
            "Potomac",
            all_buildings['Potomac Hall'][0]
          ],
          [
            "Susquehanna",
            all_buildings['Susquehanna'][0]
          ],
          [
            "Terrace",
            all_buildings['Terrace'][0]
          ],
          [
            "Walker AVE North",
            all_buildings['Walker AVE North'][0]
          ],
          [
            "Walker AVE South",
            all_buildings['Walker AVE South'][0]
          ],
          [
            "Westhills",
            all_buildings['Westhills'][0   ]
          ]
        ]
      },
      
      {
        "name": "Academic Buildings",
        "id": "Academic Buildings",
        "data": [
          [
            "Academic IV",
            all_buildings['Academic IV'][0]
          ],
          [
            "Administration Building",
            all_buildings['Administration'][0]
          ],
          [
            "Biology",
            all_buildings['Biology'][0]
          ],
          [
            "Chemistry",
            all_buildings['Chemistry'][0]
          ],
          [
            "Engineering",
            all_buildings['Engineering'][0]
          ],
          [
            "Fine Arts",
            all_buildings['Fine Arts'][0]
          ],
          [
            "ITE",
            all_buildings['ITE'][0]
          ],
          [
            "Math_Psyc",
            all_buildings['Math_Psyc'][0]
          ],
          [
            "PAHB",
            all_buildings['PAHB'][0]
          ],
          [
            "Sondheim",
            all_buildings['Sondheim'][0]
          ],
          [
            "Physics",
            all_buildings['Physics'][0]
          ],
          
          [
            "Public Policy",
            all_buildings['Public Policy'][0]
          ]
        ]
      
      },
      {
        "name": "Support Facilities",
        "id": "Support Facilities",
        "data": [
          [
            "RAC",
             all_buildings['RAC'][0]
          ],
          
          [
            "AOK Library",
            all_buildings['Library'][0]
          ],
          [
            "Commons",
            all_buildings['Commons'][0]
          ],
          [
            "University Center",
            all_buildings['University Center'][0]
          ],
          [
            "Dining",
            all_buildings['Dining Hall'][0]
          ],
          [
            "Event Center",
            all_buildings['Event Center'][0]
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

