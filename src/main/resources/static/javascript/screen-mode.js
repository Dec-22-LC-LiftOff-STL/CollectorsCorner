function screenMode () {
  document.addEventListener('DOMContentLoaded', function () {
    const screenMode = document.getElementById('screenMode').innerText;

    if (screenMode === 'light') {

    } else if (screenMode === 'Dark') {
        document.body.style.backgroundColor = "rgb(23,23,23)";
        document.body.style.color = "white";

        const table = document.getElementById('resultsTable');
        table.style.border = '2px solid white';

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
    }
  });
};