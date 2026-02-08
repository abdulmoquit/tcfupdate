import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { branches } from "@/data/branches";

const BookVisit = () => {
    const navigate = useNavigate();
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Generate time slots from 6 AM to 11 PM (every hour)
    const timeSlots = [];
    for (let hour = 6; hour <= 23; hour++) {
        const time12hr = hour > 12 ? hour - 12 : hour;
        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = time12hr === 0 ? 12 : time12hr;
        timeSlots.push(`${displayHour}:00 ${period}`);
    }

    // Get next 7 days for date selection
    const getNextSevenDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            days.push({
                value: date.toISOString().split('T')[0],
                label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
            });
        }
        return days;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send this to a backend
        console.log({ selectedBranch, selectedDate, selectedTime, name, phone });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-card border border-border p-8 rounded-2xl text-center"
                >
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-500" size={40} />
                    </div>
                    <h2 className="font-heading text-3xl font-bold mb-4">Visit Booked!</h2>
                    <p className="text-muted-foreground mb-2">
                        Your free visit has been scheduled at <span className="font-bold text-foreground capitalize">{selectedBranch}</span> branch
                    </p>
                    <p className="text-muted-foreground mb-6">
                        on <span className="font-bold text-foreground">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span> at <span className="font-bold text-foreground">{selectedTime}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">
                        We'll send you a confirmation message shortly. See you soon!
                    </p>
                    <div className="flex gap-3">
                        <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
                            Back to Home
                        </Button>
                        <Button onClick={() => navigate("/membership")} className="flex-1 bg-primary hover:bg-gym-red-light">
                            View Plans
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                        Book Your <span className="text-gradient-red">Free Visit</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Experience our world-class facilities and meet our expert trainers
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border border-border rounded-2xl p-8 shadow-lg"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Details */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Your Name *</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    pattern="[0-9]{10}"
                                    className="w-full px-4 py-3 bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="10-digit mobile number"
                                />
                            </div>
                        </div>

                        {/* Branch Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                                <MapPin size={18} className="text-primary" />
                                Select Branch *
                            </label>
                            <div className="grid md:grid-cols-2 gap-3">
                                {branches.map((branch) => (
                                    <button
                                        key={branch.id}
                                        type="button"
                                        onClick={() => setSelectedBranch(branch.id)}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${selectedBranch === branch.id
                                            ? "border-primary bg-primary/10"
                                            : "border-border hover:border-primary/50"
                                            }`}
                                    >
                                        <h4 className="font-bold capitalize">{branch.name}</h4>
                                        <p className="text-sm text-muted-foreground line-clamp-1">{branch.address}</p>
                                        <p className="text-xs text-muted-foreground mt-1">Open: 6 AM - 11 PM</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                                <Calendar size={18} className="text-primary" />
                                Select Date *
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {getNextSevenDays().map((day) => (
                                    <button
                                        key={day.value}
                                        type="button"
                                        onClick={() => setSelectedDate(day.value)}
                                        className={`p-3 rounded-xl border-2 transition-all ${selectedDate === day.value
                                            ? "border-primary bg-primary/10"
                                            : "border-border hover:border-primary/50"
                                            }`}
                                    >
                                        <p className="text-sm font-bold">{day.label}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                                <Clock size={18} className="text-primary" />
                                Select Time *
                            </label>
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => setSelectedTime(time)}
                                        className={`p-3 rounded-xl border-2 transition-all ${selectedTime === time
                                            ? "border-primary bg-primary/10"
                                            : "border-border hover:border-primary/50"
                                            }`}
                                    >
                                        <p className="text-sm font-bold">{time}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <Button
                                type="submit"
                                disabled={!selectedBranch || !selectedDate || !selectedTime || !name || !phone}
                                className="w-full py-6 text-lg font-heading uppercase tracking-wider bg-primary hover:bg-gym-red-light disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm Free Visit
                            </Button>
                        </div>
                    </form>
                </motion.div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 bg-secondary/30 border border-border rounded-xl p-6"
                >
                    <h3 className="font-heading text-lg font-bold mb-3">What to Expect</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>Complete tour of our state-of-the-art facilities</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>Meet our certified trainers and get expert advice</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>Try out equipment and experience a sample workout</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>Learn about our membership plans and special offers</span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default BookVisit;
