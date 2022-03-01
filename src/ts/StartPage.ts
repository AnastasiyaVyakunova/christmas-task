import { loader } from "..";
import { Page } from "./constants";
import { addElement } from "./common";

class StartPage {
  private base: HTMLElement;

	constructor(div: HTMLElement) {
    this.base = div;
  }

  static toys() {
    loader.goto(Page.toys);
  }

  static tree() {
    loader.goto(Page.tree);
  }

  public render() {
    this.base.classList.add('bg');
    const stPg = addElement(this.base, 'div', 'start-page');
    addElement(stPg, 'div', 'balls', 'ball1');
    addElement(stPg, 'div', 'balls', 'ball2');
    const stTitle = addElement(stPg, 'h1', 'start-page-title');
    stTitle.textContent = 'Помогите бабушке нарядить ёлку';
    const stBtn = addElement(stPg, 'button', 'button-start');
    stBtn.textContent = 'Начать';

    stBtn.onclick = () => {
      StartPage.toys();
    }

    const toysPage: HTMLElement = document.querySelector('.switch-toys');
    const treePage: HTMLElement = document.querySelector('.switch-tree');

    toysPage.onclick = () => {
      StartPage.toys();
    }

    treePage.onclick = () => {
      StartPage.tree();
    }

  }
}

export default StartPage;
