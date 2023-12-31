import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusContext } from './StatusContext';

export default function Incomplete() {
  const { status, setStatus } = useContext(StatusContext);

  const handleComplete = (goal: string) => {
    setStatus(prevStatus => ({
      complete: [...prevStatus.complete, goal],
      incomplete: prevStatus.incomplete.filter(item => item !== goal)
    }))
  }

  return (
    <View style={styles.container}>
      {status.incomplete.map((goal, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.goalText} >{goal}</Text>
          <Button title="Done" onPress={() => handleComplete(goal)} />
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
  container: {
    margin: 5,
  },
  goalText: {
    fontStyle: 'italic',
  }

});
