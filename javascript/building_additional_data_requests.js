function cmxNowDataRequestBuilding2()
{  
    console.log("Now Request");
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://cmx.noc.umbc.edu/api/analytics/v1/now/connectedDetected", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    var response = JSON.parse(xhttp.responseText);
    console.log("RESPONSE");
    console.log(response);
}