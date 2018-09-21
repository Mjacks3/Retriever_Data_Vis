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
          "y": glbTotalnts[4]+glbTotalnts[8]+glbTotalnts[11]+glbTotalnts[12]+glbTotalnts[17]+glbTotalnts[18]+glbTotalnts[20]+glbTotalnts[24]+glbTotalnts[25]+glbTotalnts[27]+glbTotalnts[28]+glbTotalnts[29],
          "drilldown": "Residential Buildings"
        },
      
        {
          "name": "Academic Buildings",
          "y": glbTotalnts[0]+glbTotalnts[1]+glbTotalnts[2]+glbTotalnts[3]+glbTotalnts[7]+glbTotalnts[10]+glbTotalnts[13]+glbTotalnts[15]+glbTotalnts[16]+glbTotalnts[23]+glbTotalnts[19]+glbTotalnts[21],
          "drilldown": "Academic Buildings"
        },

        {
          "name": "Support Facilities",
          "y": glbTotalnts[22]+glbTotalnts[14]+glbTotalnts[5]+glbTotalnts[26]+glbTotalnts[6] + glbTotalnts[9],
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
            glbTotalnts[4]
          ],
          [
            "Erickson Hall",
            glbTotalnts[8]
          ],
          [
            "Harbor Hall",
            glbTotalnts[11]
          ],
          [
            "Hillside",
            glbTotalnts[12]
          ],
          [
            "Patapsco",
            glbTotalnts[17]
          ],
     
          [
            "Patapsco Addition",
            glbTotalnts[18]
          ],
          [
            "Potomac",
            glbTotalnts[20]
          ],
          [
            "Susquehanna",
            glbTotalnts[24]
          ],
          [
            "Terrace",
            glbTotalnts[25]
          ],
          [
            "Walker AVE North",
            glbTotalnts[27]
          ],
          [
            "Walker AVE South",
            glbTotalnts[28]
          ],
          [
            "Westhills",
            glbTotalnts[29]
          ]
        ]
      },
      
      {
        "name": "Academic Buildings",
        "id": "Academic Buildings",
        "data": [
          [
            "Academic IV",
            glbTotalnts[0]
          ],
          [
            "Administration Building",
            glbTotalnts[1]
          ],
          [
            "Biology",
            glbTotalnts[2]
          ],
          [
            "Chemistry",
            glbTotalnts[3]
          ],
          [
            "Engineering",
            glbTotalnts[7]
          ],
          [
            "Fine Arts",
            glbTotalnts[10]
          ],
          [
            "ITE",
            glbTotalnts[13]
          ],
          [
            "Math_Psyc",
            glbTotalnts[15]
          ],
          [
            "PAHB",
            glbTotalnts[16]
          ],
          [
            "Sondheim",
            glbTotalnts[23]
          ],
          [
            "Physics",
            glbTotalnts[19]
          ],
          
          [
            "Public Policy",
            glbTotalnts[21]
          ]
        ]
      
      },
      {
        "name": "Support Facilities",
        "id": "Support Facilities",
        "data": [
          [
            "RAC",
            glbTotalnts[22]
          ],
          
          [
            "AOK Library",
            glbTotalnts[14]
          ],
          [
            "Commons",
            glbTotalnts[5]
          ],
          [
            "University Center",
            glbTotalnts[26]
          ],
          [
            "Dinning",
            glbTotalnts[6]
          ],
          [
            "Event Center",
            glbTotalnts[9]
          ]
        ]
      }

    ]
  }
});


var resareatotal = glbTotalnts[4]+glbTotalnts[8]+glbTotalnts[11]+glbTotalnts[12]+glbTotalnts[17]+glbTotalnts[18]+glbTotalnts[20]+glbTotalnts[24]+glbTotalnts[25]+glbTotalnts[27]+glbTotalnts[28]+glbTotalnts[29];
var resareaper = Math.round(resareatotal/dashtotal*100*100)/100;
var acdareatotal = glbTotalnts[0]+glbTotalnts[1]+glbTotalnts[2]+glbTotalnts[3]+glbTotalnts[7]+glbTotalnts[10]+glbTotalnts[13]+glbTotalnts[15]+glbTotalnts[16]+glbTotalnts[23]+glbTotalnts[19] + glbTotalnts[21];
var acdareaper = Math.round(acdareatotal/dashtotal*10000)/100;
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
          "Patapsco Addition",
          "Potomac",
          "Susquehanna",
          "Terrace",
          "Walker AVE North",
          "Walker AVE South",
          "Westhills"
        ],
        "data": [
          Math.round(glbTotalnts[4]/dashtotal*10000)/100,
          Math.round(glbTotalnts[8]/dashtotal*10000)/100,
          Math.round(glbTotalnts[11]/dashtotal*10000)/100,
          Math.round(glbTotalnts[12]/dashtotal*10000)/100,
          Math.round(glbTotalnts[17]/dashtotal*10000)/100,
          Math.round(glbTotalnts[18]/dashtotal*10000)/100,
          Math.round(glbTotalnts[20]/dashtotal*10000)/100,
          Math.round(glbTotalnts[24]/dashtotal*10000)/100,
          Math.round(glbTotalnts[25]/dashtotal*10000)/100,
          Math.round(glbTotalnts[27]/dashtotal*10000)/100,
          Math.round(glbTotalnts[28]/dashtotal*10000)/100,
          Math.round(glbTotalnts[29]/dashtotal*10000)/100
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
          Math.round(glbTotalnts[0]/dashtotal*10000)/100,
          Math.round(glbTotalnts[1]/dashtotal*10000)/100,
          Math.round(glbTotalnts[2]/dashtotal*10000)/100,
          Math.round(glbTotalnts[3]/dashtotal*10000)/100,
          Math.round(glbTotalnts[7]/dashtotal*10000)/100,
          Math.round(glbTotalnts[10]/dashtotal*10000)/100,
          Math.round(glbTotalnts[13]/dashtotal*10000)/100,
          Math.round(glbTotalnts[15]/dashtotal*10000)/100,
          Math.round(glbTotalnts[16]/dashtotal*10000)/100,
          Math.round(glbTotalnts[23]/dashtotal*10000)/100,
         Math.round(glbTotalnts[19]/dashtotal*10000)/100,
         Math.round(glbTotalnts[21]/dashtotal*10000)/100
        ]
      }
    },
    {
      "y": Math.round((glbTotalnts[26]+glbTotalnts[22]+glbTotalnts[14]+glbTotalnts[5]+glbTotalnts[6]+glbTotalnts[9])/dashtotal*10000)/100 ,
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
         Math.round(glbTotalnts[26]/dashtotal*10000)/100,
          Math.round(glbTotalnts[22]/dashtotal*10000)/100,
          Math.round(glbTotalnts[14]/dashtotal*10000)/100,
          Math.round(glbTotalnts[5]/dashtotal*10000)/100,
          Math.round(glbTotalnts[6]/dashtotal*10000)/100,
          Math.round(glbTotalnts[9]/dashtotal*10000)/100
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

