function datePickerButton() 
{
    showloader();
    initMap(start= startDate.value,end= EndDate.value, 
    startHour = ((StartTime.value).split(":")[0] ),
    endHour = ( (EndTime.value).split(":")[0] ) );
    
    //getdashsum();
    //getbarcharts();
    showPage();
    };
    
    

function time1Picker() 
{    
    showloader();
	 map = new google.maps.Map(document.getElementById('map'),
	 {
        zoom: 16.5,
        center: {lat: 39.2558715, lng: -76.7118267},
        mapTypeId: 'satellite' 
	 });
				
	 data = dataGeneration(builds,
	 startHour = ((StartTime.value).split(":")[0]),
	 endHour = ((EndTime.value).split(":")[0] ));
	 block = data[0];
	 glbTotalnts = data[1];
			
    heatmap = new google.maps.visualization.HeatmapLayer
    ({
    data: getPoints(block),
    map: map 
	 })
				 
	changeRadius();
	changeOpacity();
	getdashsum();
   getbarcharts();
   showPage();
}

var spinner = $( "#spinner" ).spinner();
function time2Picker()
{
    showloader();
    
    if (spinner.spinner("value") != null)
    {	
        map = new google.maps.Map(document.getElementById('map'),
            {
    				zoom: 16.5,
    				center: {lat: 39.2558715, lng: -76.7118267},
    				mapTypeId: 'satellite'  
            });
        data = dataGeneration(builds,spinner.spinner("value") - 1,
        spinner.spinner("value"));
			
        block = data[0];
        glbTotalnts = data[1];
			
        heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(block),
        map: map})
				
        changeRadius();
        changeOpacity();
        getdashsum();
        getbarcharts();
        showPage();
    }
    else
    {
        alert("Invalid Time format");
    }
}

function requestBarChart()
{
    console.log(getValues());
    getdashsum(); 
    getbarcharts();     
}                                                                                                                                          


let today = new Date().toISOString().substr(0, 10);
document.querySelector("#StartDate").value = today;
