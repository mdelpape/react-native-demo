import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusContext } from './StatusContext';

export default function Complete() {
  const { status, setStatus } = useContext(StatusContext);

  return (
    <View >
      {status.complete.map((goal, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.completeText}>{goal}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completeText: {
    textDecorationLine: 'line-through',
  }
});
