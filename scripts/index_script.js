// Developed by Kaye Poblete
// import { scrollFunction } from "./park_script"

"use strict";

const btnScrollToTop = document.querySelector(".btnScrollToTop");

window.onscroll = () => {
    scrollFunction();
}

const scrollFunction = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnScrollToTop.style.display = "block";
    } 
    else {
        btnScrollToTop.style.display = "none";
    }
}