function datareq(){
	console.log("enter");
	var connection_state;

   if (document.getElementById('all').checked)
   {connection_state = "all";}
   else if (document.getElementById('detected').checked)
   {connection_state = "detected";}
   else
   {connection_state = "connected";}
	
	
	var start = startDate.value;
	var end = endDate.value;
    var mid = "";    
   if (start == "" || end == "")
     {
       start = "to";
       end = "day";    
   }
   else {mid = "%3B";}

   console.log(start+mid+end);

	var cmxurl = "https://cmx.noc.umbc.edu/api/analytics/v1/deviceCount?"+
	"areas=118%2C185%2C211%2C239%2C304%2C488%2C587%2C614%2C629%2C657%2C664%2C1025%2C1118%2C1193%2C1206%2C1210%2C1260%2C1357%2C1389%2C1421%2C1875%2C1880%2C1903%2C1564%2C1932%2C1960%2C2354%2C2376%2C2398%2C2438%2C2477%2C2690%2C2713%2C2743%2C2814%2C2915%2C2920%2C66&"+
	"timeRange=00%3A00-23%3A59&"+
	"period="+start+mid+end+"&"+
	"granularity=Hourly"+"&"+
	"durationCategories=0-1440"+"&"+
	"includeStationary=false&"+
	"connectionState="+connection_state+"&"+
	"type=deviceCount&_=1520953855762";
	cmxreq(cmxurl, start, end);
} 

function cmxreq(cmxurl, start, end){

	var xhttp = new XMLHttpRequest();

   xhttp.open("GET",cmxurl, false);
   xhttp.setRequestHeader("Content-type", "application/json");
   xhttp.send();
   var response = JSON.parse(xhttp.responseText);
   console.log("overall time resposnse");
   console.log(response);
   console.log(response["results"][0]["data"][0]["value"]);
   var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
     dd = '0'+dd
  } 

  if(mm<10) {
      mm = '0'+mm
  } 

  today = yyyy + '-' + mm + '-' + dd;
  //document.write(today);

   if (start == "to"){
      start = today;
   }
   if (end == "day"){
      var end = today; 
   }

   console.log(start);
  var a = moment(start, 'YYYY-MM-DD');
  var b = moment(end, 'YYYY-MM-DD');
  var days = b.diff(a, 'days');
  days = days + 1;
  
  console.log(days);
  var overallcount = new Array(days);
  for (var i = 0; i <overallcount.length; i++){
    overallcount[i] = new Array(24);
    for (var j = 0; j < 24; j++){
      overallcount[i][j] = null;
    }
  }
  var countvalue;
  var quoindex;
  var remindex;
  console.log(response["results"][0]["data"].length);
  for (var i = 0; i < response["results"][0]["data"].length; i++){
  	countvalue = 0;
  	for (var j = 0; j < response["results"].length; j++){
  		countvalue = countvalue + response["results"][j]["data"][i]["value"];
  	}
  	//console.log(countvalue);
  	quoindex = Math.floor(i/24);
  	remindex = i%24;
  	overallcount[quoindex][remindex] = countvalue;
  }
  console.log(overallcount);
  var overalldict = {};
  var newday = a;
  var date;
  var day;
  var month; 
  var year;
  for (var i = 0; i < overallcount.length; i++){
  	day = newday.format('DD');
	month = newday.format('MM');
	year = newday.format('YYYY');
	date = month + '.' + day + '.' + year;
  	overalldict[date] = overallcount[i];
  	newday = moment(newday, "YYYY-MM-DD").add(1, 'days');
  }
  console.log(overalldict);
  getlinechart(overalldict);

}

function getlinechart(overalldict){
	var keyarray = Object.keys(overalldict);
	//var seriesdict = {};

	var seriesarray = [];
	console.log(keyarray);
	for (var i = 0; i < keyarray.length; i++){
		seriesarray.push({});
		console.log(keyarray[i]);
		seriesarray[i]["name"] = keyarray[i];
		console.log(overalldict[keyarray[i]]);
		seriesarray[i]["data"] = overalldict[keyarray[i]];
		
	}
	console.log(seriesarray);
	Highcharts.chart('linecontainer', {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Hourly Overall Count'
  },
  subtitle: {
    text: 'Each line represents the total device count flow over the whole campus.'
  },
  xAxis: {
    categories: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM','1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM']
  },
  yAxis: {
    title: {
      text: 'Device Count'
    }
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true
      },
      enableMouseTracking: false
    }
  },
  series: seriesarray
});
}