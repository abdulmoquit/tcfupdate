import { motion } from "framer-motion";
import { Download, CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

const PaymentHistory = () => {
    const { user } = useAuth();

    // Use real transactions from user data
    const transactions = user?.transactions || [];

    // Calculate stats from real transactions
    const totalPaid = transactions
        .filter(t => t.status === "paid")
        .reduce((sum, t) => {
            const amount = parseFloat(t.amount.replace(/[₹,]/g, ""));
            return sum + amount;
        }, 0);

    const totalPending = transactions
        .filter(t => t.status === "pending")
        .reduce((sum, t) => {
            const amount = parseFloat(t.amount.replace(/[₹,]/g, ""));
            return sum + amount;
        }, 0);

    const nextDueDate = user?.membership?.end
        ? new Date(user.membership.end).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        : "N/A";

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-heading text-3xl font-bold">Billing & Payments</h1>
                    <p className="text-muted-foreground">Manage your invoices and payment history.</p>
                </div>
                {transactions.length > 0 && (
                    <Button variant="outline">
                        <Download size={16} className="mr-2" /> Download All
                    </Button>
                )}
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card border border-border p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 text-green-500 rounded-full">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Total Paid</p>
                        <p className="text-2xl font-bold">₹{totalPaid.toLocaleString('en-IN')}</p>
                    </div>
                </div>
                <div className="bg-card border border-border p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-full">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Pending</p>
                        <p className="text-2xl font-bold">₹{totalPending.toLocaleString('en-IN')}</p>
                    </div>
                </div>
                <div className="bg-card border border-border p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-full">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Next Due</p>
                        <p className="text-2xl font-bold">{nextDueDate}</p>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
            >
                <div className="p-6 border-b border-border">
                    <h3 className="font-heading text-lg font-bold">Transaction History</h3>
                </div>
                {transactions.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground">
                        <p>No transactions yet. Your payment history will appear here after you purchase a membership.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-secondary/20">
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((txn) => (
                                <TableRow key={txn.id} className="hover:bg-secondary/20">
                                    <TableCell className="font-mono">{txn.id}</TableCell>
                                    <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{txn.description}</TableCell>
                                    <TableCell className="font-bold">{txn.amount}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={txn.status === "paid" ? "default" : "secondary"}
                                            className={txn.status === "paid" ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" : "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"}
                                        >
                                            {txn.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Download size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </motion.div>
        </div>
    );
};

export default PaymentHistory;
