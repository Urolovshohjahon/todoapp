import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

const getApi = async () => {
    return await axios.get("https://jsonplaceholder.typicode.com/todos?userId=1");
}

function* getTodos(action) {

    try {
        const todos = yield call(getApi);
        yield put({ type: 'GET_TODOS_SUCCESS', todos: todos.data });
    } catch (error) {
        yield put({ type: 'GET_TODOS_FAIL', message: error.message });
    }

}

export default function* todoSaga() {
    yield takeEvery('GET_TODOS', getTodos);
}