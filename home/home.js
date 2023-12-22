
// script.js

document.addEventListener("DOMContentLoaded", function () {
    const technicalBox = document.getElementById("technical-box");
    const professionalBox = document.getElementById("professional-box");

    window.addEventListener("scroll", function () {
        if (isInViewport(technicalBox)) {
            technicalBox.classList.add("show");
        }

        if (isInViewport(professionalBox)) {
            professionalBox.classList.add("show");
        }
    });

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});