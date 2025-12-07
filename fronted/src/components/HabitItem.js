import React from 'react';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';

export default function HabitItem({ habit, onToggle, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.rowTop}>
        <Text style={styles.name}>{habit.name}</Text>
        <Switch value={habit.status} onValueChange={(v) => onToggle(habit.id, v)} />
      </View>
      <Text style={styles.freq}>{habit.frequency}</Text>
      {habit.note ? <Text style={styles.note}>{habit.note}</Text> : null}
      <View style={styles.actions}>
        <Button title="Delete" color="#c00" onPress={() => onDelete(habit.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '600' },
  freq: { color: '#666', marginTop: 4 },
  note: { marginTop: 8, color: '#333' },
  actions: { marginTop: 8, flexDirection: 'row', justifyContent: 'flex-end' },
});
