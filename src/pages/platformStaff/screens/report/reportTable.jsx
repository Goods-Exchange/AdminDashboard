import {
  Box,
  Button,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
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
  const [pageNumber, setPageNumber] = useState(0);
  console.log(accounts);
  useEffect(() => {
    dispatch(getAllReportsThunk());
  }, []);
  const Header = ({
    title,
    subtitle,
    titleColor = "black",
    subtitleColor = "gray",
  }) => {
    return (
      <Box mb={2}>
        <Typography
          style={{
            fontFamily: "Source Sans Pro, sans-serif",
            fontSize: "32px",
            color: "black",
            fontWeight: "700",
          }}
        >
          {title}
        </Typography>
        <Typography variant="subtitle1" style={{ color: subtitleColor }}>
          {subtitle}
        </Typography>
      </Box>
    );
  };
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

    {
      field: "id",
      headerName: "ID",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { id } }) => {
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
            {id}
          </div>
        );
      },
    },
    {
      field: "reportContent",
      headerName: "Report Content",
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
      field: "reportUserId",
      headerName: "Report User ID",
      flex: 1,
      renderCell: ({ row: { reportUserId } }) => <div>{reportUserId}</div>,
    },
    {
      field: "reportPostId",
      headerName: "Report POST ID",
      flex: 1,
      renderCell: ({ row: { reportPostId } }) => <div>{reportPostId}</div>,
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
  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPageNumber(0); // Reset to the first page when page size changes
  };

  const paginatedRows = rows.slice(
    pageNumber * pageSize,
    (pageNumber + 1) * pageSize
  );

  const CustomFooter = () => (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      sx={{ color: "black", borderRadius: 1, gap: 1 }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 0}
          sx={{ color: "black", backgroundColor: "#7CB9E8" }}
        >
          Previous
        </Button>
        <Box p={1} sx={{ color: "black" }}>
          {pageNumber + 1}
        </Box>
        <Button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={(pageNumber + 1) * pageSize >= rows.length}
          sx={{ color: "black", backgroundColor: "#7CB9E8" }}
        >
          Next
        </Button>
      </Box>
      <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 120 }}>
        <InputLabel id="page-size-select-label" style={{ color: "black" }}>
          Rows per page
        </InputLabel>
        <Select
          labelId="page-size-select-label"
          id="page-size-select"
          value={pageSize}
          onChange={handlePageSizeChange}
          label="Rows per page"
          sx={{
            "& .MuiOutlinedInput-input": {
              padding: "8px 14px",
              fontSize: "0.875rem",
              color: "black",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "& .MuiSvgIcon-root": { // Thêm phần này để thay đổi màu của icon
              color: "black",
            },
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Box m="20px">
      <Header title="REPORT" subtitle="Xử Lí Báo Cáo Hệ Thống" />

      <Box sx={StyledBox} height="100%">
        <DataGrid
          disableRowSelectionOnClick
          loading={showLoadingModal}
          rows={paginatedRows}
          columns={columns}
          pagination
          paginationMode="client"
          pageSize={pageSize}
          page={pageNumber}
          onPageChange={handlePageChange}
          rowCount={rows.length} // Total number of rows
          rowsPerPageOptions={[]} // Hides the rows per page selector
          components={{
            Pagination: CustomFooter, // Custom footer component
          }}
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
