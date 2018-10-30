function getbarcharts()
{
  Highcharts.chart('barcontainer', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Devices Number by Floor'
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
          "y": 10
        },
    
        {
          "name": "Academic Buildings",
          "y": 12
          
        },

        {
          "name": "Support Facilities",
          "y": 13
        }]}],
  
        
      }

    ]
  }
});


  categories = [
    "Residential <br /> Buildings",
    "Academic <br /> Buildings",
    "Support <br /> Facilities",
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
    
  }
}

function requestBarChart()
{
    getbarcharts();     
}                                                                                                                                          

