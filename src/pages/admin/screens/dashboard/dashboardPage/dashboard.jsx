import { Box, Divider } from "@mui/material";
import Header from "../../../components/header/Header";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { BarChart } from "@mui/x-charts";
import Coin from "../../../../../assets/coin.png";
import { useSelector } from "react-redux";
import { platformIncomeSelector } from "../../../../../store/sellectors";
import {
    GeneratePastSixMonths,
    ValueFormatter,
} from "../../../../../components/graph/graph";
import AccountTable from "../../account/accountTable";
import WalletTableAdmin from "../../wallet/walletTable";
import ShopTableStaff from "../../../../platformStaff/screens/shop/shopTable";

export default function AdminDashboard() {
    const platformIncome = useSelector(platformIncomeSelector);

    const xLabels = GeneratePastSixMonths();

    const incomeSeriesData = platformIncome?.monthAmounts
        ? [
              {
                  data: platformIncome.monthAmounts,
                  valueFormatter: ValueFormatter,
              },
          ]
        : [];

    const incomeSeries = [
        {
            data: platformIncome?.monthAmounts,
        },
    ];

    return (
        <div className="dashboard">
         
            <AccountTable />
            <WalletTableAdmin />
            <ShopTableStaff />
        </div>
    );
}
