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
    _myArrayList.forEach((element) => {
        matching.push(element.name);
    })
    return matching;
}

// Create info card for each mountain and display
const createMountainInfoCard = () => {
    const index = mountainsList.selectedIndex;
    const selectedText = mountainsList[index].text;
    displayMountainInfo.innerHTML = "";
    mountainsArray.filter((element) => {
        if(element.name === selectedText){
            displayMountainInfo.innerHTML += 
            `
            <div class="card mb-3">
                <img src="images/${element.img}" class="card-img-top" alt="...">
                <h5 class="card-header">${element.name}</h5>
                <div class="card-body">
                    <p class="card-text">${element.desc}</p>
                    <p class="card-text">Elevation: ${element.elevation} feet</p>
                    <p class="card-text">Effort: ${element.effort}</p>
                </div>
            </div>
            `
        }
    })
}