
import loginReducer from "./auth.reducers/auth.reducer"
import signupReducer from "./auth.reducers/signup.reducer"
const AllReducers={
    loginState:loginReducer,
    signupState:signupReducer
}
export default AllReducers