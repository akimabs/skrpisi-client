import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {URL} from '@env';
import {showToast} from 'src/components/toast';
import {ERROR_STATE} from 'src/utils/constants/error_state';

export const useCompanyScreening = () => {
  const {navigate} = useNavigation();

  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getData = () => {
    axios.get(`${URL}/api/companies`).then(res => {
      setCompanies(res?.data?.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const _handleInputChange = useCallback(
    (value: string) => setCompanyName(value),
    [],
  );

  const _sumbitRequest = () => {
    let obj = companies.find(
      (o: any) =>
        o?.attributes?.name?.toLowerCase() === companyName?.toLowerCase(),
    );

    if (companyName.length === 0) {
      showToast({message: ERROR_STATE.MUST_FILL_FORM, type: 'error'});
    }

    if (obj !== undefined) {
      setLoading(true);
      Promise.all([navigate('Login'), setLoading(false)]);
    } else {
      showToast({message: ERROR_STATE.COMPANY_NOT_FOUND, type: 'error'});
    }
  };

  return {
    loading,
    companyName,
    _handleInputChange,
    _sumbitRequest,
  };
};
