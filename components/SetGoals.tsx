import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Modal, TextInput, Animated, Dimensions } from 'react-native';
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
  const animatedValue = new Animated.Value(0);
  const { status, setStatus } = useContext(StatusContext);
  const [goalsShown, setGoalsShown] = useState(3)
  const [add, setAdd] = useState('')
  const [newGoal, setNewGoal] = useState('')
  const route = useRoute<SetGoalsScreenRouteProp>();
  const [modalVisible, setModalVisible] = useState(route.params?.modalVisible || false);
  const [monthlyGoals, setMonthlyGoals] = useState(['Brief for Robertson Project', 'Exercise three days per week'])
  const [ongoingGoals, setOngoingGoals] = useState(['Save for Europe trip', 'Run a half marathon'])
  const [dailyGoals, setDailyGoals] = useState([])

  //get access to width of screen
  const width = Dimensions.get('window').width;

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: width-100,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }),
    ]).start(() => startAnimation());
  }

  useEffect(() => {
    startAnimation();
  }, [])

  const animatedStyle = {
    top: 300,
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 50,
    position: 'absolute',
    transform: [
      {
        translateX: animatedValue,
      },
    ],
  };

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.addGoal}>
          <Button
            onPress={() => setModalVisible(true)}
            title="Add Goal"
            color="#000"
          />
        </View>
      ),
    });
  }, [])


  return (
    <View>
      <Animated.View style={animatedStyle}/>

      <Modal animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add your goal!</Text>
            <TextInput
              style={styles.input}
              placeholder="Goal title"
              onChangeText={text => setNewGoal(text)}
              value={newGoal}
            />
            <View style={styles.container}>
              <TouchableOpacity style={add === 'Monthly' ? styles.modalButtonSelected : styles.modalButton} onPress={() => setAdd('Monthly')}>
                <Text>Monthly</Text>
              </TouchableOpacity>
              <TouchableOpacity style={add === 'Ongoing' ? styles.modalButtonSelected : styles.modalButton} onPress={() => setAdd('Ongoing')}>
                <Text>Ongoing</Text>
              </TouchableOpacity>
              <TouchableOpacity style={add === 'Daily' ? styles.modalButtonSelected : styles.modalButton} onPress={() => setAdd('Daily')}>
                <Text>Daily</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addGoal} onPress={() => setModalVisible(false)}>
              <Text onPress={() => {
                handleAddGoal();
                setModalVisible(!modalVisible)
              }}>Add Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleGoToTodaysGoals}>
          <Text>{status.incomplete.length + ' '}Today's Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setGoalsShown(1)}>
          <Text>{monthlyGoals.length + ' '}Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setGoalsShown(2)}>
          <Text>{ongoingGoals.length + ' '}Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setGoalsShown(3)}>
          <Text>{status.incomplete.length + monthlyGoals.length + ongoingGoals.length + " "}All</Text>
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
  button: {
    alignItems: "center",
    backgroundColor: "#A9BCD4",
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 7,
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
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  addGoal: {
    borderColor: 'black',
    borderRadius: 7,
    backgroundColor: '#FF6B6B',
    minHeight: 20,
    minWidth: 70
  },

  input: {
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    minWidth: 150,
    height: 25,
  },
  modalButton: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 7,
    margin: 10
  },
  modalButtonSelected: {
    alignItems: "center",
    backgroundColor: "#A0A5BD",
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 7,
    margin: 10
  },

});
