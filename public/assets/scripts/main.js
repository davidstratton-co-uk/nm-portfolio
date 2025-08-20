/** 
 *  Site Menu Toggle 
*/

const menuButton = document.querySelector('.site-menu');
const siteNav = document.querySelector('.site-nav');
const siteSocial = document.querySelector('.site-social');

menuButton.addEventListener('click', (e) => {
    menuButton.classList.toggle('active');
    siteNav.classList.toggle('active');
    siteSocial.classList.toggle('active');
});

/** 
 *  Contact Form Validation
*/

const form = document.querySelector('.contact-form');
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

const addError = (input, errormsg) => {
    if (!input.nextElementSibling) {
        input.classList.add('error');
        let errorbox = document.createElement("span");
        errorbox.classList.add("error-msg");
        errorbox.textContent = errormsg;
        input.insertAdjacentElement("afterend", errorbox);
    } else {
        errorbox.textContent = errormsg;
    }
}

const isEmptyInput = () => {

};

form.addEventListener("input", (e) => {

    e.target.classList.add('error');
});

form.addEventListener("submit", (e) => {
    
    let formReady = true;

    for (let i = 0; i < formInputs.length; i++) {
        if (!formInputs[i].value) {

            addError(formInputs[i], "This field can not be empty.");

            formReady = false;
        }
    }

    if (!formReady) {
        e.preventDefault();
    } else {
        // reset form errors.
        // display success message.
        // clear inputs.
    }

});


/** 
 *  Sub-Header List Rotator
 *   
*/

const list = document.querySelectorAll('.subheader-list li');
const listCount = list.length;

function rotateHeader(prev, current) {
 
    list[prev].classList.toggle('show');
    setTimeout(() => { list[current].classList.toggle('show')}, 1000);

    next = current + 1 >= listCount ? 0 : current + 1;

    //Using setTimeout to call itself and repeat. To not block code execution.
    setTimeout(() => {
        rotateHeader(current, next);
    }, 5000);
}

// Delay the first call as one item already has the class for non-js view
setTimeout(() => {
    rotateHeader(0,1);
}, 5000);



