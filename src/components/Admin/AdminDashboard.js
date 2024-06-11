import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAllAttendanceData } from '../../services/api';

const AdminDashboard = ({ route }) => {
    const [allEmployeesData, setAllEmployeesData] = useState([]);
    const { user } = route.params;

    useEffect(() => {
        const fetchAllEmployeesData = async () => {
            try {
                const records = await getAllAttendanceData();
                setAllEmployeesData(records);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchAllEmployeesData();
    }, []);

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
                data={allEmployeesData}
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

export default AdminDashboard;
