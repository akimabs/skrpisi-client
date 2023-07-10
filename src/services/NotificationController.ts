import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

const NotificationController = () => {
  PushNotification.configure({
    onNotification: (notification: any) => {
      console.log(notification);
      PushNotification.localNotification({
        channelId: 'channel-id',
        message: notification.data?.message,
        title: notification.data?.title,
      });
    },
    onRegister: function (token: any) {},
  });

  PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log(remoteMessage);
      PushNotification.localNotification({
        message: remoteMessage?.notification?.body,
        title: remoteMessage?.notification?.title,
        bigPictureUrl: remoteMessage?.notification?.android?.imageUrl,
        smallIcon: remoteMessage?.notification?.android?.imageUrl,
      });
    });

    return unsubscribe;
  }, []);

  return null;
};

export default NotificationController;
