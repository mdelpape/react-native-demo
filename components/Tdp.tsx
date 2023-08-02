import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Complete from './Complete';
import Incomplete from './Incomplete';

export default function Tdp() {
  const [days, setDays] = useState<{ name: string, past: boolean }[]>([]);

  useEffect(() => {
    const date = new Date();
    const currentDayIndex = date.getDay();

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const days = weekDays.map((day, index) => {
      return {
        name: day,
        past: index <= currentDayIndex,
      };
    });

    setDays(days);
  }, [])

  return (
    <View>
      <View style={styles.container}>
        {days.map((day, index) => (
          <View key={index} style={[styles.circle, day.past ? styles.past : styles.future]}>
            <View key={index} style={[styles.circle, day.past ? styles.past : styles.future]}>
              <Text style={styles.dayText}>{day.name[0]}</Text>
            </View>
          </View>
        ))}
      </View>
      <View>
        <Text style={styles.text}>
          Incompleted
        </Text>
        <Incomplete />
      </View>
      <View>
        <Text style={styles.text}>
          Complete
        </Text>
        <Complete />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  past: {
    backgroundColor: 'lightgray',
  },
  future: {
    backgroundColor: 'darkgray',
  },
  text: {
    fontSize: 25,
  },
  dayText: {
    textAlign: 'center',
    lineHeight: 30,
    color: 'black',
    fontWeight: 'bold',
  },
});