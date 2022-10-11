import {StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {colors} from 'src/themes/colors';

export const styles = StyleSheet.create({
  button: {
    height: heightPercentageToDP(6),
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
  },
});
