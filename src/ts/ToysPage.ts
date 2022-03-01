import { loader } from "..";
import { Page, NUMBER_OF_OPTIONS, NUMBER_OF_FORM, NUMBER_OF_COLOR } from "./constants";
import { MIN_NUMBER_OF_EXEMPLAR, MAX_NUMBER_OF_EXEMPLAR, INPUT_TYPE, STEP, MIN_YEAR, MAX_YEAR } from "./constants";
import { DataMain } from "./types";
import { addElement } from "./common";
import { searchToys, sortMain, sortByFilters, resetFilters } from "./filters";

class ToysPage {
  private base: Element;
  private toys: DataMain;

	constructor(div: Element) {
    this.base = div;
  }

  static tree() {
    const search = document.querySelector('.header-controls');
    search.textContent = '';
    loader.goto(Page.tree);
  }

  static startPage() {
    const search = document.querySelector('.header-controls');
    search.textContent = '';
    loader.goto(Page.start);
  }

  public render() {
    this.base.classList.remove('bg');

    const hCont = document.querySelector('.header-controls');
    const tPg = addElement(this.base, 'div', 'toys-page');
    const filterCnt = addElement(tPg, 'div', 'filters-container');
    const srchWrp = addElement(filterCnt, 'div', 'search-wrapper');
    const search = addElement(hCont, 'input', 'search') as HTMLInputElement;
    search.type = 'search';
    search.autocomplete = 'off';
    search.placeholder = 'Поиск';
    search.focus();
    search.oninput = searchToys;
    const sortCnt = addElement(filterCnt, 'div', 'sort');
    const sortTitle = addElement(sortCnt, 'p', 'filter-title');
    sortTitle.textContent = 'Сортировать';
    const sortSelect = addElement(sortCnt, 'select', 'sort-select', 'text');
    const optString = [['sort-name-max', 'По названию от «А» до «Я»'], ['sort-name-min', 'По названию от «Я» до «А»'], ['sort-year-max', 'По возрастанию года покупки'], ['sort-year-min', 'По убыванию года покупки']];
    for (let i = 0; i < NUMBER_OF_OPTIONS; i++) {
      const option = addElement(sortSelect, 'option') as HTMLOptionElement;
      option.value = `${optString[i][0]}`;
      option.textContent = `${optString[i][1]}`;
      option.selected = i === 0;
    }

    const catTitle = addElement(filterCnt, 'p', 'filter-title');
    catTitle.textContent = 'Категории';
    
    const formTitle = addElement(filterCnt, 'p', 'text');
    formTitle.textContent = 'Форма';
    const formWrp = addElement(filterCnt, 'ul', 'form-wrapper');
    const formString: string[][] = [['bell', 'Колокольчик'], ['ball', 'Шар'], ['cone', 'Шишка'], ['star', 'Звезда'], ['snowflake', 'Снежинка'], ['figurine', 'Фигурка']];
    for (let i = 0; i < NUMBER_OF_FORM; i++) {
      const li = addElement(formWrp, 'li', 'form');
      const btnForm = addElement(li, 'button', `${formString[i][0]}`);
      const title = addElement(li, 'p', 'text-min');
      title.textContent = `${formString[i][1]}`;

      btnForm.onclick = () => {
        formString[i][1].toLowerCase();
        btnForm.classList.toggle('choose')
        sortByFilters(this.toys);
      }
    }

    const numTitle = addElement(filterCnt, 'p', 'text');
    numTitle.textContent = 'Количество экземпляров';
    const rWrp1 = addElement(filterCnt, 'div', 'range-wrapper');
    const numFltRng1 = addElement(rWrp1, 'input') as HTMLInputElement;
    const numFltRng2 = addElement(rWrp1, 'input') as HTMLInputElement;
    numFltRng1.type= INPUT_TYPE; 
    numFltRng2.type = INPUT_TYPE;
    numFltRng1.min = MIN_NUMBER_OF_EXEMPLAR;
    numFltRng2.min = MIN_NUMBER_OF_EXEMPLAR;
    numFltRng1.max = MAX_NUMBER_OF_EXEMPLAR;
    numFltRng2.max = MAX_NUMBER_OF_EXEMPLAR;
    numFltRng1.step = STEP;
    numFltRng2.step = STEP;
    numFltRng1.value = MIN_NUMBER_OF_EXEMPLAR;
    numFltRng2.value = MAX_NUMBER_OF_EXEMPLAR;
    numFltRng1.id = 'number-filter1';
    numFltRng2.id = 'number-filter2';
    const numFrom = addElement(rWrp1, 'output', 'num-from', 'text');
    const numTo = addElement(rWrp1, 'output', 'num-to', 'text');
    numFrom.textContent = MIN_NUMBER_OF_EXEMPLAR;
    numTo.textContent = MAX_NUMBER_OF_EXEMPLAR;

    numFltRng1.onchange = () => {
      if (Number(numFltRng1.value) > Number(numFltRng2.value)) {
        const right = numFltRng1.value;
        numFltRng1.value = numFltRng2.value;
        numFltRng2.value = right;
      }
      numFrom.textContent = numFltRng1.value;
      numTo.textContent = numFltRng2.value;
      sortByFilters(this.toys);
    };
    numFltRng2.onchange = () => {
      if (Number(numFltRng2.value) < Number(numFltRng1.value)) {
        const right = numFltRng1.value;
        numFltRng1.value = numFltRng2.value;
        numFltRng2.value = right;
      }
      numFrom.textContent = numFltRng1.value;
      numTo.textContent = numFltRng2.value;
      sortByFilters(this.toys);
    };

    const yearTitle = addElement(filterCnt, 'p', 'text');
    yearTitle.textContent = 'Год приобретения';
    const rWrp2 = addElement(filterCnt, 'div', 'range-wrapper');
    const yearFltRng1 = addElement(rWrp2, 'input') as HTMLInputElement;
    const yearFltRng2 = addElement(rWrp2, 'input') as HTMLInputElement;
    yearFltRng1.type = INPUT_TYPE;
    yearFltRng2.type = INPUT_TYPE;
    yearFltRng1.min = MIN_YEAR;
    yearFltRng2.min = MIN_YEAR;
    yearFltRng1.max = MAX_YEAR;
    yearFltRng2.max = MAX_YEAR;
    yearFltRng1.step = STEP;
    yearFltRng2.step = STEP;
    yearFltRng1.value = MIN_YEAR;
    yearFltRng2.value = MAX_YEAR;
    yearFltRng1.id = 'year-filter1';
    yearFltRng2.id = 'year-filter2';
    const yearFrom = addElement(rWrp2, 'output', 'year-from', 'text');
    const yearTo = addElement(rWrp2, 'output', 'year-to', 'text');
    yearFrom.textContent = MIN_YEAR;
    yearTo.textContent = MAX_YEAR;

    yearFltRng1.onchange = () => {
      if (Number(yearFltRng1.value) > Number(yearFltRng2.value)) {
        const right = yearFltRng1.value;
        yearFltRng1.value = yearFltRng2.value;
        yearFltRng2.value = right;
      }
      yearFrom.textContent = yearFltRng1.value;
      yearTo.textContent = yearFltRng2.value;
      sortByFilters(this.toys);
    };
    yearFltRng2.onchange = () => {
      if (Number(yearFltRng2.value) < Number(yearFltRng1.value)) {
        const right = yearFltRng1.value;
        yearFltRng1.value = yearFltRng2.value;
        yearFltRng2.value = right;
      }
      yearFrom.textContent = yearFltRng1.value;
      yearTo.textContent = yearFltRng2.value;
      sortByFilters(this.toys);
    };

    const colorTitle = addElement(filterCnt, 'p', 'text');
    colorTitle.textContent = 'Цвет';
    const colorWrp = addElement(filterCnt, 'ul', 'color-wrapper');
    const colorStr: string[] = ['wh', 'yw', 'rd', 'bl', 'gn'];
    for (let i = 0; i < NUMBER_OF_COLOR; i++) {
      const li = addElement(colorWrp, 'li', 'color');
      const btn = addElement(li, 'button', `${colorStr[i]}`);
      li.id = `${colorStr[i]}`;
      btn.onclick = () => {
        btn.classList.toggle('choose-color');
        sortByFilters(this.toys);
      };
    }

    const sizeTitle = addElement(filterCnt, 'p', 'text');
    sizeTitle.textContent = 'Размер';
    const sizeWrp = addElement(filterCnt, 'div', 'size-wrapper');

    const labelSize1 = addElement(sizeWrp, 'label', 'text');
    labelSize1.setAttribute('for', 'big');
    labelSize1.textContent = 'Большой';
    const inputSize1 = addElement(labelSize1, 'input') as HTMLInputElement;
    
    const labelSize2 = addElement(sizeWrp, 'label', 'text');
    labelSize2.setAttribute('for', 'medium');
    labelSize2.textContent = 'Средний';
    const inputSize2 = addElement(labelSize2, 'input') as HTMLInputElement;

    const labelSize3 = addElement(sizeWrp, 'label', 'text');
    labelSize3.setAttribute('for', 'small');
    labelSize3.textContent = 'Малый';
    const inputSize3 = addElement(labelSize3, 'input') as HTMLInputElement;

    inputSize1.type = 'checkbox'; inputSize2.type = 'checkbox'; inputSize3.type = 'checkbox';
    inputSize1.value = 'big'; inputSize1.id = 'big';
    inputSize2.value = 'medium'; inputSize2.id = 'medium';
    inputSize3.value = 'small'; inputSize3.id = 'small';
    
    inputSize1.onchange = () => {
      sortByFilters(this.toys);
    }
    inputSize2.onchange = () => {
      sortByFilters(this.toys);
    }
    inputSize3.onchange = () => {
      sortByFilters(this.toys);
    }
    const labelFavor = addElement(filterCnt, 'label', 'text');
    labelFavor.setAttribute('for', 'favorite');
    labelFavor.textContent = 'Только любимые';
    const inputFavor = addElement(labelFavor, 'input') as HTMLInputElement;
    inputFavor.type = 'checkbox';
    inputFavor.value = 'favorite'; inputFavor.id = 'favorite';
    inputFavor.onchange = () => {
      sortByFilters(this.toys);
    }
    const btnWrp = addElement(filterCnt, 'div', 'button-wrapper');
    const btnResFil = addElement(btnWrp, 'button', 'reset-filter');
    btnResFil.textContent = 'Сбросить фильтры';
    const btnResSet = addElement(btnWrp, 'button', 'reset-settings');
    btnResSet.textContent = 'Сбросить настройки';

    btnResFil.onclick = () => {
      resetFilters(this.toys);
    }

    const mainTCont = addElement(tPg, 'div', 'main-t-cont');
    const favErr = addElement(mainTCont, 'div', 'fav-err', 'hide');
    favErr.textContent = 'Извините, все слоты заполнены';
    const fav = addElement(hCont, 'div', 'favorites');
    const span = addElement(fav, 'span');
    span.id = 'fav';
    span.textContent = '0';
    addElement(mainTCont, 'div', 'toys-container');

    (async() => {
      const response = await fetch('./data.json');
      const data = await response.json();
      this.toys = data;
      sortMain(this.toys);
    })();

    const startPage: HTMLElement = document.querySelector('.logo');
    const treePage: HTMLElement = document.querySelector('.switch-tree');

    startPage.onclick = () => {
      ToysPage.startPage();
    }

    treePage.onclick = () => {
      ToysPage.tree();
    }
  }
}

export default ToysPage;
