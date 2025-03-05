import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ToastContainer } from "react-toastify";

const Transaction: React.FC = () => {
  return (
    <div className="p-6">
      <Card className="dark:bg-gray-800 dark:border-none transition dark:text-text-dark">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <h1 className="text-xl text-gray-400">No Transaction History</h1>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Transaction;
