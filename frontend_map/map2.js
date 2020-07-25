var map;
function initMap() {
    // alert("ok");
    var india = {lat: 22.816720674342594, lng: 78.6531875};
    
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: india});
    
    var marker = new google.maps.Marker({
        position: india, 
        map: map,
        draggable:true
    });
    var lt2;
    var lg2;
    marker.addListener('dragend', function(event) {     
        lt2=event.latLng.lat();    
        lg2=event.latLng.lng(); 
        // alert(lt2+" "+lg2);   
    
    });
    var url2;
    document.getElementById('bttn2').onclick=function(){
        // console.log(lt2);
        // console.log(lg2);
        // alert(lt2+" "+lg2);
        url2="http://api.openweathermap.org/data/2.5/weather?lat=" + lt2 + "&lon=" + lg2 + "&appid=efccd67e2ab6d3a02790b3b0c1af90f2";
        getData(url2);
        // document.getElementById('lt').value=lt2;
        // document.getElementById('lg').value=lg2;
    }
    function getData(url){
        fetch(url)
        .then(function(response){
            data=response.json();
            return data;
        })
        .then(function(data){
            console.log(data);
            var temp1=data.main.temp-273;
            var prep1=data.main.humidity;
            var descrip=data.weather[0].description;
            var ii=data.weather[0].icon;
            var place2=data.name+", "+data.sys.country;
            document.getElementById("temp").innerHTML=Math.round(temp1);
            document.getElementById("des").innerHTML=descrip;
            document.getElementById("pres").innerHTML=Math.round(prep1);
            document.getElementById("img2").src="http://openweathermap.org/img/wn/"+ii+"@2x.png";
            document.getElementById("place").innerHTML=place2;
            document.getElementById("begin").style.display="none";
            document.getElementById("now").style.display="block";
        });
    }


}