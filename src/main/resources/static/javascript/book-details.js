window.onload = function() {
    bookTitle = document.getElementById("bookTitle").innerHTML;
    bookAuthor = document.getElementById("bookAuthor").innerHTML;
    bookYear = document.getElementById("bookYear").innerHTML;

    searchTerm = bookTitle + " " + bookAuthor + " " + bookYear;
    let url = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&key=AIzaSyA_fNlN4nm1Dkba-D2XE1smV04vA5_42zY";

    fetch(url).then(function(response) {
        response.json().then( function(json) {
            let thumbnail = json.items[0].volumeInfo.imageLinks.thumbnail;
            let fullImage = thumbnail.replace("zoom=1", "zoom=0");
            let publishedYear = json.items[0].volumeInfo.publishedDate.slice(0,4);
            const img = new Image();
            img.src = fullImage;
            img.onload = () => {
                if (img.naturalWidth === 575) {
                    let div = document.getElementById('bookInfo');
                    div.innerHTML = `
                    <div class="content-container">
                        <div>
                            <h1 id="title">${json.items[0].volumeInfo.title}</h1>
                            <h3>Author(s): ${json.items[0].volumeInfo.authors}</h3>
                            <img id="bookCover" src=${thumbnail} width=125px>
                            <h4 id="synopsis">${json.items[0].volumeInfo.description}</h4>
                            <p id="publisher">Published by ${json.items[0].volumeInfo.publisher}, ${publishedYear}</p>
                        </div>
                    </div> `
                } else {
                let div = document.getElementById('bookInfo');
                div.innerHTML = `
                <div class="content-container">
                    <div class="left-column">
                        <img id="bookCover" src=${fullImage} width=400px>
                    </div>
                    <div class="right-column">
                        <h1 id="title">${json.items[0].volumeInfo.title}</h1>
                        <h3>Author(s): ${json.items[0].volumeInfo.authors}</h3>
                        <h4 id="synopsis">${json.items[0].volumeInfo.description}</h4>
                        <p id="publisher">Published by ${json.items[0].volumeInfo.publisher}, ${publishedYear}</p>
                    </div>
                </div>`
                }
            };
            if (json.items[0].saleInfo.buyLink !== undefined) {
                shopNowImg = document.getElementById("shopNowImg").hidden = false;
                shoplink = document.getElementById('shopNowLink');
                    shoplink.setAttribute('href', json.items[0].saleInfo.buyLink);
            }
        })
    });
};
