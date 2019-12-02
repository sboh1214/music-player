let audio = new Audio();
let musicQueue = [];
let mdcInstance = {};

window.addEventListener('DOMContentLoaded', function () {
    for (i of document.querySelectorAll('.mdc-ripple')) {
        mdc.ripple.MDCRipple.attachTo(i);
    }

    mdcInstance.topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('mdc-app-bar'));
    mdcInstance.topAppBar.setScrollTarget(document.getElementById('mdc-app-content'));
    mdcInstance.topAppBar.listen('MDCTopAppBar:nav', () => {
        mdcInstance.drawer.open = !mdcInstance.drawer.open;
    });

    mdcInstance.list = mdc.list.MDCList.attachTo(document.getElementById('list-menu'));
    mdcInstance.list.wrapFocus = true;
    mdcInstance.list.listen("MDCList:action", function (event) {
        changeView(event.detail.index, true);
    });

    mdcInstance.drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
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
    const favButton = new mdc.iconButton.MDCIconButtonToggle(document.getElementById('button-fav'));
    const repeatButton = new mdc.iconButton.MDCIconButtonToggle(document.getElementById('button-repeat'));

    const v_slider = new mdc.slider.MDCSlider(document.getElementById('slider-volume'));
    const t_slider = new mdc.slider.MDCSlider(document.getElementById('slider-time'));
    v_slider.listen('MDCSlider:change', () => console.log(`Value changed to ${v_slider.value}`));
    t_slider.listen('MDCSlider:change', () => console.log(`Value changed to ${t_slider.value}`));

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