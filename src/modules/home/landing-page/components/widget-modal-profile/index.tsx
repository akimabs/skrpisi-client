import {Button} from '@components';
import React, {memo} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {WidgetLandingPage} from '..';
import {styles} from '../../styles';

type Props = {
  name: string;
  position: string;
  isVisible: boolean;
  handleCloseModal: () => void;
  handleLogout: () => void;
};

const ModalProfile = ({
  name,
  position,
  isVisible,
  handleCloseModal,
  handleLogout,
}: Props) => {
  return (
    <Modal
      useNativeDriver
      animationOutTiming={700}
      onBackdropPress={handleCloseModal}
      onBackButtonPress={handleCloseModal}
      isVisible={isVisible}
      backdropOpacity={0.1}
      style={styles.modal}>
      <View style={styles.containerModal}>
        <WidgetLandingPage.Header name={name} position={position} />
        <Button
          onPress={handleLogout}
          label="Logout"
          containerStyles={styles.buttonLogout}
        />
      </View>
    </Modal>
  );
};

export default memo(ModalProfile);
