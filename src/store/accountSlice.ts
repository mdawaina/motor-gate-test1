import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { LoginUser, User, UserParams } from "../components/models/loginUser";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface AccountState {
  user: User | null;
  userEmail: string;

  userParams: UserParams;
  userResultMode: string;
  userId: string;
  userUpdated: string;
  status: string;
}

const initialState: //= {
AccountState = {
  user: null,
  userEmail: "",

  userParams: {
    searchTerm: "",
    pageNumber: 1,
    pageSize: 10,
  },
  userResultMode: "Card",
  userId: "",
  userUpdated: "",
  status: "pending",
};

// end from user slice

export const signInUser = createAsyncThunk<User, LoginUser>(
  "account/signInUser",
  async (user, thunkAPI) => {
    try {
      //const router = useRouter();
      const returnedUser = await agent.Account.login(user);
      localStorage.setItem("user", JSON.stringify(returnedUser));
      return returnedUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const returnedUser = await agent.Account.currentUser();
      //localStorage.setItem('user', JSON.stringify(returnedUser));
      return returnedUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);
//export const khalifaState = createSlice()
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.status = "idle";
      localStorage.removeItem("user");
      // useRouter().push('/');
      state.userEmail = "";
    },
    setUser: (state, action) => {
      let token = action.payload.token.split(".")[1];

      let claims = JSON.parse(atob(token.replace(/^[^,]+,/, "")));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.status = "idle";
      //console.log(typeof (roles) === 'string' ? [roles] : roles);
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
    },
    /*    switchUserStatus: (state, action) => {// khalifa
               const isActive: Boolean = action.payload as boolean;
               state.singleUser = {
                   ...state.singleUser, isActive: isActive
               } as SingleUser;
           }, */
    setUserParams: (state, action) => {
      state.userParams = action.payload;
    },
    resetUserParams: (state) => {
      state.userParams = { searchTerm: "", pageNumber: 1, pageSize: 10 };
    },

    setUserResultMode: (state, action) => {
      state.userResultMode = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    setUserUpdated: (state) => {
      state.userUpdated = state.userId;
      state.userId = "";
    },
  },
  extraReducers: (builder) => {
    /*   builder.addCase(getUser.pending, (state, action) => {
              state.status = "pendingLoadingSingleUser";
          });
  
          builder.addCase(getUser.fulfilled, (state, action) => {
  
              state.singleUser = action.payload;
              state.status = "idle";
          });
  
          builder.addCase(getUser.rejected, (state) => {
              state.status = "idle";
          }); */

    // original account

    builder.addCase(signInUser.pending, (state) => {
      state.status = "pendingSignIn";
    });

    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.status = "pendingFetchCurrentUser";
    });

    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.status = "idle";
      state.user = null;
      localStorage.removeItem("user");
      toast.error("Login session has been expired! kindly login again");
      useRouter().push("/account/login");
    });

    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        let token = action.payload.token.split(".")[1];
        let claims = JSON.parse(atob(token.replace(/^[^,]+,/, "")));
        let roles =
          claims[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        state.user = {
          ...action.payload,
          roles: typeof roles === "string" ? [roles] : roles,
        };
        state.status = "idle";
      }
    );

    builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
      state.status = "idle";
    });
  },
});

export const {
  signOut,
  setUser,
  setUserParams,
  resetUserParams,
  setUserResultMode,
  setUserEmail,
  setUserId,
  setUserUpdated,
} = accountSlice.actions;
