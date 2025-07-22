const lawyerReducer = (state, action) => {
  switch (action.type) {
    case "SET_PENDING_LAWYERS":
      return { ...state, pendingLawyers: action.payload, loading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default lawyerReducer;
