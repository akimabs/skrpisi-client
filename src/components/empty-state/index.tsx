import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {images} from 'src/themes/images';
import Text from '../text';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Image source={images.global.empty} style={styles.image} />
      <Text type="bold" align="center">
        Sepertinya data pengajuan kamu masih kosong...
      </Text>
    </View>
  );
};

export default memo(EmptyState);

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(70),
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(30),
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -30,
    zIndex: -9999,
  },
});
