import { locationsArray } from "./locationData.js"
import { parkTypesArray } from "./parkTypeData.js"
import { nationalParksArray } from "./nationalParkData.js"

"use strict";

// On page load
window.onload = () => {
    createNewDropdown(locationsArray, "#searchTypeList");
    const searchTypeList = document.querySelector("#searchTypeList");
    searchTypeList.onchange = onChangeSearchTypeList;
}
// Create new dropdown list
const createNewDropdown = (_myArrayList, _nameOfDropdown) => {
    const newDropdown = document.querySelector(_nameOfDropdown);
    newDropdown.appendChild(new Option("Select one"));
    _myArrayList.forEach( (element) => {
        let theOption = new Option(element);
        newDropdown.appendChild(theOption);
    })
}
// 
const onChangeSearchTypeList = () => {
    const index = document.querySelector("#searchTypeList").selectedIndex;
    const selectedCategoryText = document.querySelector("#searchTypeList")[index].text;
    document.querySelector("#parksList").innerHTML = "";
    let matching = [];
    nationalParksArray.forEach( (element) => {
        if(element.State === selectedCategoryText)
        matching.push(element.LocationName)
    })
    createNewDropdown(matching, "#parksList");
}
