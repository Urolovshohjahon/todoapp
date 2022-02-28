/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckBox from '@react-native-community/checkbox';

export default function ToDo({ navigation }) {
    const { todos, error } = useSelector(state => state.todos);
    const dispatch = useDispatch();


    const setTaskId = (id) => {
        dispatch({ type: 'SET_ID', id: id });
    }

    const deleteTask = (id) => {
        const filteredTasks = todos.filter(todo => todo.id !== id);
        dispatch({ type: 'GET_TODOS_SUCCESS', todos: filteredTasks });
        Alert.alert('Success!', 'Successfully removed!')


    }
    const checkTask = (id, newValue) => {
        const index = todos.findIndex(todo => todo.id === id);
        if (index > -1) {
            const newTasks = [...todos];
            newTasks[index].completed = newValue;

            dispatch({ type: 'GET_TODOS_SUCCESS', todos: newTasks });


        }
    }

    return (
        <View style={styles.body} >

            <FlatList
                data={todos.filter(todo => todo.completed === true)}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => { setTaskId(item.id); navigation.navigate('Task'); }} >
                        <View style={styles.item_row} >
                            <CheckBox onValueChange={(value) => checkTask(item.id, value)} value={item.completed} />

                            <View style={styles.item_body} >
                                <Text style={styles.subtitle} >{item.title}</Text>
                            </View>
                            <TouchableOpacity style={styles.delete} onPress={() => deleteTask(item.id)}  >
                                <FontAwesome5 size={25} color={'#ff3636'} name={'trash'} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: '#0080ff',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        elevation: 5
    },
    item: {
        marginHorizontal: 10,
        marginVertical: 7,
        paddingRight: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5
    },
    title: {
        color: 'black',
        fontSize: 30,
        margin: 5
    },
    subtitle: {
        color: 'black',
        fontSize: 20,
        margin: 5
    },
    item_row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item_body: {
        flex: 1
    },
    delete: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    color: {
        width: 20,
        height: 100,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    }
})