import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DebugOverlayProps {
  step: string;
  details?: string;
}

export default function DebugOverlay({ step, details }: DebugOverlayProps) {
  return (
    <View style={styles.overlay}>
      <Text style={styles.step}>Debug: {step}</Text>
      {details && <Text style={styles.details}>{details}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  step: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  details: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 5,
  },
});