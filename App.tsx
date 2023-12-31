import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SetGoals from './components/SetGoals';
import Tdp from './components/Tdp';
import { StatusContext } from './components/StatusContext';
import { useState } from 'react';

type RootStackParamList = {
  "Set Your Goals": undefined;
  "Today's Goals": { dailyGoals: string[] };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [status, setStatus] = useState<{ incomplete: string[]; complete: string[] }>({ incomplete: ['Make a Doc Appointment', 'Go try that new boba place', 'Take sheets to the cleaners'], complete: [] });
  return (
    <StatusContext.Provider value={{status,setStatus}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Set Your Goals" component={SetGoals} />
          <Stack.Screen name="Today's Goals" component={Tdp} />
        </Stack.Navigator>
      </NavigationContainer>
    </StatusContext.Provider>
  );
}