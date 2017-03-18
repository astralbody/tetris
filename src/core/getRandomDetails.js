import {List} from 'immutable';
import getRandomInt from './getRandomInt';
import * as details from '../constants/ShapeDetail';

export const getOfObjectToList = object =>
  List(Object.keys(object).map(kind => object[kind]));

export const getRandomItemOfList = list =>
  list.get(getRandomInt(0, list.size - 1));

export const getRandomDetails =
  getRandomItemOfList.bind(null, getOfObjectToList(details));

export const getDetail = kind => details[kind];

/* export const callRepeat = (n, f, a) =>
  new Array(n).fill(null).reduce(res => f(res), a);*/
