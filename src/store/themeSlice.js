import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    'theme': 'light'
  },
  reducers: {
    setThemeStorage: (state, action) => {
      state['theme'] = action.payload.theme;
    }
  }
});

export const { setThemeStorage } = themeSlice.actions;
export default themeSlice.reducer;