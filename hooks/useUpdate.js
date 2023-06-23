import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios, { CancelTokenSource } from "axios";



export const useUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelTokenSourceRef = useRef(null);

  const router = useRouter()

  const update = async (url,formData) => {
    try {
      setError(null);
      setIsLoading(true);

      cancelTokenSourceRef.current = axios.CancelToken.source();
      const response = await axios.patch(url, formData, {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      const data = response.data;
      router.refresh()
  

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          console.log(error.response.data.message)
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

  return { update, isLoading, error };
};