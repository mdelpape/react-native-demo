import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface OngoingProps {
  OngoingGoals: string[];
}

export default function Ongoing({ OngoingGoals }: OngoingProps) {
  return (
    <View style={styles.container}>
      {OngoingGoals.map((goal, index) => <Text key={index}>{goal}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});