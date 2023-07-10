import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {colors} from 'src/themes/colors';
import {radius} from 'src/themes/sizes';
import {space} from 'src/themes/space';

export const styles = StyleSheet.create({
  headerLandingPageContainer: {
    padding: widthPercentageToDP(5),
    flexDirection: 'row',
  },
  containerHistoryWithNoTitle: {
    width: widthPercentageToDP(100),
    paddingHorizontal: 20,
  },
  containerCard: {
    width: widthPercentageToDP(100),
    backgroundColor: colors.backgroundSecondary,
    borderTopLeftRadius: radius.large,
    borderTopRightRadius: radius.large,
    padding: 20,
  },
  containerListCard: {flexDirection: 'row', justifyContent: 'space-between'},
  containerCardList: {
    backgroundColor: colors.light,
    borderRadius: radius.medium,
    padding: space.x2,
    marginTop: space.x2,
    shadowColor: colors.backgroundSecondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  line: {
    height: 1,
    width: widthPercentageToDP(80),
    alignSelf: 'center',
    backgroundColor: colors.dark + 20,
    marginTop: space.x1,
    marginBottom: space.x2,
  },
  seeAllReimbursement: {
    width: widthPercentageToDP(87),
    alignSelf: 'center',
    backgroundColor: colors.amount,
    paddingVertical: space.x_01,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: radius.large,
    borderBottomRightRadius: radius.large,
    marginTop: -3,
    paddingTop: 5,
    zIndex: -99,
  },
  containerCategory: {
    width: widthPercentageToDP(100),
    backgroundColor: colors.backgroundSecondary,
    padding: 20,
  },
  buttonCategory: {
    backgroundColor: colors.light,
    borderWidth: 1.5,
    borderColor: colors.dark + 10,
    width: widthPercentageToDP(40),
    margin: 10,
    shadowColor: colors.backgroundSecondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: heightPercentageToDP(6),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  imageIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: space.x1,
  },
  containerListCategory: {alignSelf: 'center'},
  containerHistory: {
    marginTop: -10,
    borderTopLeftRadius: radius.large,
    borderTopRightRadius: radius.large,
    zIndex: 999,
    padding: space.x2,
    backgroundColor: colors.light,
  },
  headerHistory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerCardHistory: {
    marginVertical: space.x1,
    backgroundColor: colors.light,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    padding: space.x1,
    borderRadius: radius.small,
    shadowColor: colors.dark + 50,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerDataHistoryRight: {
    width: widthPercentageToDP(40),
    alignItems: 'flex-end',
  },
  containerDataHistoryLeft: {
    width: widthPercentageToDP(40),
    justifyContent: 'flex-start',
  },
  containerApproval: {
    width: widthPercentageToDP(100),
    padding: 20,
  },
  containerModal: {
    backgroundColor: 'white',
    height: heightPercentageToDP(20),
  },
  modal: {
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  buttonLogout: {
    backgroundColor: colors.danger,
    alignSelf: 'center',
    width: widthPercentageToDP(90),
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'lightgrey',
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
