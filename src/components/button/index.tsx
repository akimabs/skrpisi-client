import React, {memo, useMemo} from 'react';
import {StyleProp, TouchableOpacity, ViewProps} from 'react-native';
import {colors} from 'src/themes/colors';
import Text from '../text';
import {styles} from './styles';

type PropsButton = {
  label: string;
  containerStyles?: StyleProp<ViewProps>;
  isLoading?: boolean;
};

const Button = ({containerStyles, label, isLoading}: PropsButton) => {
  const backgroundColor = isLoading ? colors.primary + 20 : colors.primary;
  const styleMerge: any = useMemo(
    () => [styles.button, containerStyles, {backgroundColor}],
    [backgroundColor, containerStyles],
  );
  return (
    <TouchableOpacity activeOpacity={isLoading ? 1 : 0.9} style={styleMerge}>
      <Text type="bold" style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(Button);
