let latitude = 42.333386;
let longitude = -71.129077;
let url = `/api/v1/forecast/${latitude},${longitude}`
let urlBing = "http://dev.virtualearth.net/REST/v1/Locations/42.333386,-71.129077\?o\=json\&key\=AsbQAbgVHnzwtssxSVoDItRquUjYSnZaHNAOFCRRTZzuJ0l6oBJBM89W5aVd1gza"

if (!navigator.geolocation){
  alert("Geolocation is not supported by this browser!");
}
//This will make appear a pop up asking for permission
navigator.geolocation.getCurrentPosition(showPosition, error);

//In case the permission is granted
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  url = `/api/v1/forecast/${latitude},${longitude}`;
  console.log("inside", url,latitude,longitude);
  fetchWeather()

  urlBing = `http://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}\?o\=json\&key\=AsbQAbgVHnzwtssxSVoDItRquUjYSnZaHNAOFCRRTZzuJ0l6oBJBM89W5aVd1gza`
}


//In case the permission is denied
function error() {
  alert("Unable to retrieve your location! Allow the browser to track your location!");
}

// https://api.darksky.net/forecast/c89e5685e5401ac3737c71e59af42160/42.333386,-71.129077,units=si

// your code, here


let fetchWeather = () => {
  console.log("fetch", url)
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      let errorMessage = `${response.status} (${response.statusText})`,
      error = new Error(errorMessage);
      throw(error);
    }
  })
  .then(response => {
    console.log("Weather");
    console.log('response.status:', response.status);
    console.log('response.statusText:', response.statusText);
    return response.json();
  })
  .then(data => {
    console.log(data);
    let tempHTML = document.getElementById("temp");
    tempHTML.innerHTML = `${data.currently.summary} | ${data.currently.temperature}˚F`;

    // let locationHTML = document.getElementById("location");
    // locationHTML.innerHTML = "Brookline High School";

    return data.currently.icon.toUpperCase().replace(/-/g,"_");
  })
  .then(icon => {
    //Options:
    // ["clear-day", "clear-night", "rain","snow", "sleet", "wind", "fog", "cloudy", "partly-cloudy-day", "partly-cloudy-night"]

    var skycons = new Skycons({"color": "steelblue"});
    // on Android, a nasty hack is needed: {"resizeClear": true}

    // you can add a canvas by it's ID...
    console.log("icon", icon)
    skycons.add("icon1", Skycons[icon]);

    // ...or by the canvas DOM element itself.
    // skycons.add(document.getElementById("icon2"), Skycons.CLOUDY);

    // if you're using the Forecast API, you can also supply
    // strings: "partly-cloudy-day" or "rain".

    // start animation!
    skycons.play();

    // you can also halt animation with skycons.pause()

    // want to change the icon? no problem:
    // skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);

    // want to remove one altogether? no problem:
    // skycons.remove("icon2");
    return true
  })
  .then(t =>{
    fetchLocation()
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`));
}

console.log("outside",url,latitude,longitude);

let fetchLocation = () => {
  fetch(urlBing)
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      let errorMessage = `${response.status} (${response.statusText})`,
      error = new Error(errorMessage);
      throw(error);
    }
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    let locationHTML = document.getElementById("location");
    locationHTML.innerHTML = data["resourceSets"][0]["resources"][0]["name"];
    console.log(data["resourceSets"][0]["resources"][0]);
    console.log(data["resourceSets"][0]["resources"][0]["address"]["countryRegion"]);
  })
  // .then(icon => {
  //
  // })
  .catch(error => console.error(`Error in fetch: ${error.message}`));
};

console.log("outside",url,latitude,longitude);
