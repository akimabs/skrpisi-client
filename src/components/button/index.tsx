import React, {memo, useMemo} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {colors} from 'src/themes/colors';
import Text from '../text';
import {styles} from './styles';

type PropsButton = {
  label: string;
  containerStyles?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  onPress?: () => void;
  labelColor?: string;
};

const Button = ({
  containerStyles,
  label,
  isLoading,
  labelColor = colors.light,
  onPress,
}: PropsButton) => {
  const backgroundColor = isLoading ? colors.primary + 20 : colors.primary;
  const styleMerge: any = useMemo(
    () => [styles.button, {backgroundColor}, containerStyles],
    [backgroundColor, containerStyles],
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={isLoading ? 1 : 0.9}
      style={styleMerge}>
      <Text type="bold" color={labelColor}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(Button);
