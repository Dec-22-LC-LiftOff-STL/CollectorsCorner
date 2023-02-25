const head = document.getElementsByTagName('HEAD')[0];
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = '../css/movies-search.css'

// Boolean switch variables. Used when alternating between ASC/DESC sorting.
let isAscendingTitle = true;
let isAscendingYear= true;
let isAscendingGenre = true;

// Listens for changes in the "User Collection" dropdown menu. Collection names are displayed, but
// the value for each option is linked to the Collection's ID.
window.onload = function() {
    document.getElementById("collectionNamesDropdown").addEventListener("change", function(){
        const selectedValue = this.value;
        document.getElementById("collectionId").value = selectedValue;
    });
}

// Builds the API query string using input from the "Search for a Movie" box.
function searchTitle() {
    let urlBeginning = "https://api.themoviedb.org/3/search/movie?api_key=16012a33d67f443093071edcbcdfc9d0&query=";
    let searchTerm;
    searchTerm = document.getElementById("userSearchTerm").value.replace(" ", "+");

    let url = urlBeginning + searchTerm;
    //Call this function with the url that was built.
    buildHTMLResultsTable(url);
}

// Uses template literal backticks (``) and loops to construct the HTML for the results table <div>.
function buildHTMLResultsTable(url) {
    fetch(url).then(function(response) {
    response.json().then(function(json) {
    const arrayOfMovieObjects = json.results;
    const resultsTable = document.getElementById("resultsTable"); //See search.html template
    let tableBeginning = `
    <table>
        <thead>
            <tr class="booksResultsHeaderRow">
                <th id="posterColumnHeader"></th>
                <th id="titleColumnHeader" onclick="sortTableByTitle()">Title</th>
                <th id="yearColumnHeader" onclick="sortTableByYear()">Year</th>
                <th id="genre1ColumnHeader" onclick="sortTableByGenre1()">Genre</th>
                <th id="synopsisColumnHeader">Synopsis</th>
                <th id="addToCollectionHeader"></th>
            </tr>
        </thead>
        <tbody>
    `;
    let tableRows = "";
    for (let i = 0; i < arrayOfMovieObjects.length; i++) {
        const movie = arrayOfMovieObjects[i];
        //Validation - reject API query results without a release_date property.
        if (!movie.release_date) {
            break;
        }
        //Validation - convert yyyy/mm/dd format to yyyy.
        movie.release_date = movie.release_date.slice(0,4);
        //Validation - reject API query results without a poster_path property.
        if (movie.poster_path === null) {
            break;
        }
        //Validation - reject API query results without a genre_ids property.
        if (movie.genre_ids[0] === undefined) {
            break;
        }
        //Validation - reject API query results without an overview property.
        if (movie.overview === "") {
            break;
        }

        tableRows += `
            <tr class="booksResultsTableRows">
                <th class="posterCell" style="vertical-align: middle">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                    <p id="movieImageURL${i}" hidden> ${'https://image.tmdb.org/t/p/w500' + movie.poster_path}</p><br>
                    <button id="addToCollectionButton${i}" class="btn btn-primary" onclick="prepareDatabaseInformationForm(${i}); toggleConfirmButtonDropdownForm(${i});">Add to Collection</button>
                    <p id="themoviedbApiId${i}" hidden>${movie.id}</p>
                    <form id="confirmButtonDropdown${i}" style="display:none;"><br>
                        <button type="button" class="btn btn-success" onclick="addNewMovieToDatabase();" style="width:131.84px">Confirm</button>
                    </form>
                </th>
                <th class="titleCell" style="vertical-align: middle">
                    <a id="movieTitle${i}" href="/movies/details/${movie.title}">${movie.title}</a><br>
                </th>
                <th class="yearCell" style="vertical-align: middle">
                    <p id="movieDate${i}">${movie.release_date}</p>
                </th>
                <th class="genre1Cell" style="vertical-align: middle">
                    <p id="primaryGenre${i}">${movie.genre_ids[0].toString().replace("28", "Action").replace("12", "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western")}</p>
                    <p id="movieGenres${i}" hidden>${movie.genre_ids}</p>
                </th>
                <th class="synopsisCell" style="vertical-align: middle">
                    <p id="movieSynopsis${i}" class="synopsisText">${movie.overview}</p>
                    <a href="/movies/details/${movie.title}" class="readMore">Read more</a>
                </th>
                <th class="streamingPlatformsCell" style="vertical-align: middle">
                    <button class="btn btn-primary" onclick="buildStreamingServicesHTMLDiv(themoviedbApiId${i}, streamingDiv${i}); toggleStreamingServicesDiv(streamingDiv${i})">Streaming Platforms</button>
                    <div id="streamingDiv${i}" class="hidden" style="display: flex; align-items: left; justify-content: left;"></div>
                </th>
            </tr>
            `;
    }
    let tableEnding = `</tbody></table>`;
    resultsTable.innerHTML = tableBeginning + tableRows + tableEnding;
    });
    });
}

