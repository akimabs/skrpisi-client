import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {radius} from 'src/themes/sizes';

export const styles = StyleSheet.create({
  containerHeaderImage: {
    justifyContent: 'center',
    height: 150,
    paddingHorizontal: widthPercentageToDP(3),
    backgroundColor: 'black',
  },
  imageHeader: {
    height: 150,
    width: widthPercentageToDP(100),
    opacity: 0.3,
    position: 'absolute',
  },
  backButton: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  containerView: {
    marginTop: heightPercentageToDP(-3),
    backgroundColor: 'white',
    borderTopLeftRadius: radius.large,
    borderTopRightRadius: radius.large,
    width: widthPercentageToDP(100),
    padding: widthPercentageToDP(5),
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  modal: {
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalActionReason: {
    backgroundColor: 'white',
    width: widthPercentageToDP(100),
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});
