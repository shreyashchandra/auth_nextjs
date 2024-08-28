"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import InputBox from "@/components/InputBox/InputBox";
import Link from "next/link";

function Loginpage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDissabled, setButtonDissabled] = useState(true);

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Login Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDissabled(false);
    } else {
      setButtonDissabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center  py-2 border-2 border-white w-[700px] bg-white/10 mt-52">
          <h1 className="text-3xl font-semibold pb-2 mb-2">
            {loading ? "Processing" : "Login"}
          </h1>

          <div className="flex flex-col gap-4 items-start py-7">
            <InputBox
              changeFun={(e: any) =>
                setUser({ ...user, email: e.target.value })
              }
              lableText={"Email"}
              placeholderText={"email"}
              value={user.email}
            />
            <InputBox
              changeFun={(e: any) =>
                setUser({ ...user, password: e.target.value })
              }
              lableText={"Password"}
              placeholderText={"password"}
              value={user.password}
            />
            <button
              className={`py-2 mt-3 bg-white/20 w-52 rounded-md ${
                buttonDissabled ? "cursor-not-allowed" : "hover:bg-black/40"
              }`}
              onClick={onLogin}
              disabled={buttonDissabled}
            >
              {buttonDissabled ? "Please Fill The Form" : "Login"}
            </button>
            <Link
              href={"/signup"}
              className="text-xs font-light text-gray-400 -mt-2"
            >
              go to <em className="font-bold hover:text-white">Signup</em>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
