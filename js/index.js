import "../style/style.scss";
let myEl = document.getElementById('onPlay'),
    images = document.getElementsByTagName('img'),
    imageURLs = [],
    breakAction = false,
    firstChoice = true,
    chooseItem = null,
    result = null;


// Ajax function - load json file
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}
// Generate images
let generateImage = function (src, id, styles, alt) {
    let img = document.createElement('img');
    img.style.width = styles;
    img.style.height = styles;
    img.src = require('../img/' + src);
    img.alt = alt;
    img.title = id;
    document.getElementById(id).appendChild(img);
};

//load data from ajax
fetchJSONFile('datasource.json', function (data) {
    for (let v of data.menu.items) {
        if (v.path.search('SYM') !== -1) {
            imageURLs.push("../img/" + v.path);
        }
    }
    imageURLs;
});
generateImage('SYM1.png', 'SYM1', '30%', 'Game');
generateImage('SYM3.png', 'SYM3', '30%', 'Game');
generateImage('SYM4.png', 'SYM4', '30%', 'Game');
generateImage('SYM5.png', 'SYM5', '30%', 'Game');
generateImage('SYM6.png', 'SYM6', '30%', 'Game');
generateImage('SYM7.png', 'SYM7', '30%', 'Game');
generateImage('Bet_Line.png', 'Bet_Line', '100%', 'Game');

//Press image
for (let i = 0, size = images.length; i < size; i++) {
    images[i].addEventListener('click', function (ev) {
        chooseItem = ev.target.title;
    })
};
//Random items
myEl.addEventListener('click', function () {
    if (!chooseItem) {
        alert(" Let's choose item!!");
    } else {
        loadAllImages(firstChoice);
        setTimeout(function () {
            breakAction = true;
            if (result.search(chooseItem) !== -1) {
                alert('You won!!');
                return;
            }
            alert('Try again!!');
        }, 2000);
    }
    firstChoice = false;
    breakAction = false;
}, false);


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function loadAllImages(callback) {
    if (firstChoice) {
        for (var i = 0; i < imageURLs.length; i++) {
            var img = new Image();
            imgs.push(img);
            imagesOK++;
            img.onload = function () {
                imagesOK++;
                if (imagesOK == imageURLs.length) {
                    animate();
                }
            };
            img.src = imageURLs[i];
        }
    } else {
        animate();
    }
}
let imagesOK = -1,
    imgs = [],
    imageIndex = 0,
    animPctComplete = 0,
    fps = 60,
    rwdcanvas = null;

function animate() {
    setTimeout(function () {
        if (!breakAction) {
            requestAnimFrame(animate);
        }
        breakAction = false;
        // get the current image
        // get the xy where the image will be drawn
        let img = imgs[imageIndex];
        let imgX = (canvas.width / 2 - img.width / 2) * animPctComplete;
        let imgY = (canvas.height / 2) - img.height / 2;

        // set the current opacity
        ctx.globalAlpha = animPctComplete;

        // draw the image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, imgX, imgY);
        result = img.src;
        rwdcanvas= img;

        // increment the animationPctComplete for next frame
        animPctComplete += .1; //100/fps;

        // if the current animation is complete
        // reset the animation with the next image

        if (animPctComplete >= 1.00) {
            animPctComplete = 0.00;
            imageIndex++;
            if (imageIndex >= imgs.length) {
                imageIndex = 0;
            }
        }

    }, 1000 / fps);
}
