import React, { useState, useEffect, Dispatch } from "react";
import { db } from "../config/firebase";
import { DocumentData, OrderByDirection, QueryDocumentSnapshot, WhereFilterOp } from "@firebase/firestore-types";
import { setDoc } from "@firebase/firestore";

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
  loadMore : boolean,
) => {
  const [documents, setDocuments] = useState<
    {
      [key: string]: any;
    }[]
  >([]);
  
  

  useEffect(() => {
    let collectionRef = db
      .collection(collection)
      .orderBy("createdAt", pagination.type)
      .limit(pagination.size);

   
    collectionRef = collectionRef .limit(pagination.size);

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
  
  }, [collection,condition,loadMore]);

  return documents;
};
export default useFirebase;

/*
   const showNext = ({ item }) => {
     if (list.length === 0) {
       alert("Thats all we have for now !");
     } else {
       const fetchNextData = async () => {
         await firebase
           .firestore()
           .collection("users")
           .orderBy("created", "desc")
           .limit(5)
           .startAfter(item.created)
           .onSnapshot(function (querySnapshot) {
             const items = [];
             querySnapshot.forEach(function (doc) {
               items.push({ key: doc.id, ...doc.data() });
             });
             setList(items);
             setPage(page + 1);
           });
       };
       fetchNextData();
     }
   };

   const showPrevious = ({ item }) => {
     const fetchPreviousData = async () => {
       await firebase
         .firestore()
         .collection("users")
         .orderBy("created", "desc")
         .endBefore(item.created)
         .limitToLast(5)
         .onSnapshot(function (querySnapshot) {
           const items = [];
           querySnapshot.forEach(function (doc) {
             items.push({ key: doc.id, ...doc.data() });
           });
           setList(items);
           setPage(page - 1);
         });
     };
     fetchPreviousData();
   };
*/