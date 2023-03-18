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