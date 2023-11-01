import { Scene, SceneMode, bundle, saveAs } from '@kurtbruns/vector';
import JSZip from 'jszip';

/**
 * Exports the scene as a zip of SVG frames.
 */
export function exportScene(scene: Scene, filename:string = 'frames') {

    scene.setMode(SceneMode.Export);
    const zip = new JSZip();
    let count = 0;

    const frameCallback = () => {
        zip.file(`frame${count++}.svg`, bundle(scene.frame.root));
    };

    scene
        .export(frameCallback)
        .then(() => {
            zip.generateAsync({ type: 'blob' }).then(function (content) {
                saveAs(content, `${filename}`, {});
            });
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
}

// export function exportScenePNG(scene: Scene) {
    
//     console.log(SceneMode.Export);
//     scene.setMode(SceneMode.Export);

//     const zip = new JSZip();
//     let count = 0;
//     let previous = undefined;

//     const frameCallback = (hasChanged: boolean) => {
//         // TODO: check hasChanged logic
//         if (hasChanged || previous === undefined) {
//             html2canvas(document.querySelector('#root'), {
//                 scale: 4,
//                 logging: false,
//             })
//                 .then(function (canvas) {
//                     canvas.toBlob(function (blob) {
//                         zip.file(`frame${count++}.png`, blob);
//                         previous = blob;
//                     });
//                 })
//                 .catch(function (error) {
//                     console.error(error);
//                 });
//         } else {
//             zip.file(`frame${count++}.png`, previous);
//         }
//     };

//     scene
//         .export(frameCallback)
//         .then(() => {
//             zip.generateAsync({ type: 'blob' }).then(function (content) {
//                 saveAs(content, 'frames.zip', {});
//             });
//         })
//         .catch((error) => {
//             console.error('An error occurred:', error);
//         });
// }
