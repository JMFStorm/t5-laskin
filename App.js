// In App.js in a new project

import * as React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  buttons: {
    marginBottom: 24,
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2222cc",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

function Calculator({ navigation }) {
  const [history, setHistory] = React.useState([]);
  const [num1, setNum1] = React.useState("");
  const [num2, setNum2] = React.useState("");

  const result = React.useRef(null);
  const historyIndex = React.useRef(0);

  const calculate = React.useCallback(
    (isMinus) => {
      const number1 = Number(num1) ?? 0;
      const number2 = Number(num2) ?? 0;

      result.current = isMinus ? number1 - number2 : number1 + number2;

      const newRow = {
        id: historyIndex.current,
        text: `${number1} ${isMinus ? "-" : "+"} ${number2} = ${
          result.current
        }`,
      };

      historyIndex.current += 1;
      setHistory((prev) => prev.concat(newRow));
      setNum1("");
      setNum2("");
    },
    [setHistory, num1, num2]
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Result: {result.current}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNum1}
        value={num1}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setNum2}
        value={num2}
        keyboardType="numeric"
      />
      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={() => calculate(false)}
          title="+"
          accessibilityLabel="Set plus"
        >
          <Text style={styles.text}>+</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => calculate(true)}>
          <Text style={styles.text}>-</Text>
        </Pressable>
      </View>
      <Button
        title="Calculation history"
        onPress={() => navigation.navigate("History", { historyList: history })}
      />
    </View>
  );
}

function History({ navigation, route }) {
  const { historyList } = route.params;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>History</Text>
      <FlatList
        data={historyList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18 }}>{item.text}</Text>
        )}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
