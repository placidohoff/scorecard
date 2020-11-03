export const initialState = {
    user: ''
}

const reducer = (state, action) => {
    console.log("ACTION: ", action)
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.user
            }
        case 'LOGOUT':
            return{
                ...state,
                user: ''
            }
        default:
            return state;

    }
}

export default reducer;