//Called when the "Add to Collection" button is clicked. Fills out the hidden form with id="databaseInformation"
//This information is submitted and processed if everything passes the validation in place.
function prepareDatabaseInformationForm(i) {
    const themoviedbApiId = document.getElementById(`themoviedbApiId${i}`).textContent;
    const movieTitle = document.getElementById(`movieTitle${i}`).textContent;
    const movieDate = document.getElementById(`movieDate${i}`).textContent.slice(0,4);
    const movieSynopsis = document.getElementById(`movieSynopsis${i}`).textContent;
    const movieGenres = document.getElementById(`movieGenres${i}`).textContent;
    const movieImageURL = document.getElementById(`movieImageURL${i}`).textContent;


    //Fills in the title on the form on search.html
    document.getElementById("titleSubmission").value = movieTitle;

    //Fills in the date on the form on search.html
    document.getElementById("dateSubmission").value = new Date();

   //Fills in the imageURL on the form on search.html
    document.getElementById("imageURLSubmission").value = movieImageURL;

    //Fills in the genres on the form on search.html
    document.getElementById("genreSubmission").value = movieGenres.split(",")[0].replace("28", "Action").replace("12", "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western");

    if (movieGenres.split(",")[1] !== undefined) {
        document.getElementById("genre2Submission").value = movieGenres.split(",")[1].replace("28", "Action").replace("12", "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western");
    }
    if (movieGenres.split(",")[2] !== undefined) {
        document.getElementById("genre3Submission").value = movieGenres.split(",")[2].replace("28", "Action").replace("12", "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western");
    }
    //If there is <3 genres, make the missing ones an empty string.
    if (movieGenres.split(",")[1] === undefined) {
        document.getElementById("genre2Submission").value = "";
    }
    if (movieGenres.split(",")[2] === undefined) {
        document.getElementById("genre3Submission").value = "";
    }



    //Fills in the director on the form on search.html form -- director is NOT a default property on the API movie objects
    //This property must be retrieved via a separate fetch using *TheMovieDatabase's* ID for the movie.
    let directorFetchURLBeginning = "https://api.themoviedb.org/3/movie/"
    let movieId = themoviedbApiId;
    let directorFetchURLEnding = "/credits?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01"

    let directorURL = directorFetchURLBeginning + movieId + directorFetchURLEnding;

    let director = fetch(directorURL)
    .then(response => response.json())
    .then((jsonData)=>jsonData.crew.filter(({job})=>  job ==='Director'))
        let printDirector = async () => {
            let a = await director;
            let directorSubmission = document.getElementById("directorSubmission").setAttribute("value", a[0].name);
        };
        printDirector();


    //Fills in the release year on the form on search.html form
    document.getElementById("yearSubmission").value = movieDate.slice(0,4);

    //Fills in the release year on the form on search.html form
    document.getElementById("synopsisSubmission").value = movieSynopsis;
}

