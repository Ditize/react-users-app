import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
});

const usersSlice = createSlice({
  name: "users",
  initialState: { list: [], status: "idle", error: null, lastAddedId: null },
  reducers: {
    addUser: (state, action) => {
      state.list.unshift(action.payload);
      state.lastAddedId = action.payload.id;
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(u => u.id !== action.payload);
      if (state.lastAddedId === action.payload) state.lastAddedId = null;
    },
    updateUser: (state, action) => {
      const idx = state.list.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = "loading"; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"; 
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => { 
        state.status = "failed"; 
        state.error = action.error.message; 
      });
  },
});

export const { addUser, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
