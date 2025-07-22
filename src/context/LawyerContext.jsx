import { createContext, useContext, useEffect, useReducer } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import lawyerReducer from "../context/lawyerReducer";

const LawyerContext = createContext();

export const useLawyers = () => useContext(LawyerContext);

export const LawyerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(lawyerReducer, {
    pendingLawyers: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const q = query(
      collection(db, "lawyers"),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const lawyers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: "SET_PENDING_LAWYERS", payload: lawyers });
      },
      (err) => {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    );

    return unsubscribe;
  }, []);

  return (
    <LawyerContext.Provider value={{ ...state }}>
      {children}
    </LawyerContext.Provider>
  );
};
