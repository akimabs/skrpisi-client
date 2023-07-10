import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '@components';
import {styles} from '../../styles';
import initials from 'initials';

type Props = {
  name: string;
  position: string;
  handleClickProfile?: () => void;
};

const Header = ({name, position, handleClickProfile}: Props) => {
  return (
    <View style={styles.headerLandingPageContainer}>
      <TouchableOpacity onPress={handleClickProfile} style={styles.profile}>
        <Text type="regular">{initials(name)}</Text>
      </TouchableOpacity>
      <View>
        <Text type="bold">{name}</Text>
        <Text type="regular">{position}</Text>
      </View>
    </View>
  );
};

export default memo(Header);
