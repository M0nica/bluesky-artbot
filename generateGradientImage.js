// Import the p5 library
import * as p5  from 'node-p5';;

import colors from 'nice-color-palettes' assert { type: "json" };

import { GetColorName } from 'hex-color-to-color-name';


export const getColors = () => {
    const colorIndex = Math.floor(Math.random() * colors.length);
    console.log('gradient', colors[colorIndex])
   const randomColors = colors[colorIndex];

   return [randomColors[0],randomColors[randomColors.length - 1]]
};


const [startColor, endColor] = getColors();
console.log('we have', startColor, endColor);


const startColorName = GetColorName(startColor)
const endColorName = GetColorName(endColor)

export function createGradientImage(){
// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2;

// Create a new p5 instance
const sketch = ((p) => {
    // Setup function
    p.setup = () => {
       let canvas = p.createCanvas(500, 500);

        // Define colors
        b1 = p.color(startColor);
        b2 = p.color(endColor);

        p.noLoop();
       
        setTimeout(() => {
            p.saveCanvas(canvas, 'myCanvas', 'jpg').then(filename => {
                console.log(`saved the canvas as ${filename}`);
            });
        }, 100);

    };

    // Draw function
    p.draw = () => {
        // Background
        setGradient(0, 0, p.width, p.height, b1, b2, Y_AXIS);
    };

    // Set gradient function
    function setGradient(x, y, w, h, c1, c2, axis) {
        p.noFill();

        if (axis === Y_AXIS) {
            // Top to bottom gradient
            for (let i = y; i <= y + h; i++) {
                let inter = p.map(i, y, y + h, 0, 1);
                let c = p.lerpColor(c1, c2, inter);
                p.stroke(c);
                p.line(x, i, x + w, i);
            }
        } else if (axis === X_AXIS) {
            // Left to right gradient
            for (let i = x; i <= x + w; i++) {
                let inter = p.map(i, x, x + w, 0, 1);
                let c = p.lerpColor(c1, c2, inter);
                p.stroke(c);
                p.line(i, y, i, y + h);
            }
        }
    }
});

let p5Instance = p5.createSketch(sketch);}

export function getGradientImage(){
    createGradientImage()


   return {path: './myCanvas.jpg', startColor: {value: startColor,
    string: startColorName}, endColor: {value: endColor, string: endColorName}
   }

}

getGradientImage();