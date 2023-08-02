import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Modal, TextInput } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Monthly from './Monthly'
import Ongoing from './Ongoing';
import { StatusContext } from './StatusContext';

type RootStackParamList = {
  "Set Your Goals": { modalVisible: boolean };
  "Today's Goals": { dailyGoals: string[] };
};

type SetGoalsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Set Your Goals'
>;

type SetGoalsScreenRouteProp = RouteProp<RootStackParamList, 'Set Your Goals'>;

export default function SetGoals() {
  const { status, setStatus } = useContext(StatusContext);
  const [goalsShown, setGoalsShown] = useState(3)
  const [add, setAdd] = useState('')
  const [newGoal, setNewGoal] = useState('')
  const route = useRoute<SetGoalsScreenRouteProp>();
  const [modalVisible, setModalVisible] = useState(route.params?.modalVisible || false);
  const [monthlyGoals, setMonthlyGoals] = useState(['Brief for Robertson Project', 'Exercise three days per week'])
  const [ongoingGoals, setOngoingGoals] = useState(['Save for Europe trip', 'Run a half marathon'])
  const [dailyGoals, setDailyGoals ] = useState(['go to store'])


  const navigation = useNavigation<SetGoalsScreenNavigationProp>();

  const handleGoToTodaysGoals = () => {
    navigation.navigate("Today's Goals", { dailyGoals });
  };

  const handleAddGoal = () => {
    if (add === 'Daily') {
      setStatus(prevStatus => ({
        ...prevStatus,
        incomplete: [...prevStatus.incomplete, newGoal],
      }));
    } else {
      const goalUpdateFunctions = {
        'Monthly': setMonthlyGoals,
        'Ongoing': setOngoingGoals,
      };

      if (add in goalUpdateFunctions) {
        const updateFunc = goalUpdateFunctions[add as 'Monthly' | 'Ongoing'];
        updateFunc(prevGoals => [...prevGoals, newGoal]);
      } else {
        console.log('No category selected');
      }
    }
    setAdd('');
    setNewGoal('');
  };



  navigation.setOptions({
    headerRight: () => (
      <Button
        onPress={() => setModalVisible(true)}
        title="Add Goal"
        color="#000"
      />
    ),
  });

  return (
    <View>
      <Modal animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add your goal</Text>
            <TextInput
              placeholder="Goal title"
              onChangeText={text => setNewGoal(text)}
              value={newGoal}
            />
            <View style={styles.container}>
              <TouchableOpacity style={styles.button} onPress={() => setAdd('Monthly')}>
                <Text>Monthly</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setAdd('Ongoing')}>
                <Text>Ongoing</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setAdd('Daily')}>
                <Text>Daily</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text onPress={() =>{
                handleAddGoal();
                setModalVisible(!modalVisible)
              }}>Add Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleGoToTodaysGoals}>
          <Text>Today's Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setGoalsShown(1)}>
          <Text>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setGoalsShown(2)}>
          <Text>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setGoalsShown(3)}>
          <Text>All</Text>
        </TouchableOpacity>
      </View>

      {(goalsShown === 1 || goalsShown === 3) && <View>
        <Text style={styles.monthly}>Monthly Goals</Text>
        {(goalsShown === 1 || goalsShown === 3) && <Monthly monthlyGoals={monthlyGoals} />}
      </View>}

      {(goalsShown === 2 || goalsShown === 3) && <View>
        <Text style={styles.monthly}>Ongoing Goals</Text>
        <Ongoing OngoingGoals={ongoingGoals} />
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthly: {
    fontSize: 25,
  },
  ongoing: {
    fontSize: 25,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});