function screenMode () {
  document.addEventListener('DOMContentLoaded', function () {
    const screenMode = document.getElementById('screenMode').innerText;

    if (screenMode === 'light') {

    } else if (screenMode === 'Dark') {
        document.body.style.backgroundColor = "rgb(23,23,23)";
        document.body.style.color = "white";
        const table = document.getElementById('resultsTable');

        const tbody = document.querySelectorAll("tbody")
        for (var i = 0; i < tbody.length; i++) {
            tbody[i].style.backgroundColor = 'rgb(23,23,23)';
        }
        const selects = document.querySelectorAll("select")
        for (var i = 0; i < selects.length; i++) {
            selects[i].style.color = 'black';
        }
        const buttons = document.querySelectorAll("button")
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.color = 'black';
        }
        const inputs = document.querySelectorAll("input")
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].style.color = 'black';
        }
        const swiperSlide = document.querySelectorAll("swiper-slide")
        for (var i = 0; i < swiperSlide.length; i++) {
            swiperSlide[i].style.backgroundColor = 'rgb(23,23,23)';
        }
        const swiperContainer = document.querySelectorAll("swiper-container")
        for (var i = 0; i < swiperContainer.length; i++) {
            swiperContainer[i].style.backgroundColor = 'rgb(23,23,23)';
        }
        const select = document.querySelectorAll("select")
        for (var i = 0; i < select.length; i++) {
            select[i].style.backgroundColor = 'transparent';
            select[i].style.color = '#9d9d9d';
            select[i].style.padding = '3px';
        }
        const option = document.querySelectorAll("option")
        for (var i = 0; i < option.length; i++) {
            option[i].style.backgroundColor = '#222';
            option[i].style.color = '#9d9d9d';
        }
    }
    });
};