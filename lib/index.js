'use strict';

var _Robot = require('../lib/Robot');

var _Robot2 = _interopRequireDefault(_Robot);

require('bootstrap');

require('bootstrap/js/dist/util');

require('bootstrap/js/dist/dropdown');

require('./styles/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var robotElement = null;

document.addEventListener("DOMContentLoaded", function () {
    // Get robot
    robotElement = document.querySelector('.robot');

    // Robby go!
    var robot = new _Robot2.default('Robby', renderFunction);

    function myFunction(item, index) {
        if (item == 'MOVE') {
            robot.move();
        }
        if (item == 'LEFT') {
            robot.left();
        }
        if (item == 'RIGHT') {
            robot.right();
        }
        if (item == 'REPORT') {
            robot.report();
        }
        if (item.includes("PLACE")) {
            var x = document.querySelector('.placeX').value,
                y = document.querySelector('.placeY').value,
                facing = document.querySelector('.placeDirection').value;

            // Ensure these are ints!
            robot.place(parseInt(x), parseInt(y), facing);
        }
    }
    function textToArray() {
        var textArea = document.getElementById("multipleCommands");
        var arrayFromTextArea = textArea.value.split(String.fromCharCode(10));
        console.log(arrayFromTextArea);
        arrayFromTextArea.forEach(myFunction);
    }

    // Bind event handlers
    document.querySelector('.place').addEventListener('click', function (e) {
        var x = document.querySelector('.placeX').value,
            y = document.querySelector('.placeY').value,
            facing = document.querySelector('.placeDirection').value;

        // Ensure these are ints!
        robot.place(parseInt(x), parseInt(y), facing);
    });

    document.querySelector('.move').addEventListener('click', function (e) {
        robot.move();
    });

    document.querySelector('.submitMultiple').addEventListener('click', function (e) {
        textToArray();
    });

    document.querySelector('.rotateLeft').addEventListener('click', function (e) {
        robot.left();
    });

    document.querySelector('.rotateRight').addEventListener('click', function (e) {
        robot.right();
    });

    document.querySelector('.report').addEventListener('click', function (e) {
        robot.report();
    });

    document.querySelector('.remove').addEventListener('click', function (e) {
        document.querySelector('.placeX').value = 0;
        document.querySelector('.placeY').value = 0;
        robot.remove();
    });
});

function renderFunction(robot) {
    if (robot.placed) {
        robotElement.classList.add('placed');
    } else {
        robotElement.classList.remove('placed');
    }

    robotElement.setAttribute('data-direction', robot.facing.toLowerCase());
    robotElement.setAttribute('style', 'bottom: ' + robot.y * 20 + '%; left: ' + robot.x * 20 + '%');
}

// Little console output override
window.console = {
    log: function log(str) {
        var logWindow = document.querySelector('.log');
        var element = document.createElement('p');
        if (/(invalid)/gi.test(str)) {
            element.setAttribute('style', 'color: rgb(250,100,100)');
        }
        element.appendChild(document.createTextNode(str));
        if (logWindow.childNodes.length === 0) {
            logWindow.appendChild(element);
        } else {
            logWindow.insertBefore(element, logWindow.childNodes[0]);
        }
    },
    info: window.console.info,
    warn: window.console.warn,
    error: window.console.error
};