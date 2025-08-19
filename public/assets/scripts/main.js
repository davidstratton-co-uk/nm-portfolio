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
 *  Sub-Header List Rotatior
 *   
*/

const list = document.querySelectorAll('.subheader-list li');
const listCount = list.length;

function rotateHeader(prev, current) {
 
    list[prev].classList.toggle('show');
    setTimeout(() => { list[current].classList.toggle('show')}, 1000);

    next = current + 1 >= listCount ? 0 : current + 1;

    console.log(`listCount: ${listCount}, current: ${current}, next: ${next}`);
    
    //Using setTimeout to call itself and repeat. To not block code execution.
    setTimeout(() => {
        rotateHeader(current, next);
    }, 5000);
}

// Delay the first call as one item already has the class for non-js view
setTimeout(() => {
    rotateHeader(0,1);
}, 5000);



