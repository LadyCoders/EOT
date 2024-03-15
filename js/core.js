// const accordions = document.querySelectorAll('.accordion');

// accordions.forEach((accordion) => {
//   accordion.addEventListener('click', (el) => {
//     const isActive = accordion.querySelector('.accordion-body').classList.contains('active');

//     // Закрываем все аккордионы, если текущий аккордион не активен
//     if (!isActive) {
//       accordions.forEach((otherAccordion) => {
//         if (otherAccordion !== accordion) {
//           otherAccordion.querySelector('.accordion-body').classList.remove('active');
//         }
//       });
//     }

//     // Открываем или закрываем текущий аккордион
//     const body = accordion.querySelector('.accordion-body');
//     body.classList.toggle('active');

//   });
// });

var accordeonButtons = document.getElementsByClassName("accordeon__button");

//пишем событие при клике на кнопки - вызов функции toggle
for(var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
}

//пишем функцию
function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for(var i = 0; i < accordeonButtons.length; i++) {
        accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
        pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if(itemClass == "accordeon__button closed") {
        this.className = "accordeon__button active";
        var panel = this.nextElementSibling;
        panel.style.maxHeight = panel.scrollHeight + "px";
    }

}

// const accordionBtn = document.querySelectorAll('.accordion-header');
// accordionBtn.forEach((btn) => {
//   btn.addEventListener('click', function(el) {
//     let accodrionBody = this.nextElementSibling
//     const isActive = accodrionBody.classList.contains('active');
//     if(!isActive){
//       document.querySelector('.accordion-body.active').style.height = '0'
//       document.querySelector('.accordion-body.active').classList.remove('active');

//       accodrionBody.classList.add('active');
//       accodrionBody.style.height = '100%'
//       let accordionHeight = accodrionBody.clientHeight
//       accodrionBody.style.height = 0
//       accodrionBody.style.height = accordionHeight + 'px'
//     } else{
//       accodrionBody.classList.remove('active');
//       accodrionBody.style.height = '0'
//     }
//   })
// })


//veshalka
const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    // удалим у кнопки класс btn-up_hide
    this.el.classList.remove('btn-up_hide');
  },
  hide() {
    // добавим к кнопке класс btn-up_hide
    this.el.classList.add('btn-up_hide');
  },
  addEventListener() {
    // при прокрутке содержимого страницы
    window.addEventListener('scroll', () => {
      // определяем величину прокрутки
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
      scrollY > 400 ? this.show() : this.hide();
    });
    // при нажатии на кнопку .btn-up
    document.querySelector('.btn-up').onclick = () => {
      // переместим в начало страницы
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();


//lola
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
modal.style.display = "none";
}
}


//arrow
const path = document.getElementById("path");
const svg = document.getElementById("svgArrow");
const pathLength = path.getTotalLength();
const startingPoint = path.getPointAtLength(0);
const PATH_SEGMENTS = 600;

let pathPoints = [{ type: "M", x: startingPoint.x, y: startingPoint.y }];

for (
  let i = pathLength / PATH_SEGMENTS;
  i <= pathLength;
  i += pathLength / PATH_SEGMENTS
) {
  let p = path.getPointAtLength(i);
  pathPoints.push({ type: "L", x: p.x, y: p.y });
}

function createNewPathElement(pointsArray, percentageComplete) {
  const pointsToInclude = Math.ceil(pointsArray.length * percentageComplete);
  let pathString = "";

  for (let i = 0; i < pointsToInclude; i++) {
    pathString += `${pointsArray[i].type}${pointsArray[i].x} ${pointsArray[i].y}`;
  }

  const pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );

  pathElement.setAttribute("d", pathString);
  pathElement.setAttribute("id", "temporarySVGArrowPath");
  pathElement.setAttribute("stroke", "blue");
  pathElement.setAttribute("fill", "none");
  pathElement.setAttribute("stroke-width", 3);
  pathElement.setAttribute("stroke-linecap", "round");
  pathElement.setAttribute("stroke-linejoin", "round");

  return pathElement;
}

let start, previousTimeStamp;

function easeOut(x) {
  return ( x < 0.95) ? Math.sin((x * 1 / 0.95 * Math.PI) / 2) : 1.0;
}

const duration = 4000;

function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
    }
  let elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    const percentage = easeOut(Math.min(1 / duration * elapsed, 1.00));
    
    const animatedPathElement = createNewPathElement(
      pathPoints,
      percentage
    );
    
    const oldpath = document.getElementById("temporarySVGArrowPath");
    if (oldpath !== null)
      oldpath.parentNode.removeChild(oldpath);

    svg.appendChild(animatedPathElement);
  }

  if (elapsed < duration) {
      window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);

// import { Ripple, initMDB } from "mdb-ui-kit";

// initMDB({ Ripple });



