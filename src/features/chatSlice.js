// src/features/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    currentUser: '', // Example current user
  },
  reducers: {
    setUser: (state,action) => {
        state.currentUser=action.payload
    },
    sendMessage: (state, action) => {
      state.messages.push({ id: Date.now(), text: action.payload, user:state.currentUser });
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const {setUser, sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
