import { PlotGridBased, Frame, Rectangle, TAU, Point, saveAs, ResponsiveFrame, Scene, Value, SceneMode } from '@kurtbruns/vector'
import html2canvas from 'html2canvas';
import JSZip from 'jszip';

class ExampleScene extends Scene {
    export(arg0: (same: any) => void) {
        throw new Error('Method not implemented.');
    }

    private angle:Value;

    constructor() {
        super()

        let internalX = -3.2;
        let internalY = -1.8;
        let internalWidth = 6.4;
        let internalHeight = 3.6;

        let width = this.frame.width;
        let height = this.frame.height;
        let s = width / 6.4;

        let before = new PlotGridBased(this.frame.background.root, {
            x: 0,
            y: 0,
            width: width,
            height: height,
            internalX: internalX,
            internalY: internalY,
            internalWidth: internalWidth,
            internalHeight: internalHeight,
            responsive: false,
            grid: false,
        });
        
        before.drawGridLines2(['half', 'big'], ['half', 'big'],
            // before.drawGridLines2(['small'], [ 'small'],
            {
                'big': 'primary',
                'half': 'tertiary',
            });
        
        before.drawAxis();
        
        let o = new Point(width / 2, height / 2);
        this.angle = new Value(0);

        let ix = width / 2 + (1) * s;
        let iy = height / 2 - (0) * s
        let i = this.frame.control(ix, iy);
        i.addDependency(this.angle)
        i.update = () => {
            i.x = width / 2 + (Math.cos(this.angle.value + 0 * TAU / 4)) * s;
            i.y = height / 2 + (-Math.sin(this.angle.value + 0 * TAU / 4)) * s;
        }

        let jx = width / 2 + (0) * s;
        let jy = height / 2 - (1) * s;
        let j = this.frame.control(jx, jy);
        j.addDependency(this.angle)
        j.update = () => {
            j.x = width / 2 + (Math.cos(this.angle.value + 1 * TAU / 4)) * s;
            j.y = height / 2 + (-Math.sin(this.angle.value + 1 * TAU / 4)) * s;
        }
        
        
        let plot = new PlotGridBased(this.frame.background.root as any, {
            x: -1.5 * width,
            y: -1.5 * height,
            width: 4 * width,
            height: 4 * height,
            internalX: 4 * internalX,
            internalY: 4 * internalY,
            internalWidth: 4 * internalWidth,
            internalHeight: 4 * internalHeight,
            responsive: false,
            grid: false,
        });
        
        plot.gridGroup.addDependency(i, j)
        plot.gridGroup.update = () => {
        
            let a = (i.x - width / 2) / s;
            let b = (i.y - height / 2) / s;
        
            let c = (j.x - width / 2) / s;
            let d = (j.y - height / 2) / s;
        
            plot.gridGroup.setAttribute('transform', `matrix(${a}, ${b}, ${c}, ${d}, 0, 0)`)
        }
        plot.gridGroup.update()
        
        
        // plot.drawGridLines3();
        
        // plot.drawGridLines2(['half', 'big'], ['half','big'],
        plot.drawGridLines2(['small-half', 'small'], ['small-half', 'small'],
            // plot.drawGridLines2(['small'], [ 'small'],
            {
                'small': 'blue1',
                'small-half': 'blue2',
            });
        
        plot.drawAxis().classList.add('blue')

        
        let circle = this.frame.circle(o.x, o.y, 1 * s);
        circle.style.stroke = 'var(--font-color)';
        circle.style.strokeWidth = '1.5px';

        let defs = this.frame.defs()
        let ivec = this.frame.line(o.x, o.y, i.x, i.y);
        ivec.attatchArrow(defs, false, 'var(--primary)');
        ivec.update = () => {
            ivec.x2 = i.x;
            ivec.y2 = i.y;
        }
        ivec.addDependency(i)
        ivec.style.strokeWidth = '1.5px';
        ivec.style.stroke = 'var(--primary)';
        
        let jvec = this.frame.line(o.x, o.y, j.x, j.y);
        jvec.attatchArrow(defs, false, 'var(--primary)');
        jvec.update = () => {
            jvec.x2 = j.x;
            jvec.y2 = j.y;
        }
        jvec.addDependency(j)
        jvec.style.strokeWidth = '1.5px';
        jvec.style.stroke = 'var(--primary)';
        
        // before.getVerticalGridValues('small').forEach((value, key) => {
        //     if (value.x !== 0 || value.y !== 0) {
        //         placeTex(value.x, value.y, key.toString())
        //     }
        // });
        
        // before.getHorizontalGridValues('small').forEach((value, key) => {
        //     if (value.x !== 0 || value.y !== 0) {
        //         placeTex(value.x, value.y, key.toString())
        //     }
        // });
        this.play(
            [(alpha: number) => {
                const startAngle = 0;  // Change this to the initial angle value if different
                const endAngle = TAU/4;  // Target value
                const diff = endAngle - startAngle;
                const angle = startAngle + diff * alpha
                this.setAngle(angle);
            }],
            4,
            'easeInOut'
        );

        this.wait(2);

        this.play(
            [(alpha: number) => {
                const startAngle = TAU/4;  // Change this to the initial angle value if different
                const endAngle = TAU/2;  // Target value
                const diff = endAngle - startAngle;
                const angle = startAngle + diff * alpha
                this.setAngle(startAngle + diff * alpha);
            }],
            4
        );


    }

