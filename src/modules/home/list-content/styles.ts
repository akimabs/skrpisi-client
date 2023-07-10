import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  backButton: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 20,
  },
  header: {
    paddingHorizontal: 20,
  },
  containerBack: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  imageBackgroud: {
    height: 200,
    width: 200,
    position: 'absolute',
    top: -60,
    right: -24,
    opacity: 0.3,
    transform: [
      {
        rotate: '20deg',
      },
    ],
  },
});
