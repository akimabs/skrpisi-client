import React, {memo, useCallback, useMemo} from 'react';
import {FlatList, View} from 'react-native';
import {Text} from '@components';

import {styles} from '../../styles';
import {colors} from 'src/themes/colors';
import {scipts} from 'src/utils/scripts';

type Props = {
  data?: TReimburseData[];
  isLoading: boolean;
};

const Card = ({data = [], isLoading}: Props) => {
  const totalValue: number = useMemo(
    () => data?.reduce((n, {amount}) => Number(n) + Number(amount), 0),
    [isLoading, data],
  );

  const renderTotalValue = useCallback(() => {
    return (
      <View>
        <View style={styles.containerListCard}>
          <Text type="bold">Total</Text>
          <Text type="bold" color={colors.amount}>
            {isLoading
              ? 'Menghitung..'
              : scipts.formatRupiah(`${Number(totalValue)}`)}
          </Text>
        </View>
      </View>
    );
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <View />
      ) : (
        <>
          {data.length > 0 ? (
            <View style={styles.containerCard}>
              <Text type="bold">Total Reimburse Bulan Ini</Text>
              <View style={styles.containerCardList}>{renderTotalValue()}</View>
              <View style={styles.seeAllReimbursement} />
            </View>
          ) : (
            <View />
          )}
        </>
      )}
    </>
  );
};

export default memo(Card);
