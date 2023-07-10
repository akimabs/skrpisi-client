import {REDUX_TYPE} from 'src/utils/constants/redux_type';

export const storeUserData = (payload: any) => {
  return {
    type: REDUX_TYPE.STORE_USER_DATA,
    payload,
  };
};
