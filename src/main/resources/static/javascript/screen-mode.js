function screenMode () {
    document.addEventListener('DOMContentLoaded', function () {
    const screenMode = document.getElementById('screenMode').innerText;
    if (screenMode === 'Light') {
        const swiperContainer = document.querySelectorAll("swiper-container")
        for (var i = 0; i < swiperContainer.length; i++) {
            swiperContainer[i].style.border = '5px solid black';
        }
    } else if (screenMode === 'Dark') {

        document.body.style.backgroundColor = "rgb(23,23,23)";
        document.body.style.color = "white";
        if (document.getElementById("profilePicture")) {
            document.getElementById("profilePicture").style.border = '1px solid white';
        }
        if (document.getElementById('movieCollectionTable')) {
            document.getElementById('movieCollectionTable').style.borderBottom = '1px solid white';
        }
        if (document.getElementById('bookCollectionTable')) {
            document.getElementById('bookCollectionTable').style.borderBottom = '1px solid white';
        }
        if (document.getElementById('gameCollectionTable')) {
            document.getElementById('gameCollectionTable').style.borderBottom = '1px solid white';
        }
        const buttons = document.querySelectorAll("button")
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.color = 'black';
        }
        const inputs = document.querySelectorAll("input")
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].style.color = 'black';
        }
        const option = document.querySelectorAll("option")
        for (var i = 0; i < option.length; i++) {
            option[i].style.backgroundColor = '#222';
            option[i].style.color = '#9d9d9d';
        }
        const select = document.querySelectorAll("select")
        for (var i = 0; i < select.length; i++) {
            select[i].style.backgroundColor = 'transparent';
            select[i].style.color = '#9d9d9d';
            select[i].style.padding = '3px';
        }
        const swiperContainer = document.querySelectorAll("swiper-container")
        for (var i = 0; i < swiperContainer.length; i++) {
            swiperContainer[i].style.backgroundColor = 'rgb(23,23,23)';
        }
        const swiperSlide = document.querySelectorAll("swiper-slide")
        for (var i = 0; i < swiperSlide.length; i++) {
            swiperSlide[i].style.backgroundColor = 'rgb(23,23,23)';
            swiperSlide[i].style.border = '3px solid white';
        }
        const tbody = document.querySelectorAll("tbody")
        for (var i = 0; i < tbody.length; i++) {
            tbody[i].style.backgroundColor = 'rgb(23,23,23)';
        }
    } else if (screenMode === 'Watermelon') {
        document.body.style.backgroundColor = "green";
        document.body.style.color = "black";

        const buttons = document.querySelectorAll("button")
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.color = 'black';
        }
        const inputs = document.querySelectorAll("input")
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].style.color = 'black';
        }
        const option = document.querySelectorAll("option")
        for (var i = 0; i < option.length; i++) {
            option[i].style.backgroundColor = '#222';
            option[i].style.color = '#9d9d9d';
        }
        const select = document.querySelectorAll("select")
        for (var i = 0; i < select.length; i++) {
            select[i].style.backgroundColor = 'transparent';
            select[i].style.color = '#9d9d9d';
            select[i].style.padding = '3px';
        }
        const swiperContainer = document.querySelectorAll("swiper-container")
        for (var i = 0; i < swiperContainer.length; i++) {
            swiperContainer[i].style.backgroundColor = 'pink';
        }
        const swiperSlide = document.querySelectorAll("swiper-slide")
        for (var i = 0; i < swiperSlide.length; i++) {
            swiperSlide[i].style.backgroundColor = 'pink';
            swiperSlide[i].style.border = '3px solid white';
        }
        const tbody = document.querySelectorAll("tbody")
        for (var i = 0; i < tbody.length; i++) {
            tbody[i].style.backgroundColor = 'rgb(23,23,23)';
        }
    }
    });
};

function screenModeTable() {
    const screenMode = document.getElementById('screenMode').innerText;
    console.log(screenMode);
    if (screenMode === 'Dark') {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.border = '3px solid white';
        }
    } else if (screenMode === 'Light') {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.border = '5px solid black';
        }
    } else if (screenMode === 'Watermelon') {
    const table = document.querySelector('table');
    table.style.backgroundColor = 'pink';
    const rows = table.querySelectorAll('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.border = '5px solid white';
        }
    }
}

function castMemberOutline() {
    const screenMode = document.getElementById('screenMode').innerText;
        const castMember = document.getElementsByClassName('castMember')
        for (var i = 0; i < castMember.length; i++) {
            if (screenMode === 'Dark') {
                castMember[i].style.outline = '3px solid white';
            } else {
                castMember[i].style.outline = '3px solid black';
            }
        }
}
