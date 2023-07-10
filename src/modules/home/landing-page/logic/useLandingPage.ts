import {URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import axios, {Axios} from 'axios';
import httpStatus from 'http-status';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from 'src/components/toast';
import {storeUserData} from 'src/storage/actions/auth';
import {authSelector} from 'src/storage/selector/auth';
import {images} from 'src/themes/images';
import {POSITION} from 'src/utils/constants/position';

export const useLandingPage = () => {
  const navigation = useNavigation();
  const dispatchAction = useDispatch();
  const user_data = useSelector(authSelector.auth);

  const [isVisibleModal, setVisibleModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataReimburse, setDataReimburse] = useState<TReimburseData[]>();
  const [dataApproval, setDataApproval] = useState<TApprovalData[]>();
  const [dataReimburseArchived, setDataReimburseArchived] = useState<
    TReimburseData[]
  >([]);
  const [dataReimburseAccepted, setDataReimburseAccepted] = useState<
    TReimburseData[]
  >([]);
  const [visibleButton, setVisibleButton] = useState<boolean>(true);
  const animateVisibleButton = useRef(new Animated.Value(1)).current;

  const menu = useMemo(
    () => [
      {
        name: 'Kesehatan',
        image: images.menu.medical,
      },
      {
        name: 'Perjalanan',
        image: images.menu.trip,
      },
      {
        name: 'Kacamata',
        image: images.menu.glasses,
      },
      {
        name: 'Lainnya',
        image: images.menu.other,
      },
    ],
    [],
  );

  const _handleAnimate = (toValue: number) => {
    Animated.timing(animateVisibleButton, {
      toValue,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const _handleScrollBegin = () => {
    setVisibleButton(false);
    _handleAnimate(0);
  };

  const _handleScrollEnd = () => {
    setVisibleButton(true);
    _handleAnimate(1);
  };

  const _getDataReimbursement = useCallback(async () => {
    try {
      setLoading(true);
      const result: any = await axios.get(`${URL}/api/reimburses`, {
        headers: {
          Authorization: `Bearer ${user_data?.jwt}`,
        },
      });
      const valueData: TReimburseData[] = result.data?.data;
      if (valueData?.length > 0) {
        const data: TReimburseData[] = result?.data?.data;
        _handleNullData(data);
        _handleAcceptedData(data);
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
  }, [dataReimburse]);

  const _getDataApproval = useCallback(async () => {
    try {
      setLoading(true);
      const result: any = await axios.get(`${URL}/api/approvals`, {
        headers: {
          Authorization: `Bearer ${user_data?.jwt}`,
        },
        params: {
          status: 'WAITING',
        },
      });
      const valueData: TApprovalData[] = result.data?.data;
      if (valueData?.length > 0) {
        const data: TApprovalData[] = result?.data?.data;
        // setDataApproval(data);
        _handleNullDataApproval(data);
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
  }, [dataApproval]);

  const _navigateCamera = () => {
    navigation.navigate('FormReimbursement');
  };

  const _handleNullData = (dataReimburse: TReimburseData[]) => {
    const data: TReimburseData[] = [];
    const achivedData: TReimburseData[] = [];
    dataReimburse?.map(res => {
      if (res?.reimburseName !== '') {
        data.push(res);
      } else {
        achivedData.push(res);
      }
    });
    setDataReimburse(data);
    setDataReimburseArchived(achivedData);
  };

  const _handleNullDataApproval = (dataApproval: TApprovalData[]) => {
    const data: TApprovalData[] = [];
    const achivedData: TApprovalData[] = [];
    dataApproval?.map(res => {
      if (res.reimburses.length > 0 && res.reimburses[0].reimburseName !== '') {
        data.push(res);
      } else {
        achivedData.push(res);
      }
    });

    setDataApproval(data);
    // setDataReimburseArchived(achivedData);
  };

  // const _handleNullDelete = async () => {
  //   const result = await axios.delete(`${URL}/api/reimburses/`);
  // };

  const _handleAcceptedData = (dataReimburse: TReimburseData[]) => {
    const acceptedData: TReimburseData[] = [];
    dataReimburse?.map(res => {
      if (res.approval.status === 'APPROVE') {
        acceptedData.push(res);
      }
    });
    setDataReimburseAccepted(acceptedData);
  };

  const _navigateListContent = useCallback(
    (
      contentName: string,
      dataApproval: TApprovalData[],
      dataReimburse: TReimburseData[],
    ) => {
      navigation.navigate('ListContent', {
        contentName,
        dataApproval,
        dataReimburse,
      });
    },
    [dataApproval, dataReimburse],
  );

  const _handleClickProfile = useCallback(() => {
    setVisibleModal(true);
  }, [isVisibleModal]);

  const _handleCloseModal = useCallback(() => {
    setVisibleModal(false);
  }, [isVisibleModal]);

  const _handleLogout = useCallback(() => {
    setVisibleModal(false);
    setTimeout(() => {
      dispatchAction(storeUserData({}));
    }, 700);
  }, [user_data]);

  const _navigateToDetailReimburse = (idReimburse: string) => {
    navigation.navigate('ApprovalDetail', {idReimburse, isReimburse: true});
  };

  useEffect(() => {
    if (user_data?.user?.position === POSITION.HUMAN_RESOURCE) {
      _getDataApproval();
    } else {
      _getDataReimbursement();
    }
    // _handleNullDelete();
  }, []);

  return {
    menu,
    dataReimburse,
    loading,
    user_data,
    dataApproval,
    dataReimburseArchived,
    isVisibleModal,
    dataReimburseAccepted,
    visibleButton,
    animateVisibleButton,
    _handleScrollBegin,
    _handleScrollEnd,
    _navigateToDetailReimburse,
    _handleLogout,
    _handleCloseModal,
    _handleClickProfile,
    _getDataReimbursement,
    _getDataApproval,
    _navigateCamera,
    _navigateListContent,
  };
};