    setAngle(a:number) {
        // TODO: move this code into 
        this.angle.value = a;
        this.angle.updateDependents();
    }
}

let example = new ExampleScene();
example.setMode(SceneMode.Live);
example.start();

(window as any).example = example;

// example.start()

const zip = new JSZip();
let count = 0;
let previous = undefined;
// example.export((same) => {

//     if (!same || previous === undefined) {

//         html2canvas(document.querySelector('#root'), {
//             scale: 4,
//             logging: false
//         })
//         .then(function (canvas) {
//           canvas.toBlob(function (blob) {
//             zip.file(`frame${count++}.png`, blob);
//             previous = blob;
//           });
//         })
//         .catch(function (error) {
//           console.error(error);
//         });

//     } else {
//         zip.file(`frame${count++}.png`, previous);
//     }

// });

// (window as any).download = () => {
//     // Ensure that zip is defined and you have created a zip object
//     if (typeof zip !== "undefined" && zip instanceof JSZip) {
//         zip.generateAsync({type: "blob"}).then(function(content) {
//             saveAs(content, "frames.zip", {});
//         });
//     } else {
//         console.error("zip is not defined or is not an instance of JSZip");
//     }
// }







// let frameRate= 30; // Desired frame rate, e.g., 30fps


// const fps = 30;
// const interval = 1000 / fps;

// const bpm = 120;
// const beatsPerRotation = 32;

// const rotationTimeMs = (beatsPerRotation * 60000) / bpm; // Time for one full rotation in milliseconds
// const speed = TAU / (rotationTimeMs / interval); // Speed of rotation per frame

// let videoDuration = 2;
// let totalFrames = frameRate * videoDuration;
// let currentFrame = 0;

// let start, previousTimeStamp;
// let done = false;

// function step(timeStamp) {
//     if (start === undefined) {
//         start = timeStamp;
//     }

//     const elapsed = timeStamp - start;

//     if (previousTimeStamp === undefined || timeStamp - previousTimeStamp >= interval) {

//         const speed = 0.0001;
//         const stop = TAU;

//         const count = Math.min(speed * elapsed, stop);
//         const a = speed * elapsed;



//         i.updateDependents();
//         j.updateDependents();

//         if (count >= stop) {
//             done = true;
//         }
        
//         previousTimeStamp = timeStamp;
//     }

//     if (currentFrame < totalFrames && !done) {

//         window.requestAnimationFrame(step);
//     }
// }

// window.requestAnimationFrame(step);

