import { Box, Button, Popover, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import Coin from "../../../../assets/coinvnd.png";

import {
  allPetCoffeeShopsSelector,
  walletSelector,
  petCoffeeShopDetailSelector,
  postSelector,
} from "../../../../store/sellectors";
import {
    allReportsSelector,
   
} from "../../../../store/sellectors";
import {
    getAllReportsThunk,
  
} from "../../../../store/apiThunk/reportThunk";

import { getWalletThunk } from "../../../../store/apiThunk/walletThunk";
import { useEffect, useState } from "react";
import Pagination from "../../../../components/pagination/pagination";
import { AccRole } from "../../../../components/mapping/mapping";
import {
  StyledBox,
  CustomNoRowsOverlay,
  GridLoadingOverlay,
} from "../../../../components/styledTable/styledTable";
import { FilterComponent } from "../../../../components/filter/filterComponent";
import { FormatPhoneNumber } from "../../../../components/format/formatText/formatText";
import { AccountBackdrop } from "../../../../components/backdrop/accountBackdrop/accountBackdrop";
import Swal from "sweetalert2";

export default function ReportTable() {
  const theme = useTheme();
  const shopDetail = useSelector(petCoffeeShopDetailSelector);
  const colors = tokens(theme.palette.mode);
  const accounts = useSelector(allReportsSelector);
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  console.log(accounts);
  useEffect(() => {
    dispatch(getAllReportsThunk());
  }, []);

  const columns = [
    {
      field: "order",
      headerName: "STT",
      headerAlign: "center",
      renderCell: ({ row: { order } }) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {order}
        </Box>
      ),
    },

    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    //   renderCell: ({ row: { id, email } }) => {
    //     const handleOpen = () => {
    //       setShowLoadingModal(true);
    //       dispatch(getWalletThunk(id)).then(() => {
    //         setShowLoadingModal(false);
    //         setOpen(true);
    //       });
    //     };
    //     return (
    //       <div onClick={handleOpen} style={{ cursor: "pointer" }}>
    //         {email}
    //       </div>
    //     );
    //   },
    // },
    {
      field: "reportContent",
      headerName: "Nội Dung Report",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { id, reportContent } }) => {
        const handleOpen = () => {
          setShowLoadingModal(true);
          dispatch(
            getAllReportsThunk({
              id,
            })
          ).then(() => {
            setShowLoadingModal(false);
            setOpen(true);
          });
        };
        return (
          <div onClick={handleOpen} style={{ cursor: "pointer" }}>
            {reportContent}
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "User Name",
      flex: 1,
      renderCell: ({ row: { username } }) => <div>{username}</div>,
    },
    {
      field: "action",
      headerName: "Hành động",
      flex: 1,
      renderCell: ({ row: { action } }) => <div>{action}</div>,
    },
    // {
    //   field: "amount",
    //   flex: 1,
    //   headerAlign: "center",
    //   headerName: "Số tiền nạp",
    //   renderCell: ({ row: { amount } }) => (
    //     <Box
    //       display="flex"
    //       alignItems="center"
    //       justifyContent="center"
    //       width="100%"
    //       gap="6px"
    //     >
    //       {amount}
    //       <img src={Coin} alt="" style={{ width: "35px" }} />
    //     </Box>
    //   ),
    // },
  ];

  const rows =
    accounts?.map((account, index) => ({
      ...account,
      order: index + 1,
    })) || [];
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="TÀI KHOẢN" subtitle="Quản Lý Tài Khoản Hệ Thống" />

      <Box sx={StyledBox} height="59vh">
        <DataGrid
          disableRowSelectionOnClick
          loading={showLoadingModal}
          slots={{
            loadingOverlay: () => <GridLoadingOverlay />,
            noRowsOverlay: () => <CustomNoRowsOverlay />,
            pagination: () => (
              <Pagination
                data={accounts}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageNumber={setPageNumber}
                setPageSize={setPageSize}
              />
            ),
          }}
          rows={rows}
          columns={columns}
        />
        {/* <AccountBackdrop
                        open={open}
                        handleClose={handleClose}
                        shopDetail={shopDetail}
                    /> */}
      </Box>
    </Box>
  );
}
