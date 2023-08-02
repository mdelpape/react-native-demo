import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MonthlyProps {
  monthlyGoals: string[];
}

export default function Monthly({ monthlyGoals }: MonthlyProps) {
  return (
    <View style={styles.container}>
      {monthlyGoals.map((goal, index) => <Text key={index}>{goal}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Style your container if needed
  }
});