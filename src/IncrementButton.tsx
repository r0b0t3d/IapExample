import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useCounterContext} from './Counter';

export function IncrementButton() {
  const {increment} = useCounterContext();

  return (
    <TouchableOpacity onPress={increment} style={styles.button}>
      <Text>Increment</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    marginTop: 20,
  },
});
