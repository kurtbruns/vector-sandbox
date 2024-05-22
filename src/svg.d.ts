/**
 * Allows svg images to be imported into webpack
 */
declare module '*.svg' {
    const content: any;
    export default content;
}
