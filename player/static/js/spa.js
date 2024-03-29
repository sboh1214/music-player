const MDCDataTable = mdc.dataTable.MDCDataTable;
const MDCTopAppBar = mdc.topAppBar.MDCTopAppBar;
const MDCList = mdc.list.MDCList;
const MDCDrawer = mdc.drawer.MDCDrawer;
const MDCIconButtonToggle = mdc.iconButton.MDCIconButtonToggle;
const MDCRipple = mdc.ripple.MDCRipple;
const MDCSlider = mdc.slider.MDCSlider;
const MDCMenu = mdc.menu.MDCMenu;

$(document).ready(function () {
    $("#main-add").load(htmlUrl["add"], function () {
        $("#add_music").dropzone({
            url: htmlUrl["add"],
        });
    });
    $("#main-artists").load(htmlUrl["artists"], function () {

    });
    $("#main-albums").load(htmlUrl["albums"], function () {

    });
    $("#main-songs").load(htmlUrl["songs"], function () {
        const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
        $('#button-song-play').each(function (i, element) {
            element.addEventListener('click', function () {
                let clickedSlug = element.getAttribute('data-row-id');
                console.log(clickedSlug);
                if (musicInstance !== null)
                {
                    musicInstance.pause();
                    musicInstance = null;
                }
                musicQueue.unshift(musicList.find(function (item) {
                    return item.slug === clickedSlug;
                }));
                updatePlayBar();
                play();
                mdcInstance.playButton.on = true;
            })
        });
        $('#button-song-more').each(function (i, buttonItem) {
            buttonItem.addEventListener('click', function () {
                let selectedMenu = $("#menu-song-more").find(function (menuItem) {
                    return buttonItem.getAttribute('data-row-id') === menuItem.getAttribute('data-row-id');
                });
                const menu = new MDCMenu(selectedMenu);
                menu.open = true;
            })
        });
        $.each($('.mdc-ripple'), function (i, element) {
            ripple = new MDCRipple(element);
            ripple.unbounded = true;
        })
    });
    $("#main-account").load(htmlUrl["account"], function () {

    });
    $("#main-settings").load(htmlUrl["settings"], function () {

    });
});

let musicList = Array();
let musicQueue = Array([null]);
let musicInstance = null;

$.getJSON(songsListUrl, {}, function (data) {
    console.log(data);
    musicList = data;
    musicQueue = shuffle(musicList);
    updatePlayBar();
});

let mdcInstance = {};

window.addEventListener('DOMContentLoaded', function () {
    for (i of document.querySelectorAll('.mdc-ripple')) {
        MDCRipple.attachTo(i);
    }

    mdcInstance.topAppBar = MDCTopAppBar.attachTo(document.getElementById('mdc-app-bar'));
    mdcInstance.topAppBar.setScrollTarget(document.getElementById('mdc-app-content'));
    mdcInstance.topAppBar.listen('MDCTopAppBar:nav', () => {
        mdcInstance.drawer.open = !mdcInstance.drawer.open;
    });

    mdcInstance.list = MDCList.attachTo(document.getElementById('list-menu'));
    mdcInstance.list.wrapFocus = true;
    mdcInstance.list.listen("MDCList:action", function (event) {
        changeView(event.detail.index, true);
    });

    mdcInstance.drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    mdcInstance.drawer.open = true;

    mdcInstance.playButton = new MDCIconButtonToggle(document.getElementById('button-play'));
    mdcInstance.playButton.listen('MDCIconButtonToggle:change', function (event) {
        if (event.detail.isOn) {
            console.log("play");
            play();
        } else {
            console.log("pause");
            pause();
        }
    });

    mdcInstance.muteButton = new MDCIconButtonToggle(document.getElementById('button-mute'));
    mdcInstance.muteButton.listen('MDCIconButtonToggle:change', function (event) {
        if (event.detail.isOn) {
            console.log("mute");
            Howler.volume(0);
        } else {
            console.log("unmute");
            Howler.volume(0.5);
        }
    });

    const volumeSlider = new MDCSlider(document.getElementById('slider-volume'));
    volumeSlider.listen('MDCSlider:change', (event) => {
        console.log(`Value changed to ${event.detail.value}`);
        Howler.volume(event.detail.value / 100);
        mdcInstance.muteButton.on = false;
    });

    changeView(viewName.indexOf(spaView), true);

    let nextButton = document.getElementById("button-next");
    nextButton.addEventListener('click', function(event){
        next();
    });
    let previousButton = document.getElementById("button-previous");
    previousButton.addEventListener('click', function(event){
        previous();
    });
});

function changeView(index, pushState) {
    document.querySelector('.mdc-list-item--activated').classList.remove('mdc-list-item--activated');
    let itemList = document.querySelectorAll('.mdc-list-item');
    itemList[index].classList.add('mdc-list-item--activated');
    document.querySelector('.content--active').classList.remove('content--active');
    let mainList = document.querySelectorAll('.content');
    mainList[index].classList.add('content--active');
    if (pushState === true) {
        window.history.pushState(null, null, viewUrl[index])
    }
}

function updatePlayBar() {
    $("#text-title").text(musicQueue[0].title);
    $("#text-album").text(musicQueue[0].album);
    $("#text-artist").text(musicQueue[0].artist);
}

function play() {
    if (musicInstance === null) {
        musicInstance = new Howl({
            src: [musicQueue[0].url]
        });
        musicInstance.once('load', function () {
            musicInstance.play();
        });
    } else {
        musicInstance.play();
    }
    mdcInstance.playButton.on = true;
}

function pause() {
    if (musicInstance === null) {
        console.error("cannot pause");
    } else {
        musicInstance.pause();
    }
    mdcInstance.playButton.on = false;
}

function next() {
    if (musicInstance !== null) {
        musicInstance.pause();
    }
    musicInstance = null;
    musicQueue.shift();
    updatePlayBar();
    play();
}

function previous() {
    if (musicInstance !== null) {
        musicInstance.pause();
    }
    musicQueue.shift();
    updatePlayBar();
    play();
}

function shuffle(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
