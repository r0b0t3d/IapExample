import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IncrementButton} from './IncrementButton';
import {DecrementButton} from './DecrementButton';

const storeCounter = async (value: number) => {
  try {
    await AsyncStorage.setItem('counter', value + '');
  } catch (e) {
    // saving error
  }
};

const getCounter = async () => {
  const counter = await AsyncStorage.getItem('counter');
  if (counter) {
    return parseInt(counter, 10);
  }
  return 0;
};

type ContextType = {
  counter: number;
  increment: () => void;
  decrement: () => void;
};

const CounterContext = createContext<ContextType>();

export function useCounterContext() {
  return useContext(CounterContext);
}

export default function Counter() {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    getCounter().then(setCounter);
  }, []);

  const increment = useCallback(async () => {
    const newValue = counter + 1;
    await storeCounter(newValue);
    const value = await getCounter();
    setCounter(value);
  }, [counter]);

  const decrement = useCallback(async () => {
    const newValue = counter - 1;
    await storeCounter(newValue);
    const value = await getCounter();
    setCounter(value);
  }, [counter]);

  const context = useMemo(() => {
    return {
      counter,
      increment,
      decrement,
    };
  }, [counter, increment, decrement]);

  return (
    <CounterContext.Provider value={context}>
      <View style={styles.container}>
        <View>
          <Text>{counter}</Text>
        </View>
        <View>
          <IncrementButton />
          <DecrementButton />
        </View>
      </View>
    </CounterContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
  },
});
