const head = document.getElementsByTagName('HEAD')[0];
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = '../css/movies-list.css'

//Known Issue - The  MySQL VARCHAR 255-character limit seems to be preventing
//movies with a long synopsis from being added to the database.

function genericFetch(url) {
  fetch(url).then(function(response) {
    response.json().then(function(json) {
      console.log(json.results);
      const resultsTable = document.getElementById("resultsTable");

      let tableStart = `<table>`

      let html = "";
      for (let i = 0; i < json.results.length; i++) {
        const result = json.results[i];
        html += `
                    <tr>
                        <th>
                            <img class="poster" src="https://image.tmdb.org/t/p/w500${result.poster_path}"><br>
                            <a id="resultTitle${i}" href="/movies/details/${result.title}">${result.title}</a>
                            <p id="resultDate${i}">${result.release_date}</p>
                            <p id="resultApiId${i}" hidden>${result.id}</p>
                        </th>
                        <th>
                            <p id="resultSynopsis${i}">${result.overview}</p>
                            <p id="resultGenres${i}" hidden>${result.genre_ids}</p>
                        </th>
                        <th>
                            <button onclick="addResultToDatabase(${i})">Select Movie</button>
                        </th>
                    </tr>
                 `
      }
      let tableClose = `</table>`
      resultsTable.innerHTML = tableStart + html + tableClose;
    });
  });
}


function fetchAction() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=16012a33d67f443093071edcbcdfc9d0";
    genericFetch(url);
}

function fetchAdventure() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=12&api_key=16012a33d67f443093071edcbcdfc9d0";
    genericFetch(url);
}

function fetchAnimation() {
    let url = "https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=16012a33d67f443093071edcbcdfc9d0";
    genericFetch(url);
}

function fetchComedy() {
     let url = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=16012a33d67f443093071edcbcdfc9d0";
     genericFetch(url);
}

function fetchScifi() {
        let url = "https://api.themoviedb.org/3/discover/movie?with_genres=878&api_key=16012a33d67f443093071edcbcdfc9d0";
        genericFetch(url);
}

function fetchMostPopular2012() {

        let url = "https://api.themoviedb.org/3/discover/movie?primary_release_year=2012&sort_by=vote_count.desc&api_key=16012a33d67f443093071edcbcdfc9d0"
        genericFetch(url);

}

function fetchMostPopular2013() {

        let url = "https://api.themoviedb.org/3/discover/movie?primary_release_year=2013&sort_by=vote_count.desc&api_key=16012a33d67f443093071edcbcdfc9d0"
        genericFetch(url);

}

function fetchMostPopular2014() {

        let url = "https://api.themoviedb.org/3/discover/movie?primary_release_year=2014&sort_by=vote_count.desc&api_key=16012a33d67f443093071edcbcdfc9d0"
        genericFetch(url);

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