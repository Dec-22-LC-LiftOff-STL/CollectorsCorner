// Listens for changes in the "User Collection" dropdown menu. Collection names are displayed, but
// the value for each option is linked to the Collection's ID.
window.onload = function() {
    document.getElementById("collectionNamesDropdown").addEventListener("change", function(){
        const selectedValue = this.value;
        document.getElementById("collectionId").value = selectedValue;
    });
}


// Uses template literal backticks (``) and loops to construct the HTML for the results table <div>.
function buildHTMLResultsTable(url) {
    fetch(url).then(function(response) {
    response.json().then(function(json) {
    const arrayOfMovieObjects = json.results;
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
            <tr class="booksResultsTableRows">
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
                        <form id="confirmButtonDropdown${i}" style="display:none;"><br>
                            <button type="button" class="btn btn-success" onclick="addNewMovieToDatabase();" style="width:131.84px">Confirm</button>
                        </form>
                        <button class="btn btn-primary" onclick="buildStreamingServicesHTMLDiv(themoviedbApiId${i}, streamingDiv${i}); toggleStreamingServicesDiv(streamingDiv${i})">Streaming Platforms</button>
                        <button class="btn btn-primary" onclick="buildCastHTMLDiv(themoviedbApiId${i}, castDiv${i}); toggleCastDiv(castDiv${i})">Cast</button>
                        <div id="streamingDiv${i}" class="hidden" style="display: flex; align-items: left; justify-content: left;"></div>
                        <div id="castDiv${i}" class="hidden" style="display: flex; align-items: left; justify-content: left;"></div>
                    </div>
                </td>
            </tr>
            `;
    }
    let tableEnding = ` </table> `;
    resultsTable.innerHTML = tableBeginning + tableRows + tableEnding;
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

function fetchByActorName(name) {
    let urlBeginning = "https://api.themoviedb.org/3/search/person?api_key=16012a33d67f443093071edcbcdfc9d0&language=en-US&query=";
    let selectedName = name;
    let urlEnding = "&page=1&include_adult=false";
    let url = urlBeginning + selectedName + urlEnding;
    genericActorFetch(url);
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

function buildCastHTMLDiv(apiClientMovieId, castDivId) {
    urlBeginning = "https://api.themoviedb.org/3/movie/";
    id = apiClientMovieId.innerHTML;
    urlEnding = "/credits?api_key=16012a33d67f443093071edcbcdfc9d0&language=en-US";

    url = urlBeginning + id + urlEnding;
    console.log(url)
    fetch(url)
        .then(function(response) {
        response.json().then(function(json) {

        let castHTML = "";
        console.log(json.cast)
        for (let i = 0; i < 6; i++) {
            let cast = json.cast[i];
            if (cast.profile_path === null) {
                break;
            }
                let html = `
                <div style="outline: 3px solid white; max-width:160px">
                    <img src="https://www.themoviedb.org/t/p/original/${cast.profile_path}" style="width:150px; padding: 5%;">
                    <p style="text-align: center; font-size: 14px; overflow-wrap: anywhere">${cast.name}</p>
                    <p style="text-align: center; font-size: 11px; overflow-wrap: anywhere">${cast.character}</p>
                </div>
                `;
                castHTML += html;
        }
        document.getElementById(castDivId.id).innerHTML = castHTML;
        console.log(document.getElementById(castDivId.id).innerHTML);
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
                <tr class="booksResultsTableRows">
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
                            <form id="confirmButtonDropdown${i}" style="display:none;"><br>
                                <button type="button" class="btn btn-success" onclick="addNewMovieToDatabase();" style="width:131.84px">Confirm</button>
                            </form>
                            <button class="btn btn-primary" onclick="buildStreamingServicesHTMLDiv(themoviedbApiId${i}, streamingDiv${i}); toggleStreamingServicesDiv(streamingDiv${i})">Streaming Platforms</button>
                            <div id="streamingDiv${i}" class="hidden" style="display: flex; align-items: left; justify-content: left;"></div>
                            </div>
                    </td>
                </tr>
                `;
        }
        let tableEnding = ` </table> `;
        resultsTable.innerHTML = tableBeginning + tableRows + tableEnding;
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
