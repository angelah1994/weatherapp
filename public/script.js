document.addEventListener("DOMContentLoaded", () => {
    // Make an AJAX request to your Express server to fetch weather data
    fetch("/weather")
      .then(response => response.json())
      .then(data => {
        // Update the HTML with the weather data
        document.getElementById("temperature").textContent = data.temperature + "°F";
        document.getElementById("weather-description").textContent = data.description;
      })
      .catch(error => {
        console.error("Error fetching weather data: " + error);
      });
  });
  