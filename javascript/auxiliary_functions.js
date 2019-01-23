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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Functions for displaying current banner content
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function updateBannerText(time="entire",dateindex=0,hourindex=0 )
{
	document.getElementById("currentRequestText").innerHTML = "";
	document.getElementById("currentRequestText").innerHTML += "P.A.W. Report For Date(s): ";
	
	if  (startDate.value == "" || endDate.value =="")  //Today
	{
		document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'> Today</b></font><br>";
	}
	
	else if (startDate.value ==  endDate.value ) //another day
	{
		document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'>"+ startDate.value + "</b></font><br>";
	}
	
	else if (time == "hour" ) //one day
	{
		
		var textDate = moment(startDate.value, 'YYYY-MM-DD').add(dateindex, 'days');
		
		var day = textDate.format('DD');
		var month = textDate.format('MM');
		var year = textDate.format('YYYY');
		var date = month + '-' + day + '-' + year;
		
		document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'>"+ date + "</b></font><br>";
	}
	
	else // Set of Days
	{
		document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'>"+ startDate.value + "</b></font>";
		document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'> ~ </b></font> "
		document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'>"+endDate.value+ "</b></font><br>";
	}
		
		
	document.getElementById("currentRequestText").innerHTML += "  Client Connection State:" 
	
    if (document.getElementById('all').checked){document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'> Connected and Probing</b></font>.<br> ";}
    else if (document.getElementById('detected').checked){document.getElementById("currentRequestText").innerHTML +=  "<b><font color='#FFCC33'> Probing</b></font>.<br>";}
    else{document.getElementById("currentRequestText").innerHTML +=  " <b><font color='#FFCC33'>Connected</b></font><br> ";}
    
	
	document.getElementById("currentRequestText").innerHTML += " Time: ";
	
	if (time =="entire")
	{
		document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'>All Day</b></font>";	
	}
	
	else
	{
		 if (hourindex == 0)
		 {
			document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'> 12 AM</b></font>";	
		 }
			
		 else if (hourindex < 12)
		 {
			document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'>"+hourindex + "AM</b></font>";	
		 }
		 else if (hourindex == 12)
		 {
			document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'> 12 PM</b></font>";	
		 }
		 
		else
		{
			document.getElementById("currentRequestText").innerHTML += "<b><font color='#FFCC33'>"+ (parseInt(hourindex) - 12).toString() + "PM</b></font>";	
		}
	}
	
}

	
	
