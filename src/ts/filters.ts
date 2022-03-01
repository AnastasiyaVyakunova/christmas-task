import { addElement, drawCard, numberOfFavToys } from "./common";
import { Colors, favoriteToys } from "./constants";
import { DataMain, DataToy } from "./types";

export function searchToys() {
  const search = document.querySelector('.search') as HTMLInputElement;
  const val: string = search.value.trim().toLowerCase();
  const cards = document.querySelectorAll('.card');
  const cardTitle = document.querySelectorAll('.card-title');
  let isEmpty: boolean = (cardTitle.length === 0) ? true : false;

  if (val !== '') {
    for (let i = 0; i < cardTitle.length; i++) {
      if (cardTitle[i].textContent.toLowerCase().includes(val) === false) {
        isEmpty = true;
        cards[i].classList.add('hide');
      } else {
        isEmpty = false;
        cards[i].classList.remove('hide');
      }
    }
  } else {
    for (let i = 0; i < cardTitle.length; i++) {
      cards[i].classList.remove('hide');
    }
  }
  if (isEmpty) {
    if (document.querySelector('#not-found') === null) {
      const tCon = document.querySelector('.toys-container');
      const notFound = addElement(tCon, 'h2', 'text');
      notFound.id = 'not-found';
      notFound.textContent = 'Извините, совпадений не обнаружено';
    }
  } else if (document.querySelector('#not-found') !== null) {
    const notFound = document.querySelector('#not-found');
    notFound.parentNode.removeChild(notFound);
  }
}

function sortByName(value: string, toysData: DataMain) {
  let func = function(a: DataToy, b: DataToy): number {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  }
  if (value === 'sort-name-min') {
    func = function(a: DataToy, b: DataToy): number {
      if (a.name > b.name) {
        return -1;
      } else {
        return 1;
      }
    } 
  }  
  toysData.toys.sort(func);
}

function sortByYear(value: string, toysData: DataMain) {
  let func = function(a: DataToy, b: DataToy): number {
    if (a.year > b.year) {
      return 1;
    } else {
      return -1;
    }
  }
  if (value === 'sort-year-min') {
    func = function(a: DataToy, b: DataToy): number {
      if (a.year > b.year) {
        return -1;
      } else {
        return 1;
      }
    } 
  }  
  toysData.toys.sort(func);
}

function selectSort(value: string, toysData: DataMain) {
  switch (value) {
    case 'sort-name-max':
    case 'sort-name-min':
      sortByName(value, toysData);
    break;
    case 'sort-year-max':
    case 'sort-year-min':
      sortByYear(value, toysData);
    break;
  }
}

function drawCards (toysData: DataMain) {
  const tCont: HTMLElement = document.querySelector('.toys-container');
  tCont.textContent = '';
  for (let i = 0; i < toysData.toys.length; i++) {
    drawCard(i, tCont, toysData);
  }
  searchToys();
}

export function sortMain(toysData: DataMain) {
  const select: HTMLSelectElement = document.querySelector('.sort-select');
  select.onchange = () => {
    sortByFilters(toysData);
  }
  sortByFilters(toysData);
}

