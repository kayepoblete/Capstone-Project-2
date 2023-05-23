// Developed by Kaye Poblete
import { locationsArray } from "./locationData.js"
import { parkTypesArray } from "./parkTypeData.js"
import { nationalParksArray } from "./nationalParkData.js"

"use strict";

const filterSearchBy = ["Location", "Park Type"];
const filterSearchByList = document.querySelector("#filterSearchBy");
const labelSearchTypeList = document.querySelector("#labelSearchTypeList");
const searchTypeList = document.querySelector("#searchTypeList");
const divParksList = document.querySelector("#divParksList");
const parksList = document.querySelector("#parksList");
const displayInfo = document.querySelector("#displayInfo");
let filterSelect = "";

// On page load
window.onload = () => {
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
const createNewDropdown = (_myArrayList, _nameOfDropdown) => {
    const newDropdown = document.querySelector(_nameOfDropdown);
    newDropdown.appendChild(new Option("Select one"));
    _myArrayList.forEach( (element) => {
        let theOption = new Option(element);
        newDropdown.appendChild(theOption);
    })
}

// When filter option is chosen, populate an option list for each
const onChangeFilterSearchBy = () => {
    const index = filterSearchByList.selectedIndex;
    const selectedFilterText = filterSearchByList[index].text;
    searchTypeList.innerHTML = "";
    showElement(labelSearchTypeList);
    showElement(searchTypeList);
    hideElement(divParksList);
    hideElement(displayInfo);
    if(selectedFilterText === "Location"){
        labelSearchTypeList.innerHTML = "Choose a state/territory:"
        createNewDropdown(locationsArray, "#searchTypeList");
        filterSelect = "Location";
    }
    else if(selectedFilterText === "Park Type"){
        labelSearchTypeList.innerHTML = "Choose a park type:"
        createNewDropdown(parkTypesArray, "#searchTypeList");
        filterSelect = "Park Type";
    }
    else if(selectedFilterText === "Select one"){
        hideElement(labelSearchTypeList);
        hideElement(searchTypeList);
    }
}

// When selecting, generate a list based on search type
const onChangeSearchTypeList = () => {
    const index = searchTypeList.selectedIndex;
    const selectedCategoryText = searchTypeList[index].text;
    document.querySelector("#parksList").innerHTML = "";
    let matching = [];
    displayInfo.innerHTML = "";
    showElement(divParksList);
    nationalParksArray.filter( (element) => {
        if(filterSelect === "Location"){
            if(element.State === selectedCategoryText){
                matching.push(element.LocationName);
                createCard(element);
            }
        }
        else if(filterSelect === "Park Type"){
            if(element.LocationName.toLowerCase().includes(selectedCategoryText.toLowerCase())){
                matching.push(element.LocationName);
                createCard(element);
            }
        }
    });
    createNewDropdown(matching, "#parksList");
    if(selectedCategoryText === "Select one"){
        hideElement(divParksList);
    }
    showElement(displayInfo);
}

// When selecting a specific park, display only that park's information
const onChangeParksList = () => {
    const index = parksList.selectedIndex;
    const selectedCategoryText = parksList[index].text;
    displayInfo.innerHTML = "";
    nationalParksArray.find( (element) => {
        if(element.LocationName === selectedCategoryText){
            createCard(element);
        }
    });
}

// Create info card for each park
const createCard = (_element) => {
    displayInfo.innerHTML += 
    `
    <div class="card mb-3">
        <h5 class="card-header">${_element.LocationName} <em>(${_element.LocationID})</em></h5>
        <div class="card-body">
            <p class="card-text">Address: ${_element.Address}, ${_element.City}, ${_element.State} ${_element.ZipCode}</p>
            <p class="card-text">Contact: ${_element.Phone} ${_element.Fax}</p>
        </div>
    </div>
    `
}

// 
const hideElement = (element) => {
    element.style.display = "none";
}

// 
const showElement = (element) => {
    element.style.display = "block";
}