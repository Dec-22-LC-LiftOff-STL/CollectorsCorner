

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




function addFirstResultToDatabase() {

		//Title
		let selectedMovieTitle = document.getElementById("firstResultTitle").innerHTML;
		let titleSubmission = document.getElementById("titleSubmission").setAttribute("value", selectedMovieTitle);

		//Genres
		let selectedGenreIds = document.getElementById("firstResultGenres").innerHTML;
		selectedGenres = selectedGenreIds.replace("28", "Action").replace('12', "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western")
		selectedGenresSplit = selectedGenres.split(",");
		let genreSubmission = document.getElementById("genreSubmission").setAttribute("value", selectedGenresSplit[0]);
		let genre2Submission = document.getElementById("genre2Submission").setAttribute("value", selectedGenresSplit[1]);
		let genre3Submission = document.getElementById("genre3Submission").setAttribute("value", selectedGenresSplit[2]);

		//Director
		let directorFetchURLBeginning = "https://api.themoviedb.org/3/movie/"
		let movieId = document.getElementById("firstResultApiId").innerHTML;
		let directorFetchURLEnding = "/credits?api_key=16012a33d67f443093071edcbcdfc9d0"
		let directorURL = directorFetchURLBeginning + movieId + directorFetchURLEnding;

		let director = fetch(directorURL)
					   .then(response => response.json())
					   .then((jsonData)=>jsonData.crew.filter(({job})=>  job ==='Director'))

		let printDirector = async () => {
			let a = await director;
			let directorSubmission = document.getElementById("directorSubmission").setAttribute("value", a[0].name);
		};

		printDirector();

		//Date
		let fullDate = document.getElementById("firstResultDate").innerHTML;
		let year = fullDate.slice(0,4);
		let yearSubmission = document.getElementById("yearSubmission").setAttribute("value", year);

		//Synopsis
		let synopsis = document.getElementById("firstResultSynopsis").innerHTML;
		let synopsisSubmission = document.getElementById("synopsisSubmission").setAttribute("value", synopsis)

}

function addSecondResultToDatabase() {

		//Title
		let selectedMovieTitle = document.getElementById("secondResultTitle").innerHTML;
		let titleSubmission = document.getElementById("titleSubmission").setAttribute("value", selectedMovieTitle);

		//Genres
		let selectedGenreIds = document.getElementById("secondResultGenres").innerHTML;
		selectedGenres = selectedGenreIds.replace("28", "Action").replace('12', "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western")
		selectedGenresSplit = selectedGenres.split(",");
		let genreSubmission = document.getElementById("genreSubmission").setAttribute("value", selectedGenresSplit[0]);
		let genre2Submission = document.getElementById("genre2Submission").setAttribute("value", selectedGenresSplit[1]);
		let genre3Submission = document.getElementById("genre3Submission").setAttribute("value", selectedGenresSplit[2]);

		//Director
		let directorFetchURLBeginning = "https://api.themoviedb.org/3/movie/"
		let movieId = document.getElementById("secondResultApiId").innerHTML;
		let directorFetchURLEnding = "/credits?api_key=16012a33d67f443093071edcbcdfc9d0"
		let directorURL = directorFetchURLBeginning + movieId + directorFetchURLEnding;

		let director = fetch(directorURL)
					   .then(response => response.json())
					   .then((jsonData)=>jsonData.crew.filter(({job})=>  job ==='Director'))

		let printDirector = async () => {
			let a = await director;
			let directorSubmission = document.getElementById("directorSubmission").setAttribute("value", a[0].name);
		};

		printDirector();

		//Date
		let fullDate = document.getElementById("secondResultDate").innerHTML;
		let year = fullDate.slice(0,4);
		let yearSubmission = document.getElementById("yearSubmission").setAttribute("value", year);

		//Synopsis
		let synopsis = document.getElementById("secondResultSynopsis").innerHTML;
		let synopsisSubmission = document.getElementById("synopsisSubmission").setAttribute("value", synopsis)

}

