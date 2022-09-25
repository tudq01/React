import firebase from "firebase";
import { db } from "../config/firebase";


interface Data {
  [key: string]: any;
}
export const addDocument = (collection:string, data:Data) => {
  const query = db.collection(collection);

  query.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};