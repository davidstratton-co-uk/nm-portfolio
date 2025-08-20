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
const formEmail = document.querySelector('.contact-form input[id="email"]');

const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

const addError = (input, errormsg) => {
    if (!input.nextElementSibling) {
        input.classList.add('error');
        let errorbox = document.createElement("span");
        errorbox.classList.add("error-msg");
        errorbox.textContent = errormsg;
        input.insertAdjacentElement("afterend", errorbox);
    } else {
        input.nextElementSibling.textContent = errormsg;
    }
}

const removeError = (input) => {
    if (input.nextElementSibling) {
        input.classList.remove('error');
        input.nextElementSibling.remove();
    }
}

const buildFormMsg = () => {
    let div = createElement("div");
    div.classList.add(`form-msg--${type}`);
    let strong = createElement("strong");
    strong.value = `${type}`
    
    let span = createElement("span");
}

const formMsg = (type, msg) => {


}

const isEmailValid = () => {
    if (!formEmail.value.includes("@")) {
        addError(formEmail, "E-mail requires an @");
        return false;
    }
    
    if (!emailRegExp.test(formEmail.value)) {
        console.log("regex checked");
        addError(formEmail, "Invalid E-mail");
        return false;
    }
    
    removeError(formEmail);
    return true;
}

const isInputValid = (input) => {
    if (!input.value) {
        addError(input, `This field can not be empty.`);
        return false;
    } else {
        removeError(input);
        return true;
    }
}


const inputHandler = (e) => {
    if (e.target.type === "text" || e.target.type === "textarea")  {
        if (e.target.id == "email") {
            isEmailValid();
        } else {
            isInputValid(e.target);
        }
    }
}

const formHandler = (e) => {
    e.preventDefault();
    let formReady = true;

    for (let i = 0; i < formInputs.length; i++) {
        if (!isInputValid(formInputs[i])) {
            formReady = false;
        }
    }

    if (!isEmailValid()) {
        formReady = false;
    }

    if (!formReady) {
        // TODO: Display Failure
    } else {
        for (let i = 0; i < formInputs.length; i++) {
            removeError(formInputs[i]);
            formInputs[i].textContent = "";
        }
        // TODO: Display Success
    }
}

form.addEventListener("focusout", inputHandler);
form.addEventListener("submit", formHandler);


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



