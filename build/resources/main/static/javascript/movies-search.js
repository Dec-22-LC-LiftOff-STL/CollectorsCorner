// Listens for changes in the "User Collection" dropdown menu. Collection names are displayed, but
// the value for each option is linked to the Collection's ID.
window.onload = function() {
    document.getElementById("collectionNamesDropdown").addEventListener("change", function(){
        const selectedValue = this.value;
        document.getElementById("collectionId").value = selectedValue;
    });
}

// Builds the API query string using input from the "Search for a Movie" box.
function searchMovieTitle() {
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
    <table id="movieTable">
        <thead>
            <tr>
                <th id="posterColumnHeader"></th>
                <th id="titleColumnHeader" onclick="sortTable('movieTable', 1)">Title</th>
                <th id="yearColumnHeader" onclick="sortTable('movieTable', 2)">Year</th>
                <th id="genre1ColumnHeader" onclick="sortTable('movieTable', 3)">Genre</th>
                <th id="streamingPlatformsColumnHeader"></th>
            </tr>
        </thead>
        <tbody>
    `;
    let tableRows = "";
    for (let i = 0; i < arrayOfMovieObjects.length; i++) {
        const movie = arrayOfMovieObjects[i];
        //Validation
        if (!movie.release_date) {
            break;
        }
        movie.release_date = movie.release_date.slice(0,4);
        if (movie.poster_path === null) {
            break;
        }
        if (movie.genre_ids[0] === undefined) {
            break;
        }
        if (movie.overview === "") {
            break;
        }

        tableRows += `
            <tr>
                <th class="posterCell">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                    <p id="movieImageURL${i}" hidden> ${'https://image.tmdb.org/t/p/w500' + movie.poster_path}</p><br>
                    <button id="addToCollectionButton${i}" class="btn btn-primary addToCollectionButton" onclick="prepareDatabaseInformationForm(${i}); toggleConfirmButtonDropdownForm(${i});">Add to Collection</button>
                    <p id="themoviedbApiId${i}" hidden>${movie.id}</p>
                    <form id="confirmButtonDropdown${i}" style="display:none;"><br>
                        <button type="button" class="btn btn-success confirmButton" onclick="addNewMovieToDatabase();">Confirm</button>
                    </form>
                </th>
                <th class="titleCell">
                    <a id="movieTitle${i}" href="/movies/details/${movie.title}-${movie.release_date}">${movie.title}</a><br>
                </th>
                <th class="yearCell">
                    <p id="movieDate${i}">${movie.release_date}</p>
                </th>
                <th class="genre1Cell">
                    <p id="primaryGenre${i}">${movie.genre_ids[0].toString().replace("28", "Action").replace("12", "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western")}</p>
                    <p id="movieGenres${i}" hidden>${movie.genre_ids}</p>
                </th>
                <th class="synopsisCell" hidden>
                    <p id="movieSynopsis${i}" class="synopsisText">${movie.overview}</p>
                </th>
                <th class="streamingPlatformsCell">
                    <button class="btn btn-primary" onclick="buildStreamingServicesHTMLDiv(themoviedbApiId${i}, streamingDiv${i}); toggleStreamingServicesDiv(streamingDiv${i})">Streaming Platforms</button>
                    <div id="streamingDiv${i}" class="streamingDiv hidden"></div>
                </th>
            </tr>
            `;
    }
    let tableEnding = `</tbody></table>`;
    resultsTable.innerHTML = tableBeginning + tableRows + tableEnding;
    screenModeTable();
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

        if (!json.results.US || !json.results.US.flatrate) {
            document.getElementById(streamingDivId.id).innerHTML = `<br><p>Not available on stream.</p>`;
            return;
        }

        let streamingServicesHTML = "";

        for (let i = 0; i < json.results.US.flatrate.length; i++) {
            if (json.results.US.flatrate[i].provider_id === 1853 || json.results.US.flatrate[i].provider_id === 675 || json.results.US.flatrate[i].provider_id === 582 || json.results.US.flatrate[i].provider_id === 203 || json.results.US.flatrate[i].provider_id === 632 || json.results.US.flatrate[i].provider_id === 633 || json.results.US.flatrate[i].provider_id === 1770 || json.results.US.flatrate[i].provider_id === 1825 || json.results.US.flatrate[i].provider_id === 634 || json.results.US.flatrate[i].provider_id === 1794 || json.results.US.flatrate[i].provider_id === 1855 || json.results.US.flatrate[i].provider_id === 1796 || json.results.US.flatrate[i].provider_id === 1854 || json.results.US.flatrate[i].provider_id === 528 || json.results.US.flatrate[i].provider_id === 635 || json.results.US.flatrate[i].provider_id === 636 || json.results.US.flatrate[i].provider_id === 582 || json.results.US.flatrate[i].provider_id === 1853 || json.results.US.flatrate[i].provider_id === 633 || json.results.US.flatrate[i].provider_id === 583) {
                continue;
            }
            let streamingService = json.results.US.flatrate[i];
            if (streamingService.provider_name !== "HBO Max Amazon Channel" && streamingService.provider_name !== "Starz Amazon Channel") {
                let html = `<img src="https://www.themoviedb.org/t/p/original/${streamingService.logo_path}" alt="${streamingService.display_name}" class="streamingServiceIcon"/>`;
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

//SORTING
function sortTable(tableId, column) {
    var table = document.getElementById(tableId);
    var rows = Array.from(table.tBodies[0].rows);
    var sortOrder = table.getAttribute('data-sort-order') || 'asc';
    var sortDirection = sortOrder === 'asc' ? 1 : -1;

    rows.sort(function(rowA, rowB) {
        var cellA = rowA.cells[column].textContent.trim().toLowerCase();
        var cellB = rowB.cells[column].textContent.trim().toLowerCase();

        if (cellA === cellB) {
            return 0;
        }

        return cellA < cellB ? -1 * sortDirection : sortDirection;
    });

    table.tBodies[0].append(...rows);

    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    table.setAttribute('data-sort-order', sortOrder);
}














