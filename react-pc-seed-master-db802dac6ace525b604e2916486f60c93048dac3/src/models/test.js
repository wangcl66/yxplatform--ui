/**
 * @file models/test.js
 * @author maoquan(maoquan@htsc.com)
 */

import { routerRedux } from 'dva/router';

import api from '../api';

export default {
  namespace: 'test',
  state: {
    home: {
      page: {},
      list: [],
    },
    detail: {},
  },
  reducers: {
    getListSuccess(state, action) {
      const { payload: { response } } = action;
      const { datas } = response;
      return {
        ...state,
        datas,
      };
    },
    getDetailSuccess(state, action) {
      const { payload: { response } } = action;
      return {
        ...state,
        detail: response.data,
      };
    },
  },
  effects: {

    * getList({ payload }, { call, put }) {
      const response = yield call(api.getList, payload );
      yield put({  //put  触发某个action， 作用和dispatch相同
        type: 'getListSuccess',
        payload: { response},
      });
    },
    * getDetail({ payload: { id } }, { call, put }) {
      const response = yield call(api.getDetail, { id });
      yield put({
        type: 'getDetailSuccess',
        payload: { response, id },
      });
    },
    * save({ payload }, { call, put }) {
      const response = yield call(api.saveDetail, payload);
      yield put({
        type: 'saveSuccess',
        payload: { response },
      });
      // yield put(routerRedux.goBack());
    },
  },
  subscriptions: {},
};
