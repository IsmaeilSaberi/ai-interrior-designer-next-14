"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";

function Provider({ children }) {
  const { user } = useUser();
  useEffect(() => {
    user && VerifyUser();
  }, [user]);

  // verify user
  const VerifyUser = async () => {
    const dataResult = await axios.post("/api/verify-user", { user: user });
    console.log(dataResult.data);
  };

  return <div>{children}</div>;
}

export default Provider;
