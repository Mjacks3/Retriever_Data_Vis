function datePickerButton() 
{
    initMap(start= startDate.value,end= EndDate.value, 
    startHour = ((StartTime.value).split(":")[0] ),
    endHour = ( (EndTime.value).split(":")[0] ) );
};
    

function time2Picker()
{
    setTimeout(function(){
    
    if (spinner.spinner("value") != null)
    {	
        map = new google.maps.Map(document.getElementById('map'),
            {
    				zoom: 16.5,
    				center: {lat: 39.2558715, lng: -76.7118267},
    				mapTypeId: 'satellite'  
            });
        data = timeframeOrganization(builds,spinner.spinner("value") - 1,
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
        //showPage();
    }
    else
    {
        alert("Invalid Time format");
    }
    
    showPage();}, 500)
    showloader(); 
}

function requestBarChart()
{
    console.log(getValues());
    getdashsum(); 
    getbarcharts();     
}                                                                                                                                          


