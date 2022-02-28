import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, Modal } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';

export default function Task({ navigation }) {
    useEffect(() => {
        getTasks()
    }, [])

    const { todos, todoId } = useSelector(state => state.todos);
    const dispatch = useDispatch();


    const [title, setTitle] = useState('');
    const [done, setDone] = useState(false);
    const [showBellModal, setShowBellModal] = useState(false);
    const [bellTime, setBellTime] = useState('1')
    const getTasks = () => {
        const todo = todos.find(todo => todo.id === todoId);
        if (todo) {
            setTitle(todo.title);
            setDone(todo.completed);
        }
    }

    const setTask = () => {
        if (title.length === 0) {
            Alert.alert('Warning', 'Please write your task title', ['Ok'], { cancelable: true });
        }
        else {
            try {
                var Todo = {
                    id: todoId,
                    title: title,
                    completed: done,
                }

                let newTasks = [];

                const index = todos.findIndex(todo => todo.id === todoId);
                if (index > -1) {
                    newTasks = [...todos];
                    newTasks[index] = Todo;
                }
                else {
                    newTasks = [...todos, Todo]
                }


                dispatch({ type: 'GET_TODOS_SUCCESS', todos: newTasks });
                Alert.alert('Success!', 'Task saved successfully!', ['Ok'], { cancelable: true });
                navigation.goBack();



            } catch (error) {
                console.log(error)
            }
        }
    }

    const setTaskAlarm = () => {
        console.log(bellTime)
        PushNotification.localNotificationSchedule({
            channelId: 'task-channel',
            title: title,
            message: "Any task message",
            date: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
            allowWhileIdle: true
        })
    }



    return (
        <View style={styles.body} >

            <Modal
                visible={showBellModal}
                transparent
                onRequestClose={() => setShowBellModal(false)}
                animationType='slide'
                hardwareAccelerated
            >
                <View style={styles.centered_view} >
                    <View style={styles.bell_modal} >
                        <View style={styles.bell_body} >
                            <Text style={styles.text} >Remind me after</Text>
                            <TextInput style={styles.bell_input}
                                keyboardType='numeric'
                                value={bellTime}
                                onChangeText={(value) => setBellTime(value)}

                            />
                            <Text style={styles.text} >minute(s)</Text>
                        </View>
                        <View style={styles.bell_buttons} >
                            <TouchableOpacity style={styles.bell_cancel_button} onPress={() => setShowBellModal(false)} >
                                <Text style={styles.text} >Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bell_ok_button} onPress={() => {
                                setShowBellModal(false);
                                setTaskAlarm();
                            }} >
                                <Text style={styles.text} >Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>




            <TextInput
                value={title}
                onChangeText={(value) => {
                    setTitle(value);
                }}
                placeholder='Title'
                style={styles.input}
            />
            
            
            <View style={styles.extra_row} >
                <TouchableOpacity style={styles.extra_button} onPress={() => { setShowBellModal(true) }} >
                    <FontAwesome5 size={25} name={'bell'} color={'white'} />
                </TouchableOpacity>
            </View>
            <View style={styles.checkbox} >
                <CheckBox value={done} onValueChange={(value) => setDone(value)} />
                <Text style={styles.text} >
                    Is done
                </Text>
            </View>

            <Button title='Save task' onPress={setTask} color='#1eb900' style={{ width: '100%' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: 'white',
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingHorizontal: 10
    },
    checkbox: {
        flexDirection: 'row',
        margin: 10
    },
    text: {
        fontSize: 20,
        color: '#000000'
    },
    color_bar: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#555555',
        marginVertical: 10
    },
    color_white: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    color_red: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f28b82'
    },
    color_blue: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aecbfa'
    },
    color_green: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccff90',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    extra_row: {
        flexDirection: 'row',
        marginVertical: 10
    },
    extra_button: {
        width: 100,
        flex: 1,
        height: 50,
        backgroundColor: '#0080ff',
        borderRadius: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered_view: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1,
        backgroundColor: '#0000099',
        justifyContent: 'center',
        alignItems: 'center',

    },
    bell_modal: {
        width: 300,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black'
    },
    bell_body: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bell_buttons: {
        flexDirection: 'row',
        height: 50
    },
    bell_input: {
        width: 50,
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        margin: 20
    },
    bell_cancel_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    bell_ok_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
