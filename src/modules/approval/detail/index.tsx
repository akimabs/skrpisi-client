import React from 'react';
import {StatusBar, View} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useApprovalDetail} from './logic/useApprovalDetail';
import {styles} from './styles';
import {ActionApproval, HeaderApproval, ViewDescription} from './components';
import Modal from 'react-native-modal';
import {Button, Text, TextInput} from '@components';
import Textinput from 'src/components/textinput';
import {heightPercentageToDP} from 'react-native-responsive-screen';

type Prop = {
  key: string;
  name: string;
  params: {
    idReimburse: number;
    isReimburse: boolean;
  };
};

const ApprovalDetail = () => {
  const {params} = useRoute<Prop>();
  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  });

  const {
    reimburseData,
    loading,
    modalReason,
    inputReason,
    _handleInputReason,
    _visibleModalReason,
    _editStatusApproval,
  } = useApprovalDetail({
    idReimburse: params.idReimburse,
  });

  const loadingString = 'Loading...';
  const data = {
    image: loading ? loadingString : reimburseData?.attachment[0]?.url,
    reimburseName: loading ? loadingString : reimburseData?.reimburseName,
    createdDate: loading ? loadingString : reimburseData?.createdAt,
    amount: loading ? loadingString : reimburseData?.amount,
    description: loading ? loadingString : reimburseData?.description,
    type: loading ? loadingString : reimburseData?.type,
    nameUser: loading ? loadingString : reimburseData?.user?.username,
    position: loading ? loadingString : reimburseData?.user?.position,
    reason: loading ? loadingString : reimburseData?.approval?.reason,
  };

  return (
    <View style={styles.container}>
      <View>
        <HeaderApproval data={data} />
        <ViewDescription data={data} />
      </View>
      {!params?.isReimburse && (
        <ActionApproval
          inputReason={inputReason}
          handleInputReason={_handleInputReason}
          modalVisible={modalReason}
          handleOpenModal={_visibleModalReason}
          onAction={_editStatusApproval}
        />
      )}
    </View>
  );
};

export default ApprovalDetail;
