const head = document.getElementsByTagName('HEAD')[0];
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = '../css/movies-search.css'

let isAscendingTitle = true;
let isAscendingYear= true;
let isAscendingGenre = true;

window.onload = function() {
    document.getElementById("collectionNamesDropdown").addEventListener("change", function(){
        const selectedValue = this.value;
        document.getElementById("collectionId").value = selectedValue;
    });
}

function searchTitle() {

    let urlBeginning = "https://api.themoviedb.org/3/search/movie?api_key=16012a33d67f443093071edcbcdfc9d0&query=";
    let searchTerm;
    searchTerm = document.getElementById("userSearchTerm").value.replace(" ", "+");

    let url = urlBeginning + searchTerm;

    buildHTMLResultsTable(url);

}

function buildHTMLResultsTable(url) {
    fetch(url).then(function(response) {
    response.json().then(function(json) {
    const arrayOfMovieObjects = json.results;
    const resultsTable = document.getElementById("resultsTable"); //See search.html template
    let tableBeginning = `
    <table class="table table-striped">
        <thead>
            <tr>
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
        console.log(movie);
        if (!movie.release_date) {
            break;
        }
        //Cleans up presentation by slicing only the year from "2012-12-12" date format
        movie.release_date = movie.release_date.slice(0,4);
        //Cleans up presentation by ignoring search results that do not have a movie poster
        if (movie.poster_path === null) {
            break;
        }
        //Cleans up results by removing movies provided without a genre
        if (movie.genre_ids[0] === undefined) {
            break;
        }
        //Cleans up results by removing movies provided without a synopsis
        if (movie.overview === "") {
            break;
        }

        tableRows += `
            <tr>
                <th class="posterCell" style="vertical-align: middle">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}"><br>
                    <button id="dropdown-button${i}" class="btn btn-primary" onclick="prepareDatabaseInformationForm(${i}); toggleAddToCollectionDropdownForm(${i});">Add to Collection</button>
                    <p id="themoviedbApiId${i}" hidden>${movie.id}</p>
                    <form id="userCollectionDropdown${i}" style="display:none;"><br>
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
                    <p id="movieSynopsis${i}">${movie.overview}</p>

                </th>
                <th class="streamingPlatformsCell" style="vertical-align: middle">
                    <button class="btn btn-dark" onclick="buildStreamingServicesHTMLDiv(themoviedbApiId${i}, streamingDiv${i}); toggleStreamingServicesDiv(streamingDiv${i})">Streaming Platforms</button>
                    <div id="streamingDiv${i}" class="hidden"></div>
                </th>
            </tr>
            `;
    }

    let tableEnding = `</tbody></table>`;
    resultsTable.innerHTML = tableBeginning + tableRows + tableEnding;
    });
    });
}

function prepareDatabaseInformationForm(i) {
    const themoviedbApiId = document.getElementById(`themoviedbApiId${i}`).textContent;
    const movieTitle = document.getElementById(`movieTitle${i}`).textContent;
    const movieDate = document.getElementById(`movieDate${i}`).textContent.slice(0,4);
    const movieSynopsis = document.getElementById(`movieSynopsis${i}`).textContent;
    const movieGenres = document.getElementById(`movieGenres${i}`).textContent;

    //Fills in the title on the form on search.html
    document.getElementById("titleSubmission").value = movieTitle;

    //Fills in the date on the form on search.html
    document.getElementById("dateSubmission").value = new Date();

    //Fills in the genres on the form on search.html
    //uses .replace to convert genres given as integer IDs from TheMovieDatabase API to the matching string genre.
    document.getElementById("genreSubmission").value = movieGenres.split(",")[0].replace("28", "Action").replace("12", "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western");

    if (movieGenres.split(",")[1] !== undefined) {
        document.getElementById("genre2Submission").value = movieGenres.split(",")[1].replace("28", "Action").replace("12", "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western");
    }
    if (movieGenres.split(",")[2] !== undefined) {
        document.getElementById("genre3Submission").value = movieGenres.split(",")[2].replace("28", "Action").replace("12", "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western");
    }
    if (movieGenres.split(",")[1] === undefined) {
        document.getElementById("genre2Submission").value = "";
    }
    if (movieGenres.split(",")[2] === undefined) {
        document.getElementById("genre3Submission").value = "";
    }

    //Fills in the director on the form on search.html form -- director is NOT a property on movie objects
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
    //The string is sliced to abide by the MySQL VARCHAR character limit
    document.getElementById("synopsisSubmission").value = movieSynopsis.slice(0,250);
}

function addNewMovieToDatabase() {

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

function toggleAddToCollectionDropdownForm(i) {
    const dropdownForm = document.getElementById(`userCollectionDropdown${i}`);
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











