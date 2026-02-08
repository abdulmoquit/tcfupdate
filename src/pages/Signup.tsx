import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        signup({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password, // Store password for authentication
        });
        setIsLoading(false);
        navigate("/dashboard");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden py-12">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-card/80 backdrop-blur-md border border-border p-8 rounded-xl shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="font-heading text-3xl font-bold tracking-tighter hover:opacity-80 transition-opacity inline-block mb-2">
                        THE <span className="text-primary">CALCUTTA</span> FITNESS
                    </Link>
                    <h2 className="text-xl font-heading text-muted-foreground">Join the Movement</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-secondary/50 border-input"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-secondary/50 border-input"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input
                            type="tel"
                            name="phone"
                            placeholder="+91 9876543210"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="bg-secondary/50 border-input"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Create Password</label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="bg-secondary/50 border-input"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Confirm Password</label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="bg-secondary/50 border-input"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-6 font-heading uppercase tracking-wider text-base bg-primary hover:bg-gym-red-light glow-red mt-6"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Already a member?{" "}
                    <Link to="/login" className="text-primary hover:underline font-bold">
                        Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
