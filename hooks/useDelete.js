import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios, { CancelTokenSource } from "axios";



export const useDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelTokenSourceRef = useRef(null);

  const router = useRouter()

  const deleteItem = async (url,userId) => {
    try {
      setError(null);
      setIsLoading(true);

      cancelTokenSourceRef.current = axios.CancelToken.source();
      const response = await axios.delete(url, {
        cancelToken: cancelTokenSourceRef.current.token,
        data:{userId,}
      });
      const data = response.data;
      router.refresh()
      router.push("/")
  

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

  return { deleteItem, isLoading, error };
};