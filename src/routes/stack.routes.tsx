import React from 'react'; 
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import { Confirmation } from '../pages/Confirmation';
import { UserIndetification } from '../pages/UserIndetification';
import { Welcome } from '../pages/Welcome';

const stackRoutes = createStackNavigator()

const AppRouts: React.FC = () => (
    <stackRoutes.Navigator
        headerMode='none' //header não apareça
        screenOptions={{ 
            cardStyle: {
                backgroundColor: colors.white
            },
        }}
    >
        <stackRoutes.Screen 
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen 
            name="UserIndetification"
            component={UserIndetification}
        />

        <stackRoutes.Screen 
            name="Confirmation"
            component={Confirmation}
        />

    </stackRoutes.Navigator>
)

export default AppRouts;