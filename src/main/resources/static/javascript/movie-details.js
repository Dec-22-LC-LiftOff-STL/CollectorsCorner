function showTrailer() {
    const tmdbId = document.getElementById('tmdbId').innerHTML;
    const url = "http://api.themoviedb.org/3/movie/" + tmdbId + "/videos?api_key=16012a33d67f443093071edcbcdfc9d0"

    fetch(url)
        .then(function(response) {
            response.json()
                .then(function(json) {
                for (let i=0; i<json.results.length; i++) {
                    if (json.results[i].name.toUpperCase().includes('TRAILER')) {
                        const youtubeEmbedStart = `<iframe width="560" height="315" src="https://www.youtube.com/embed/`
                        const youtubeId = json.results[i].key;
                        const youtubeEmbedEnd = `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                        document.getElementById('content').innerHTML = youtubeEmbedStart + youtubeId + youtubeEmbedEnd;
                        break;
                    } else {
                        document.getElementById('content').innerHTML = `<h3>No Trailer Available</h3>`
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
            document.getElementById('content').innerHTML = `<h3>Cast not Available</h3>`
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