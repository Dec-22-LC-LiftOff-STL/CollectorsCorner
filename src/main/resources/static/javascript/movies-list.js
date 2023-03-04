// Listens for changes in the "User Collection" dropdown menu. Collection names are displayed, but
// the value for each option is linked to the Collection's ID.
window.onload = function() {
    document.getElementById("collectionNamesDropdown").addEventListener("change", function(){
        const selectedValue = this.value;
        document.getElementById("collectionId").value = selectedValue;
    });
}

function buildHTMLResultsTable(url) {
    fetch(url).then(function(response) {
    response.json().then(function(json) {
    const arrayOfMovieObjects = json.results;
    const resultsTable = document.getElementById("resultsTable");
    let tableBeginning = ` <table> `;
    let tableRows = "";
    for (let i = 0; i < arrayOfMovieObjects.length; i++) {
        const movie = arrayOfMovieObjects[i];
        //Validation//
        movie.release_date = movie.release_date.slice(0,4);
        if (!movie.release_date) {
            break;
        }
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
                <td class="posterCell">
                    <div class="posterColumn">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                        <p id="movieImageURL${i}" hidden> ${'https://image.tmdb.org/t/p/w500' + movie.poster_path}</p><br>
                    </div>
                    <div class="infoColumn">
                        <a id="movieTitle${i}" class="movieTitle" href="/movies/details/${movie.title}">${movie.title}</a><br>
                        <p id="movieDate${i}" class="movieDate">${movie.release_date}</p>
                        <p id="primaryGenre${i}" class="primaryGenre">${movie.genre_ids[0].toString().replace("28", "Action").replace("12", "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western")}</p>
                        <p id="movieGenres${i}" hidden>${movie.genre_ids}</p>
                        <p id="themoviedbApiId${i}" hidden>${movie.id}</p>
                        <p id="movieSynopsis${i}" class="movieSynopsis">${movie.overview}</p>
                        <button id="addToCollectionButton${i}" class="btn btn-primary" onclick="prepareDatabaseInformationForm(${i}); toggleConfirmButtonDropdownForm(${i});">Add to Collection</button>
                        <button class="btn btn-primary" onclick="buildStreamingServicesHTMLDiv(themoviedbApiId${i}, streamingDiv${i}, this); toggleStreamingServicesDiv(streamingDiv${i})">Watch</button>
                        <button class="btn btn-primary" onclick="buildCastHTMLDiv(themoviedbApiId${i}, castDiv${i}); toggleCastDiv(castDiv${i})">Cast</button><br>
                        <form id="confirmButtonDropdown${i}" style="display:none;">
                            <button class="btn btn-success confirmButton" onclick="addNewMovieToDatabase();">Confirm</button>
                        </form>
                        <div id="streamingDiv${i}" class="hidden streamingDiv"></div>
                        <div id="castDiv${i}" class="hidden castDiv"></div>
                    </div>
                </td>
            </tr>
            `;
    }
    let tableEnding = ` </table> `;
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
    const movieDate = document.getElementById(`movieDate${i}`).innerHTML;
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
    let movieId = themoviedbApiId;

    let directorURL = "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";

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

function addNewMovieToDatabase() {
event.preventDefault()
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
            alert(collectionDropdown.options[collectionDropdown.selectedIndex].text + ' already contains ' + document.getElementById('titleSubmission').value + '!');
            return;
        }
    }
    document.getElementById("databaseInformation").submit();
}

function fetchByActorName(name) {
    let selectedName = name;
    let url = "https://api.themoviedb.org/3/search/person?api_key=16012a33d67f443093071edcbcdfc9d0&language=en-US&query=" + selectedName + "&page=1&include_adult=false";
    genericActorFetch(url);
}

function buildStreamingServicesHTMLDiv(apiClientMovieId, streamingDivId, button) {
    id = apiClientMovieId.innerHTML;
    url = "https://api.themoviedb.org/3/movie/" + id + "/watch/providers?api_key=16012a33d67f443093071edcbcdfc9d0";

    fetch(url)
        .then(function(response) {
        response.json().then(function(json) {

        if (!json.results.US || !json.results.US.flatrate) {
            json.results.US.flatrate = ['null'];
        }

        let streamingServicesHTML = "";

        for (let i = 0; i < json.results.US.flatrate.length; i++) {
            let streamingService = json.results.US.flatrate[i];
            if (streamingService === 'null') {
                streamingServicesHTML = `
                    <h3>Not available on stream</h3>
                `
            } else {
                let html = `
                <img src="https://www.themoviedb.org/t/p/original/${streamingService.logo_path}" alt="${streamingService.display_name}"/>`;
                streamingServicesHTML += html;
            }
        }
        document.getElementById(streamingDivId.id).innerHTML = streamingServicesHTML;
        });
        })
}

function buildCastHTMLDiv(apiClientMovieId, castDivId) {
    id = apiClientMovieId.innerHTML;
    url = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=16012a33d67f443093071edcbcdfc9d0&language=en-US";
    fetch(url)
        .then(function(response) {
        response.json().then(function(json) {

        let castHTML = "";
        for (let i = 0; i < 4; i++) {
            let cast = json.cast[i];
            if (cast.profile_path === null) {
                break;
            }
                let html = `
                <div class="castMember">
                    <img class="actorPhoto" src="https://www.themoviedb.org/t/p/original/${cast.profile_path}">
                    <p class="actorNameText">${cast.name}</p>
                    <p class="characterNameText">${cast.character}</p>
                </div> &nbsp;
                `;
                castHTML += html;
        }
        document.getElementById(castDivId.id).innerHTML = castHTML;
        castMemberOutline();
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

function toggleCastDiv(chosenMovie) {
    let castDiv = document.getElementById(chosenMovie.id);

    if (castDiv.classList.contains("hidden")) {
        castDiv.classList.remove("hidden");
    } else {
    castDiv.classList.add("hidden");
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

function genericActorFetch(url) {
    fetch(url).then(function(response) {
    response.json().then(function(json) {
    const arrayOfMovieObjects = json.results[0].known_for;
    console.log(arrayOfMovieObjects, typeof arrayOfMovieObjects);
        const resultsTable = document.getElementById("resultsTable"); //See search.html template
        let tableBeginning = ` <table> `;
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
                <tr>
                    <td class="posterCell" style="vertical-align: middle; display:flex;">
                        <div class="posterColumn">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                            <p id="movieImageURL${i}" hidden> ${'https://image.tmdb.org/t/p/w500' + movie.poster_path}</p><br>
                        </div>
                        <div class="infoColumn">
                            <a style="font-size: 36px" id="movieTitle${i}" href="/movies/details/${movie.title}">${movie.title}</a><br>
                            <p style="font-size: 22px" id="movieDate${i}">${movie.release_date}</p>
                            <p style="font-size: 16px" id="primaryGenre${i}">${movie.genre_ids[0].toString().replace("28", "Action").replace("12", "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western")}</p>
                            <p id="movieGenres${i}" hidden>${movie.genre_ids}</p>
                            <p id="themoviedbApiId${i}" hidden>${movie.id}</p>
                            <p style="font-size:16px" id="movieSynopsis${i}" class="synopsisText">${movie.overview}</p>
                            <button id="addToCollectionButton${i}" class="btn btn-primary" onclick="prepareDatabaseInformationForm(${i}); toggleConfirmButtonDropdownForm(${i});">Add to Collection</button>
                            <button class="btn btn-primary" onclick="buildStreamingServicesHTMLDiv(themoviedbApiId${i}, streamingDiv${i}, this); toggleStreamingServicesDiv(streamingDiv${i})">Watch</button>
                            <button class="btn btn-primary" onclick="buildCastHTMLDiv(themoviedbApiId${i}, castDiv${i}); toggleCastDiv(castDiv${i})">Cast</button><br>
                            <form id="confirmButtonDropdown${i}" style="display:none;">
                                <button type="button" class="btn btn-success" onclick="addNewMovieToDatabase(event);" style="width:131.84px">Confirm</button>
                            </form>
                            <div id="streamingDiv${i}" class="hidden" style="display: flex; align-items: left; justify-content: left; padding-top: 15px;"></div>
                            <div id="castDiv${i}" class="hidden" style="display: flex; align-items: left; justify-content: left; padding-top: 15px; padding-left: 3px"></div>
                        </div>
                    </td>
                </tr>
                `;
        }

        let tableEnding = ` </table> `;
        resultsTable.innerHTML = tableBeginning + tableRows + tableEnding;
        x();
        });
        });
    }

