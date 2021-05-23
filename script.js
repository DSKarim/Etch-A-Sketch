let pencilColor = 'green';
let backgroundColor = 'gray';


let createGrid = function(size) {
    document.getElementById('gridContainer').style.gridTemplateColumns = "repeat(" + size + ", " + 60 / size+ "vmin)";
    document.getElementById('gridContainer').style.gridTemplateRows = "repeat(" + size + ", " + 60 / size+ "vmin)";
    for (let i = 0; i < size * size; i++) {
        let squareContainer = document.createElement("div");
        squareContainer.classList.add('squareContainer');
        document.getElementById('gridContainer').appendChild(squareContainer);
    }
}


let colorizeContainer = function(e, color) {
    e.style.backgroundColor = color;
}


let addEffect = function(color) {
    squareContainers = document.getElementsByClassName('squareContainer');
    for (let i = 0; i < squareContainers.length; i++) {
        squareContainers[i].addEventListener('mouseover', function(e) {
            if (document.getElementById('rainbow').checked) {
                pencilColor = getRandomColor();
                color = pencilColor;
            };
            colorizeContainer(e.target, color);
        });
    }
}


let monitorReset = function() {
    let originalColor = backgroundColor;
    document.getElementById('resetGridColors').addEventListener('click', function() {
        squareContainers = document.getElementsByClassName('squareContainer');
        for (let i = 0; i < squareContainers.length; i++) {
            colorizeContainer(squareContainers[i], originalColor);
        }
    })
}


let monitorRange = function(){
    let slider = document.getElementById("customRange");
    let output = document.getElementById("customRangeOutput");
    output.innerHTML = "Grid Size : " + slider.value;
    slider.oninput = function() {
        output.innerHTML = "Grid Size : " + this.value;
        createGrid(this.value);
        addEffect(pencilColor);
    }
}


function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


let monitorColor = function(){
    
    document.getElementById('oneColor').addEventListener('change', function() {
        if (document.getElementById('oneColor').checked) {
            pencilColor = document.getElementById('selectedColor').value;
            addEffect(pencilColor);
        }
    });
    document.getElementById('selectedColor').addEventListener('change', function() {
        if (document.getElementById('oneColor').checked) {
            pencilColor = document.getElementById('selectedColor').value;
            addEffect(pencilColor);
        }
    });
    document.getElementById('rainbow').addEventListener('change', function() {
        if (document.getElementById('rainbow').checked) {
            pencilColor = getRandomColor();
            addEffect(pencilColor);
        }
    });
}


let monitorBackgroundColor = function(){
    
    document.getElementById('bgColor').addEventListener('change', function() {
        backgroundColor = document.getElementById('bgColor').value;
        squareContainers = document.getElementsByClassName('squareContainer');
        for (let i = 0; i < squareContainers.length; i++) {
            colorizeContainer(squareContainers[i], backgroundColor);
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    createGrid(16);
    addEffect(pencilColor);
    monitorReset();
    monitorRange();
    monitorColor();
    monitorBackgroundColor();
}, false);

