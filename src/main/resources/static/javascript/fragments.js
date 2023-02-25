    const screenMode = document.getElementById("screenMode");
    screenMode.addEventListener("click", function(event) {
    event.preventDefault();
    const selectElement = document.createElement("select");
    const optionElement = document.createElement("option");
    optionElement.text = linkElement.text;
    selectElement.appendChild(optionElement);
    screenMode.replaceWith(selectElement);
    });