function fetchAction() {
	let url = "https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=16012a33d67f443093071edcbcdfc9d0";
	buildHTMLResultsTable(url);
}

function fetchAdventure() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=12&api_key=16012a33d67f443093071edcbcdfc9d0";
    buildHTMLResultsTable(url);
}

function fetchAnimation() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=16012a33d67f443093071edcbcdfc9d0";
    buildHTMLResultsTable(url);
}

function fetchComedy() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=16012a33d67f443093071edcbcdfc9d0";
    buildHTMLResultsTable(url);
}

function fetchCrime() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=80&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchDocumentary() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=99&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchDrama() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchFamily() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=10751&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchFantasy() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=14&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchHistory() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=36&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchHorror() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=27&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchMusic() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=10402&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchMystery() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=9648&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchRomance() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=10749&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchScifi() {
        let url = "https://api.themoviedb.org/3/discover/movie?with_genres=878&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01region=us";
        buildHTMLResultsTable(url);
}

function fetchThriller() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=53&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchWar() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=10752&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

function fetchWestern() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=37&api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=en&year=2022&primary_release_date.gte=2022-11-01";
    buildHTMLResultsTable(url);
}

//Foreign Films - Popular since the beginning of 2021
function fetchChinese() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=zh&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchHindi() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=hi&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchSpanish() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=es&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchFrench() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=fr&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchGerman() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=de&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchHebrew() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=he&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchRussian() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=ru&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchJapanese() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=ja&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchKorean() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=ko&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchUkrainian() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=uk&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchTurkish() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=tr&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchBosnian() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=bs&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

function fetchZulu() {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=16012a33d67f443093071edcbcdfc9d0&sort_by=vote_count.desc&with_original_language=zu&primary_release_date.gte=2022-01-01"
    buildHTMLResultsTable(url);
}

//Years Grid
function fetchByYear(year) {
    let urlBeginning = "https://api.themoviedb.org/3/discover/movie?primary_release_year=";
    let selectedYear = year.toString();
    let urlEnding = "&sort_by=vote_count.desc&api_key=16012a33d67f443093071edcbcdfc9d0";
    let url = urlBeginning + selectedYear + urlEnding;
    buildHTMLResultsTable(url);
}
