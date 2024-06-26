<?php
session_start();
include("connect.php");

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Information</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="bg-color">
        <div class="flex justify align-center padding">
            <a href="index.html" class="text-color block margin">Home</a>
            <a href="map.html" class="text-color block margin">Map</a>
        </div>
    </header>
    <section style="top: -60px; width: 100%; object-fit: cover; position: fixed;">
        <video loop="loop" autoplay="autoplay" playsinline="" muted="muted" class="w-full h-full object-cover" style="min-height: 550px;">
            <source src="background.mp4">
        </video>
    </section>
    <div>
        <form id="locationForm" action="home.html" method="GET">
            <div class="container">
                <div class="button">
                    <input type="text" id="locationInput" name="location" placeholder="e.g., London">
                    <button type="submit" id="search-btn">Get Weather</button>
                </div>
            </div>
        </form>
    </div>
    <div id="weatherInfo"></div>
    <script>
        const form=document.getElementById("locationForm");
        const loc=document.getElementById("locationInput");
        form.addEventListener("submit",function(e){
            const locvalue=locationInput.value;
            localStorage.setItem("loc-val",locvalue);
        })
    </script>
</body>
</html>