//Includes alerts if the movie already exists in the collection, or if the user
//forgot to select a collection.
function addNewMovieToDatabase() {

        let collectionDropdown = document.getElementById("collectionNamesDropdown");
        let collectionIdsAndMovies = document.getElementById("collectionIdsAndMovies");
        let collectionIdsAndMoviesArray = collectionIdsAndMovies.innerHTML.split('}],');
        if (collectionDropdown.value === '') {
            alert("Don't forget to select the collection you want to add to!")
            const collectionNameDropdownLabel = document.getElementById('collectionNameDropdownLabel');
            collectionNameDropdownLabel.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
        for (let i=0; i<collectionIdsAndMoviesArray.length; i++) {
            //Split each iteration into array with length 2. First index = collectionId, Second index = .toString() of all movies in that collection
            let id = collectionIdsAndMoviesArray[i].split('=[Movie{')[0];
            let text = collectionIdsAndMoviesArray[i].split('=[Movie{')[1];
            //If the collection is empty, allow any addition.
            if (text === undefined) {
                break;
            }
            // If the id matches the id of the Collection the user chose in the collection dropdown below the search bar, check the .toString()
            // text for an exact match of the movie the user is attempting to add to that collection. If there is already an exact match,
            // prevent the addition by presenting an alert warning and return (preventing a duplicate addition of the movie to the collection)
            if (id.includes(collectionDropdown.value) && text.includes(document.getElementById('synopsisSubmission').value)) {
                alert(collectionNamesDropdown.options[collectionNamesDropdown.selectedIndex].text + ' already contains ' + document.getElementById('titleSubmission').value + '!');
                return;
            }
        }
    document.getElementById("databaseInformation").submit();
}

function buildStreamingServicesHTMLDiv(apiClientMovieId, streamingDivId) {
    urlBeginning = "https://api.themoviedb.org/3/movie/";
    id = apiClientMovieId.innerHTML;
    urlEnding = "/watch/providers?api_key=16012a33d67f443093071edcbcdfc9d0";

    url = urlBeginning + id + urlEnding;

    fetch(url)
        .then(function(response) {
        response.json().then(function(json) {

        let streamingServicesHTML = "";

        for (let i = 0; i < json.results.US.flatrate.length; i++) {
            let streamingService = json.results.US.flatrate[i];
            if (streamingService.provider_name !== "HBO Max Amazon Channel" && streamingService.provider_name !== "Starz Amazon Channel") {
                let html = `<img src="https://www.themoviedb.org/t/p/original/${streamingService.logo_path}" alt="${streamingService.display_name}"/>`;
                streamingServicesHTML += html;
            }
        }
        document.getElementById(streamingDivId.id).innerHTML = streamingServicesHTML;
        });
        })
}

function toggleStreamingServicesDiv(chosenMovie) {
    let streamingServiceIconsDiv = document.getElementById(chosenMovie.id);

    if (streamingServiceIconsDiv.classList.contains("hidden")) {
        streamingServiceIconsDiv.classList.remove("hidden");
    } else {
    streamingServiceIconsDiv.classList.add("hidden");
    }
}

function toggleConfirmButtonDropdownForm(i) {
    const dropdownForm = document.getElementById(`confirmButtonDropdown${i}`);
    if (dropdownForm.style.display === "none") {
        dropdownForm.style.display = "block";
    } else {
        dropdownForm.style.display = "none";
    }
}

function sortTableByTitle() {
    const table = document.querySelector("table");
    const rows = Array.from(table.rows).slice(1); // skip the first row (header)

    rows.sort((rowA, rowB) => {
    const titleA = rowA.querySelector('[id^="movieTitle"]').textContent;
    const titleB = rowB.querySelector('[id^="movieTitle"]').textContent;
    if (titleA < titleB) {
        return -1;
    } else if (titleA > titleB) {
        return 1;
    } else {
        return 0;
    }
    });

    if (!isAscendingTitle) {
        rows.reverse();
    }

    isAscendingTitle = !isAscendingTitle;
    table.tBodies[0].append(...rows);
}

function sortTableByYear() {
    const table = document.querySelector('table');
    const rows = Array.from(table.querySelectorAll('tr')).slice(1);

    rows.sort((rowA, rowB) => {
        const yearA = rowA.querySelector('[id^="movieDate"]').textContent;
        const yearB = rowB.querySelector('[id^="movieDate"]').textContent;

    if (yearA < yearB) {
        return -1;
    } else if (yearA > yearB) {
        return 1;
    } else {
        return 0;
    }
    });

    if (!isAscendingYear) {
        rows.reverse();
    }

    isAscendingYear = !isAscendingYear;
    table.tBodies[0].append(...rows);
    }

function sortTableByGenre1() {
    const table = document.querySelector("table");
    const rows = Array.from(table.rows).slice(1); // skip the first row (header)

    rows.sort((rowA, rowB) => {
    const genreA = rowA.querySelector('[id^="primaryGenre"]').textContent;
    const genreB = rowB.querySelector('[id^="primaryGenre"]').textContent;
    if (genreA < genreB) {
        return -1;
    } else if (genreA > genreB) {
        return 1;
    } else {
        return 0;
    }
    });

    if (!isAscendingGenre) {
        rows.reverse();
    }

    isAscendingGenre = !isAscendingGenre;
    table.tBodies[0].append(...rows);
}














