import {Accordion, Button, EmptyState, Text} from '@components';
import React, {memo, useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {formatRupiah} from 'src/utils/scripts/formatRupiah';
import {styles} from '../../styles';
import {colors} from 'src/themes/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

type Props = {
  data?: TApprovalData[];
  withTitle?: boolean;
};

const WidgetAdminListApproval = ({data, withTitle = true}: Props) => {
  const [indexPress, setIndexPress] = useState<number>(-1);
  const {navigate} = useNavigation();

  const _navigateDetailApproval = (idReimburse: string) => {
    navigate('ApprovalDetail', {idReimburse});
  };

  const headerComponent = useCallback(
    (item: TApprovalData) => {
      return (
        <View>
          <Text type="semibold">{item.reimburses[0]?.reimburseName}</Text>
        </View>
      );
    },
    [indexPress],
  );

  const renderItem = useCallback(
    ({item, index}: {item: TApprovalData; index: number}) => {
      return (
        <Accordion
          isVisible={indexPress === index}
          componentHeader={() => headerComponent(item)}
          onPress={() => setIndexPress(index)}
          component={
            <View style={{marginTop: heightPercentageToDP(1)}}>
              <Text type="semibold" size={17} color={colors.amount}>
                {formatRupiah(item?.reimburses[0]?.amount)}
              </Text>
              <Text type="regular">{item?.reimburses[0]?.description}</Text>
              <Button
                label="Lihat Detail"
                onPress={() => _navigateDetailApproval(item.reimburses[0]?.id)}
                containerStyles={{marginTop: heightPercentageToDP(1)}}
              />
            </View>
          }
        />
      );
    },
    [indexPress, data],
  );

  return (
    <View>
      <View style={styles.containerApproval}>
        {withTitle && <Text type="bold">List Approval</Text>}

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={() => <EmptyState />}
        />
      </View>
    </View>
  );
};

export default memo(WidgetAdminListApproval);
