import {Text} from '@components';
import {URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {memo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {images} from 'src/themes/images';
import {styles} from '../../styles';

const HeaderApproval = ({data}: any) => {
  const {goBack} = useNavigation();

  return (
    <View style={styles.containerHeaderImage}>
      <Image source={{uri: `${URL}${data.image}`}} style={styles.imageHeader} />
      <View style={styles.containerHeader}>
        <View style={{position: 'absolute', left: 0}}>
          <TouchableOpacity onPress={() => goBack()} activeOpacity={0.8}>
            <Image source={images.global.back} style={styles.backButton} />
          </TouchableOpacity>
        </View>
        <View>
          <Text type="bold" color={'white'} size={19} align="center">
            {data?.reimburseName}
          </Text>
          <Text type="light" color={'white'} size={13} align="center">
            {moment(data?.createdDate).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(HeaderApproval);
