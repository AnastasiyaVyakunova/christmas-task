import './style.css';
import PageLoader from './ts/PageLoader';

const mainDiv: HTMLElement = document.querySelector('.main-container');
export const loader: PageLoader = new PageLoader(mainDiv); 

loader.startUp();


console.log('Score: 190 / 200\n  - Нет сохранения настроек в local storage');
