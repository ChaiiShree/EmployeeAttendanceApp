import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { punchIn, punchOut, getAttendanceData } from '../../services/api';

const PunchButton = ({ user }) => {
    const [attendance, setAttendance] = useState(null);

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

    const handlePunchIn = async () => {
        try {
            const now = new Date();
            const data = {
                user_id: user.id,
                date: now.toISOString().split('T')[0],
                punch_in_time: now,
            };
            await punchIn(data);
            setAttendance(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handlePunchOut = async () => {
        try {
            const now = new Date();
            const data = {
                punch_out_time: now,
            };
            await punchOut(attendance.id, data);
            setAttendance(null);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Button
            title={attendance && attendance.punch_out_time ? "Punch In" : attendance ? "Punch Out" : "Punch In"}
            onPress={attendance ? handlePunchOut : handlePunchIn}
            disabled={attendance && attendance.punch_out_time}
        />
    );
};

export default PunchButton;
