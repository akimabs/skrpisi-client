import React from 'react';
import {Layout} from '@components';
import {FormCompanyScreening} from './components';
import {ScrollView} from 'react-native';

const CompanyScreening = () => {
  return (
    <Layout>
      <ScrollView>
        <FormCompanyScreening />
      </ScrollView>
    </Layout>
  );
};

export default CompanyScreening;
