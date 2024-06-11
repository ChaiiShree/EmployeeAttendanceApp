import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { punchIn, punchOut, getAttendanceData } from '../../services/api';

const EmployeeDashboard = ({ route }) => {
    const [attendance, setAttendance] = useState(null);
    const { user } = route.params;

    const handlePunchIn = async () => {
        Geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const now = new Date();
                const data = {
                    user_id: user.id,
                    date: now.toISOString().split('T')[0],
                    punch_in_time: now,
                    latitude,
                    longitude,
                };
                try {
                    const record = await punchIn(data);
                    setAttendance(record);
                } catch (error) {
                    console.error(error.message);
                }
            },
            (error) => console.error(error.message),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const handlePunchOut = async () => {
        const now = new Date();
        const data = {
            punch_out_time: now,
        };
        try {
            const updatedRecord = await punchOut(attendance.id, data);
            setAttendance(updatedRecord);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const records = await getAttendanceData(user.id);
                const todayRecord = records.find(record => record.date === new Date().toISOString().split('T')[0]);
                setAttendance(todayRecord);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchAttendanceData();
    }, [user.id]);

    return (
        <View style={styles.container}>
            <Text>Welcome, {user.login_id}</Text>
            <Button title={attendance && attendance.punch_out_time ? "Already Punched Out" : attendance ? "Punch Out" : "Punch In"} onPress={attendance ? handlePunchOut : handlePunchIn} disabled={attendance && attendance.punch_out_time} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default EmployeeDashboard;
