import '@/styles/index.scss';

import '@/styles/theme.css';

import toggleLight from '@/images/toggle-light.svg';
import toggleDark from '@/images/toggle-dark.svg';
import downloadLight from '@/images/download.dark.svg';
import downloadDark from '@/images/download.light.svg';
import { ExportTarget, Scene, SceneMode, download, saveAs } from '@kurtbruns/vector';
import html2canvas from 'html2canvas';

let controls = document.querySelector('.page-controls');
controls.classList.add('no-select');

const toggleButton = document.createElement('button');
toggleButton.classList.add('icon-button');

const downloadButton = document.createElement('button');
downloadButton.classList.add('icon-button');
controls.append(toggleButton, downloadButton);

const downloadIcon = document.createElement('img');
downloadIcon.draggable = false;
downloadButton.append(downloadIcon);

const toggleIcon = document.createElement('img');
toggleIcon.draggable = false;
toggleButton.append(toggleIcon);

function updateTheme(isDark: boolean) {
    document.documentElement.classList.toggle('light-theme', !isDark);
    toggleIcon.src = isDark ? toggleLight : toggleDark;
    downloadIcon.src = isDark ? downloadLight : downloadDark;
    sessionStorage.setItem('theme', isDark ? 'dark' : 'light');

};

// Initialize the theme mode
function initializeTheme(): boolean {

    // Check if there is a mode already set
    const theme = sessionStorage.getItem('theme');
    let isDark = true;
    if (theme !== null && theme === 'light') {
        isDark = false;
    }

    // Use the user's operating system theme as default
    if (window.matchMedia) {
        const darkSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkSchemeMediaQuery.addEventListener('change', (e) => updateTheme(e.matches));
        if (theme === null) {
            isDark = darkSchemeMediaQuery.matches;
        }
    }

    document.documentElement.classList.toggle('light-theme', !isDark);

    return isDark;
}

// On a fresh page load initialize the theme
let mode = initializeTheme();

// Register the event handler for the theme mode button
window.addEventListener('load', (event) => {
    toggleIcon.onclick = () => {
        updateTheme(!(sessionStorage.getItem('theme') === 'dark'))
    };
})

// Update the theme accordingly
window.addEventListener('pageshow', function (event) {

    let isDark: boolean;

    // Page was loaded from bfcache. This causes a screen flash and could be avoided by instead 
    // preventing the page from being cached with something like `window.onunload = function() {};`
    // However, assuming that people are not willy nilly changing the theme, it seems like taking
    // advantage of the lightning fast page load from bfcache is a better user experience.
    if (event.persisted) {
        isDark = initializeTheme();
    } else {
        isDark = mode;
    }

    updateTheme(isDark)

    document.documentElement.classList.remove('temporary');

});

downloadButton.onclick = () => {
    let frame = document.querySelector('#root');

    for (let i = 0; i < frame.children.length; i++) {
        // Check if the current child has an ID
        let child = frame.children[i];
        let id = child.id || `interactive-${new Date().toISOString()}`;

        // Use the id or the default naming scheme as the file name
        let filename = `${id}.svg`;

        // Assuming download is a function that handles the SVG download process
        download(child as SVGSVGElement, filename, ExportTarget.FIGMA);
    }
};

(window as any).downloadAsPNG = () => {
    // Save image with html2canvas
    html2canvas(document.querySelector('#root'), { scale: 4 })
        // html2canvas(document.querySelector('#root'))
        .then(function (canvas) {
            canvas.toBlob(function (blob) {
                saveAs(blob, `interactive.png`, {});
            });
        })
        .catch(function (error) {
            console.error(error);
        });
}