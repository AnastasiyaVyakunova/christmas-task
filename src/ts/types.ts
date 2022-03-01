export type ColorOptions = {
  [key: string]: string
}

export type DataToy = {
  num: string,
  name: string,
  count: string,
  year: string,
  shape: string,
  color: string,
  size: string,
  favorite: boolean
}

export interface DataMain {
  toys: DataToy[]
}