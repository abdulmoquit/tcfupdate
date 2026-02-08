import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, MapPin, ChevronLeft, ChevronRight, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { plans, Plan } from "@/data/plans";
import { branches } from "@/data/branches";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const steps = [
    { id: 1, title: "Plan", icon: Check },
    { id: 2, title: "Branch", icon: MapPin },
    { id: 3, title: "Payment", icon: CreditCard },
];

const Enrollment = () => {
    const { user, login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedPlanId, setSelectedPlanId] = useState(searchParams.get("plan") || "monthly");
    const [selectedBranchId, setSelectedBranchId] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("upi");

    const [personalDetails, setPersonalDetails] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });

    const selectedPlan = plans.find(p => p.id === selectedPlanId);
    const selectedBranch = branches.find(b => b.id === selectedBranchId);

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            // We need users to be logged in to enroll
            // Pass current location state to return here after login
            navigate("/login", { state: { from: location } });
        }
    }, [user, navigate, location]);

    const handleNext = () => {
        if (currentStep === 2 && !selectedBranchId) return;
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        navigate("/confirmation", {
            state: {
                plan: selectedPlan,
                branch: selectedBranch,
                paymentId: `TXN${Math.floor(Math.random() * 100000)}`
            }
        });
    };

    if (!user) return null; // Or a loading spinner while redirecting

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-24 sm:px-6 lg:px-8">

                {/* Progress Stepper */}
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-secondary -z-10" />
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-500 -z-10"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        />

                        {steps.map((step) => {
                            const isActive = step.id === currentStep;
                            const isCompleted = step.id < currentStep;

                            return (
                                <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive ? "border-primary bg-primary text-primary-foreground scale-110" :
                                                isCompleted ? "border-primary bg-primary text-primary-foreground" :
                                                    "border-muted bg-secondary text-muted-foreground"
                                            }`}
                                    >
                                        {isCompleted ? <Check size={20} /> : <step.icon size={20} />}
                                    </div>
                                    <span className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {/* STEP 1: SELECT PLAN */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-card border border-border rounded-xl p-6 shadow-sm"
                                >
                                    <h2 className="text-2xl font-heading font-bold mb-6">Confirm Your Plan</h2>

                                    <div className="space-y-4">
                                        {plans.map((plan) => (
                                            <div
                                                key={plan.id}
                                                onClick={() => setSelectedPlanId(plan.id)}
                                                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedPlanId === plan.id
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-muted-foreground/50"
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-bold text-lg">{plan.name} Membership</h3>
                                                        <p className="text-muted-foreground text-sm">{plan.features.slice(0, 2).join(", ")} + more</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="block text-xl font-bold text-primary">{plan.price}</span>
                                                        <span className="text-xs text-muted-foreground">{plan.duration}</span>
                                                    </div>
                                                </div>
                                                {selectedPlanId === plan.id && (
                                                    <div className="absolute top-2 right-2 text-primary">
                                                        <div className="bg-primary rounded-full p-1">
                                                            <Check size={12} className="text-primary-foreground" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: SELECT BRANCH */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-card border border-border rounded-xl p-6 shadow-sm"
                                >
                                    <h2 className="text-2xl font-heading font-bold mb-6">Choose Your Home Branch</h2>

                                    <div className="mb-6">
                                        <Label htmlFor="branch-select">Select Location</Label>
                                        <Select onValueChange={setSelectedBranchId} value={selectedBranchId}>
                                            <SelectTrigger className="w-full mt-2 bg-secondary/50">
                                                <SelectValue placeholder="Select a branch nearby..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {branches.map(branch => (
                                                    <SelectItem key={branch.id} value={branch.id}>
                                                        {branch.name} - {branch.address.split(",")[0]}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {selectedBranch ? (
                                        <div className="bg-secondary/30 rounded-lg p-4 border border-border flex gap-4 items-start">
                                            <img
                                                src={selectedBranch.image}
                                                alt={selectedBranch.name}
                                                className="w-24 h-24 rounded-md object-cover"
                                            />
                                            <div>
                                                <h3 className="font-bold text-lg">{selectedBranch.name}</h3>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                    <MapPin size={14} /> {selectedBranch.address}
                                                </p>
                                                <div className="flex gap-2 mt-3 flex-wrap">
                                                    {selectedBranch.facilities.slice(0, 3).map(f => (
                                                        <span key={f} className="text-xs bg-background border border-border px-2 py-1 rounded">
                                                            {f}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-secondary/10">
                                            <MapPin className="mx-auto text-muted-foreground mb-2 opacity-50" size={32} />
                                            <p className="text-muted-foreground">Please select a branch to proceed</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* STEP 3: PAYMENT */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6"
                                >
                                    <h2 className="text-2xl font-heading font-bold">Secure Checkout</h2>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Full Name</Label>
                                                <Input value={personalDetails.name} readOnly className="bg-secondary/50" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Phone</Label>
                                                <Input value={personalDetails.phone} readOnly className="bg-secondary/50" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email</Label>
                                            <Input value={personalDetails.email} readOnly className="bg-secondary/50" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-border">
                                        <Label>Payment Method</Label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {["upi", "card", "netbanking"].map((method) => (
                                                <div
                                                    key={method}
                                                    onClick={() => setPaymentMethod(method)}
                                                    className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${paymentMethod === method
                                                            ? "border-primary bg-primary/10 text-primary"
                                                            : "border-border bg-secondary/30 hover:bg-secondary/50"
                                                        }`}
                                                >
                                                    <CreditCard size={24} />
                                                    <span className="text-xs font-bold uppercase">{method}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Alert className="bg-blue-500/10 border-blue-500/20 text-blue-400">
                                        <Sparkles className="h-4 w-4" />
                                        <AlertTitle>Secure Transaction</AlertTitle>
                                        <AlertDescription>
                                            Your payment is encrypted and secure. We do not store your card details.
                                        </AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className="w-32"
                            >
                                <ChevronLeft size={16} className="mr-2" /> Back
                            </Button>

                            {currentStep < 3 ? (
                                <Button
                                    onClick={handleNext}
                                    disabled={currentStep === 2 && !selectedBranchId}
                                    className="bg-primary hover:bg-gym-red-light text-primary-foreground w-32"
                                >
                                    Next <ChevronRight size={16} className="ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="bg-primary hover:bg-gym-red-light text-primary-foreground w-48 glow-red"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin mr-2" /> : "Pay & Join"}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-card border border-border rounded-xl p-6 shadow-xl">
                            <h3 className="font-heading text-xl font-bold mb-4 border-b border-border pb-4">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold">{selectedPlan?.name}</p>
                                        <p className="text-sm text-muted-foreground">{selectedPlan?.duration} Plan</p>
                                    </div>
                                    <span className="font-bold">{selectedPlan?.price}</span>
                                </div>

                                {selectedBranch && (
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-sm">Location</p>
                                            <p className="text-xs text-muted-foreground">{selectedBranch.name}</p>
                                        </div>
                                        <span className="text-xs text-primary font-bold">CHANGE</span>
                                    </div>
                                )}

                                <div className="border-t border-border pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{selectedPlan?.price}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Joining Fee</span>
                                        <span className="text-green-500 font-bold">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">GST (18%)</span>
                                        <span>₹{(parseInt(selectedPlan?.price?.replace(/\D/g, "") || "0") * 0.18).toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-border pt-4 mb-6">
                                <div className="flex justify-between items-end">
                                    <span className="font-heading font-bold text-lg">Total</span>
                                    <span className="font-heading font-bold text-3xl text-primary">
                                        ₹{(parseInt(selectedPlan?.price?.replace(/\D/g, "") || "0") * 1.18).toFixed(0)}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 text-right">Includes all taxes</p>
                            </div>

                            <div className="text-xs text-center text-muted-foreground bg-secondary/30 p-3 rounded-lg">
                                <AlertCircle size={14} className="inline mr-1 -mt-0.5" />
                                By proceeding, you agree to our Terms & Conditions and Privacy Policy.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enrollment;
