
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Flower } from "lucide-react";
import { motion } from "framer-motion";

// Create a schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      
      // Simulating API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Show success toast
      toast({
        title: "Account created successfully!",
        description: "You can now log in with your credentials.",
      });
      
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      // Show error toast
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0.05 + Math.random() * 0.1,
              scale: 0.5 + Math.random() * 1,
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
                Math.random() * 360 + 30,
                Math.random() * 360
              ]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity,
              repeatType: "mirror" as const
            }}
          >
            <Flower 
              size={30 + Math.random() * 70} 
              className={`${
                i % 5 === 0 ? "text-pink-300" : 
                i % 5 === 1 ? "text-purple-300" : 
                i % 5 === 2 ? "text-blue-300" : 
                i % 5 === 3 ? "text-green-300" : 
                "text-yellow-300"
              }`}
            />
          </motion.div>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg"
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-pink-100"
            variants={itemVariants}
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-2">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Flower size={40} className="text-pink-500" />
                </motion.div>
              </div>
              <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                Create Your Account
              </h1>
              <p className="text-gray-600 mt-2">
                Join us to create beautiful floral arrangements for your special events
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            className="bg-white/50 border-pink-200 focus-visible:ring-pink-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white/50 border-pink-200 focus-visible:ring-pink-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Create a password"
                            className="bg-white/50 border-pink-200 focus-visible:ring-pink-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            className="bg-white/50 border-pink-200 focus-visible:ring-pink-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-medium py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-pink-600 hover:text-pink-700 font-medium">
                    Sign In
                  </Link>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
