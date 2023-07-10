import {Text} from '@components';
import React, {memo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {colors} from 'src/themes/colors';
import {radius} from 'src/themes/sizes';
import {images} from 'src/themes/images';

type Props = {
  data?: TReimburseData[];
};

const Draft = ({data}: Props) => {
  return (
    <>
      {data?.length == 0 ? (
        <View />
      ) : (
        <View style={{backgroundColor: colors.backgroundSecondary}}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              width: widthPercentageToDP(90),
              alignSelf: 'center',
              backgroundColor: colors.warning,
              borderRadius: radius.medium,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 1000,
                backgroundColor: colors.warning_info,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: -7,
                left: -7,
              }}>
              <Image
                source={images.global.info}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </View>
            <Text type="semibold">{`Anda masih memiliki ${data?.length} pengajuan yang belum di selesaikan`}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default memo(Draft);
