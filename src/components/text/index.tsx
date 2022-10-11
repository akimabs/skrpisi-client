import React, {memo, useMemo} from 'react';
import {Animated, Platform} from 'react-native';
import {RFValue as fs} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {colors} from 'src/themes/colors';

import {styles} from './styles';

type PropsText = {
  children: any;
  color?: String;
  style?: Object;
  numberOfLines?: number;
  size?: number;
  type: 'light' | 'regular' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  [key: string]: any;
};

const Text = (props: PropsText) => {
  const TextStyles = useMemo(
    () => [
      props.type === 'light' && styles.light,
      props.type === 'regular' && styles.regular,
      props.type === 'semibold' && styles.semibold,
      props.type === 'bold' && styles.bold,
    ],
    [props.type],
  );

  const textColor = useMemo(
    () => [
      {
        color: props.color ? props.color : colors.dark,
      },
    ],
    [props.color],
  );

  const sizeText = useMemo(
    () => [
      {
        fontSize: props.size
          ? fs(
              Platform.OS === 'android' ? props.size - 1 : props.size + 1,
              heightPercentageToDP(100),
            )
          : fs(
              Platform.OS === 'android' ? 15 - 1 : 15,
              heightPercentageToDP(100),
            ),
      },
    ],
    [props.size],
  );

  const styleMerge = useMemo(
    () => [
      styles.regular,
      styles.regular,
      TextStyles,
      textColor,
      sizeText,
      props.style,
      {textAlign: props.align},
    ],
    [TextStyles, props.align, props.style, sizeText, textColor],
  );

  return (
    <Animated.Text
      {...props}
      minimumFontScale={12}
      maxFontSizeMultiplier={1}
      numberOfLines={props.numberOfLines}
      allowFontScaling={false}
      ellipsizeMode="tail"
      style={styleMerge}>
      {props.children}
    </Animated.Text>
  );
};

export default memo(Text);
