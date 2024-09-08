/**
 * Initializes the sandbox environment
 */

import '@/assets/styles/index.scss';

import toggleLight from '@/assets/images/toggle-light.svg';
import toggleDark from '@/assets/images/toggle-dark.svg';

let controls = document.querySelector('.page-controls') as HTMLElement;
controls.style.userSelect = 'none';

const toggleButton = document.createElement('button');
toggleButton.classList.add('icon-button');

controls.append(toggleButton,);

const toggleIcon = document.createElement('img');
toggleIcon.draggable = false;
toggleButton.append(toggleIcon);

const updateTheme = (isDark : boolean) => {
    document.documentElement.classList.toggle('light-theme', !isDark);
    toggleIcon.src = isDark ? toggleLight : toggleDark;
};

toggleIcon.onclick = () => updateTheme(toggleIcon.src === toggleDark);

// Initialize theme if the user has specified light / dark, otherwise default to dark theme
if (window.matchMedia) {
    const darkSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkSchemeMediaQuery.addEventListener('change', (e) => updateTheme(e.matches));
    updateTheme(darkSchemeMediaQuery.matches);
}


import { ExportTarget, Player, Scene, SceneMode, bundle, download, saveAs } from '@kurtbruns/vector';
import JSZip from "jszip";

(window as any).downloadSVG = (id:string) => {
    
    let element : any = document.getElementById(id) ;
    
    download(element as SVGSVGElement, `${id}.svg`, ExportTarget.FIGMA);
}

// Add export functionality to download button
Player.setDefaultDownloadCallback((scene:Scene) => {

    scene.setMode(SceneMode.Export);
    const zip = new JSZip();
    let count = 0;

    const frameCallback = () => {
        zip.file(`frame${count++}.svg`, bundle(scene.frame.root, ExportTarget.BROWSER));
    };

    scene
        .export(frameCallback)
        .then(() => {
            zip.generateAsync({ type: 'blob' }).then(function (content) {
                saveAs(content, `${scene.frame.getAttribute('id')}`, {});
            });
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
});