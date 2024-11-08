"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import EmptyState from "./EmptyState";
import Link from "next/link";

function Listing() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl">Hello, {user?.fullName}</h2>
        <Link href={"/dashboard/create-new"}>
          <Button>+ Redesign Interior</Button>
        </Link>
      </div>
      {/* Empty State */}
      {userRoomList?.length == 0 ? <EmptyState /> : <div>{/* Listing */}</div>}
    </div>
  );
}

export default Listing;
