const MDCDataTable = mdc.dataTable.MDCDataTable;
const MDCTopAppBar = mdc.topAppBar.MDCTopAppBar;
const MDCList = mdc.list.MDCList;
const MDCDrawer = mdc.drawer.MDCDrawer;
const MDCIconButtonToggle = mdc.iconButton.MDCIconButtonToggle;
const MDCRipple = mdc.ripple.MDCRipple;

$(document).ready(function () {
    $("#main-add").load(htmlUrl["add"], function () {

    });
    $("#main-artists").load(htmlUrl["artists"], function () {

    });
    $("#main-albums").load(htmlUrl["albums"], function () {

    });
    $("#main-songs").load(htmlUrl["songs"], function () {
        const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
        $.each($('#tbody-songs').children(), function (i, element) {
            MDCRipple.attachTo(element);
            element.addEventListener('click', function () {
                console.log('hello');
                musicQueue.push(element.getAttribute('data-row-id'))
            })
        });
    });
    $("#main-account").load(htmlUrl["account"], function () {

    });
    $("#main-settings").load(htmlUrl["settings"], function () {

    });
});

let audio = new Audio();
let musicQueue = [];
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

    const playButton = new mdc.iconButton.MDCIconButtonToggle(document.getElementById('button-play'));
    playButton.listen('MDCIconButtonToggle:change', function (event) {
        if (event.detail.isOn) {
            audio.pause();
        } else {
            audio.src = musicQueue.shift();
            audio.play();
        }
    });
    const favButton = new MDCIconButtonToggle(document.getElementById('button-fav'));
    const repeatButton = new MDCIconButtonToggle(document.getElementById('button-repeat'));

    const v_slider = new mdc.slider.MDCSlider(document.getElementById('slider-volume'));
    const t_slider = new mdc.slider.MDCSlider(document.getElementById('slider-time'));
    v_slider.listen('MDCSlider:change', (event) => {
        return console.log(`Value changed to ${event.detail.value}`);
    });
    t_slider.listen('MDCSlider:change', (event) => {
        return console.log(`Value changed to ${event.detail.value}`);
    });

    changeView(viewName.indexOf(spaView), true);
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