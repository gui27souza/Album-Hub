function loadAlbuns() {
    data.albuns.forEach(album => {
        createAlbuns(album.name, album.artist, album.rating, album.average_track_rate)
    });
}