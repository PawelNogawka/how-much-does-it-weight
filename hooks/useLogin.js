import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./useAuthContext";
import axios, { CancelTokenSource } from "axios";


export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelTokenSourceRef = useRef(null);

  const {dispatch} = useAuthContext()

  const router = useRouter()

  const login = async (user) => {

    try {
      setError(null);
      setIsLoading(true);

      cancelTokenSourceRef.current = axios.CancelToken.source();
      const response = await axios.post("/api/login", user, {
        cancelToken: cancelTokenSourceRef.current.token,
      });
     

      setIsLoading(false);
            dispatch({type:"SIGN_UP", payload:response.data})
       // router.refresh()
      return response
    } catch (error) {
      setIsLoading(false);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          setError({ message: errorMessage });
        } else {
          setError({ message: "A query error occurred" });
        }
      } else {
        console.log(error);
        setError({ message: "An unknown error occurred." });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel("Request canceled due to component unmount");
        console.log("Request canceled due to component unmount")
      }
    };
  }, []);

  return { login, isLoading, error };
};