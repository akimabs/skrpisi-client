import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {authSelector} from 'src/storage/selector/auth';
import {POSITION} from 'src/utils/constants/position';

type Props = {
  titleContent: string;
  dataApproval: TApprovalData[];
  dataReimburse: TReimburseData[];
};

export const useListComponent = ({
  titleContent,
  dataApproval,
  dataReimburse,
}: Props) => {
  const user_data = useSelector(authSelector.auth);
  const isAdmin = user_data?.user?.position === POSITION.HUMAN_RESOURCE;
  const navigation = useNavigation();

  const [dataApprovalState, setDataApproval] = useState<TApprovalData[]>([]);
  const [dataReimburseState, setDataReimburse] = useState<TReimburseData[]>([]);
  let temporaryApproval: TApprovalData[] = [];

  const _navigateToDetailReimburse = (idReimburse: string) => {
    navigation.navigate('ApprovalDetail', {idReimburse, isReimburse: true});
  };
  let temporaryReimburse: TReimburseData[] = [];

  const _handleFilterApprovalContent = useCallback(() => {
    if (dataApprovalState.length) {
      dataApproval.map(resOne => {
        resOne.reimburses.map(res => {
          if (res.type === titleContent) {
            temporaryApproval.push({...resOne});
            setDataApproval(temporaryApproval);
          }
        });
      });
    }
  }, [dataApproval]);

  const _handleFilterReimburseContent = useCallback(() => {
    if (dataReimburse?.length) {
      dataReimburse.map(resOne => {
        if (resOne.type === titleContent) {
          temporaryReimburse.push({...resOne});
          setDataReimburse(temporaryReimburse);
        }
      });
    }
  }, [dataReimburse]);

  useEffect(() => {
    if (isAdmin) {
      _handleFilterApprovalContent();
    } else {
      _handleFilterReimburseContent();
    }
  }, [dataApproval, dataReimburse]);

  return {
    dataApprovalState,
    dataReimburseState,
    isAdmin,
    _navigateToDetailReimburse,
  };
};
