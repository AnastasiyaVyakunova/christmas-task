import { loader } from "..";
import { Page, NUMBER_OF_TREE, NUMBER_OF_BG, MAP_CORDS } from "./constants";
import { DataMain } from "./types";
import { addElement } from "./common";
import { chooseTree, chooseBg, createSnowFlake, garland, chooseFavToys } from "./filters";

class TreePage {
	private base: HTMLElement;
  private colorLight: string;
  private toys: DataMain;

	constructor(div: HTMLElement) {
		this.base = div;
    this.colorLight = 'multicolor';
	}

  static toys() {
    loader.goto(Page.toys);
  }

  static startPage() {
    loader.goto(Page.start);
  }

  public render() {
    this.base.classList.remove('bg');

    const pCont = addElement(this.base, 'div', 'page-container');
    const treeFiltMenu = addElement(pCont, 'div', 'tree-filters-menu');
    const soundBtnWrp = addElement(treeFiltMenu, 'div', 'sound-btn-wrapper');
    const soundBtn = addElement(soundBtnWrp, 'button', 'sound-button');
    const snowBtn = addElement(soundBtnWrp, 'button', 'snowflake-button');
    const treeCont = addElement(treeFiltMenu, 'div', 'tree-container');
    const treeTitle = addElement(treeCont, 'p', 'filter-title');
    treeTitle.textContent = 'Выберите ёлку';
    for (let i = 0; i < NUMBER_OF_TREE; i++) {
      const tree = addElement(treeCont, 'div', 'tree', 'menu-item');
      tree.style.backgroundImage = `url(assets/tree/${i + 1}.png)`
      tree.onclick = () => {
        chooseTree(i);
      }
    }

    let isPlay = false;
    soundBtn.onclick = () => {
      const sound = document.querySelector('audio');
      soundBtn.classList.toggle('choose');
      if (isPlay === false) {
        sound.play();
        isPlay = true;
      } else {
        sound.pause();
        isPlay = false;
      }
    }

    const bgCont = addElement(treeFiltMenu, 'div', 'bg-container');
    const bgTitle = addElement(treeCont, 'p', 'filter-title');
    bgTitle.textContent = 'Выберите фон';
    for (let i = 0; i < NUMBER_OF_BG; i++) {
      const bg = addElement(bgCont, 'div', 'bgr', 'menu-item');
      bg.style.backgroundImage = `url(assets/bg/${i + 1}.jpg)`
      bg.onclick = () => {
        chooseBg(i);
      }
    }

    const garlandCont = addElement(treeFiltMenu, 'div', 'garland-container');
    const garlTitle = addElement(garlandCont, 'p', 'filter-title');
    garlTitle.textContent = 'Гирлянда';
    const colorBtnWrp = addElement(garlandCont, 'div', 'garland-btns');
    const multBtn = addElement(colorBtnWrp, 'button', 'color-btn', 'multi-btn');
    const redBtn = addElement(colorBtnWrp, 'button', 'color-btn', 'red-btn');
    const blueBtn = addElement(colorBtnWrp, 'button', 'color-btn', 'blue-btn');
    const yellowBtn = addElement(colorBtnWrp, 'button', 'color-btn', 'yellow-btn');
    const greenBtn = addElement(colorBtnWrp, 'button', 'color-btn', 'green-btn');

    const switchCont = addElement(garlandCont, 'div', 'onoffswitch');
    const inpSwitch = addElement(switchCont, 'input', 'onoffswitch-checkbox') as HTMLInputElement;
    inpSwitch.type = 'checkbox';
    inpSwitch.name = 'onoffswitch';
    inpSwitch.id = 'myonoffswitch';
    inpSwitch.checked = true;
    const labelSwitch = addElement(switchCont, 'label', 'onoffswitch-label');
    labelSwitch.setAttribute('for', 'myonoffswitch');
    addElement(labelSwitch, 'div', 'onoffswitch-inner');
    addElement(labelSwitch, 'div', 'onoffswitch-switch');
    
    const mainTreeCont = addElement(pCont, 'div', 'main-tree-container');
    mainTreeCont.style.backgroundImage = 'url(assets/bg/1.jpg)';
    const snowCont = addElement(mainTreeCont, 'div', 'snow-container', 'hide');
    const lightTreeCont = addElement(mainTreeCont, 'div', 'garland-tree-container');
    const lightDiv = addElement(lightTreeCont, 'div', 'lightrope-container');
    const map = addElement(lightTreeCont, 'map');
    map.setAttribute('name', 'image-map');
    const area = addElement(map, 'area');
    area.setAttribute('coords', MAP_CORDS);
    area.setAttribute('shape', 'poly');
    const mainTree = addElement(lightTreeCont, 'img', 'main-tree') as HTMLImageElement;
    mainTree.src = 'assets/tree/1.png';
    mainTree.useMap = '#image-map';
    mainTree.alt = 'tree';
    switchCont.onclick = () => {
      if (inpSwitch.checked === true) {
        garland(this.colorLight);
        inpSwitch.checked = false;
      } else {
        inpSwitch.checked = true;
        lightDiv.textContent = '';
      }
    };
    multBtn.onclick = () => {
      this.colorLight = 'multicolor';
      garland(this.colorLight);
      inpSwitch.checked = false;
    }

    redBtn.onclick = () => {
      this.colorLight = 'red';
      garland(this.colorLight);
      inpSwitch.checked = false;
    }

    blueBtn.onclick = () => {
      this.colorLight = 'blue';
      garland(this.colorLight);
      inpSwitch.checked = false;
    }

    yellowBtn.onclick = () => {
      this.colorLight = 'yellow';
      garland(this.colorLight);
      inpSwitch.checked = false;
    }

    greenBtn.onclick = () => {
      this.colorLight = 'green';
      garland(this.colorLight);
      inpSwitch.checked = false;
    }
    const toysForDecor = addElement(pCont, 'div', 'toys-for-decoration');
    const favToysCont = addElement(toysForDecor, 'div', 'fav-toys-container');
    const toysTitle = addElement(favToysCont, 'p', 'filter-title');
    toysTitle.textContent = 'Игрушки';

    for (let i = 0; i < 20; i++) {
      const favCard = addElement(favToysCont, 'div', 'favorites-card');
      favCard.id = `${i + 1}`;
    }

    const decorTree = addElement(toysForDecor, 'div', 'decorate-tree');
    const decorTitle = addElement(decorTree, 'p', 'filter-title');
    decorTitle.textContent = 'Вы нарядили';
    const decorCont = addElement(decorTree, 'div', 'decorate-tree-container');
    for (let i = 0; i < NUMBER_OF_TREE; i++) {
      const tree = addElement(decorCont, 'div', 'tree-decorate');
      const treeImg = addElement(tree, 'img', 'tree-decorate-img') as HTMLImageElement;
      treeImg.src = `assets/tree/${i + 1}.png`
    }

    (async() => {
      const response = await fetch('./data.json');
      const data = await response.json();
      this.toys = data;
      chooseFavToys(this.toys);
    })();

    const startPage: HTMLElement = document.querySelector('.logo');
    const toysPage: HTMLElement = document.querySelector('.switch-toys');

    snowBtn.onclick = () => {
      snowBtn.classList.toggle('choose');
      snowCont.classList.toggle('hide');
      setInterval(createSnowFlake, 50);
    }

    startPage.onclick = () => {
      TreePage.startPage();
    }

    toysPage.onclick = () => {
      TreePage.toys();
    }
  }
}

export default TreePage;
