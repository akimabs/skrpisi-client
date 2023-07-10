import {View} from 'react-native';
import React from 'react';
import {Button, Text, TextInput} from '@components';

import {styles} from '../../styles';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useLogin} from '../../logic/useLogin';

const Login = () => {
  const {
    username,
    password,
    loading,
    _handleInputChange,
    _handleInputChangePassword,
    _sumbitRequest,
  } = useLogin();

  return (
    <View style={styles.containerForm}>
      <Text type="bold" style={{width: widthPercentageToDP(70)}}>
        Masukan username dan password yang diberikan oleh admin kamu.
      </Text>
      <TextInput
        label="Username"
        value={username}
        marginTop={20}
        autoFocus
        marginBottom={heightPercentageToDP(2)}
        onChangeText={_handleInputChange}
        placeholder="Cth: ahakim"
      />
      <TextInput
        label="Password"
        value={password}
        marginTop={20}
        marginBottom={heightPercentageToDP(5)}
        onChangeText={_handleInputChangePassword}
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

export default Login;
