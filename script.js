let submitBtn = document.querySelector('#btn');
let ayatNumber = document.querySelector('.ayat-number');
let suratName = document.querySelector('.surat-name');
let sabaqNumber = document.querySelector('.sabaq-number');
let crossBtn = document.querySelector('.cross-symbol');
let popUp = document.querySelector('.popup');
let overlay = document.querySelector('.overlay');
let ayah = document.querySelector('.ayah')


function closePopandOverlay(params) {
    overlay.style.display = 'none'
    popUp.style.display = 'none'
}

crossBtn.addEventListener('click', () => {
    closePopandOverlay();
})


document.addEventListener('DOMContentLoaded', () => {
    overlay.style.display = 'block';
    popUp.style.display = 'flex';
})


overlay.addEventListener('click', () => {
    closePopandOverlay()
})

function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

var currentActive = 1;
var chunks
var inputs = []
var count = 0
var sabaqMax = 1;
var newArray = []

function isElementInViewport(el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top > 0 &&
        rect.left >= 0 &&
        rect.bottom < ((window.innerHeight || document.documentElement.clientHeight) -
            (window.innerHeight || document.documentElement.clientHeight) * 0.18) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function update() {
    chunks.forEach((circle, idx) => {

        if (idx < currentActive) {
            circle.classList.add('active')
            if (!(isElementInViewport(circle)))
                circle.scrollIntoView(true)

        } else {
            circle.classList.remove('active')

        }
    })
}


function populate(array) {
    removeElementsByClass('content-div')
    let contentDiv = document.createElement('div');
    contentDiv.className = 'content-div';
    ayah.append(contentDiv);

    sabaqNumber.textContent = `سبق ${Number(sabaqMax) % 3 == 0? 3 : sabaqMax % 3 }`;
    sabaqMax++;

    newArray = array.toString().replace(/[\[\]']|:|,,+/g, '').split(' ');

    ayatNumber.textContent = `آيت : ${newArray.pop()}`;
    suratName.textContent = `سورة  ${newArray.pop()}`;
    let i = 0;
    for (i = 0; i < newArray.length; i++) {
        const element = newArray[i];
        let newElem = document.createElement('span');
        newElem.innerText = element;
        newElem.className = 'chunk';
        contentDiv.append(newElem);
    }
    chunks = document.querySelectorAll('.chunk');
    currentActive = 1;
    count++;
    if (count == 1) {
        document.body.addEventListener('keydown', (event) => {
            if (event.keyCode === 37) {
                currentActive++
                update()
                if (currentActive - 1 == newArray.length) {
                    populate(inputs[count % inputs.length])
                }
            }
            if (event.keyCode === 39) {
                currentActive--
                update()
            }
        })
    }
}

submitBtn.addEventListener('click', () => {
    closePopandOverlay();
    let i = 1
    while (document.querySelector(`#value-${i}`)) {
        inputs.push([document.querySelector(`#value-${i++}`).value])
    }
    populate(inputs[count]);
})