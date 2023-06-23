import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export const useFavorites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const favorite = async (isLiked, productId, currentUser) => {
    try {
      setError(null);
      setIsLoading(true);
    
 
      console.log(currentUser, productId)
      if (isLiked) {
        await axios.delete(`/api/products/${productId}/favorite/${currentUser._id}`);
      } else {
        await axios.post(`/api/products/${productId}/favorite`, {userId:currentUser._id});
      }

      router.refresh();

      setIsLoading(false);
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

  return { favorite, isLoading, error };
};