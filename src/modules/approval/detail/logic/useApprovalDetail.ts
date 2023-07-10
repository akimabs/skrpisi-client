import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from 'src/storage/selector/auth';
import {URL} from '@env';
import axios from 'axios';
import {storeUserData} from 'src/storage/actions/auth';
import {showToast} from 'src/components/toast';
import httpStatus from 'http-status';
import {isEmpty} from 'lodash';
import {StackActions, useNavigation} from '@react-navigation/native';

export const useApprovalDetail = ({idReimburse}: {idReimburse: number}) => {
  const user_data = useSelector(authSelector.auth);
  const dispatchAction = useDispatch();
  const {dispatch} = useNavigation();

  const [loading, setLoading] = useState<boolean>();
  const [reimburseData, setReimburseData] = useState<any>();
  const [modalReason, setModalReason] = useState<boolean>(false);
  const [inputReason, setInputReason] = useState<string>('');

  const _visibleModalReason = (visible: boolean) => {
    setModalReason(visible);
  };
  const _handleInputReason = (str: string) => {
    setInputReason(str);
  };

  const _getReimburseData = useCallback(async () => {
    try {
      setLoading(true);
      const result: any = await axios.get(
        `${URL}/api/reimburses/${idReimburse}?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${user_data?.jwt}`,
          },
        },
      );
      const valueData = result.data?.data;
      if (!isEmpty(valueData)) {
        const data = result?.data?.data;
        setReimburseData(data);
      }
    } catch ({response}) {
      const res = response as any;
      const code: any = res.status;
      if (code === 401 || 0) {
        dispatchAction(storeUserData({}));
      } else {
        showToast({
          message: `Something error with message: ${httpStatus[code]}`,
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const _editStatusApproval = useCallback(
    async (action: TStatus) => {
      try {
        const result: any = await axios.put(
          `${URL}/api/approvals/${reimburseData.approval?.id}`,
          {
            data: {
              status: action,
              reason: inputReason,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${user_data?.jwt}`,
            },
          },
        );
        const valueData = result.data?.data;
        if (!isEmpty(valueData)) {
          dispatch(StackActions.replace('LandingPage'));
        }
      } catch ({response}) {
        const res = response as any;
        const code: any = res?.status;
        if (code === 401 || 0) {
          dispatchAction(storeUserData({}));
        } else {
          showToast({
            message: `Something error with message: ${httpStatus[code]}`,
            type: 'error',
          });
        }
      }
    },
    [reimburseData, inputReason, dispatchAction],
  );

  useEffect(() => {
    _getReimburseData();
  }, []);

  return {
    loading,
    reimburseData,
    modalReason,
    inputReason,
    setInputReason,
    _handleInputReason,
    _editStatusApproval,
    _visibleModalReason,
  };
};
