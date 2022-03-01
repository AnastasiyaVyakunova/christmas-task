import { ColorOptions } from "./types";

export const Page: { start: string; toys: string; tree: string } = {
  start: 'start',
  toys: 'toys',
  tree: 'tree'
}

export const Colors: ColorOptions = {
  wh: 'белый',
  yw: 'желтый',
  rd: 'красный',
  bl: 'синий',
  gn: 'зелёный'
}

export const favoriteToys: number[] = Array(61).fill(-1);

export const NUMBER_OF_OPTIONS = 4;

export const NUMBER_OF_FORM = 6;

export const NUMBER_OF_COLOR = 5;

export const NUMBER_OF_TREE = 6;

export const NUMBER_OF_BG = 10;

export const MAP_CORDS = '238,3,225,15,214,51,210,86,203,100,192,'+
      '112,185,118,191,139,185,152,174,157,169,184,154,214,153,239,135,265,126,292,' +
      '120,307,110,344,94,378,79,405,79,432,63,464,52,489,41,532,32,570,19,609,36,' +
      '641,66,673,114,676,149,699,189,688,226,691,280,691,310,697,349,682,375,668,' +
      '414,668,439,663,473,657,475,608,487,592,477,547,467,522,457,485,447,453,432,' +
      '407,416,355,393,314,373,246,346,198,334,155,318,120,288,60,277,40';

export const INPUT_TYPE = 'range';

export const MIN_NUMBER_OF_EXEMPLAR = '0';

export const MAX_NUMBER_OF_EXEMPLAR = '12';

export const STEP = '1';

export const MIN_YEAR = '1940';

export const MAX_YEAR = '2021';

