import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const getPendingLawyers = async () => {
  const ref = collection(db, "lawyers");
  const q = query(ref, where("status", "==", "pending"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
};

export const getLawyerById = async (uid) => {
  const ref = doc(db, "lawyers", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { uid: snap.id, ...snap.data() };
};

export const updateLawyerStatus = async (
  uid,
  status,
  rejectionReasons = []
) => {
  const ref = doc(db, "lawyers", uid);
  const updates = { status };
  if (status === "rejected") {
    updates.rejectionReasons = rejectionReasons;
  } else {
    updates.rejectionReasons = [];
  }
  await updateDoc(ref, updates);
};