function applyFilters(input: DataMain, forms: Array<string>, numbers: Array<string>, years: Array<string>, colors: Array<string>, sizes: Array<string>, isFav: boolean): DataMain {
  const result: DataMain = { toys: [] };
  const isForms = function(el: DataToy): boolean {
    if (forms.length === 0) {
      return true;
    }
    for (const shape of forms) {
      if(shape === el.shape) {
        return true;
      }
    }
    return false;
  };
  
  const isNumbers = function(el: DataToy): boolean {
    if ((Number(numbers[0]) <= Number(el.count))
    && (Number(numbers[1]) >= Number(el.count))) {
      return true;
    }
    return false;
  };

  const isYears = function(el: DataToy): boolean {
    if ((Number(years[0]) <= Number(el.year))
    && (Number(years[1]) >= Number(el.year))) {
      return true;
    }
    return false;
  };

  const isColors = function(el: DataToy): boolean {
    if (colors.length === 0) {
      return true;
    }
    for (const color of colors) {
      if (Colors[color] === el.color) {
        return true;
      }
    }
    return false;
  };

  const isSizes = function(el: DataToy): boolean {
    if (sizes.length === 0) {
      return true;
    }
    for (const size of sizes) {
      if (size === el.size) {
        return true;
      }
    }
    return false;
  }

  const isFavorite = function(el: DataToy): boolean {
    if (!isFav) {
      return true;
    }
    if (favoriteToys[Number(el.num)] === 1) {
      return true;
    }
    return false;
  }
  input.toys.forEach((el) => {
    if (isForms(el) && isNumbers(el)
    && isYears(el) && isColors(el)
    && isSizes(el) && isFavorite(el)) {
      result.toys.push(el);
    }
  })
  return result;
} 

export function sortByFilters(toysData: DataMain) {
  const select: HTMLSelectElement = document.querySelector('.sort-select');
  selectSort(select.value, toysData);
  // 1 stage: get all filters
  const forms = document.querySelectorAll('.form');
  const formsSelected: string[] = [];
  forms.forEach((el) => {
    const btn = el.querySelector('button');
    const p = el.querySelector('p');
    if (btn.classList.contains('choose')) {
      formsSelected.push(p.textContent.toLowerCase());
    }
  });
  const nl: HTMLInputElement = document.querySelector('#number-filter1');
  const nr: HTMLInputElement = document.querySelector('#number-filter2');
  const numbers: Array<string> = [nl.value, nr.value]; 
  nl.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${Number(nl.value)*100/12}%, #13bba4 ${Number(nl.value)*100/12}%, #13bba4 ${Number(nr.value)*100/12}%, #ffffff ${Number(nr.value)*100/12}%, #ffffff 100%)`;
  nr.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${Number(nl.value)*100/12}%, #13bba4 ${Number(nl.value)*100/12}%, #13bba4 ${Number(nr.value)*100/12}%, #ffffff ${Number(nr.value)*100/12}%, #ffffff 100%)`;

  const yl: HTMLInputElement = document.querySelector('#year-filter1');
  const yr: HTMLInputElement = document.querySelector('#year-filter2');
  const years: Array<string> = [yl.value, yr.value];
  yl.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${(Number(yl.value)-1940)*100/81}%, #13bba4 ${(Number(yl.value)-1940)*100/81}%, #13bba4 ${(Number(yr.value)-1940)*100/81}%, #ffffff ${(Number(yr.value)-1940)*100/81}%, #ffffff 100%)`;
  yr.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${(Number(yl.value)-1940)*100/81}%, #13bba4 ${(Number(yl.value)-1940)*100/81}%, #13bba4 ${(Number(yr.value)-1940)*100/81}%, #ffffff ${(Number(yr.value)-1940)*100/81}%, #ffffff 100%)`;

  const colors = document.querySelectorAll('.color');
  const colorsSelected: string[] = [];
  colors.forEach((el) => {
    const btn = el.querySelector('button');
    if (btn.classList.contains('choose-color')) {
      colorsSelected.push(el.id);
    }
  });

  const big: HTMLInputElement = document.querySelector('#big');
  const medium: HTMLInputElement = document.querySelector('#medium');
  const small: HTMLInputElement = document.querySelector('#small');
  
  const sizes: Array<string> = [];
  if (big.checked) {
    sizes.push('большой');
  }
  if (medium.checked) {
    sizes.push('средний');
  }
  if (small.checked) {
    sizes.push('малый');
  }

  const fav: HTMLInputElement = document.querySelector('#favorite');
  const isFav: boolean = fav.checked;
  // 2 stage: apply all filters
  const filtered = applyFilters(toysData, formsSelected, numbers, years, colorsSelected, sizes, isFav);
  // 3 stage: draw
  drawCards(filtered);
}

