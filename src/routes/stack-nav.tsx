import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {CompanyScreening, Login} from '../modules/auth';
import {CameraScan, LandingPage, ListContent} from 'src/modules/home';
import {authSelector} from 'src/storage/selector/auth';
import {FormReimbursement} from 'src/modules/reimbursement';
import {ApprovalDetail} from 'src/modules/approval';

const PublicStack = createStackNavigator();
const PrivateStack = createStackNavigator();

function StackNav() {
  const user_data = useSelector(authSelector.auth);
  const options = {
    cardStyle: {
      backgroundColor: 'white',
    },
    cardStyleInterpolator: ({current}: any) => ({
      cardStyle: {
        opacity: current.progress,
      },
    }),
  };

  if (user_data?.jwt) {
    return (
      <NavigationContainer>
        <PrivateStack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <PrivateStack.Screen name="LandingPage" component={LandingPage} />
          <PrivateStack.Screen name="CameraScan" component={CameraScan} />
          <PrivateStack.Screen name="ListContent" component={ListContent} />
          <PrivateStack.Screen
            name="FormReimbursement"
            component={FormReimbursement}
          />
          <PrivateStack.Screen
            name="ApprovalDetail"
            component={ApprovalDetail}
          />
        </PrivateStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <PublicStack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <PublicStack.Screen
          name="CompanyScreening"
          component={CompanyScreening}
        />
        <PublicStack.Screen
          name="Login"
          options={{...options}}
          component={Login}
        />
      </PublicStack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;
