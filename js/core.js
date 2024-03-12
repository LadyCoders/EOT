const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
  accordion.addEventListener('click', () => {
    const isActive = accordion.querySelector('.accordion-body').classList.contains('active');

    // Закрываем все аккордионы, если текущий аккордион не активен
    if (!isActive) {
      accordions.forEach((otherAccordion) => {
        if (otherAccordion !== accordion) {
          otherAccordion.querySelector('.accordion-body').classList.remove('active');
        }
      });
    }

    // Открываем или закрываем текущий аккордион
    const body = accordion.querySelector('.accordion-body');
    body.classList.toggle('active');
  });
});





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

initMDB({ Ripple });