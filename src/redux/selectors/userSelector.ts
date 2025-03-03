import { User } from "firebase/auth"
import { AppState, AuthState } from "../../types/stateTypes"

export const getAuth = (state: AppState): AuthState => {
  return state.auth
}

export const getUser = (state: AppState): User | null => {
  return getAuth(state).user;
}

export const getUserId = (state: AppState): string => {
  console.log("uid: ", getUser(state)?.uid);
  return getUser(state)?.uid || "";
}