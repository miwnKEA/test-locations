let responseDom = document.getElementById("response");
let cookieDom = document.getElementById("cookie");
let locationDom = document.getElementById("location");
let latlongDom = document.getElementById("latlong");
let weatherDom = document.getElementById("weather");

// async funktion med await
async function getResponse() {
  // try catch blok
  try {
    // fetch data fra /res endpoint og await responsen
    const response = await fetch('/res');
    
    // hvis responsen ikke er ok, kast en fejl
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // konverter responsen til tekst
    const data = await response.text(); 
    
    // håndter succes
    console.log(data);
    responseDom.innerHTML = data;
  } catch (error) {
    // håndter fejl
    console.log(error);
    responseDom.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// async funktion med await
async function setCookie() {
    // try catch blok
    try {
      // fetch data fra /res endpoint og await responsen
      const response = await fetch('/cookie');

      // hvis responsen ikke er ok, kast en fejl
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // konverter responsen til tekst
      const value = await response.text();

      // håndter succes
      console.log(value);
      cookieDom.innerHTML = value;
    } catch (error) {
      // håndter fejl
      console.log(error);
      cookieDom.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// funktion til at hente placering
async function getLocation() {
  const dropdown = document.getElementById('locationDropdown');
  const selectedLocation = dropdown.options[dropdown.selectedIndex].text;
  locationDom.innerHTML = `Your location is ${selectedLocation}`;
  document.cookie = `location=${selectedLocation}; path=/;`;
  await getLatLong(selectedLocation);
}

// async funktion med await
async function getLatLong(locationName) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&addressdetails=1`;
  // try catch blok
  try {
    // fetch data fra /res endpoint og await responsen
    const response = await fetch(url);

    // hvis responsen ikke er ok, kast en fejl
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // konverter responsen til json
    const data = await response.json();

    // håndter succes
    if (data.length > 0) {
      console.log(data);
      latlongDom.innerHTML = `Latitude: ${data[0].lat}, Longitude: ${data[0].lon}`;
      await getWeather(data[0].lat, data[0].lon);
    } else {
      throw new Error('No results found');
    } 
  } catch (error) {
    // håndter fejl
    console.log(error);
    latlongDom.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// async funktion med await
async function getWeather(lat, long) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;
  // try catch blok
  try {
    // fetch data fra /res endpoint og await responsen
    const response = await fetch(url);

    // hvis responsen ikke er ok, kast en fejl
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // konverter responsen til json
    const data = await response.json();

    // håndter succes
    console.log(data);
    weather.innerHTML = `Temperature: ${data.current_weather.temperature}°`;
  } catch (error) {
    // håndter fejl
    console.log(error);
    weather.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
