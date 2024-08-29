"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Mepage() {
  const router = useRouter();
  const [userData, setUserData] = useState("");

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/me");

      console.log(response.data);
      setUserData(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center  py-2 border-2 border-white w-[700px] bg-white/10 mt-52">
          <h1 className="text-3xl font-semibold pb-2 mb-2">Profile</h1>

          <div className="flex flex-col gap-4 items-center py-7">
            <h2 className="  font-bold bg-orange-500 p-2">
              User Id: {userData}
            </h2>
            <div className="flex items-center gap-3">
              <button
                className={`py-2 mt-3 bg-white/20 w-52 rounded-md`}
                onClick={getUserDetails}
              >
                Get User Details
              </button>
              <button
                className={`py-2 mt-3 bg-white/20 w-52 rounded-md`}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
