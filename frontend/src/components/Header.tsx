import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      toast.success("Signed out successfully");
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const signOut = () => {
    mutation.mutate();
  };

  const location = useLocation();
  return (
    <header className="container mx-auto flex justify-between">
      <span>MernHolidays.com</span>
      {isLoggedIn ? (
        <>
          <span className="flex gap-10">
            <Link to={"/my-hotels"}>My Hotels</Link>
            <span>My Bookings</span>
            <span onClick={signOut}>Sign Out</span>
          </span>
        </>
      ) : (
        <>
          {location.pathname === "/sign-in" ? (
            <Link to="/sign-up">Sign Up</Link>
          ) : (
            <Link to="/sign-in">Sign In</Link>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
