import {Text} from '@components';
import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {memo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {images} from 'src/themes/images';
import {styles} from '../../styles';

type Props = {
  titleContent: string;
};

const WidgetHeader = ({titleContent}: Props) => {
  const {goBack} = useNavigation();
  const menu = useMemo(
    () => [
      {
        name: 'Kesehatan',
        image: images.menu.medical,
      },
      {
        name: 'Perjalanan',
        image: images.menu.trip,
      },
      {
        name: 'Kacamata',
        image: images.menu.glasses,
      },
      {
        name: 'Lainnya',
        image: images.menu.other,
      },
    ],
    [],
  );

  const image = menu.filter(obj => obj.name === titleContent)[0];

  return (
    <View style={styles.header}>
      <View style={styles.containerBack}>
        <TouchableOpacity onPress={goBack} activeOpacity={0.8}>
          <Image source={images.global.back_black} style={styles.backButton} />
        </TouchableOpacity>
        <Text type="semibold">{titleContent}</Text>
      </View>
      <Image source={image.image} style={styles.imageBackgroud} />
    </View>
  );
};

export default memo(WidgetHeader);
