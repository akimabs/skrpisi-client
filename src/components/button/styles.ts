import {StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {colors} from 'src/themes/colors';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: heightPercentageToDP(6),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
