export type Plan = {
    id: string;
    name: string;
    price: string;
    duration: string;
    features: string[];
    popular?: boolean;
    color?: string;
};

export const plans: Plan[] = [
    {
        id: "monthly",
        name: "Monthly",
        price: "₹2,499",
        duration: "/month",
        features: [
            "Access to all gym equipment",
            "Locker facility",
            "Steam bath access (2x/month)",
            "General trainer assistance",
        ],
        color: "from-gray-700 to-gray-900"
    },
    {
        id: "quarterly",
        name: "Quarterly",
        price: "₹6,999",
        duration: "/3 months",
        features: [
            "All Monthly benefits",
            "Free diet consultation (1x)",
            "Steam bath access (4x/month)",
            "Guest pass (1x/month)",
        ],
        color: "from-gray-700 to-gray-900"
    },
    {
        id: "annual",
        name: "Annual Elite",
        price: "₹14,999",
        duration: "/year",
        features: [
            "All Quarterly benefits",
            "Unlimited Steam & Sauna",
            "Personal Training Session (2x)",
            "Nutrition Plan included",
            "T-Shirt & Shaker Bottle",
            "Freeze membership option",
        ],
        popular: true,
        color: "from-gym-red to-red-900"
    },
];
