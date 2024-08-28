"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Verifyemailpage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const onVerify = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);

      console.log("Verify success", response.data);
      router.push("/login");
    } catch (error: any) {
      setError(true);
      console.log("Verify Failed");
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center  py-2 border-2 border-white w-[700px] bg-white/10 mt-52">
          <h1 className="text-3xl font-semibold pb-2 mb-2">
            {loading ? "Processing" : "Verify Your Email"}
          </h1>

          <div className="flex flex-col gap-4 items-start py-7">
            <h2 className="text-center w-52 p-2 bg-orange-500 text-black font-bold">
              {token ? `${token}` : "no token"}
            </h2>
            <button
              className={`py-2 mt-3 bg-white/20 w-52 rounded-md`}
              onClick={onVerify}
            >
              Verify
            </button>
          </div>
          {error && (
            <>
              <div>Error</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Verifyemailpage;
