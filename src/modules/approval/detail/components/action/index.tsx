import {Button, Text, TextInput} from '@components';
import React, {memo, useState} from 'react';
import {View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {colors} from 'src/themes/colors';
import {styles} from '../../styles';
import Modal from 'react-native-modal';
type Props = {
  onAction: (status: TStatus) => void;
  handleOpenModal: (value: boolean) => void;
  modalVisible: boolean;
  inputReason: string;
  handleInputReason: (str: string) => void;
};

const ActionApproval = ({
  onAction,
  handleOpenModal,
  modalVisible,
  inputReason,
  handleInputReason,
}: Props) => {
  const [stateAction, setStateAction] = useState<'APPROVE' | 'REJECTED'>(
    'APPROVE',
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
      }}>
      <Button
        onPress={() => {
          handleOpenModal(true);
          setStateAction('REJECTED');
        }}
        label="Reject"
        containerStyles={{
          width: widthPercentageToDP(80 / 2),
          backgroundColor: colors.danger,
        }}
      />
      <Button
        onPress={() => {
          setStateAction('APPROVE');
          handleOpenModal(true);
        }}
        label="Approve"
        containerStyles={{
          width: widthPercentageToDP(80 / 2),
          backgroundColor: colors.amount,
        }}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => handleOpenModal(false)}
        onBackButtonPress={() => handleOpenModal(false)}
        style={styles.modal}
        backdropOpacity={0.3}>
        <View style={styles.modalActionReason}>
          <Text type="bold">Kenapa kamu melakukan aksi ini ?</Text>
          <TextInput
            label=""
            value={inputReason}
            marginTop={20}
            autoFocus
            marginBottom={heightPercentageToDP(2)}
            onChangeText={handleInputReason}
            placeholder={`Cth: ${
              stateAction === 'REJECTED' ? 'Total belanja tidak wajar' : 'Valid'
            }`}
          />
          <Button
            label="Submit"
            onPress={() => {
              handleOpenModal(false);
              setTimeout(() => {
                onAction(stateAction);
              }, 500);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default memo(ActionApproval);
