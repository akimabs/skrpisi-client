import {URL} from '@env';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {showToast} from 'src/components/toast';
import {ERROR_STATE} from 'src/utils/constants/error_state';
import status from 'http-status';
import {useDispatch} from 'react-redux';
import {storeUserData} from 'src/storage/actions/auth';
import {initDevice} from 'src/utils/scripts/initDevice';

export const useLogin = () => {
  const dispatchAction = useDispatch();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const _handleInputChange = useCallback(
    (value: string) => setUsername(value),
    [],
  );

  const _handleInputChangePassword = useCallback(
    (value: string) => setPassword(value),
    [],
  );

  const _sumbitRequest = async () => {
    const dataDevice = await initDevice();
    if (username?.length === 0 || password?.length === 0) {
      showToast({message: ERROR_STATE.MUST_FILL_FORM, type: 'error'});
    } else {
      setLoading(true);
      axios
        .post(`${URL}/api/auth/local`, {identifier: username, password})
        .then(res => {
          if (res?.data?.jwt) {
            axios.put(
              `${URL}/api/users/${res.data.user.id}`,
              {
                tokenNotification: `${dataDevice.tokenNotification}`,
              },
              {
                headers: {
                  Authorization: `Bearer ${res?.data?.jwt}`,
                },
              },
            );
            dispatchAction(storeUserData(res?.data));
            setLoading(false);
          }
        })
        .catch(({response}) => {
          showToast({
            message: `Something error with message: ${
              status[response?.status]
            }`,
            type: 'error',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return {
    loading,
    username,
    password,
    _handleInputChange,
    _handleInputChangePassword,
    _sumbitRequest,
  };
};
