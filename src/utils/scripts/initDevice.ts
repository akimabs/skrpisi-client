import {Platform, PlatformOSType} from 'react-native';
import messaging from '@react-native-firebase/messaging';

type ReturnInitDevice = {
  type: PlatformOSType;
  tokenNotification: string;
};

export const initDevice = async (): Promise<ReturnInitDevice> => {
  let store: ReturnInitDevice = {
    type: Platform.OS,
    tokenNotification: '',
  };

  return {
    ...store,
    tokenNotification: await messaging().getToken(),
  };
};
