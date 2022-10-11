import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  containerForm: {
    padding: widthPercentageToDP(5),
    marginTop: heightPercentageToDP(20),
  },
  footer: {
    marginTop: heightPercentageToDP(30),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
