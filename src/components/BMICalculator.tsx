import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Info } from "lucide-react";

type BMIResult = {
    value: number;
    category: string;
    advice: string;
    color: string;
} | null;

const BMICalculator = () => {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [result, setResult] = useState<BMIResult>(null);

    const calculateBMI = (e: React.FormEvent) => {
        e.preventDefault();
        if (!height || !weight) return;

        const h = parseFloat(height) / 100; // convert to meters
        const w = parseFloat(weight);
        const bmi = w / (h * h);

        let category = "";
        let advice = "";
        let color = "";

        if (bmi < 18.5) {
            category = "Underweight";
            advice = "Access calorie-surplus meal plans and strength training.";
            color = "text-yellow-500";
        } else if (bmi < 24.9) {
            category = "Normal Weight";
            advice = "Maintain your healthy lifestyle with balanced workouts.";
            color = "text-green-500";
        } else if (bmi < 29.9) {
            category = "Overweight";
            advice = "Focus on cardio and calorie-deficit diet plans.";
            color = "text-orange-500";
        } else {
            category = "Obese";
            advice = "Consult our experts for a personalized fat-loss program.";
            color = "text-red-500";
        }

        setResult({ value: parseFloat(bmi.toFixed(1)), category, advice, color });
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Calculator size={24} />
                </div>
                <h3 className="font-heading text-2xl font-semibold">BMI Calculator</h3>
            </div>

            <form onSubmit={calculateBMI} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Gender</label>
                        <div className="flex bg-secondary rounded-lg p-1">
                            {["male", "female"].map((g) => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => setGender(g)}
                                    className={`flex-1 py-1.5 text-sm capitalize rounded-md transition-all ${gender === g
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="e.g. 25"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Height (cm)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="e.g. 175"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Weight (kg)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                            placeholder="e.g. 70"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-primary text-primary-foreground font-heading uppercase tracking-wider rounded-lg hover:bg-gym-red-light transition-all glow-red mt-2"
                >
                    Calculate BMI
                </button>
            </form>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-6 pt-6 border-t border-border"
                    >
                        <div className="flex items-end gap-3 mb-2">
                            <span className="font-heading text-4xl font-bold text-foreground">{result.value}</span>
                            <span className={`font-heading text-lg ${result.color} mb-1.5`}>{result.category}</span>
                        </div>
                        <p className="text-sm text-muted-foreground flex gap-2 items-start">
                            <Info size={16} className="mt-0.5 shrink-0 text-primary" />
                            {result.advice}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BMICalculator;
