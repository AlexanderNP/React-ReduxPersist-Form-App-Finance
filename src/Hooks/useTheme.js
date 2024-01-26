import { useDispatch, useSelector } from "react-redux";
import { setThemeStorage } from "../store/themeSlice";

export function useTheme(){
  
  const dispatch = useDispatch();
  let stateTheme = useSelector(state => state.theme['theme'])


  function changeTheme(){
    let newTheme = stateTheme === 'light' ? 'dark' : 'light'
    dispatch(setThemeStorage({theme: newTheme}))
  }

  return [stateTheme, changeTheme]
}