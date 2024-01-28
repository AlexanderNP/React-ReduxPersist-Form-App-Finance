import { useDispatch, useSelector } from 'react-redux';
import { setThemeStorage } from '../store/themeSlice';

export function useTheme(){
  
  const dispatch = useDispatch();
  const stateTheme = useSelector(state => state.theme['theme']);


  function changeTheme(){
    const newTheme = stateTheme === 'light' ? 'dark' : 'light';
    dispatch(setThemeStorage({theme: newTheme}));
  }

  return [stateTheme, changeTheme];
}