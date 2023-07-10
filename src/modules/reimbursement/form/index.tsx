import {Button, Layout, Text, TextInput} from '@components';
import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {images} from 'src/themes/images';
import {useFormReimburse} from './logic/useFormReimburse';
import ImageView from 'react-native-image-viewing';
import Tooltip from 'react-native-walkthrough-tooltip';
import Modal from 'react-native-modal';
import {radius} from 'src/themes/sizes';
import {Controller} from 'react-hook-form';

const FormReimbursement = ({route}: any) => {
  const params = route?.params;
  const {
    visible,
    visibleCoachMark,
    visibleModalType,
    control,
    handleSubmit,
    onSubmit,
    setValue,
    loadingButton,
    onError,
    setIsVisible,
    setVisibleCoachMark,
    setVisibleModalType,
    _navigateCamera,
  }: {
    visible: boolean;
    visibleCoachMark: boolean;
    visibleModalType: boolean;
    loadingButton: boolean;
    control: any;
    handleSubmit: any;
    onSubmit: any;
    setValue: any;
    onError: any;
    _navigateCamera: () => void;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setVisibleCoachMark: React.Dispatch<React.SetStateAction<boolean>>;
    setVisibleModalType: React.Dispatch<React.SetStateAction<boolean>>;
  } = useFormReimburse({
    hasDataDraft: params?.data?.path !== undefined,
    responseDataApi: params?.responseDataApi,
    responseDataOcr: params?.responseDataOcr,
    initialForm: params?.initialForm,
  });
  const statusbarHeight: any = StatusBar.currentHeight;
  const newImageUri = 'file:///' + params?.data?.path.split('file:/').join('');
  const dataType = ['Kesehatan', 'Perjalanan', 'Kacamata', 'Lainnya'];
  const imagesData = [
    {
      uri: newImageUri,
    },
  ];

  return (
    <Layout>
      <ScrollView style={{padding: widthPercentageToDP(5)}}>
        <Text type="bold" size={17}>
          Form Reimbursement
        </Text>
        <View>
          <TouchableOpacity onPress={() => setVisibleModalType(true)}>
            <View pointerEvents="none">
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    label="Tipe"
                    value={value}
                    marginTop={20}
                    size={15}
                    onChangeText={onChange}
                  />
                )}
                name="type"
                rules={{required: true}}
              />
            </View>
          </TouchableOpacity>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                label="Nama Reimbursement"
                value={value}
                marginTop={20}
                size={15}
                onChangeText={onChange}
              />
            )}
            name="reimburseName"
            rules={{required: true}}
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                label="Deskripsi"
                value={value}
                marginTop={20}
                size={15}
                onChangeText={onChange}
              />
            )}
            name="description"
            rules={{required: true}}
          />
          <View>
            <Text style={{marginTop: 10}} type="regular">
              Unggah Foto Bukti
            </Text>
            {params?.data ? (
              <View
                style={{
                  flexDirection: 'row',
                  width: widthPercentageToDP(80),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setIsVisible(true)}>
                  <Image
                    source={{uri: newImageUri}}
                    style={{
                      marginTop: 10,
                      backgroundColor: 'grey',
                      height: 100,
                      width: 100,
                      borderRadius: 5,
                    }}
                  />
                </TouchableOpacity>
                <Tooltip
                  isVisible={visibleCoachMark}
                  topAdjustment={
                    Platform.OS === 'android' ? -statusbarHeight : 0
                  }
                  contentStyle={{height: 40, width: widthPercentageToDP(73)}}
                  content={
                    <View style={{height: 40, width: widthPercentageToDP(75)}}>
                      <Text type="regular" size={13}>
                        Silahkan cek kembali, data yang sudah terisi
                      </Text>
                    </View>
                  }
                  placement="bottom"
                  allowChildInteraction={false}
                  useInteractionManager={true}
                  onClose={() => {
                    setValue('amount', params?.responseDataOcr?.totalPrice);
                    setVisibleCoachMark(false);
                  }}>
                  <View
                    style={{
                      width: widthPercentageToDP(55),
                      marginLeft: widthPercentageToDP(5),
                    }}>
                    <Controller
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <TextInput
                          label="Total Harga"
                          value={`${value}`}
                          keyboardType="number-pad"
                          marginTop={20}
                          size={15}
                          onChangeText={onChange}
                        />
                      )}
                      name="amount"
                      rules={{
                        required: true,
                      }}
                    />
                  </View>
                </Tooltip>
              </View>
            ) : (
              <TouchableOpacity
                onPress={_navigateCamera}
                style={{
                  marginTop: 10,
                  height: 50,
                  width: 50,
                  borderRadius: 5,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={images.global.add_black}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <ImageView
        images={imagesData}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <Modal
        useNativeDriver
        isVisible={visibleModalType}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View
          style={{
            backgroundColor: 'white',
            height: heightPercentageToDP(32),
            borderTopLeftRadius: radius.medium,
            borderTopRightRadius: radius.medium,
          }}>
          <FlatList
            data={dataType}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setValue('type', item);
                    setVisibleModalType(false);
                  }}>
                  <Text type="semibold" style={{margin: 20}}>
                    {item}
                  </Text>
                  {index !== dataType.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: 'lightgrey',
                        width: widthPercentageToDP(100),
                      }}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
      <Button
        onPress={handleSubmit(onSubmit, onError)}
        isLoading={loadingButton}
        label="Ajukan"
        containerStyles={{
          width: widthPercentageToDP(90),
          alignSelf: 'center',
          marginBottom: 10,
        }}
      />
    </Layout>
  );
};

export default FormReimbursement;