export function resetFilters(toysData: DataMain) {
  const forms = document.querySelectorAll('.choose');
  forms.forEach(el => {
    el.classList.remove('choose');
  })

  const nl: HTMLInputElement = document.querySelector('#number-filter1');
  const nr: HTMLInputElement = document.querySelector('#number-filter2');
  const yl: HTMLInputElement = document.querySelector('#year-filter1');
  const yr: HTMLInputElement = document.querySelector('#year-filter2');
  nl.value = '0'; nr.value = '12';
  yl.value = '1940'; yr.value = '2021';
  const inRange: NodeListOf<HTMLElement> = document.querySelectorAll('input[type="range"]');
  inRange.forEach(el => {
    el.style.background = '#13bba4';
  })

  const nf = document.querySelector('.num-from');
  const nt = document.querySelector('.num-to');
  const yf = document.querySelector('.year-from');
  const yt = document.querySelector('.year-to');
  nf.textContent = '0'; nt.textContent = '12';
  yf.textContent = '1940'; yt.textContent = '2021';

  const colors = document.querySelectorAll('.choose-color');
  colors.forEach(el => {
    el.classList.remove('choose-color');
  })

  const checkbox: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
  checkbox.forEach(el => {
    el.checked = false;
  })

  const select: HTMLSelectElement = document.querySelector('.sort-select');
  selectSort(select.value, toysData);
  drawCards(toysData);
}

export function chooseTree(id: number) {
  const tree: HTMLImageElement = document.querySelector('.main-tree');
  tree.src = `assets/tree/${id + 1}.png`;
}

export function chooseBg(id: number) {
  const bg: HTMLElement = document.querySelector('.main-tree-container');
  bg.style.backgroundImage = `url(assets/bg/${id + 1}.jpg)`;
}

export function createSnowFlake() {
  const snowCont = document.querySelector('.snow-container');
  const snowFlake = addElement(snowCont, 'span', 'fas', 'fa-snowflake');
	snowFlake.style.left = Math.random() * window.innerWidth + 'px';
	snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's';
	snowFlake.style.opacity = Math.random() + '';
	snowFlake.style.fontSize = Math.random() * 10 + 10 + 'px';

	setTimeout(() => {
		snowFlake.remove();
	}, 5000)
}

export function garland(color: string) {
  const numberOfGroup = 8;
  const topMargine = 20;
  const widthLight = 8;
  const widthBeetwenLight = 5;
  const ropeCont: HTMLElement = document.querySelector('.lightrope-container');
  ropeCont.textContent = '';
  const tree: HTMLImageElement = document.querySelector('.main-tree');
  const widthMax = tree.width;
  const heightMax = tree.height;
  ropeCont.style.width = widthMax + 'px';
  ropeCont.style.height = heightMax + 'px';
  
  const initialSize = heightMax / (numberOfGroup + 1);
  ropeCont.style.transformOrigin = `${topMargine}px ${widthMax / 2}px`;
  const maxRopeWidth = (heightMax - topMargine) / heightMax * widthMax;
  const angle = Math.atan(maxRopeWidth / (2 * initialSize * numberOfGroup)) * 2;

  for (let i = 1; i < numberOfGroup; i++) {
    const ropeTopOffset = (i * initialSize); 
    const ropeWigth = (ropeTopOffset + initialSize - topMargine) / (heightMax - topMargine) * maxRopeWidth;
    const ul = addElement(ropeCont, 'ul', 'lightrope');
    ul.style.width = `${ropeWigth}px`;
    ul.style.height = `${initialSize}px`;
    ul.style.top = `${ropeTopOffset}px`;
    ul.style.left = `${(maxRopeWidth - ropeWigth) / 2}px`;
    
    const num = ropeWigth / (widthLight + widthBeetwenLight);
    const rightOffset = ropeWigth / 2;
    const topOffset = ropeTopOffset + initialSize;
    
    for (let j = 0; j < num; j++) {
      const li: HTMLElement = addElement(ul, 'li', color);
      li.style.width = widthLight + 'px';
      li.style.transformOrigin = `${rightOffset}px ${-topOffset}px`;
      li.style.transform = `rotate(${-angle * j / num}rad)`;
    }
  } 
}

