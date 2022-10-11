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
};

const CustomTextInput = ({
  label,
  value,
  keyboardType,
  marginBottom,
  marginTop,
  onChangeText,
}: PropsCustomTextInput) => {
  const valueMemoize = useMemo(() => value, [value]);

  return (
    <TextInput
      marginTop={marginTop}
      marginBottom={marginBottom}
      keyboardType={keyboardType}
      label={label}
      value={valueMemoize}
      onChangeText={onChangeText}
      underlineActiveColor={colors.dark}
      labelColor={colors.dark}
      placeholderColor={colors.dark}
      activeColor={colors.dark}
    />
  );
};

export default memo(CustomTextInput);
