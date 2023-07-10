import React, {memo, useCallback} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Text} from '@components';
import {styles} from '../../styles';
import {colors} from 'src/themes/colors';

type Props = {
  menu: {image: any; name: string}[];
  handleNavigate: (
    str: string,
    dataApproval: TApprovalData[],
    dataReimbuse: TReimburseData[],
  ) => void;
  dataApproval?: TApprovalData[] | any;
  dataReimburse?: TReimburseData[] | any;
};

const Category = ({
  menu,
  handleNavigate,
  dataApproval,
  dataReimburse,
}: Props) => {
  const renderItem = useCallback(
    ({item}: any) => {
      return (
        <TouchableOpacity
          onPress={() => handleNavigate(item.name, dataApproval, dataReimburse)}
          activeOpacity={0.8}
          style={styles.buttonCategory}>
          <Image source={item.image} style={styles.imageIcon} />
          <Text type="bold" color={colors.primary + 90}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [dataApproval, dataReimburse],
  );

  return (
    <View style={styles.containerCategory}>
      <Text type="bold">Kategori</Text>
      <FlatList
        contentContainerStyle={styles.containerListCategory}
        numColumns={2}
        data={menu}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default memo(Category);
