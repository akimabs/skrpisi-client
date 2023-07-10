import {Layout, Text} from '@components';
import {URL} from '@env';
import {StackActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useSelector} from 'react-redux';
import {showToast} from 'src/components/toast';
import {authSelector} from 'src/storage/selector/auth';
import {radius} from 'src/themes/sizes';
import {ERROR_STATE} from 'src/utils/constants/error_state';
import mime from 'mime';

const CameraScan = ({route}: any) => {
  const params = route.params;
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.back;
  const camera: any = useRef<Camera>(null);
  const user_data = useSelector(authSelector.auth);
  const [active, setActive] = useState<boolean>(true);

  const requestPermissions = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    if (newCameraPermission === 'denied') {
      navigation.goBack();
      showToast({message: ERROR_STATE.PERMISSION_CAMERA, type: 'error'});
    }
  };

  const _handlePickImage = async () => {
    const snapshot = await camera.current.takeSnapshot({
      quality: 85,
      skipMetadata: true,
    });

    const data: any = new FormData();
    const newImageUri = 'file:///' + snapshot.path.split('file:/').join('');

    data.append('files.attachment', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });

    data.append(
      'data',
      JSON.stringify({
        amount: 0,
        type: '',
        reimburseName: '',
        description: '',
      }),
    );
    setActive(false);
    axios
      .post(`${URL}/api/reimburses/`, data, {
        headers: {
          Authorization: `Bearer ${user_data?.jwt}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response?.data?.data) {
          axios
            .get(`${URL}/api/image-recognize/${response?.data?.data?.id}`, {
              headers: {
                Authorization: `Bearer ${user_data?.jwt}`,
              },
            })
            .then(resOCR => {
              navigation.dispatch(
                StackActions.replace('FormReimbursement', {
                  data: snapshot,
                  responseDataApi: response?.data?.data,
                  responseDataOcr: resOCR?.data,
                  initialForm: {
                    ...params?.initialForm,
                    amount: resOCR?.data?.totalPrice ?? 0,
                  },
                }),
              );
            });
        }
      });
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  if (device == null) return <View />;

  return (
    <Layout>
      <Camera
        ref={camera}
        style={{
          height: heightPercentageToDP(110),
          width: widthPercentageToDP(100),
        }}
        device={device}
        isActive={active}
      />
      <View
        style={{
          position: 'absolute',
          top: heightPercentageToDP(10),
          alignSelf: 'center',
          width: widthPercentageToDP(80),
        }}>
        <Text type="semibold" color={'white'} align="center">
          Arahkan bukti pembayaran sesuai layar di kamera anda
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: heightPercentageToDP(0),
          alignSelf: 'center',
          backgroundColor: '#000000' + 50,
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(20),
          alignItems: 'center',
          paddingTop: heightPercentageToDP(4),
          borderTopLeftRadius: radius.large,
          borderTopRightRadius: radius.large,
        }}>
        <TouchableOpacity
          onPress={_handlePickImage}
          style={{
            height: 80,
            width: 80,
            borderRadius: 2000,
            borderWidth: 7,
            borderColor: 'white',
          }}
        />
      </View>
    </Layout>
  );
};

export default CameraScan;
