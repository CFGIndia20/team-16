window.onload=function(){
    document.getElementById("bttn").addEventListener("click", getLocation);
    
}
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

var lat,lng,apikey = "efccd67e2ab6d3a02790b3b0c1af90f2",url;
function geoSuccess(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    
    url="http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid="+apikey;
    getData(url,lat,lng);
}

function geoError() {
    alert("Geocoder failed.");
}
function getData(url,lat,lng){
    // console.log(lat);
    fetch(url)
    .then(function(response){
        data=response.json();
        return data;
    })
    .then(function(data,lat,lng){
        console.log(data);
        var place2=data.name+", "+data.sys.country;
        document.getElementById("desc1").innerHTML=descrip;
        document.getElementById("ltt").innerHTML=lat;
        document.getElementById("lgg").innerHTML=lng;
        document.getElementById("place").innerHTML=place2;
        document.getElementById("begin").style.display="none";
        document.getElementById("now").style.display="block";
    });
}