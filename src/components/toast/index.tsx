import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Text} from '@components';
import Toast from 'react-native-toast-message';
import {colors} from 'src/themes/colors';

type PropsToast = {
  message: string;
  type: 'error' | 'success' | 'info';
  backgroundColor: string;
};

const CustomToast = ({message, backgroundColor, type}: PropsToast) => {
  const onHide = () => Toast.hide();

  return (
    <TouchableOpacity
      onPress={onHide}
      activeOpacity={0.9}
      style={[styles.toast, {backgroundColor}]}>
      <Text
        type="semibold"
        size={14}
        color={type !== 'info' ? 'white' : colors.dark}
        style={styles.contentToast}>
        {message}
      </Text>
    </TouchableOpacity>
  );
};

export const showToast: Function = ({message, type}: PropsToast) => {
  Toast.show({
    type: type,
    text1: message,
    position: 'bottom',
    topOffset: 30,
    visibilityTime: 3000,
  });
};

export const hideToast: Function = () => Toast.hide();

const styles = StyleSheet.create({
  toast: {
    width: widthPercentageToDP(90),
    paddingVertical: heightPercentageToDP(2),
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: heightPercentageToDP(4),
    opacity: 0.9,
    backgroundColor: 'black',
    paddingHorizontal: widthPercentageToDP(2),
    zIndex: 999999,
  },
  contentToast: {
    width: widthPercentageToDP(70),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  close: {
    backgroundColor: 'black',
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
    padding: 5,
  },
});

export default memo(CustomToast);