function addThirdResultToDatabase() {

		//Title
		let selectedMovieTitle = document.getElementById("thirdResultTitle").innerHTML;
		let titleSubmission = document.getElementById("titleSubmission").setAttribute("value", selectedMovieTitle);

		//Genres
		let selectedGenreIds = document.getElementById("thirdResultGenres").innerHTML;
		selectedGenres = selectedGenreIds.replace("28", "Action").replace('12', "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western")
		selectedGenresSplit = selectedGenres.split(",");
		let genreSubmission = document.getElementById("genreSubmission").setAttribute("value", selectedGenresSplit[0]);
		let genre2Submission = document.getElementById("genre2Submission").setAttribute("value", selectedGenresSplit[1]);
		let genre3Submission = document.getElementById("genre3Submission").setAttribute("value", selectedGenresSplit[2]);

		//Director
		let directorFetchURLBeginning = "https://api.themoviedb.org/3/movie/"
		let movieId = document.getElementById("thirdResultApiId").innerHTML;
		let directorFetchURLEnding = "/credits?api_key=16012a33d67f443093071edcbcdfc9d0"
		let directorURL = directorFetchURLBeginning + movieId + directorFetchURLEnding;

		let director = fetch(directorURL)
					   .then(response => response.json())
					   .then((jsonData)=>jsonData.crew.filter(({job})=>  job ==='Director'))

		let printDirector = async () => {
			let a = await director;
			let directorSubmission = document.getElementById("directorSubmission").setAttribute("value", a[0].name);
		};

		printDirector();

		//Date
		let fullDate = document.getElementById("thirdResultDate").innerHTML;
		let year = fullDate.slice(0,4);
		let yearSubmission = document.getElementById("yearSubmission").setAttribute("value", year);

		//Synopsis
		let synopsis = document.getElementById("thirdResultSynopsis").innerHTML;
		let synopsisSubmission = document.getElementById("synopsisSubmission").setAttribute("value", synopsis)

}

function addFourthResultToDatabase() {

		//Title
		let selectedMovieTitle = document.getElementById("fourthResultTitle").innerHTML;
		let titleSubmission = document.getElementById("titleSubmission").setAttribute("value", selectedMovieTitle);

		//Genres
		let selectedGenreIds = document.getElementById("fourthResultGenres").innerHTML;
		selectedGenres = selectedGenreIds.replace("28", "Action").replace('12', "Adventure").replace("16", "Animation").replace("35", "Comedy").replace("80", "Crime").replace("99", "Documentary").replace("18", "Drama").replace("10751", "Family").replace("14", "Fantasy").replace("36", "History").replace("27", "Horror").replace("10402", "Music").replace("9648", "Mystery").replace("10749", "Romance").replace("878", "Science Fiction").replace("10770", "TV Movie").replace("53", "Thriller").replace("10752", "War").replace("37", "Western")
		selectedGenresSplit = selectedGenres.split(",");
		let genreSubmission = document.getElementById("genreSubmission").setAttribute("value", selectedGenresSplit[0]);
		let genre2Submission = document.getElementById("genre2Submission").setAttribute("value", selectedGenresSplit[1]);
		let genre3Submission = document.getElementById("genre3Submission").setAttribute("value", selectedGenresSplit[2]);

		//Director
		let directorFetchURLBeginning = "https://api.themoviedb.org/3/movie/"
		let movieId = document.getElementById("fourthResultApiId").innerHTML;
		let directorFetchURLEnding = "/credits?api_key=16012a33d67f443093071edcbcdfc9d0"
		let directorURL = directorFetchURLBeginning + movieId + directorFetchURLEnding;

		let director = fetch(directorURL)
					   .then(response => response.json())
					   .then((jsonData)=>jsonData.crew.filter(({job})=>  job ==='Director'))

		let printDirector = async () => {
			let a = await director;
			let directorSubmission = document.getElementById("directorSubmission").setAttribute("value", a[0].name);
		};

		printDirector();

		//Date
		let fullDate = document.getElementById("fourthResultDate").innerHTML;
		let year = fullDate.slice(0,4);
		let yearSubmission = document.getElementById("yearSubmission").setAttribute("value", year);

		//Synopsis
		let synopsis = document.getElementById("fourthResultSynopsis").innerHTML;
		let synopsisSubmission = document.getElementById("synopsisSubmission").setAttribute("value", synopsis)

}


//DOCUMENTATION//

//Genre IDs
//https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee

//Director Fetch
//https://www.themoviedb.org/talk/5d6cfff7efcea900129b5945

//Discover - Examples
//https://www.themoviedb.org/documentation/api/discover