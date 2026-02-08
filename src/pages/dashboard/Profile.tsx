import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, User, Mail, Phone, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: "",
        emergencyContact: user?.emergencyContact || "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSaving(false);
        // In a real app, we'd update the context/backend here
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Avatar Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border border-border p-6 rounded-2xl shadow-sm text-center w-full md:w-1/3"
                >
                    <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name}&background=ff1744&color=fff&size=128`} />
                        <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>
                    <h2 className="font-heading text-xl font-bold">{user?.name}</h2>
                    <p className="text-muted-foreground text-sm">{user?.email}</p>
                    <Button variant="outline" className="mt-4 w-full">Change Photo</Button>
                </motion.div>

                {/* Details Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-card border border-border p-8 rounded-2xl shadow-sm flex-1 w-full"
                >
                    <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                        <User size={20} className="text-primary" /> Personal Information
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center gap-2">
                                    <User size={14} className="text-muted-foreground" /> Full Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-secondary/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail size={14} className="text-muted-foreground" /> Email Address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    className="bg-secondary/30 text-muted-foreground cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-2">
                                    <Phone size={14} className="text-muted-foreground" /> Phone Number
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-secondary/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address" className="flex items-center gap-2">
                                    <MapPin size={14} className="text-muted-foreground" /> Address
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="123 Street Name, City"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="bg-secondary/50"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-border">
                            <h4 className="font-bold mb-4">Emergency Contact</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Contact Name</Label>
                                    <Input placeholder="Jane Doe" className="bg-secondary/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Contact Number</Label>
                                    <Input placeholder="+91 9876543210" className="bg-secondary/50" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                className="bg-primary hover:bg-gym-red-light text-primary-foreground min-w-[120px]"
                                disabled={isSaving}
                            >
                                {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={16} />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </motion.div>

            </div>
        </div>
    );
};

export default Profile;
