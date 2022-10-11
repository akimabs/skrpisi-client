import React, {memo} from 'react';
import {StatusBar, View} from 'react-native';

import {styles} from './styles';

type PropsLayout = {
  children: any;
};

const Layout = ({children}: PropsLayout) => {
  StatusBar.setBarStyle('light-content');
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');

  return <View style={styles.container}>{children}</View>;
};
export default memo(Layout);
