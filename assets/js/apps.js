//select-elements
var btn_toggle = document.querySelector(".btn-toggle");
var big_wrapper = document.querySelector(".big-wrapper");
const main = document.querySelector("main");

let dark = false;

function animateToggle(){
    dark = !dark;
    let clone = big_wrapper.cloneNode(true);
    if(dark){
        clone.classList.remove("light");
        clone.classList.add("dark");
    }
    else{
        clone.classList.remove("dark");
        clone.classList.add("light");
    }
    main.appendChild(clone);
}


btn_toggle.addEventListener("click", animateToggle);

