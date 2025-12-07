import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import HabitForm from './src/components/HabitForm';
import HabitItem from './src/components/HabitItem';
import api from './src/api';

export default function App() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await api.getHabits();
      setHabits(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', `Failed to load habits: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (h) => {
    try {
      const created = await api.createHabit(h);
      setHabits((s) => [created, ...s]);
    } catch (e) {
      Alert.alert('Error', `Failed to create: ${e.message}`);
    }
  };

  const handleToggle = async (id, newStatus) => {
    try {
      await api.toggleHabitStatus(id, newStatus);
      setHabits((s) => s.map((it) => (it.id === id ? { ...it, status: newStatus } : it)));
    } catch (e) {
      Alert.alert('Error', `Failed to update status: ${e.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteHabit(id);
      setHabits((s) => s.filter((it) => it.id !== id));
    } catch (e) {
      Alert.alert('Error', `Failed to delete: ${e.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Habits</Text>
        <Text style={styles.subtitle}>Manage your habits from the backend</Text>
      </View>

      <HabitForm onCreate={handleCreate} />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={habits}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <HabitItem habit={item} onToggle={handleToggle} onDelete={handleDelete} />
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f4f7' },
  header: { marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { color: '#666' },
});
