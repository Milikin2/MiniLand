(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (function() {
        document.querySelector(".include__info-timer-hours");
        document.querySelector(".include__info-timer-minutes");
        document.querySelector(".include__info-timer-seconds");
        const startTime = 14 * 60 * 60 * 1e3;
        const storageKey = "countdownTimer";
        function getRemainingTime() {
            const savedTime = localStorage.getItem(storageKey);
            if (savedTime) {
                const elapsed = Date.now() - parseInt(savedTime, 10);
                return Math.max(startTime - elapsed, 0);
            }
            localStorage.setItem(storageKey, Date.now().toString());
            return startTime;
        }
        function updateCountdownDisplay(ms) {
            const hours = Math.floor(ms / (1e3 * 60 * 60));
            const minutes = Math.floor(ms % (1e3 * 60 * 60) / (1e3 * 60));
            const seconds = Math.floor(ms % (1e3 * 60) / 1e3);
            document.querySelector('[data-timer="hours"]').childNodes[0].nodeValue = String(hours).padStart(2, "0") + " ";
            document.querySelector('[data-timer="minutes"]').childNodes[0].nodeValue = String(minutes).padStart(2, "0") + " ";
            document.querySelector('[data-timer="seconds"]').childNodes[0].nodeValue = String(seconds).padStart(2, "0") + " ";
        }
        function startCountdown() {
            let remainingTime = getRemainingTime();
            updateCountdownDisplay(remainingTime);
            const timer = setInterval((() => {
                remainingTime -= 1e3;
                updateCountdownDisplay(remainingTime);
                if (remainingTime <= 0) {
                    clearInterval(timer);
                    localStorage.setItem(storageKey, Date.now().toString());
                    startCountdown();
                }
            }), 1e3);
        }
        startCountdown();
    }));
    const script_button = document.querySelector(".contact__menu-button");
    const menu = document.querySelector(".contact__menu");
    const img = script_button.querySelector("img");
    script_button.addEventListener("click", (() => {
        if (menu.classList.contains("active")) {
            script_button.querySelector("span").innerText = "contact me";
            menu.classList.remove("active");
            img.src = "img/msg.svg";
        } else {
            script_button.querySelector("span").innerText = "collapse";
            menu.classList.add("active");
            img.src = "img/close__menu.svg";
        }
    }));
    window["FLS"] = true;
    isWebp();
})();