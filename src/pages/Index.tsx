
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page
    navigate("/");
  }, [navigate]);

  return null; // No rendering needed as we're redirecting
};

export default Index;
