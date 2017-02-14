import {List} from 'immutable';
import getRandomInt from './getRandomInt';
import * as details from '../constants/ShapeDetail';

const detailsList = List.of(Object.keys(details).map(kind => details[kind]));

const getOfList = list => list.get(getRandomInt(0, list.length));
const getRandomOfDetailsList = getOfList.bind(null, detailsList);
const callRepeat = (n, f, a) =>
  new Array(n).fill(null).reduce(res => f(res), a);

export default getRandomOfDetailsList;
