const wrapper = document.querySelector(".wrapper");
inputPart=wrapper.querySelector(".input-part");
infoTxt=inputPart.querySelector(".info-txt");
inputField=inputPart.querySelector("input");
locationBtn=inputPart.querySelector("button");
wIcon=document.querySelector(".weather-part img");
arw=document.querySelector("header");
apikey='381218ba6855a693a5fc8eecf065dc7f';

arw.addEventListener('click',() => {
arw.classList.remove("active");
wrapper.classList.remove("active");
inputField.value="";
infoTxt.classList.remove("pending","error");
});
inputField.addEventListener('keyup', e=>{
    // if user pressed enter and the input field value is not empty

    if(e.key== "Enter" && inputField.value!="")
    {
        arw.classList.add("active");
       requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click",()=>{
if(navigator.geolocation){
    // if browser supprots geolocation
    infoTxt.innerText="Getting weather Details";
    infoTxt.classList.add("pending");
    navigator.geolocation.getCurrentPosition(onSuccess,onError)
}
else{
    alert("Your browser not support geolocation api");
}
});

function onSuccess(position)
{
    // console.log(position)
    arw.classList.add("active");
    const {latitude,longitude} = position.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;
    fetchData(api);

    
}

function onError(error){
    arw.classList.add("active");
    infoTxt.innerText=error.message;
    infoTxt.classList.add("error");
}


function fetchData(api)
{
    infoTxt.innerText="Getting weather Details";
    infoTxt.classList.add("pending");
    fetch(api).then(response=> response.json()).then(result => weatherDetails(result));
}


function requestApi(city){
    let api= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    infoTxt.innerText="Getting weather Details";
    infoTxt.classList.add("pending");
    fetch(api).then(response=> response.json()).then(result => weatherDetails(result));

}


function weatherDetails(info)
{
    if(info.cod=="404"){
        infoTxt.classList.remove("pending");
        infoTxt.classList.add("error");
        infoTxt.innerText=`${inputField.value} isn't a valid city name`;
       
    }
    else{

        const city=info.name;
        const country=info.sys.country;
        const {description,id}=info.weather[0];
        const {feels_like,humidity,temp}=info.main;
        const sunrise= info.sys.sunrise;
        const sunset= info.sys.sunset;

        var sunr = new Date(sunrise* 1000);
        var suns =new Date(sunset * 1000);

        const sunhr=sunr.getHours();
        const sunshr=suns.getHours();

   if(sunhr<sunshr)
   {
      if(id == 800)
      {
          wIcon.src="Images/sun.png"
      }
      else if(id >= 200 && id<=232)
      {
          wIcon.src="Images/storm.png"
      }
      else if(id >= 600 && id<=622)
      {
          wIcon.src="Images/snowy.png"
      }
      else if(id >= 701 && id<=781)
      {
          wIcon.src="Images/haze.png"
      }
      else if(id >= 801 && id<=804)
      {
          wIcon.src="Images/cloudy.png"
      }
      else if(id >= 300 && id<=321 || (id >=500 && id <= 531) )
      {
          wIcon.src="Images/rain.png"
      }
    }

    else{
        if(id == 800)
      {
          wIcon.src="Images/night.png"
      }
      else if(id >= 200 && id<=232)
      {
          wIcon.src="Images/night-storm.png"
      }
      else if(id >= 600 && id<=622)
      {
          wIcon.src="Images/snowy-night.png"
      }
      else if(id >= 701 && id<=781)
      {
          wIcon.src="Images/night-haze.png"
      }
      else if(id >= 801 && id<=804)
      {
          wIcon.src="Images/night-cloud.png"
      }
      else if(id >= 300 && id<=321 || (id >=500 && id <= 531) )
      {
          wIcon.src="Images/rain-night.png"
      }
    }
      

        wrapper.querySelector(".temp  .numb").innerText=Math.floor(temp);
        wrapper.querySelector(".weather").innerText=description;
        wrapper.querySelector(".location span").innerText=`${city},${country}`;
        wrapper.querySelector(".temp  .numb-2").innerText=Math.floor(feels_like);
        wrapper.querySelector(".humidity  span").innerText=`${humidity}%`;


        infoTxt.classList.remove("pending","error");
        wrapper.classList.add("active");
        console.log(info);
    }
   
}