
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Flower } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // For demo purposes, we'll just check if the email and password are not empty
      if (email && password) {
        toast({
          title: "Login successful",
          description: "Welcome back to our floral event planning!",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-pink-50">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-block mb-8">
            <h3 className="text-2xl font-display font-bold gradient-text">Blooming Events</h3>
          </Link>
          
          <h1 className="text-3xl font-bold mb-2 font-display text-gray-800">Welcome back</h1>
          <p className="text-gray-600 mb-8">Please enter your details to sign in</p>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-pink-200 focus:border-pink-400"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-pink-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 border-pink-200 focus:border-pink-400"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-pink-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <Label htmlFor="remember-me" className="text-sm cursor-pointer text-gray-600">
                  Remember me for 30 days
                </Label>
              </div>
              
              <Button type="submit" className="w-full floral-button" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-pink-500 hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
      
      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        {/* Decorative flower elements */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.4,
                scale: 0.7 + Math.random() * 0.6
              }}
              animate={{ 
                y: [
                  `${Math.random() * 100}%`, 
                  `${Math.random() * 100 - 10}%`, 
                  `${Math.random() * 100}%`
                ],
              }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              <Flower 
                size={20 + Math.random() * 30} 
                className="text-white/60 animate-flower-spin" 
              />
            </motion.div>
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/40 to-rose-400/40 mix-blend-multiply"></div>
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
          alt="Event setup"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg text-white bg-pink-400/20 backdrop-blur-sm p-8 rounded-2xl border border-white/30">
            <h2 className="text-3xl font-bold mb-4 font-display">Beautiful Events Await</h2>
            <p className="text-white/90">
              Sign in to start planning your next unforgettable event. From elegant weddings to corporate galas, 
              we have everything you need to create beautiful moments that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
