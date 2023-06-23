import { useState, useEffect, useRef } from "react";
import axios, { CancelTokenSource } from "axios";

import { useAuthContext } from "./useAuthContext";


export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelTokenSourceRef = useRef(null);

  const {dispatch} = useAuthContext()

  const register = async (user) => {
    try {
      setError(null);
      setIsLoading(true);

      cancelTokenSourceRef.current = axios.CancelToken.source();
      const response = await axios.post("/api/register", user, {
        cancelToken: cancelTokenSourceRef.current.token,
      });
     
      dispatch({type:"SIGN_UP", payload:response.data})
      setIsLoading(false);
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

  return { register, isLoading, error };
};