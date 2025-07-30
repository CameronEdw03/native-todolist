import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() === '') return;
    const newTask = { 
      id: Date.now().toString(), 
      text: task.trim(), 
      completed: false 
    };
    setTodos([...todos, newTask]);
    setTask('');
  };

  const toggleTask = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTask = (id) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setTodos(todos.filter(todo => todo.id !== id))
        },
      ]
    );
  };

  const handleDeleteAll = () => {
    Alert.alert(
      'Delete All Tasks',
      'Are you sure you want to delete all tasks? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete All', 
          style: 'destructive',
          onPress: () => setTodos([])
        },
      ]
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>No tasks yet!</Text>
      <Text style={styles.emptySubtext}>Add a task above to get started</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
        onSubmitEditing={addTask}
        returnKeyType="done"
        blurOnSubmit={true}
        maxLength={100}
      />

      {todos.length > 0 ? (
        <>
          <View style={styles.listHeader}>
            <Pressable 
              onPress={handleDeleteAll}
              style={styles.deleteAllButton}
              accessibilityRole="button"
              accessibilityLabel="Delete all tasks"
            >
              <Text style={styles.deleteAllText}>Delete All</Text>
            </Pressable>
          </View>
          
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.taskContainer}>
                <Pressable 
                  onPress={() => toggleTask(item.id)} 
                  style={styles.taskRow}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.completed ? 'Completed' : 'Incomplete'} task: ${item.text}`}
                >
                  <View style={[
                    styles.checkbox, 
                    item.completed && styles.checkboxCompleted
                  ]}>
                    {item.completed && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text
                    style={[
                      styles.todoItem,
                      item.completed && styles.completedText,
                    ]}
                  >
                    {item.text}
                  </Text>
                </Pressable>
                
                <Pressable 
                  onPress={() => deleteTask(item.id)}
                  style={styles.deleteButton}
                  accessibilityRole="button"
                  accessibilityLabel={`Delete task: ${item.text}`}
                >
                  <Text style={styles.deleteText}>×</Text>
                </Pressable>
              </View>
            )}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
          />
        </>
      ) : (
        renderEmptyState()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoItem: {
    fontSize: 18,
    color: '#111827',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 24,
    color: '#ff4444',
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  flatList: {
    width: '100%',
  },
  flatListContent: {
    paddingBottom: 40,
  },
  listHeader: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  deleteAllButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteAllText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});