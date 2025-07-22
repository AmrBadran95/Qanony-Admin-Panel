export const initialState = {
  admin: null,
  loading: false,
  error: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return { ...state, admin: action.payload, loading: false };

    case "LOGIN_FAILURE":
      return { ...state, error: action.payload, loading: false };

    case "LOGOUT":
      return { ...state, admin: null, loading: false, error: null };

    default:
      return state;
  }
};
