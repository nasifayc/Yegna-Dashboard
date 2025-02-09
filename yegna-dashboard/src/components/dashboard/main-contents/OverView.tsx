import { FaRegUser } from "react-icons/fa6";
import {
  MdStore,
  MdCategory,
  MdShoppingCart,
  MdRateReview,
} from "react-icons/md";
import { notify } from "@/components/Toast";
import { GiReceiveMoney } from "react-icons/gi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconType } from "react-icons/lib";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import axios from "axios";
import { DASHBOARD_DATA_URL } from "@/utils/api/ApiRoutes";
import Loading from "@/components/Loading";
import { ToastContainer } from "react-toastify";

interface CardProps {
  title: string;
  value: number;
  description: string;
  Image: IconType;
}

const CardData: React.FC<CardProps> = ({
  title,
  value,
  description,
  Image,
}) => {
  return (
    <Card className="flex max-w-72 min-w-28 items-center justify-between p-4 shadow-md bg-background-light">
      <div>
        <CardHeader className="p-0">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-xl font-semibold">
            {value ?? 0} +
          </CardDescription>
          <CardDescription className="text-xs text-primary-light">
            {description}
          </CardDescription>
        </CardHeader>
      </div>
      <CardContent className="p-0">
        <Image className="text-primary" size={50} />
      </CardContent>
    </Card>
  );
};

const OverView: React.FC = () => {
  const [data, setData] = useState({
    users: 0,
    sellers: 0,
    products: 0,
    categories: 0,
    transactions: 0,
    reviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(DASHBOARD_DATA_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        notify(`Server Error: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const stats = [
    {
      title: "Users",
      value: data.users,
      description: "14% increase",
      Image: FaRegUser,
    },
    {
      title: "Vendors",
      value: data.sellers,
      description: "10% growth",
      Image: MdStore,
    },
    {
      title: "Products",
      value: data.products,
      description: "New arrivals",
      Image: MdShoppingCart,
    },
    {
      title: "Categories",
      value: data.categories,
      description: "Diverse range",
      Image: MdCategory,
    },
    {
      title: "Transactions",
      value: data.transactions,
      description: "Higher sales",
      Image: GiReceiveMoney,
    },
    {
      title: "Reviews",
      value: data.reviews,
      description: "Customer feedback",
      Image: MdRateReview,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {loading ? (
        <div className="col-span-full flex justify-center">
          <Loading />
        </div>
      ) : (
        stats.map((stat) => <CardData key={stat.title} {...stat} />)
      )}
      <ToastContainer />
    </div>
  );
};

export default OverView;
