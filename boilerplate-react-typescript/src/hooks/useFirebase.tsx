
import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { WhereFilterOp } from "@firebase/firestore-types";

interface Message {
  text: string;
  uid: string;
  photoURL: string;
  createdAt: string;
  roomId: string;
  displayName: string;
  id: string;
}
export interface Condition {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: string | {id:string}[]|undefined;
}
const useFirebase = (collection: string, condition: Condition) => {
  const [documents, setDocuments] = useState<
    {
      [key:string]:any
    }[]
  >([]);

  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue,
      );
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection, condition]);

  return documents;
};
export default useFirebase;
