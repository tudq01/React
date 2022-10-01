import React, { useState, useEffect, Dispatch } from "react";
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
  loadMore:boolean
) => {
  const [documents, setDocuments] = useState<
    {
      [key: string]: any;
    }[]
  >([]);

    const [last, setLast] = useState<QueryDocumentSnapshot<DocumentData>>();

  useEffect(() => {
    
    let collectionRef = db
      .collection(collection)
      .orderBy("createdAt", pagination.type)
      .limit(pagination.size);

    if(loadMore && last != undefined){
     collectionRef = getNext(collection,last,pagination)
      
      
    }

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
      collectionRef.get().then((data)=>{
        setLast(data.docs[data.docs.length-1]);
      });
      
  
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      
     loadMore ? setDocuments( (prevState) => [...prevState,documents] )
     : setDocuments(documents);
   // setDocuments(documents);
    
    });

    return unsubscribe;
  }, [collection,condition,loadMore]);
 
  useEffect(()=>{
  console.log("lAST:"+JSON.stringify(last));
  },[last])
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
