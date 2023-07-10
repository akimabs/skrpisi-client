import {StackActions, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Alert, BackHandler} from 'react-native';
import {useForm as useFormHooks} from 'react-hook-form';
import axios from 'axios';
import {URL} from '@env';
import {useSelector} from 'react-redux';
import {authSelector} from 'src/storage/selector/auth';
import {showToast} from 'src/components/toast';
import httpStatus from 'http-status';
import {ERROR_STATE} from 'src/utils/constants/error_state';

export const useFormReimburse = ({
  hasDataDraft,
  responseDataApi,
  responseDataOcr,
  initialForm,
}: {
  hasDataDraft: boolean;
  responseDataApi: TReimburseData;
  responseDataOcr: any;
  initialForm: TReimburseForm;
}) => {
  const navigation = useNavigation();
  const user_data = useSelector(authSelector.auth);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
    setValue,
  } = useFormHooks({
    defaultValues: {
      type: '',
      reimburseName: '',
      description: '',
      amount: 0,
    },
  });

  const onError = (data: any) => {
    showToast({message: ERROR_STATE.MUST_FILL_FORM, type: 'error'});
  };

  const onSubmit = (data: TReimburseForm) => {
    const values = getValues();
    if (values.amount === 0 || undefined || null) {
      showToast({message: ERROR_STATE.MUST_FILL_FORM, type: 'error'});
    } else {
      setLoadingButton(true);
      axios
        .put(
          `${URL}/api/reimburses/${responseDataApi.id}`,
          {
            data,
          },
          {
            headers: {
              Authorization: `Bearer ${user_data?.jwt}`,
            },
          },
        )
        .then(res => {
          if (res.status === 200) {
            navigation.dispatch(StackActions.replace('LandingPage'));
          } else {
            showToast({message: httpStatus[res.status], type: 'error'});
          }
        })
        .finally(() => {
          setLoadingButton(false);
        });
    }
  };

  const [visible, setIsVisible] = useState<boolean>(false);
  const [visibleCoachMark, setVisibleCoachMark] = useState<boolean>(false);
  const [visibleModalType, setVisibleModalType] = useState<boolean>(false);

  useEffect(() => {
    if (hasDataDraft) {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => navigation.goBack()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
    return () => null;
  }, []);

  useEffect(() => {
    if (responseDataOcr?.totalPrice !== 0) {
      setVisibleCoachMark(true);
    }
  }, [responseDataOcr]);

  useEffect(() => {
    if (initialForm) {
      setValue('description', initialForm.description);
      setValue('reimburseName', initialForm.reimburseName);
      setValue('type', initialForm.type);
      setValue('amount', initialForm?.amount);
    }
  }, [initialForm]);

  const _navigateCamera = () => {
    const values = getValues();
    navigation.dispatch(
      StackActions.replace('CameraScan', {initialForm: values}),
    );
  };

  return {
    visible,
    visibleCoachMark,
    visibleModalType,
    control,
    formState: {errors},
    loadingButton,
    onError,
    handleSubmit,
    setValue,
    onSubmit,
    _navigateCamera,
    setIsVisible,
    setVisibleCoachMark,
    setVisibleModalType,
  };
};
