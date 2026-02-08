import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const success = login(email, password);
        setIsLoading(false);

        if (success) {
            navigate(from, { replace: true });
        } else {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-card/80 backdrop-blur-md border border-border p-8 rounded-xl shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="font-heading text-3xl font-bold tracking-tighter hover:opacity-80 transition-opacity inline-block mb-2">
                        THE <span className="text-primary">CALCUTTA</span> FITNESS
                    </Link>
                    <h2 className="text-xl font-heading text-muted-foreground">Welcome Back</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-secondary/50 border-input"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-secondary/50 border-input"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-600 bg-secondary text-primary focus:ring-primary" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-primary hover:underline">Forgot password?</a>
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-6 font-heading uppercase tracking-wider text-base bg-primary hover:bg-gym-red-light glow-red mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline font-bold">
                        Sign up
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
