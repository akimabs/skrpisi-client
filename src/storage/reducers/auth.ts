import {REDUX_TYPE} from 'src/utils/constants/redux_type';

const initialState = {
  user_data: {},
};

export const auth = (state = initialState, action: any) => {
  switch (action?.type) {
    case REDUX_TYPE.STORE_USER_DATA:
      return {
        ...state,
        user_data: action.payload,
      };

    default:
      return state;
  }
};
