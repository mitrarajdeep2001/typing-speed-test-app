import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const fetchUserData = () => {
    const resultRef = db.collection("Results");

    resultRef
      .where("userID", "==", user.uid)
      .get()
      .then((snapshot) => {
         console.log(snapshot);
        snapshot.docs.map((doc) => {
          console.log(doc.data());
        });
      });
  };
  useEffect(() => {
    if(user) fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  if (loading) {
    return <>Loading user...</>;
  }
  return <div>UserPage: {user?.displayName || user?.email || user?.uid}</div>;
};

export default UserPage;
