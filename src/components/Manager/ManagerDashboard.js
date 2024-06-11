import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getManagerData } from '../../services/api';

const ManagerDashboard = ({ route }) => {
    const [employeesData, setEmployeesData] = useState([]);
    const { user } = route.params;

    useEffect(() => {
        const fetchEmployeesData = async () => {
            try {
                const records = await getManagerData(user.id);
                setEmployeesData(records);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchEmployeesData();
    }, [user.id]);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>Employee ID: {item.user_id}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Punch In: {item.punch_in_time}</Text>
            <Text>Punch Out: {item.punch_out_time}</Text>
            <Text>Location: {item.latitude}, {item.longitude}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>Welcome, {user.login_id}</Text>
            <FlatList
                data={employeesData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ManagerDashboard;
