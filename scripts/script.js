// Developed by Kaye Poblete
import { locationsArray } from "./locationData.js"
import { parkTypesArray } from "./parkTypeData.js"
import { nationalParksArray } from "./nationalParkData.js"
// import { mountainsArray } from "./mountainData.js"

"use strict";

const filterSearchBy = ["Location", "Park Type"];
const filterSearchByList = document.querySelector("#filterSearchBy");
const labelSearchTypeList = document.querySelector("#labelSearchTypeList");
const searchTypeList = document.querySelector("#searchTypeList");
const divParksList = document.querySelector("#divParksList");
const parksList = document.querySelector("#parksList");
const displayParksInfo = document.querySelector("#displayParksInfo");
const btnViewAll = document.querySelector("#btnViewAll");
let filterSelect = ""; //Where to store selected filter (Location or Park Type)

window.onload = () => {
    // For each Object in the array, remove the key-value pairs that are 0
    nationalParksArray.forEach((_obj) => Object.keys(_obj).map(k => _obj[k] == 0 ? _obj[k] = "" : _obj[k] ));
    // On click of button, perform function
    btnViewAll.onclick = onBtnViewAll;
    // Options to search by: location or park type
    createNewDropdown(filterSearchBy, "#filterSearchBy");
    // On change of filter, perform function
    filterSearchByList.onchange = onChangeFilterSearchBy;
    // On change of search type, perform function
    searchTypeList.onchange = onChangeSearchTypeList;
    // On change of parks list, perform function
    parksList.onchange = onChangeParksList;
    // Inititally hide these select elements
    hideElement(searchTypeList);
    hideElement(divParksList);
}

// Create a new dropdown list
export const createNewDropdown = (_myArrayList, _nameOfDropdown) => {
    const newDropdown = document.querySelector(_nameOfDropdown);
    newDropdown.appendChild(new Option("Select one"));
    _myArrayList.forEach( (element) => {
        let theOption = new Option(element);
        newDropdown.appendChild(theOption);
    })
}

// View all parks, hide some dropdowns
const onBtnViewAll  = () => {
    resetElement(filterSearchByList);
    createNewDropdown(filterSearchBy, "#filterSearchBy");
    resetElement(displayParksInfo);
    nationalParksArray.forEach((_obj) => {
        createParkInfoCard(_obj);
    });
    hideElement(labelSearchTypeList);
    hideElement(searchTypeList);
    hideElement(divParksList);
}

// When filter option is chosen, populate an option list for each
const onChangeFilterSearchBy = () => {
    const index = filterSearchByList.selectedIndex;
    const selectedText = filterSearchByList[index].text;
    resetElement(searchTypeList);
    resetElement(displayParksInfo);
    showElement(labelSearchTypeList);
    showElement(searchTypeList);
    hideElement(divParksList);
    if(selectedText === "Location"){
        labelSearchTypeList.innerHTML = "Choose a state/territory:"
        createNewDropdown(locationsArray, "#searchTypeList");
        filterSelect = "Location";
    }
    else if(selectedText === "Park Type"){
        labelSearchTypeList.innerHTML = "Choose a park type:"
        createNewDropdown(parkTypesArray, "#searchTypeList");
        filterSelect = "Park Type";
    }
    else if(selectedText === "Select one"){
        hideElement(labelSearchTypeList);
        hideElement(searchTypeList);
    }
}

// When selecting, generate a list based on search type
const onChangeSearchTypeList = () => {
    const index = searchTypeList.selectedIndex;
    const selectedText = searchTypeList[index].text;
    let matching = [];
    resetElement(parksList);
    resetElement(displayParksInfo);
    showElement(divParksList);

    nationalParksArray.filter((_obj) => {
        if(filterSelect === "Location"){
            if(_obj.State === selectedText){
                matching.push(_obj.LocationName);
                createParkInfoCard(_obj);
            }
        }
        else if(filterSelect === "Park Type"){
            if(_obj.LocationName.toLowerCase().includes(selectedText.toLowerCase())){
                matching.push(_obj.LocationName);
                createParkInfoCard(_obj);
            }
        }
    });
    createNewDropdown(matching, "#parksList");
    if(selectedText === "Select one"){
        hideElement(divParksList);
    }
    showElement(displayParksInfo);
}

// When selecting a specific park, display only that park's information
const onChangeParksList = () => {
    const index = parksList.selectedIndex;
    const selectedText = parksList[index].text;
    resetElement(displayParksInfo);

    nationalParksArray.find( (element) => {
        if(element.LocationName === selectedText){
            createParkInfoCard(element);
        }
    });
}

// Create info card for each park
const createParkInfoCard = (_object) => {
    displayParksInfo.innerHTML += 
    `<div class="card mb-3">
        <h5 class="card-header">${_object.LocationName}</h5>
        <div class="card-body">
            <p><strong>Location ID:</strong> ${_object.LocationID.toUpperCase()}</p>
            <p><strong>Address:</strong> ${_object.Address}, ${_object.City}, ${_object.State} ${_object.ZipCode}</p>
            <p><strong>Contact:</strong> ${_object.Phone} ${_object.Fax}</p>
        </div>
    </div>`;
    // let p = document.querySelector("#displayParksInfo .card .card-body");
    // if(_object.hasOwnProperty("Visit")){
    //     p.innerHTML += `<a href="${_object.Visit}" target="_blank">Visit Here</a>`;
    // }
    // checkVisit(_object);
}

// const checkVisit = (_test) => {
//     let p = document.querySelector("#displayParksInfo .card .card-body");
//     if(_test.hasOwnProperty("Visit")){
//         p.innerHTML += `<a href="${_test.Visit}" target="_blank">Visit Here</a>`;
//     }
// }

// Hide element
const hideElement = (element) => {
    element.style.display = "none";
}

// Show elemeent
const showElement = (element) => {
    element.style.display = "block";
}

// Reset element
const resetElement = (element) =>{
    element.innerHTML = "";
}