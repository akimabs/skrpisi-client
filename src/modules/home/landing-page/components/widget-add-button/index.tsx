import React, {memo} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {colors} from 'src/themes/colors';
import {images} from 'src/themes/images';

type Props = {
  onPress: () => void;
};

const WidgetAddButton = ({onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        height: 70,
        width: 70,
        backgroundColor: colors.amount,
        position: 'absolute',
        borderRadius: 2000,
        bottom: widthPercentageToDP(10),
        right: widthPercentageToDP(5),
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,
        elevation: 23,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={images.global.add}
        style={{
          height: 30,
          width: 30,
        }}
      />
    </TouchableOpacity>
  );
};

export default memo(WidgetAddButton);
