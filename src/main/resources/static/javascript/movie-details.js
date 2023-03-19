function showTrailer() {
    const tmdbId = document.getElementById('tmdbId').innerHTML;
    const url = "http://api.themoviedb.org/3/movie/" + tmdbId + "/videos?api_key=16012a33d67f443093071edcbcdfc9d0"

    fetch(url)
        .then(function(response) {
            response.json()
                .then(function(json) {
                console.log(json)
                if (json.results.length === 0) {
                    document.getElementById('content').innerHTML = `<h3>No trailer available.</h3>`;
                }
                for (let i=0; i<json.results.length; i++) {
                    if (json.results[i].name.toUpperCase().includes('TRAILER')) {
                        const youtubeEmbedStart = `<br><iframe width="560" height="315" src="https://www.youtube.com/embed/`
                        const youtubeId = json.results[i].key;
                        const youtubeEmbedEnd = `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                        document.getElementById('content').innerHTML = youtubeEmbedStart + youtubeId + youtubeEmbedEnd;
                        break;
                    } else {
                        document.getElementById('content').innerHTML = `<h3>No trailer available.</h3>`
                    }
                }
                });
        });
}

function getCast() {
    const tmdbId = document.getElementById('tmdbId').innerHTML;
    const url = "https://api.themoviedb.org/3/movie/" + tmdbId + "/credits?api_key=16012a33d67f443093071edcbcdfc9d0";

    fetch(url).then(function(response) {
    response.json().then( function(json) {
        const unfilteredCast = json.cast;
        const cast = [];
        for (let i=0; i<unfilteredCast.length; i++) {
            if (unfilteredCast[i].profile_path !== null) {
                cast.push(unfilteredCast[i]);
            }
        }
        if (cast.length === 0) {
            document.getElementById('content').innerHTML = `<h3>Cast not available.</h3>`
        } else {
            let html = `<br><swiper-container class="mySwiper" navigation="true" slides-per-view="4" free-mode="true">`;
            for (let i=0; i<cast.length; i++) {
                html += `
                    <swiper-slide>
                        <div class="actorDiv">
                            <img class="actorPhoto" src="https://www.themoviedb.org/t/p/original/${cast[i].profile_path}">
                            <div class="actorTextDiv">
                                <p class="actorText">${cast[i].name}</p>
                                <p class="characterNameText">${cast[i].character}</p>
                            </div>
                        </div>
                    </swiper-slide>
                `
            }
            document.getElementById('content').innerHTML = html + `</swiper-container>`
        }
    })
    });
}

function getBoxOfficeInfo() {
    const tmdbId = document.getElementById('tmdbId').innerHTML;
    const url = "https://api.themoviedb.org/3/movie/" + tmdbId + "?api_key=16012a33d67f443093071edcbcdfc9d0&language=en-US";

    fetch(url).then(function(response) {
    response.json().then( function(json) {
        if (json.budget === 0) {
            document.getElementById('content').innerHTML = `<h3>Budget information not available.</h3>`
        } else {
        document.getElementById('content').innerHTML = `
            <h3>Budget: ${json.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
            <h3>Revenue: ${json.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
        `
        }
    })
    });
}

function getDirector() {
    const tmdbId = document.getElementById('tmdbId').innerHTML;
    const directorURL = "https://api.themoviedb.org/3/movie/" + tmdbId + "/credits?api_key=16012a33d67f443093071edcbcdfc9d0&language=en-US";
    let director = fetch(directorURL)
    .then(response => response.json())
    .then((jsonData)=>jsonData.crew.filter(({job})=>  job ==='Director'))
        let printDirector = async () => {
            let a = await director;
            if (!a[0].profile_path) {
                document.getElementById('content').innerHTML = `<h3>Director: ${a[0].name}</h3>`
            } else {
            document.getElementById('content').innerHTML = `
            <br>
            <div class="actorDiv">
                <img class="actorPhoto" src="https://www.themoviedb.org/t/p/original/${a[0].profile_path}">
                <div class="actorTextDiv">
                    <p class="actorText">${a[0].name}</p>
                    <p class="actorText">(Director)</p>
                </div>
            </div>
            `
            }
        };
        printDirector();
}

function getProducer() {
    const tmdbId = document.getElementById('tmdbId').innerHTML;
    const producerURL = "https://api.themoviedb.org/3/movie/" + tmdbId + "/credits?api_key=16012a33d67f443093071edcbcdfc9d0&language=en-US";
    let producer = fetch(producerURL)
    .then(response => response.json())
    .then((jsonData)=>jsonData.crew.filter(({job})=>  job ==='Producer'))
        let printProducer = async () => {
            let a = await producer;
            if (!a[0].profile_path) {
                document.getElementById('content').innerHTML = `<h3>Producer: ${a[0].name}</h3>`
            } else {
            document.getElementById('content').innerHTML = `
            <br>
            <div class="actorDiv">
                <img class="actorPhoto" src="https://www.themoviedb.org/t/p/original/${a[0].profile_path}">
                <div class="actorTextDiv">
                    <p class="actorText">${a[0].name}</p>
                    <p class="actorText">(Producer)</p>
                </div>
            </div>
            `
            }
        };
        printProducer();
}

function getRuntime() {
    const tmdbId = document.getElementById('tmdbId').innerHTML;
    const url = "https://api.themoviedb.org/3/movie/" + tmdbId + "?api_key=16012a33d67f443093071edcbcdfc9d0&language=en-US";

    fetch(url).then(function(response) {
    response.json().then( function(json) {
        console.log(json)
        const runtimeInMinutes = json.runtime;
        const hours = Math.floor(runtimeInMinutes / 60);
        const minutes = runtimeInMinutes % 60;
        const runtimeString = hours + "h " + minutes + "min";
        document.getElementById('content').innerHTML = `
            <h3>Movie Length: ${runtimeString}</h3>
        `;
    })
    });
}

function getStreaming() {
    const tmdbId = document.getElementById('tmdbId').innerHTML;
    const url = "https://api.themoviedb.org/3/movie/" + tmdbId + "/watch/providers?api_key=16012a33d67f443093071edcbcdfc9d0";

    fetch(url)
        .then(function(response) {
        response.json().then(function(json) {
        console.log(json)
        if (!json.results.US || !json.results.US.flatrate) {
            document.getElementById('content').innerHTML = `<h3>Not available on stream.</h3>`
        } else {
            let streamingServicesHTML = "<br>";
            for (let i = 0; i < json.results.US.flatrate.length; i++) {
                let html = `<img src="https://www.themoviedb.org/t/p/original/${json.results.US.flatrate[i].logo_path}"/>`
                streamingServicesHTML += html;
            }
        document.getElementById('content').innerHTML = streamingServicesHTML;
        }
        });
        })
}