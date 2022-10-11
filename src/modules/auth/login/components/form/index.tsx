import {View} from 'react-native';
import React, {useState} from 'react';
import {Button, Text, TextInput} from '@components';

import {styles} from '../../styles';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const Login = () => {
  const [name, setName] = useState('');
  const handleInputChange = (value: string) => setName(value);

  return (
    <View style={styles.containerForm}>
      <Text type="bold">
        Hai, masukan email kamu yang sudah didaftarkan oleh penyelenggara
        aplikasi yaa.
      </Text>
      <TextInput
        label="Name"
        value={name}
        marginTop={20}
        marginBottom={heightPercentageToDP(5)}
        onChangeText={handleInputChange}
        keyboardType="email-address"
      />
      <Button label="Submit" />
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

export default Login;
