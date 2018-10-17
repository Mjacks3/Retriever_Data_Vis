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
    initMap(start = startDate.value, end = endDate.value)
    console.log("Finished selected day time0");
    }
};
     
    
function time1Picker() 
{    
    if (document.getElementById("morning").checked)
    {
        if (startDate.value == "" || endDate.value =="" )
        {initMap(start = null, end = null,time_idx = 0, granularity = "Building",
        timeRange="05%3A00-08%3A59&")}
        else {initMap
        (start = startDate.value, 
        end = endDate.value,time_idx = 0, granularity = "Building",
        timeRange="05%3A00-08%3A59&")}
       
    }
    
    else if (document.getElementById("busniess").checked)
    {
        if (startDate.value == "" || endDate.value =="" )
        {initMap(start = null, end = null,time_idx = 0, granularity = "Building",
        timeRange="09%3A00-16%3A59&")}
        else {initMap
        (start = startDate.value, 
        end = endDate.value, time_idx = 0, granularity = "Building",
        timeRange="09%3A00-16%3A59&")}
    }
    
    else if (document.getElementById("evening").checked) //evening
    {
        if (startDate.value == "" || endDate.value =="" )
        {initMap(start = null, end = null,time_idx = 0, granularity = "Building",
        timeRange="17%3A00-20%3A59&")}
        else {initMap
        (start = startDate.value, 
        end = endDate.value, time_idx = 0, granularity = "Building",
        timeRange="17%3A00-20%3A59&")}
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