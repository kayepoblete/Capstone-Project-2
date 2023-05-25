// Developed by Kaye Poblete
import { mountainsArray } from "./mountainData.js"
import { createNewDropdown } from "./script.js"

"use strict";

const mountainsList = document.querySelector("#mountainsList");
const displayMountainInfo = document.querySelector("#displayMountainInfo");

// On page load
window.onload = () => {
    createNewDropdown(getMountainNames(mountainsArray), "#mountainsList");
    // On selection change, perform function
    mountainsList.onchange = createMountainInfoCard;
}

// Mountain names
const getMountainNames = (_myArrayList) => {
    let matching = [];
    _myArrayList.forEach((_obj) => {
        matching.push(_obj.name);
    })
    return matching.sort(); //Sorted mountain names alphabetically
}

// Create info card for each mountain and display
const createMountainInfoCard = () => {
    const index = mountainsList.selectedIndex;
    const selectedText = mountainsList[index].text;
    displayMountainInfo.innerHTML = "";

    mountainsArray.filter((_obj) => {
        if(_obj.name === selectedText){
            displayMountainInfo.innerHTML += 
            `<div class="card mb-3">
                <img src="images/${_obj.img}" class="card-img-top img-fluid" alt="...">
                <h5 class="card-header">${_obj.name}</h5>
                <div class="card-body">
                    <p class="card-text">${_obj.desc}</p>
                    <p class="card-text">Elevation: ${_obj.elevation} feet</p>
                    <p class="card-text">Effort: ${_obj.effort}</p>
                </div>
            </div>`;
            let p = document.querySelector("#displayMountainInfo .card .card-body");
            getSunsetForMountain(_obj.coords.lat, _obj.coords.lng).then(data => {
                p.innerHTML += `<p><i class="bi bi-sunrise" id="iconSunrise"></i> Sunrise: ${data.results.sunrise} UTC</p>`;
                p.innerHTML += `<p><i class="bi bi-sunset-fill" id="iconSunrset"></i> Sunset: ${data.results.sunset} UTC</p>`;
            });
        }
    })
}

// function that can "fetch" the sunrise/sunset times
async function getSunsetForMountain(lat, lng){
    let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}