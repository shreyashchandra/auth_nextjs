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
      router.push("/me");
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
              Login
            </div>
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
