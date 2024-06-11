import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EmployeeLogin from './components/Employee/EmployeeLogin';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import ManagerLogin from './components/Manager/ManagerLogin';
import ManagerDashboard from './components/Manager/ManagerDashboard';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="EmployeeLogin">
                <Stack.Screen name="EmployeeLogin" component={EmployeeLogin} />
                <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} />
                <Stack.Screen name="ManagerLogin" component={ManagerLogin} />
                <Stack.Screen name="ManagerDashboard" component={ManagerDashboard} />
                <Stack.Screen name="AdminLogin" component={AdminLogin} />
                <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
