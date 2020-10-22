export const initialState = {
    user: null
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
                user: null
            }
        default:
            return state;

    }
}

export default reducer;