import React from 'react';
import {Layout} from '@components';
import {FormLogin} from './components';
import {ScrollView} from 'react-native';

const Login = () => {
  return (
    <Layout>
      <ScrollView>
        <FormLogin />
      </ScrollView>
    </Layout>
  );
};

export default Login;
