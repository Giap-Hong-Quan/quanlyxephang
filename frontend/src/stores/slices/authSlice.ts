// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { User } from "../../types/authTypes";

// interface AuthState {
//   user: User | null;
// }

// const initialState: AuthState = {
//   user: null,
// };

// const authSlice = createSlice(
//     {
//         name:"auth",
//         initialState,
//         reducers:{
//             setUser(state,action:PayloadAction<User>){
//                 state.user=action.payload;
//             },
//             clearUser(state){
//                 state.user=null
//             }
//         }
//     }
// )
// export const { setUser, clearUser } = authSlice.actions;
// export default authSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthResponse, LoginPayload } from "../../types/authTypes";


interface AuthState {
  user: AuthResponse | null;
}

const initialState: AuthState = {
  user: null,
};

export const loginThunk = createAsyncThunk<AuthResponse,LoginPayload,{ rejectValue: string }>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "http://192.168.80.105:5013/api/Authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result: AuthResponse = await res.json();

      if (!res.ok) {
        return rejectWithValue("Login thất bại");
      }

      return result;
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống");
    }
  }
);

export const authSlice = createSlice(
    {
    name :"auth",
    initialState,
    reducers :{},
    extraReducers:(builder)=>{
        builder
             .addCase(loginThunk.pending, (state) => {
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                // LƯU TOKEN
                localStorage.setItem("accessToken", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload));
                // localStorage.setItem("refreshToken", action.payload.tokenRefresh);
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.user = null;
            });
    }
    }
)
export default authSlice.reducer;