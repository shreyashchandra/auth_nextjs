"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Mepage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/me");

      console.log(response.data);
      setUserData(response.data.data._id);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      toast.success("logout success");
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center  py-2 border-2 border-white w-[700px] bg-white/10 mt-52">
          <h1 className="text-3xl font-semibold pb-2 mb-2">
            <div className="flex items-center gap-2">
              {loading && (
                <>
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </>
              )}
              Profile
            </div>
          </h1>

          <div className="flex flex-col gap-4 items-center py-7">
            <h2 className="  font-bold bg-orange-500 p-2">
              User Id:{" "}
              {userData === "nothing" ? (
                "Nothing"
              ) : (
                <Link href={`/me/${userData}`}>{userData}</Link>
              )}
            </h2>
            <div className="flex items-center gap-3">
              <button
                className={`py-2 mt-3 bg-sky-400/80 w-52 rounded-md`}
                onClick={getUserDetails}
              >
                Get User Details
              </button>
              <button
                className={`py-2 mt-3 bg-red-600/80 w-52 rounded-md`}
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
