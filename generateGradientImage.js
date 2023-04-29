// Import the p5 library
import * as p5  from 'node-p5';
import * as fs from 'fs';


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
        b1 = p.color('#FAC3E6');
        b2 = p.color('#C375E3');

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
// Export the sketch
//module.exports = sketch;

export function getGradientImage(){
    createGradientImage()

    const filePath = 'myCanvas.jpg';

 return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);

      // Convert image data to base64-encoded string
      const base64Image = Buffer.from(data).toString('base64');

      // Create data URL
      const dataUrl = `data:image/jpeg;base64,${base64Image}`;

      console.log(dataUrl)
      resolve(dataUrl);     
    });
  });
}

getGradientImage();