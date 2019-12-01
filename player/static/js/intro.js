const MDCTopAppBar = mdc.topAppBar.MDCTopAppBar;
const MDCRipple = mdc.ripple.MDCRipple;


const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

let i;
for (i of document.querySelectorAll('.mdc-ripple')) {
    MDCRipple.attachTo(i);
}
MDCRipple.attachTo(document.querySelector('.mdc-fab'));
