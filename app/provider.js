"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserDetailContext } from "./_context/UserDetailContext";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    user && VerifyUser();
  }, [user]);

  // verify user
  const VerifyUser = async () => {
    const dataResult = await axios.post("/api/verify-user", { user: user });
    setUserDetail(dataResult.data.result);
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;