export function chooseFavToys(toysData: DataMain) {
  const favCard = document.querySelectorAll('.favorites-card');
  if (numberOfFavToys === 0) {
    for (let i = 0; i < favCard.length; i++) {
      const favCout = addElement(favCard[i], 'p', 'favorites-count');
      favCout.textContent = `${toysData.toys[i].count}`;
      for (let j = 0; j < Number(toysData.toys[i].count); j++) {
        const favImg = addElement (favCard[i], 'img', 'favorites-card-img') as HTMLImageElement;
        favImg.src = `assets/toys/${toysData.toys[i].num}.png`;
        favImg.alt = 'toy';
        favImg.setAttribute('draggable', 'true');
        favImg.id = `${i + 1}-${j + 1}`;
        favImg.setAttribute('data-imgnum', `${i + 1}`);
      }
    }
  } else {
    let j = 0;
    for ( let i = 0; i < favoriteToys.length; i++) {
      if (favoriteToys[i] === 1) {
        const favCout = addElement(favCard[j], 'p', 'favorites-count');
        favCout.textContent = `${toysData.toys[i].count}`;
        for (let k = 0; k < Number(toysData.toys[i].count); k++) {
          const favImg = addElement (favCard[j], 'img', 'favorites-card-img') as HTMLImageElement;
          favImg.src = `assets/toys/${toysData.toys[i].num}.png`;
          favImg.alt = 'toy';
          favImg.setAttribute('draggable', 'true');
          favImg.id = `${i + 1}-${k + 1}`;
          favImg.setAttribute('data-imgnum', `${i + 1}`);
        }
        j++;
      }
    }
  }
  dragAndDrop(toysData);
}

export function dragAndDrop(toysData: DataMain) {
  const fToys: NodeListOf<HTMLElement> = document.querySelectorAll('.favorites-card-img');
  const fCnts: NodeListOf<HTMLElement> = document.querySelectorAll('.favorites-card');
  
  const map = document.querySelector('area');
  
  function onDragStart(event: DragEvent) {
    const target = event.target as Element;
    event.dataTransfer.setData('text/plain', target.id);
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function onDragEnd(event: DragEvent) {
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);    
    const dropezone = document.getElementById(draggableElement.getAttribute('data-imgnum'));
    draggableElement.style.left = ``;
    draggableElement.style.top = ``;
    dropezone.appendChild(draggableElement);
    const counter = dropezone.querySelector('.favorites-count');
    const index = Number(draggableElement.getAttribute('data-imgnum'));
    if (Number(this.toys[index - 1].count) > Number(counter.textContent)){
      counter.textContent = Number(counter.textContent) + 1 + '';
    }
  }

  function onDrop(event: DragEvent) {
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropezone = document.querySelector('area');
    draggableElement.style.position = 'absolute';
    draggableElement.style.left = `${event.offsetX - draggableElement.offsetWidth / 2}px`;
    draggableElement.style.top = `${event.offsetY - draggableElement.offsetHeight / 2}px`;
    dropezone.appendChild(draggableElement);
    const from = document.getElementById(draggableElement.getAttribute('data-imgnum'));
    const counter = from.querySelector('.favorites-count');
    if (Number(counter.textContent) > 0) {
      counter.textContent = Number(counter.textContent) - 1 + '';
    }
  }

  for (let i = 0; i < fToys.length; i++) {
    fToys[i].addEventListener('dragstart', onDragStart);
  }

  map.addEventListener('dragover', onDragOver);
  map.addEventListener('drop', onDrop);
  const bEnd = onDragEnd.bind(toysData);
  for (let i = 0; i < fCnts.length; i++) {
    fCnts[i].addEventListener('dragover', onDragOver);
    fCnts[i].addEventListener('drop', bEnd);
  }
}
