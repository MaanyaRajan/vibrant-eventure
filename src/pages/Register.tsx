
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Flower } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      toast({
        variant: "destructive",
        title: "Terms and Conditions",
        description: "You must agree to the terms and conditions to continue.",
      });
      return;
    }
    
    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      if (fullName && email && password) {
        toast({
          title: "Registration successful",
          description: "Welcome to Blooming Events! Your account has been created.",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Please fill in all required fields and try again.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white via-pink-50 to-lavender-50">
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
          
          <h1 className="text-3xl font-bold mb-2 font-display bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">Create an account</h1>
          <p className="text-gray-600 mb-8">Enter your details to get started</p>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="border-floral-pink/20 focus:border-floral-pink"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-floral-lavender/20 focus:border-floral-lavender"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 border-floral-skyblue/20 focus:border-floral-skyblue"
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
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long with at least one uppercase letter, one number, and one special character.
                </p>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="mt-1 border-floral-pink data-[state=checked]:bg-floral-pink data-[state=checked]:text-white"
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-floral-rose hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-floral-rose hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              
              <Button type="submit" className="w-full bg-gradient-to-r from-floral-pink via-floral-lavender to-floral-skyblue text-white hover:opacity-90" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-floral-rose hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
      
      {/* Right Side - Image with floral overlay */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-floral-pink/30 via-floral-lavender/30 to-floral-skyblue/30 mix-blend-soft-light"></div>
        <img
          src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
          alt="Event decoration"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-xl">
            <h2 className="text-3xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-floral-pink via-floral-lavender to-floral-skyblue">Begin Your Blooming Journey</h2>
            <p className="text-gray-700">
              Join Blooming Events to unlock a world of possibilities for your special occasions. 
              Create an account today and discover our premium themes, venues, and services.
            </p>
          </div>
        </div>
        
        {/* Animated flower decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.3,
                scale: 0.5 + Math.random() * 0.8,
                rotate: Math.random() * 360
              }}
              animate={{ 
                y: [
                  `${Math.random() * 100}%`, 
                  `${Math.random() * 100 - 10}%`, 
                  `${Math.random() * 100}%`
                ],
                rotate: [
                  Math.random() * 360,
                  Math.random() * 360 + 180,
                  Math.random() * 360
                ]
              }}
              transition={{ 
                duration: 15 + Math.random() * 20, 
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              <Flower 
                size={20 + Math.random() * 40} 
                className={`${
                  i % 3 === 0 
                    ? "text-floral-pink/60" 
                    : i % 3 === 1 
                    ? "text-floral-lavender/60" 
                    : "text-floral-skyblue/60"
                }`} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
