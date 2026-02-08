import { createContext, useState, useContext, ReactNode, useEffect } from "react";

type User = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    membership?: {
        planId: string;
        start: Date;
        end: Date;
        status: "active" | "expired" | "expiring";
        branchId: string;
    };
    preferredBranch?: string;
    emergencyContact?: string;
    transactions?: Array<{
        id: string;
        date: string;
        description: string;
        amount: string;
        status: string;
        method: string;
    }>;
} | null;

type AuthContextType = {
    user: User;
    login: (email: string, password: string) => boolean;
    signup: (userData: any) => void;
    logout: () => void;
    updateMembership: (membershipData: any, transactionData: any) => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedSession = localStorage.getItem("gym_session");
        if (storedSession) {
            try {
                const parsedUser = JSON.parse(storedSession);
                if (parsedUser.membership) {
                    parsedUser.membership.start = new Date(parsedUser.membership.start);
                    parsedUser.membership.end = new Date(parsedUser.membership.end);
                }
                setUser(parsedUser);
            } catch (e) {
                console.error("Failed to parse session", e);
                localStorage.removeItem("gym_session");
            }
        }
        setIsLoading(false);
    }, []);

    const login = (email: string, password: string): boolean => {
        // Check against registered users in local storage
        const registeredUsers = JSON.parse(localStorage.getItem("gym_users") || "[]");
        const foundUser = registeredUsers.find((u: any) => u?.email === email && u?.password === password);

        if (foundUser) {
            // Remove password before storing in session
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem("gym_session", JSON.stringify(userWithoutPassword));
            return true;
        } else {
            return false;
        }
    };

    const signup = (userData: any) => {
        const newUser: User = {
            id: `mem_${Math.floor(Math.random() * 10000)}`,
            ...userData
        };

        // Save to current session
        setUser(newUser);
        localStorage.setItem("gym_session", JSON.stringify(newUser));

        // Save to registered users list
        const registeredUsers = JSON.parse(localStorage.getItem("gym_users") || "[]");
        registeredUsers.push(newUser);
        localStorage.setItem("gym_users", JSON.stringify(registeredUsers));
    };

    const updateMembership = (membershipData: any, transactionData: any) => {
        if (!user) return;

        const updatedUser = {
            ...user,
            membership: membershipData,
            transactions: user.transactions ? [...user.transactions, transactionData] : [transactionData]
        };

        // Update current session
        setUser(updatedUser);
        localStorage.setItem("gym_session", JSON.stringify(updatedUser));

        // Update in registered users list
        const registeredUsers = JSON.parse(localStorage.getItem("gym_users") || "[]");
        const userIndex = registeredUsers.findIndex((u: any) => u.email === user.email);
        if (userIndex !== -1) {
            registeredUsers[userIndex] = { ...registeredUsers[userIndex], membership: membershipData, transactions: updatedUser.transactions };
            localStorage.setItem("gym_users", JSON.stringify(registeredUsers));
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("gym_session");
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateMembership, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
