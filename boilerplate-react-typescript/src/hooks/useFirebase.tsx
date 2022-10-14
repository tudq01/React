import React, { useState, useEffect, Dispatch, useRef } from "react";
import { db } from "../config/firebase";
import { DocumentData, OrderByDirection, QueryDocumentSnapshot, WhereFilterOp } from "@firebase/firestore-types";

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
  compareValue: string | { id: string }[] | undefined;
}
export interface Sort {
  type: OrderByDirection | undefined;
  size: number;
}

const useFirebase = (
  collection: string,
  condition: Condition,
  pagination: Sort,
  
) => {
  const [documents, setDocuments] = useState<
    {
      [key: string]: any;
    }[]
  >([]);

  const last = useRef<QueryDocumentSnapshot<DocumentData>>();

  useEffect(() => {
    let collectionRef = db
      .collection(collection)
      .orderBy("createdAt", pagination.type)
      .limit(pagination.size);

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

      /*
     loadMore ? setDocuments( (prevState) => [...prevState,documents] )
     : setDocuments(documents); */
      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection, condition]);

  return documents;
};
export default useFirebase;


const getNext =  (collection:string,doc:QueryDocumentSnapshot<DocumentData>,pagination:Sort) => {
  console.log("lOAD MORE");
const collectionRef = db
  .collection(collection)
  .orderBy("createdAt", pagination.type)
  .startAfter(doc)
  .limit(pagination.size);
  return collectionRef;
}
