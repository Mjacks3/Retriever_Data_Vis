//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Functions for popping the sidebar/hiding sidebar  on smaller

 // Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() 
{
    console.log("Entered");
    
    if (mySidebar.style.display === 'block')
    {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } 
    else
    {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

// Close the sidebar with the close button
function w3_close()
{
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Functions for displaying loading bar/ hiding content and vise versa
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
 function showloader() 
{
    document.getElementById("loader").style.display = "block";
    document.getElementById("myDiv").style.display = "none";
}

function showPage() 
{
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Functions for displaying loading bar/ hiding content and vise versa
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 

function time1Picker() 
{    
    if (document.getElementById("morning").checked)
    {
        if (startDate.value == "" || endDate.value =="" )
        {
            initMap(
            start = null,
            end = null,
            now_view = false,
            time_idx = 0,
            granularity = "Building",
            timeRange="05%3A00-08%3A59&");
        }
        
        else 
        {
            initMap(
            start = startDate.value, 
            end = endDate.value,
            now_view = false,
            time_idx = 0, 
            granularity = "Building",
            timeRange="05%3A00-08%3A59&");
        }
       
    }
    
    else if (document.getElementById("busniess").checked)
    {
        if (startDate.value == "" || endDate.value =="" )
        {
            initMap(
            start = null, 
            end = null,
            now_view = false,
            time_idx = 0, 
            granularity = "Building",
            timeRange="09%3A00-16%3A59&");
        }
        
        else 
        {
            initMap(
            start = startDate.value, 
            end = endDate.value, 
            now_view = false,
            time_idx = 0, 
            granularity = "Building",
            timeRange="09%3A00-16%3A59&");
        }
    }
    
    else if (document.getElementById("evening").checked) //evening
    {
        if (startDate.value == "" || endDate.value =="" )
        {
            initMap(
            start = null,
            end = null,
            now_view = false,
            time_idx = 0,
            granularity = "Building",
            timeRange="17%3A00-20%3A59&");
        }
        
        else 
        {
            initMap(
            start = startDate.value, 
            end = endDate.value,
            now_view = false,
            time_idx = 0, 
            granularity = "Building",
            timeRange="17%3A00-20%3A59&");
        }
    } 
    else if (document.getElementById("24hr").checked) 
    {
    console.log("24hr");
       if (startDate.value == "" || endDate.value =="" )
    {
        initMap();
    }
    
    else
    {
        initMap(
        start = startDate.value,
        end = endDate.value);
    }
    }
}

function time12Picker() 
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


