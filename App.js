import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  return (
      <View style={styles.container}>
        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
            contentContainerStyle={{
              flexGrow: 1
            }}
            keyboardShouldPersistTaps='handled'
        >

          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Yapılacaklar</Text>
            <View style={styles.items}>
              {
                taskItems.map((item, index) => {
                  return (
                      <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                        <Task text={item} />
                      </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>

        </ScrollView>

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholderTextColor={'#fff'} placeholder={'Yap'} value={task} onChangeText={text => setTask(text)} />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#2C2C2C',
    borderRadius: 60,
    borderColor: '#2C2C2C',
    borderWidth: 1,
    width: 250,
    color: '#FFF',
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#2C2C2C',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2C2C2C',
    borderWidth: 1,
  },
  addText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});