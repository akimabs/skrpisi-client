import {View} from 'react-native';
import React from 'react';
import {Button, Text, TextInput} from '@components';

import {styles} from '../../styles';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useCompanyScreening} from '../../logic/useCompanyScreening';

const Company = () => {
  const {companyName, loading, _handleInputChange, _sumbitRequest} =
    useCompanyScreening();

  return (
    <View style={styles.containerForm}>
      <Text type="bold" style={{width: widthPercentageToDP(70)}}>
        Hai, silahkan masukan nama perusahaan kamu.
      </Text>
      <TextInput
        label="Nama Perusahaan"
        value={companyName}
        marginTop={20}
        marginBottom={heightPercentageToDP(5)}
        onChangeText={_handleInputChange}
      />
      <Button onPress={_sumbitRequest} label="Submit" isLoading={loading} />
      <View style={styles.footer}>
        <Text type="semibold" size={12}>
          V.1.0.0
        </Text>
        <Text type="light" size={12}>
          Reimburse App
        </Text>
      </View>
    </View>
  );
};

export default Company;
