import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { login } from '../../services/auth'; // Corrected import

const Login = ({ navigation, role }) => {
    const [department, setDepartment] = useState('');
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const user = await login(department, loginId, password);
            if (role === 'admin') navigation.navigate('AdminDashboard', { user });
            if (role === 'manager') navigation.navigate('ManagerDashboard', { user });
            if (role === 'employee') navigation.navigate('EmployeeDashboard', { user });
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Department</Text>
            <TextInput
                style={styles.input}
                value={department}
                onChangeText={setDepartment}
            />
            <Text>Login ID</Text>
            <TextInput
                style={styles.input}
                value={loginId}
                onChangeText={setLoginId}
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default Login;
