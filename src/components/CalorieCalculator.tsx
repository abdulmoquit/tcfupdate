import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Info } from "lucide-react";

type CalorieResult = {
    maintenance: number;
    cut: number;
    bulk: number;
} | null;

const CalorieCalculator = () => {
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [activity, setActivity] = useState("1.2");
    const [result, setResult] = useState<CalorieResult>(null);

    const calculateCalories = (e: React.FormEvent) => {
        e.preventDefault();
        if (!age || !weight || !height) return;

        // Mifflin-St Jeor Equation
        let bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age);
        bmr += gender === "male" ? 5 : -161;

        const maintenance = Math.round(bmr * parseFloat(activity));

        setResult({
            maintenance,
            cut: maintenance - 500,
            bulk: maintenance + 300,
        });
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Flame size={24} />
                </div>
                <h3 className="font-heading text-2xl font-semibold">Calorie Calculator</h3>
            </div>

            <form onSubmit={calculateCalories} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                    <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Activity Level</label>
                        <select
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                        >
                            <option value="1.2">Sedentary</option>
                            <option value="1.375">Lightly Active</option>
                            <option value="1.55">Moderately Active</option>
                            <option value="1.725">Very Active</option>
                            <option value="1.9">Extra Active</option>
                        </select>
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
                    Calculate Calories
                </button>
            </form>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4 text-center"
                    >
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Maintain</p>
                            <p className="font-heading text-xl font-bold text-foreground">{result.maintenance}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Cut</p>
                            <p className="font-heading text-xl font-bold text-green-500">{result.cut}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Bulk</p>
                            <p className="font-heading text-xl font-bold text-red-500">{result.bulk}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CalorieCalculator;
