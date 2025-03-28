const slider = document.querySelector("#portfolio>.portfolio-container>.cards");
const arrowBtns = document.querySelectorAll("#portfolio>.portfolio-container>.arrow");
const cardWidth = slider.querySelector("#portfolio>.portfolio-container>.cards>.card").offsetWidth;
const sliderChilds = [...slider.children];

let isDragging = false;
let startX;
let startScrollLeft;

//get the No of cards that can fit inslider at once
let cardView = Math.round( slider.offsetWidth / cardWidth);

//insert copy of few last cards at begin
sliderChilds.slice(-cardView).reverse().forEach( card => {
    slider.insertAdjacentHTML("afterbegin", card.outerHTML);
});

//insert copy of few first cards at end
sliderChilds.slice(0, cardView).forEach( card => {
    slider.insertAdjacentHTML("beforeend", card.outerHTML);
});

//eventlistener fo buttons
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        slider.scrollLeft += (btn.id === "left-arrow") ? -cardWidth : cardWidth;
    });
});

//check dragging and calculate cursor point
const dragStart = (e) => {
    isDragging = true;
    slider.classList.add("dragging");
    startX=e.pageX;
    startScrollLeft = slider.scrollLeft;
}

//scroll when dragging
const dragging = (e) => {
    if(isDragging) {
        slider.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
    else{
        return false;
    }
}

//check for dragging stop
const dragStop = () => {
    isDragging = false;
    slider.classList.remove("dragging");
}

const sliderReset = () => {
    if (slider.scrollLeft === 0) {
        slider.classList.add("no-transition")
        slider.scrollLeft = slider.scrollWidth - (2* slider.offsetWidth);
        slider.classList.remove("no-transition")
    }
    else if (Math.ceil(slider.scrollLeft) === slider.scrollWidth - slider.offsetWidth) {
        slider.classList.add("no-transition");
        slider.scrollLeft = slider.offsetWidth;
        slider.classList.remove("no-transition");
    }
}

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup",dragStop)
slider.addEventListener("scroll", sliderReset)