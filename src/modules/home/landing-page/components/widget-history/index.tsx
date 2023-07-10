import React, {memo, useCallback, useMemo} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {EmptyState, Text} from '@components';
import dayjs from 'dayjs';

import {styles} from '../../styles';
import {colors} from 'src/themes/colors';
import {scipts} from 'src/utils/scripts';
import {space} from 'src/themes/space';
import {colorStatus} from 'src/utils/scripts/colorStatus';

type Props = {
  data?: TReimburseData[];
  withTitle?: boolean;
  handleClickItem?: (idReimburse: any) => void;
};

const History = ({
  data,
  withTitle = true,
  handleClickItem = () => {},
}: Props) => {
  const renderItem = useCallback(({item}: {item: TReimburseData}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleClickItem(item.id)}
        style={[
          styles.containerCardHistory,
          {shadowColor: colorStatus(item.approval.status)},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: space.x1,
          }}>
          <View style={styles.containerDataHistoryLeft}>
            <Text type="regular" size={10}>
              Tipe
            </Text>
            <Text type="regular">{item.type}</Text>
          </View>
          <View style={styles.containerDataHistoryRight}>
            <Text type="regular" size={10}>
              Status
            </Text>
            <Text type="bold" color={colorStatus(item.approval.status)}>
              {item?.approval?.status}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.containerDataHistoryLeft}>
            <Text type="regular" size={10}>
              Tanggal Pengajuan
            </Text>
            <Text type="semibold">
              {dayjs(item.createdAt).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={styles.containerDataHistoryRight}>
            <Text type="regular" size={10}>
              Jumlah
            </Text>
            <Text type="bold" color={colors.amount}>
              {scipts.formatRupiah(`${item.amount}`)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View
      style={
        withTitle ? styles.containerHistory : styles.containerHistoryWithNoTitle
      }>
      {/* Header */}
      {withTitle && (
        <View style={styles.headerHistory}>
          <Text type="bold">Histori</Text>
          {/* <TouchableOpacity activeOpacity={0.7}>
            <Text type="regular" size={14} color={colors.link}>
              Lihat Semua
            </Text>
          </TouchableOpacity> */}
          <View />
        </View>
      )}
      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        style={{marginBottom: 20}}
        ListEmptyComponent={() => <EmptyState />}
      />
    </View>
  );
};

export default memo(History);
