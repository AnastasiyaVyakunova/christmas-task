import { favoriteToys } from "./constants";
import { DataMain } from "./types";

export let numberOfFavToys = 0;

export function addElement(base: Element, nameTag: string, ...nameClass: string[]) {
  const element = document.createElement(nameTag);
  element.classList.add(...nameClass);
  base.append(element);
  return element;
}

export function drawCard(id: number, div: HTMLElement, data: DataMain) {
  const card = addElement(div, 'div', 'card');
  const cardTitle = addElement(card, 'h2', 'card-title');
  cardTitle.textContent = data.toys[id].name;
  const cardImg = addElement(card, 'div', 'card-img');
  cardImg.style.backgroundImage = `url(assets/toys/${data.toys[id].num}.png)`;
  const cardDesc = addElement(card, 'div', 'card-description');
  const cardCount = addElement(cardDesc, 'p', 'card-count', 'text');
  cardCount.textContent = `Количество:  ${data.toys[id].count}`;
  const cardYear = addElement(cardDesc, 'p', 'card-year', 'text');
  cardYear.textContent = `Год покупки:  ${data.toys[id].year}`;
  const cardForm = addElement(cardDesc, 'p', 'card-form', 'text');
  cardForm.textContent = `Форма:  ${data.toys[id].shape}`;
  const cardColor = addElement(cardDesc, 'p', 'card-color', 'text');
  cardColor.textContent = `Цвет:  ${data.toys[id].color}`;
  const cardSize = addElement(cardDesc, 'p', 'card-size', 'text');
  cardSize.textContent = `Размер:  ${data.toys[id].size}`;
  const cardFavorite = addElement(cardDesc, 'p', 'card-favorite', 'text');
  cardFavorite.textContent = 'Любимая:  нет';
 
  
  addElement(card, 'div', 'ribbon');

  const favErr = document.querySelector('.fav-err');
  const span = document.querySelector('#fav');

  if (favoriteToys[Number(data.toys[id].num)] === 1) {
    card.classList.add('active');
    cardFavorite.textContent = 'Любимая:  да';
  }

  card.onclick = () => {
    if (favoriteToys[Number(data.toys[id].num)] === -1) {
      if (numberOfFavToys === 20) {
        if (favErr !== null) {
          favErr.classList.remove('hide');
          setTimeout(() => { favErr.classList.add('hide') }, 1000);
        }
      } else {
        numberOfFavToys++;
        favoriteToys[Number(data.toys[id].num)] = 1;
        card.classList.add('active');
        const cf = card.querySelector('.card-favorite');
        if (cf !== null) {
          cf.textContent = 'Любимая:  да';
        }
      }     
    } else {
      favoriteToys[Number(data.toys[id].num)] = -1;
      card.classList.remove('active');
      numberOfFavToys--;
      const cf = card.querySelector('.card-favorite');
      if (cf !== null) {
        cf.textContent = 'Любимая:  нет';
      }
    }
    if (span !== null) span.textContent = `${numberOfFavToys}`;
  }
}
