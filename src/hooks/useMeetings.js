import { useState, useEffect } from 'react';
import { ref, onValue, set, push, remove } from 'firebase/database';
import { database } from '../firebase';

export function useMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const meetingsRef = ref(database, 'meetings');
    
    const unsubscribe = onValue(meetingsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          // Convert the object to an array and preserve IDs
          const meetingsArray = Object.entries(data).map(([id, meeting]) => ({
            ...meeting,
            id
          }));
          setMeetings(meetingsArray);
        } else {
          setMeetings([]);
        }
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const createMeeting = async (meetingData) => {
    try {
      const meetingsRef = ref(database, 'meetings');
      const newMeetingRef = push(meetingsRef);
      await set(newMeetingRef, meetingData);
      return newMeetingRef.key;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateMeeting = async (meetingId, meetingData) => {
    try {
      const meetingRef = ref(database, `meetings/${meetingId}`);
      await set(meetingRef, meetingData);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteMeeting = async (meetingId) => {
    try {
      const meetingRef = ref(database, `meetings/${meetingId}`);
      await remove(meetingRef);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    meetings,
    loading,
    error,
    createMeeting,
    updateMeeting,
    deleteMeeting
  };
} 