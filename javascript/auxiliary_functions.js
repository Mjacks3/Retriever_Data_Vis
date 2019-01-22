var currentPage;
var currentrequest = "";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Functions for popping the sidebar/hiding sidebar  on smaller

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() 
{
    
    if (document.getElementById("mySidebar").style.display === 'block')
    {
        document.getElementById("mySidebar").style.display = 'none';
        document.getElementById("myOverlay").style.display = "none";
    } 
    else
    {
       document.getElementById("mySidebar").style.display = 'block';
       document.getElementById("myOverlay").style.display = "block";
    }
}

// Close the sidebar with the close button
function w3_close()
{
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
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
//Functions for displaying loading bar/ hiding content and vice versa
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
 
function processGenerateReportButton() 
{   
	console.log("Entereed generateReport");
	console.log(currentPage);
	
	if (currentPage == "campus"){initCampusReportGeneration();}
	else{ initBuildingReportGeneration(currentPage);}
	
}

 
function processRestoreCumulativeView() 
{   

	if (currentPage == "campus"){generateSummaryfromEntireDateSelection();}
	else{generateZoneSummaryfromEntireDateSelection();}
	
}
	
	
