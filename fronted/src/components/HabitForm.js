import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Switch } from 'react-native';

export default function HabitForm({ onCreate }) {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState(false);

  const submit = () => {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), frequency, status, note: note.trim() });
    setName('');
    setNote('');
    setStatus(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Habit</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Frequency (e.g. Daily)" value={frequency} onChangeText={setFrequency} style={styles.input} />
      <TextInput placeholder="Note" value={note} onChangeText={setNote} style={styles.input} />
      <View style={styles.row}>
        <Text>Status:</Text>
        <Switch value={status} onValueChange={setStatus} />
      </View>
      <Button title="Add Habit" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    marginBottom: 12,
  },
  label: { fontWeight: '700', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
});
