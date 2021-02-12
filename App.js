import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 


export default function App() {
  const [todo, onChangeText] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [filteredList, setFilteredList] = useState({state: 'all', items: [...todoList]})

  const addTodo = () => {
    if (todo) {
      let id = todoList.length + 1;
      setTodoList([...todoList, {id: id, title: todo, checked: false}]);
      setFilteredList({state: 'all', items: [...todoList, {id: id, title: todo, checked: false}]})
      // renderAll();
      // setTimeout(()=> {console.log(todoList); renderAll()}, 1000);
      onChangeText('');
    }
  }

  const handleCheck = (id) => {
    setTodoList(
      todoList.map((item) => {
        if (item) {
          if (item.id === id) {
            item.checked = !item.checked;
            return item;
          } else return item;
        }
      })
    )
    switch (filteredList.state) {
      case 'all': {
        renderAll();
      }
      break;
      case 'active': {
        renderList('active');
      }
      break;
      case 'done': {
        renderList('done');
      }
      break;
    }
  }

  const renderAll = () => {
    console.log('mounted');
    setFilteredList(
      {
        state: 'all',
        items: todoList.filter((item) => {
          return Boolean(item);
        })
      }
      )
    console.log('will unmount');
  }

  const renderList = (state) => {
    switch (state) {
      case 'active': {
        setFilteredList(
          {
            state: 'active',
            items: todoList.map((item) => {
              if (item) {
                if (item.checked === false)
                  return item;
              }
            })
          }
        )
      }
      break;
      case 'done': {
        setFilteredList(
          {
            state: 'done',
            items: todoList.map((item) => {
              if (item) {
                if (item.checked === true)
                  return item;
              }
            })
          }
        )
      }
    }
  }



  return (
    <View style={styles.container}>
      <Text style={styles.headTitle}>Baby Shark</Text>
      <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
        TODO
        <Text style={{fontWeight: 'normal'}}>-dododoodooo</Text>
      </Text>

      {/* input */}
      <View style={{marginTop: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%'}}>
        <TextInput style={styles.formControl}
          placeholder={'Add a todo'}
          onChangeText={text => onChangeText(text)}
          value={todo}
        />
        <TouchableOpacity
          onPress={addTodo}
          activeOpacity={0.4} >
          <Ionicons name="add-circle" size={45} color="#ff4b1f" />
        </TouchableOpacity>
      </View>

      {/* tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => renderAll()} activeOpacity={0.6} style={[styles.tab, filteredList.state === 'all' ? styles.activeTab : {} ]}>
          <Text style={{textAlign: 'center'}}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => renderList('active')} activeOpacity={0.6} style={[styles.tab, filteredList.state === 'active' ? styles.activeTab : {} ]}>
          <Text style={{textAlign: 'center'}}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => renderList('done')} activeOpacity={0.6} style={[styles.tab, filteredList.state === 'done' ? styles.activeTab : {} ]}>
          <Text style={{textAlign: 'center'}}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* list */}
      <FlatList
        style={styles.todoList}
        data={filteredList.items}
        renderItem={({item}) => {
          if (item) {
            return <TouchableOpacity onPress={ () => handleCheck(item.id) } style={styles.todoItem}>
                <MaterialIcons 
                  name={item.checked == false ? "check-box-outline-blank" : "check-box"}
                  size={32} color={item.checked == false ? "white" : "#ff4b1f"} 
                />
                <Text style={[styles.todoText, item.checked == false ? {color: '#fff'} : styles.doneText  ]}>{item.title}</Text>
              </TouchableOpacity>
          }
        }}
        keyExtractor={(el, index) => index.toString()}
      />

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42275a',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 75,
    paddingHorizontal: 25
  },
  headTitle: {
    fontSize: 32,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#ff4b1f'
  },
  formControl: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
    flex: 5,
    marginRight: 10
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 20
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#212529',
    backgroundColor: '#fff',
    borderRadius: 30,
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    color: '#fff',
    backgroundColor: '#ff4b1f'
  },
  todoList: {
    width: '95%',
    marginTop: 20
  },
  todoItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    // width: 'fit-content'
  },
  todoText: {
    marginLeft: 8,
    fontSize: 20
  },
  doneText: {
    color: '#ff4b1f'
  }
});


// Questions
// color
// state handling
// filter tabs style
// tunnel