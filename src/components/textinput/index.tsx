import React, {memo, useMemo} from 'react';
import {KeyboardType} from 'react-native';
import TextInput from 'react-native-material-textinput';
import {colors} from 'src/themes/colors';

type PropsCustomTextInput = {
  label: string;
  value: string;
  keyboardType?: KeyboardType;
  marginTop?: number;
  marginBottom?: number;
  onChangeText: (value: string) => void;
  autoFocus?: boolean;
  maxLength?: number;
  placeholder?: string;
  size?: number;
  isNotEditable?: boolean;
};

const CustomTextInput = ({
  label,
  value,
  keyboardType,
  marginBottom,
  marginTop,
  autoFocus,
  maxLength,
  placeholder,
  size,
  isNotEditable,
  onChangeText,
}: PropsCustomTextInput) => {
  const valueMemoize = useMemo(() => value, [value]);

  return (
    <TextInput
      editable={!isNotEditable}
      selectTextOnFocus={!isNotEditable}
      maxLength={maxLength}
      autoFocus={autoFocus}
      marginTop={marginTop}
      marginBottom={marginBottom}
      keyboardType={keyboardType}
      label={label}
      value={valueMemoize}
      onChangeText={onChangeText}
      underlineActiveColor={colors.dark}
      labelColor={colors.dark}
      secureTextEntry={label === 'Password'}
      placeholderColor={'lightgrey'}
      activeColor={colors.dark}
      placeholder={placeholder}
      fontFamily={'Poppins-Regular'}
      fontSize={size ?? 17}
    />
  );
};

export default memo(CustomTextInput);
