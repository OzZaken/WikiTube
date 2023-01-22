import {wtService} from './services/wiki-tube.service.js'

window.app = {
    onInit,
    onPlayVideo,
    onSearch,
    onSetTheme
}

function onInit() {
    onSearch()
}

function onSearch(ev) {
    if (ev) ev.preventDefault()
    const elInputSearch = document.querySelector('input[name=search]')
    wtService.getVideos(elInputSearch.value)
        .then(videos => {
            if (!videos.length) return
            renderTubes(videos)
            onPlayVideo(videos[0].id)
        })
    wtService.getWikis(elInputSearch.value)
        .then(wikis => renderWikis(wikis))
}

function onPlayVideo(videoId) {
    document.querySelector('.main-video-play-container iframe').src = `https://www.youtube.com/embed/${videoId}?controls=0`
}

function onSetTheme() {
    document.body.classList.toggle('dark')

    const elBtn = document.querySelector('.btn-toggle-theme')
    elBtn.active = !elBtn.active
    // animation
    const elBallBtn = document.querySelector('.toggle-ball')
    elBallBtn.classList.toggle("on")
    if (elBallBtn.classList.contains('on')) elBallBtn.classList.toggle("off")

}

function renderTubes(videos) {
    const strHTMLs = videos.map(video => {
        return `<article class="tube-preview">
        <button class="icon-tube" onclick="app.onPlayVideo('${video.id}')"></button>
        <img src="${video.img.url}" width="${video.img.width}" height="${video.img.height}">
        <h3>${video.title}</h3>
        </article>`
    })
    document.querySelector('.main-tube-container').innerHTML = strHTMLs.join('')
}

function renderWikis(wikis) {
    const strHTMLs = wikis.map(wiki => {
        return `<article class="wiki-preview">
        <h2 class="title">${wiki.title}</h2>
        <p class="snippet>${wiki.snippet}</p>
        </article>`
    })
    document.querySelector('.wiki-container').innerHTML = strHTMLs.join('')
}