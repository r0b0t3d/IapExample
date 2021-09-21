import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useCounterContext} from './Counter';

export function DecrementButton() {
  const {decrement} = useCounterContext();

  return (
    <TouchableOpacity onPress={decrement} style={styles.button}>
      <Text>Decrement</Text>
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