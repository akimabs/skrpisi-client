import React, {memo, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import DashedLine from 'react-native-dashed-line';

import {Text} from '@components';
import {styles} from '../../styles';
import {URL} from '@env';
import {radius} from 'src/themes/sizes';
import {colors} from 'src/themes/colors';
import {formatRupiah} from 'src/utils/scripts/formatRupiah';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import initials from 'initials';

const ViewDescription = ({data}: any) => {
  const [imageShowing, setImageShowing] = useState<boolean>(false);

  const image: string = `${URL}${data.image}`;
  const images = [{uri: image}];

  return (
    <View style={styles.containerView}>
      <Text type="bold">Detail Pengajuan</Text>
      <View style={{marginTop: 20, flexDirection: 'row'}}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: 'lightgrey',
            marginRight: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text type="regular">{initials(data?.nameUser)}</Text>
        </View>
        <View>
          <Text type="semibold">{data?.nameUser}</Text>
          <Text type="regular">{data?.position}</Text>
        </View>
      </View>
      <View style={{marginTop: 20, marginBottom: 10}}>
        <DashedLine dashLength={5} dashThickness={1} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: widthPercentageToDP(85),
          alignSelf: 'center',
        }}>
        <View>
          <View style={{marginTop: 5, marginBottom: 15}}>
            <View style={{marginBottom: 20}}>
              <Text type="regular" size={12} color="grey">
                Tipe
              </Text>
              <Text type="semibold" size={14}>
                {data?.type}
              </Text>
            </View>
            <View style={{marginBottom: 5}}>
              <Text type="regular" size={12} color="grey">
                Deskripsi
              </Text>
              <Text type="semibold" size={14}>
                {data?.description}
              </Text>
            </View>
          </View>
          {data?.reason && (
            <View style={{marginTop: 5, marginBottom: 15}}>
              <View style={{marginBottom: 20}}>
                <Text type="regular" size={12} color="grey">
                  Alasan
                </Text>
                <Text type="semibold" size={14}>
                  {data?.reason}
                </Text>
              </View>
              <View style={{marginBottom: 5}}>
                <Text type="regular" size={12} color="grey">
                  Deskripsi
                </Text>
                <Text type="semibold" size={14}>
                  {data?.description}
                </Text>
              </View>
            </View>
          )}
          <View>
            <Text type="regular" size={12} color="grey">
              Lampiran
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setImageShowing(true)}>
              <Image
                source={{uri: image}}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: radius.medium,
                  marginTop: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text type="regular" size={12}>
            Total Reimbursement
          </Text>
          <Text type="bold" color={colors.amount} size={28}>
            {formatRupiah(data?.amount)}
          </Text>
        </View>
        <ImageView
          images={images}
          imageIndex={0}
          visible={imageShowing}
          onRequestClose={() => setImageShowing(false)}
        />
      </View>
    </View>
  );
};

export default memo(ViewDescription);
