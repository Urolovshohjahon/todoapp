const initialState = {
    todos: [],
    loading: false,
    error: null,
    todoId: 1
}

export default todos = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return {
                ...state,
                loading: true
            }

        case 'GET_TODOS_SUCCESS':
            return {
                ...state,
                loading: false,
                todos: action.todos
            }
        case 'GET_TODOS_FAIL':
            return {
                ...state,
                loading: false,
                error: action.message
            }
        case 'SET_ID':
            return {
                ...state,
                todoId: action.id
            }

        default: return state;
    }

}