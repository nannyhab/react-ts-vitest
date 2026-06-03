import { useEffect, useState, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCP3cMEXzSkXJ5fEIlsByRpwgXOGFMcnVg",
  authDomain: "cs-394-adnan.firebaseapp.com",
  databaseURL: "https://cs-394-adnan-default-rtdb.firebaseio.com",
  projectId: "cs-394-adnan",
  storageBucket: "cs-394-adnan.firebasestorage.app",
  messagingSenderId: "778999522900",
  appId: "1:778999522900:web:aa34744a6ac31a41cdefc1"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDataQuery = (
  path: string
): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    return onValue(
      ref(database, path),
      (snapshot) => {
        setData(snapshot.val());
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  }, [path]);

  return [data, loading, error];
};

const timestampMessage = (message: string) =>
  `${new Date().toLocaleString()}: ${message}`;
 
export const useDataUpdate = (
  path: string
): [(value: object) => void, string | undefined, Error | undefined] => {
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<Error>();
 
  const updateData = useCallback(
    (value: object) => {
      update(ref(database, path), value)
        .then(() => setMessage(timestampMessage("Update succeeded")))
        .catch((err: Error) => {
          setMessage(timestampMessage("Update failed"));
          setError(err);
        });
    },
    [path]
  );
 
  return [updateData, message, error];
};
