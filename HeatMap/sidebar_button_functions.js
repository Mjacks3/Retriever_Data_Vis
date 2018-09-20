function time0Picker() 
{
    if (startDate.value == "" || endDate.value =="" )
    {
    console.log("Enetered today day time0");
    initMap();
    console.log("Finished today day time0");
    }
    
    else
    {
    console.log("Enetered selected day time0");
    initMap(start = startDate.value, end = endDate.value )
    console.log("Finished selected day time0");
    }
};
     
    
function time1Picker() 
{    
    if (startDate.value == "" || endDate.value =="" )
    {
    console.log("Enetered today day time1");
    initMap( start = null, end = null,
    startHour = (StartTime.value).split(":")[0], 
    endHour = ((EndTime.value).split(":")[0]));
    console.log("Finished today day time1")
    }
    
    else
    {
    console.log("Enetered selected day time1");
    initMap(
    start = startDate.value, 
    end = endDate.value,
    startHour = (StartTime.value).split(":")[0], 
    endHour = ((EndTime.value).split(":")[0]))
    console.log("Finished selected day time1");
    }
}


function time2Picker()
{       
    if (spinner.spinner("value") != null)
    {
        if (startDate.value == "" || endDate.value =="" )
        {
        console.log("Enetered today day time2");
        initMap(start = null, end = null,
        time_idx = spinner.spinner("value"), 
        granularity = "hourly"
        )
         console.log("Finished today day time2");
        }
        
        else
        {
        console.log("Enetered selected day time2");
        initMap(
        start = startDate.value, 
        end = endDate.value,
        time_idx = spinner.spinner("value"), 
        granularity = "hourly")
        console.log("Finished selected day time2");
        }
    
    }
}