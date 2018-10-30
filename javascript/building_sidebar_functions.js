function timeNowPicker() 
{
   console.log("timeNowPicker")
};    

function time1Picker() 
{    
    if (document.getElementById("morning").checked)
    {
        if (startDate.value == "" || endDate.value =="" )
        {
            requestZoneData(
            start = null,
            end = null,
            now_view = false,
            time_idx = 0,
            granularity = "Zone",
            timeRange="05%3A00-08%3A59&");
        }
        
        else 
        {
            requestZoneData(
            start = startDate.value, 
            end = endDate.value,
            now_view = false,
            time_idx = 0, 
            granularity = "Zone",
            timeRange="05%3A00-08%3A59&");
        }
       
    }
    
    else if (document.getElementById("busniess").checked)
    {
        if (startDate.value == "" || endDate.value =="" )
        {
            requestZoneData(
            start = null, 
            end = null,
            now_view = false,
            time_idx = 0, 
            granularity = "Zone",
            timeRange="09%3A00-16%3A59&");
        }
        
        else 
        {
            requestZoneData(
            start = startDate.value, 
            end = endDate.value, 
            now_view = false,
            time_idx = 0, 
            granularity = "Zone",
            timeRange="09%3A00-16%3A59&");
        }
    }
    
    else if (document.getElementById("evening").checked) //evening
    {
        if (startDate.value == "" || endDate.value =="" )
        {
            requestZoneData(
            start = null,
            end = null,
            now_view = false,
            time_idx = 0,
            granularity = "Zone",
            timeRange="17%3A00-20%3A59&");
        }
        
        else 
        {
            requestZoneData(
            start = startDate.value, 
            end = endDate.value,
            now_view = false,
            time_idx = 0, 
            granularity = "Zone",
            timeRange="17%3A00-20%3A59&");
        }
    } 
    else if (document.getElementById("24hr").checked) 
    {
    console.log("24hr");
       if (startDate.value == "" || endDate.value =="" )
    {
        requestZoneData();
    }
    
    else
    {
        requestZoneData(
        start = startDate.value,
        end = endDate.value);
    }
    }
}


function time2Picker()
{       
    if (spinner.spinner("value") != null)
    {
        if (startDate.value == "" || endDate.value =="" )
        {
            requestZoneData(
            start = null, 
            end = null,
            now_view = false,
            time_idx = spinner.spinner("value"), 
            granularity = "hourly");
        }
        
        else
        {
            requestZoneData(
            start = startDate.value, 
            end = endDate.value,
            now_view = false,
            time_idx = spinner.spinner("value"), 
            granularity = "hourly");
        }
    
    }
}