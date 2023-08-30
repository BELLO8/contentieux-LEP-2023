/*eslint-disable */

import React from "react";
import { db } from "../../utility/Firebase";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";

import { useState } from "react";

const FirebaseTest = () => {
  const [store, setStore] = useState();
  useEffect(() => {
    const query = ref(db, "electeurs");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        Object.values(data).map((item) => {
          setStore(item);
        });
      }
    });
  }, []);
  return (
    <>
      <div>{JSON.stringify(store)}</div>
    </>
  );
};

export default FirebaseTest;
