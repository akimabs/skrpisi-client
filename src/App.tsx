import React from 'react';
import StackNav from './routes/stack-nav';
import Toast from 'react-native-toast-message';
import CustomToast from './components/toast';
import {colors} from './themes/colors';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './storage/storage';
import NotificationController from './services/NotificationController';

const App = () => {
  const toastConfig: any = {
    success: (props: any) => (
      <CustomToast
        type="success"
        message={props?.text1}
        backgroundColor={colors.success_info}
      />
    ),
    error: (props: any) => (
      <CustomToast
        type="error"
        message={props.text1}
        backgroundColor={colors.danger_info}
      />
    ),
    info: (props: any) => (
      <CustomToast
        type="info"
        message={props?.text1}
        backgroundColor={colors.warning_info}
      />
    ),
  };
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NotificationController />
          <StackNav />
          <Toast config={toastConfig} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
