import { createContext, useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { accountApi } from "../../api/account";

const STORAGE_KEY = "accessToken";
const STORAGE_PROFILE = "profile"

var ActionType;
(function (ActionType) {
  ActionType["INITIALIZE"] = "INITIALIZE";
  ActionType["SIGN_IN"] = "SIGN_IN";
  ActionType["SAVE_PROFILE"] = "SAVE_PROFILE";
  ActionType["SIGN_UP"] = "SIGN_UP";
  ActionType["SIGN_OUT"] = "SIGN_OUT";
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  account: null,
  accessToken: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, account, accessToken } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      account,
      accessToken,
    };
  },
  SIGN_IN: (state, action) => {
    const { accessToken } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      accessToken,
    };
  },
  SAVE_PROFILE: (state, action) => {
    const { account } = action.payload;

    return {
      ...state,
      account,
    };
  },
  SIGN_UP: (state, action) => {
    const { account } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      account,
    };
  },
  SIGN_OUT: (state) => ({
    ...state,
    isAuthenticated: false,
    account: null,
    accessToken: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  signIn: () => Promise.resolve(),
  saveProfile: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = window.sessionStorage.getItem(STORAGE_KEY);
      const profile = window.sessionStorage.getItem(STORAGE_PROFILE);

      if (accessToken) {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            account: JSON.parse(profile),
            accessToken,
          },
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            account: null,
            accessToken: null,
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          account: null,
          accessToken: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, []);

  const signIn = useCallback(
    async (accessToken) => {
      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          accessToken,
        },
      });
    },
    [dispatch]
  );

  const saveProfile = useCallback(
    async (profileData) => {
      sessionStorage.setItem(STORAGE_PROFILE, JSON.stringify(profileData));
      const account = profileData;

      dispatch({
        type: ActionType.SAVE_PROFILE,
        payload: {
          account,
        },
      });
    },
    [dispatch]
  );

  const signOut = useCallback(async () => {
    sessionStorage.removeItem(STORAGE_KEY);
    dispatch({ type: ActionType.SIGN_OUT });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        saveProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
