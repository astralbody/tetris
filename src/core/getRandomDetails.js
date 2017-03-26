import {List, fromJS} from 'immutable';
import getRandomInt from './getRandomInt';
import * as details from '../constants/ShapeDetail';
import {zip} from './rotateDetail';

export const callRepeat = (n, f, a) =>
  new Array(n).fill(null).reduce(res => f(res), a);

export const getOfObjectToList = object =>
  List(Object.keys(object).map(kind => object[kind]));

export const getRandomItemOfList = (list) => {
  const repeatRotate = getRandomInt(0, 3);
  const idxDetail = getRandomInt(0, list.size - 1);
  const detail = list.get(idxDetail);

  return detail.set('BODY', fromJS(callRepeat(
    repeatRotate,
    body => zip(body).map(row => row.reverse()),
    detail.get('BODY').toJS()
  )));
};

export const getRandomDetails = getRandomItemOfList.bind(
  null,
  getOfObjectToList(details)
);

export const getDetail = kind => details[kind];
