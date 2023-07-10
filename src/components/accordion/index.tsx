import * as React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colors} from 'src/themes/colors';
import {images} from 'src/themes/images';

interface Accordion {
  component: React.ReactNode;
  isVisible: boolean;
  onPress: () => void;
  componentHeader: () => JSX.Element;
}

const Accordion = ({
  component,
  isVisible,
  onPress,
  componentHeader,
}: Accordion) => {
  const heightContent: any = React.useRef(0);
  const height = useSharedValue(0);

  const bodyContainerDynamicStyle = useAnimatedStyle(() => {
    return {
      height: height.value * heightContent.current,
      opacity: height.value === 0 ? 0 : 1,
    };
  });

  const dynamicStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${height.value * 180}deg`}],
    };
  });

  React.useEffect(() => {
    if (isVisible) {
      height.value = withTiming(1, {
        duration: 300,
        easing: Easing.bezier(0.65, 0, 0.35, 1),
      });
    } else {
      height.value = withTiming(0, {
        duration: 300,
        easing: Easing.bezier(0.65, 0, 0.35, 1),
      });
    }
  }, [isVisible, heightContent, height]);

  const RenderComponent = () => {
    return (
      <View
        onLayout={event => {
          heightContent.current = event.nativeEvent.layout.height.toFixed();
        }}>
        {component}
      </View>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onPress();
      }}
      style={styles.containerAccordion}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.chevronIcon}>
            <View>{componentHeader()}</View>
            <Animated.View style={dynamicStyle}>
              {/* <IcArrowDown /> */}
              <Image
                source={images.global.chevron_down}
                style={styles.chevronDown}
              />
            </Animated.View>
          </View>
        </View>
      </View>
      <Animated.View style={[styles.bodyContainer, bodyContainerDynamicStyle]}>
        <View
          style={
            (styles.bodyContent, {height: Dimensions.get('window').height})
          }>
          <RenderComponent />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  headerContent: {
    width: '100%',
  },
  bodyContainer: {width: '100%', overflow: 'hidden'},
  bodyContent: {width: '100%'},
  chevronIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerAccordion: {
    margin: 5,
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: 'lightgrey',
    shadowColor: colors.dark + 60,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chevronDown: {
    height: 20,
    width: 20,
  },
});

export default React.memo(Accordion);
