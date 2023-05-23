// Developed by Kaye Poblete
import { locationsArray } from "./locationData.js"
import { parkTypesArray } from "./parkTypeData.js"
import { nationalParksArray } from "./nationalParkData.js"

"use strict";
let filterSelect = "";
const displayInfo = document.querySelector("#displayInfo");
// On page load
window.onload = () => {
    const filterSearchBy = ["Location", "Park Type"];
    const filterSearchByList = document.querySelector("#filterSearchBy");
    const searchTypeList = document.querySelector("#searchTypeList");
    const divParksList = document.querySelector("#divParksList");
    // Options to search by: location or park type
    createNewDropdown(filterSearchBy, "#filterSearchBy");
    // On change of filter, perform function
    filterSearchByList.onchange = onChangeFilterSearchBy;
    // On change of search type, perform function
    searchTypeList.onchange = onChangeSearchTypeList;
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
    const labelSearchTypeList = document.querySelector("#labelSearchTypeList");
    const index = document.querySelector("#filterSearchBy").selectedIndex;
    const selectedFilterText = document.querySelector("#filterSearchBy")[index].text;
    document.querySelector("#searchTypeList").innerHTML = "";
    showElement(searchTypeList);
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
    hideElement(divParksList);
}
// When selecting, generate a list based on search type
const onChangeSearchTypeList = () => {
    const index = document.querySelector("#searchTypeList").selectedIndex;
    const selectedCategoryText = document.querySelector("#searchTypeList")[index].text;
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
}
// Create card for each element in the array
const createCard = (_element) => {
    displayInfo.innerHTML += 
    `
    <h5>${_element.LocationName}</h5>
    <span>(${_element.LocationID})</span>
    <p>Address: ${_element.Address}, ${_element.City}, ${_element.State} ${_element.Zipcode}</p>
    <p>Contact: ${_element.Phone} ${_element.Fax}</p>
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