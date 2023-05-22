// Developed by Kaye Poblete
import { locationsArray } from "./locationData.js"
import { parkTypesArray } from "./parkTypeData.js"
import { nationalParksArray } from "./nationalParkData.js"

"use strict";
let filterSelect = "";
// On page load
window.onload = () => {
    // Options to search by: location or park type
    const filterSearchBy = ["Location", "Park Type"];
    createNewDropdown(filterSearchBy, "#filterSearchBy");
    // On change of filter, perform function
    const filterSearchByList = document.querySelector("#filterSearchBy");
    filterSearchByList.onchange = onChangeFilterSearchBy;
    // On change of search type, perform function
    const searchTypeList = document.querySelector("#searchTypeList");
    searchTypeList.onchange = onChangeSearchTypeList;
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
    const index = document.querySelector("#filterSearchBy").selectedIndex;
    const selectedFilterText = document.querySelector("#filterSearchBy")[index].text;
    document.querySelector("#searchTypeList").innerHTML = "";
    if(selectedFilterText === "Location"){
        createNewDropdown(locationsArray, "#searchTypeList");
        filterSelect = "Location";
    }
    else if( selectedFilterText === "Park Type"){
        createNewDropdown(parkTypesArray, "#searchTypeList");
        filterSelect = "Park Type";
    }
}
// When selecting, generate a list based on search type
const onChangeSearchTypeList = () => {
    const index = document.querySelector("#searchTypeList").selectedIndex;
    const selectedCategoryText = document.querySelector("#searchTypeList")[index].text;
    document.querySelector("#parksList").innerHTML = "";
    let matching = [];
    nationalParksArray.filter( (element) => {
        if(filterSelect === "Location"){
            if(element.State === selectedCategoryText){
                matching.push(element.LocationName);
            }
        }
        else if(filterSelect === "Park Type"){
            if(element.LocationName.includes(selectedCategoryText)){
                matching.push(element.LocationName);
            }
        }
    })
    createNewDropdown(matching, "#parksList");
}