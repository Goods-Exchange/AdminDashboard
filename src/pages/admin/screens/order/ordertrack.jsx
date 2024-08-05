import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { tokens } from "../../../../theme";
import Header from "../../components/header/Header";
import { allOrdersSelector } from "../../../../store/sellectors";
import {
  getAllUsersThunk,
  banUserThunk,
  unbanUserThunk,
} from "../../../../store/apiThunk/userThunk";
import {
    getAllOrdersThunk,
    cancelOrderThunk
  } from "../../../../store/apiThunk/orderThunk";
import {
  StyledBox,
  CustomNoRowsOverlay,
  GridLoadingOverlay,
} from "../../../../components/styledTable/styledTable";
import "./ordertrack.css";

const OrdertrackTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const accounts = useSelector(allOrdersSelector);
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(5); // State for number of rows per page
  const [pageNumber, setPageNumber] = useState(0); // Current page index

  useEffect(() => {
    dispatch(getAllOrdersThunk());
  }, [dispatch]);

  const handleAccept = (orderId) => {
    setShowLoadingModal(true);
    dispatch(banUserThunk(orderId))
      .then(() => {
        dispatch(getAllOrdersThunk()).then(() => {
          setShowLoadingModal(false);
          Swal.fire({
            title: "Success!",
            text: "User has been approved.",
            icon: "success",
          });
        });
      })
      .catch((error) => {
        setShowLoadingModal(false);
        Swal.fire({
          title: "Error!",
          text: "There was an issue approving the user.",
          icon: "error",
        });
      });
  };

  const handleDeny = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowLoadingModal(true);
        dispatch(cancelOrderThunk(orderId)).then(() => {
          dispatch(getAllOrdersThunk()).then(() => {
            Swal.fire({
              title: "Cancel!",
              text: "Your file has been cancel.",
              icon: "success",
            }).then(() => {
              setShowLoadingModal(false);
            });
          });
        });
      }
    });
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
        field: "orderId",
        headerName: "Sender Name",
        flex: 1,
        cellClassName: "name-column--cell",
        renderCell: ({ row: { orderId } }) => {
          const handleOpen = () => {
            setShowLoadingModal(true);
            dispatch(getAllOrdersThunk(orderId)).then(() => {
              setShowLoadingModal(false);
              setOpen(true);
            });
          };
          return (
            <div onClick={handleOpen} style={{ cursor: "pointer" }}>
              {orderId}
            </div>
          );
        },
      },
   
    {
      field: "senderUsername",
      headerName: "Sender Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { orderId, senderUsername } }) => {
        const handleOpen = () => {
          setShowLoadingModal(true);
          dispatch(getAllOrdersThunk(orderId)).then(() => {
            setShowLoadingModal(false);
            setOpen(true);
          });
        };
        return (
          <div onClick={handleOpen} style={{ cursor: "pointer" }}>
            {senderUsername}
          </div>
        );
      },
    },
   
    {
      field: "postTitle",
      headerName: "Post Title",
      flex: 1,
      renderCell: ({ row: { postTitle } }) => <div>{postTitle}</div>,
    },
    {
      field: "postContent",
      headerName: "Post Content",
      flex: 1,
      renderCell: ({ row: { postContent } }) => <div>{postContent}</div>,
    },
    {
        field: "orderStatus",
        headerName: "Status",
        renderCell: ({ row: { orderStatus } }) => (
          <div
            className={
              orderStatus === "Pending"
                ? "status-Pending"
                : orderStatus === "Delivered"
                ? "status-Delivered"
                : orderStatus === "Reject"
                ? "status-Rejected"
                : "status-Canceled"
            }
          >
            {orderStatus}
          </div>
        ),
      },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { orderId } }) => {
        return (
          <Box width="100%" display="flex" justifyContent="center" gap="4px">
       
            <Button
              variant="contained"
              style={{
                backgroundColor: colors.blueAccent[400],
                minWidth: "50px",
                textTransform: "capitalize",
              }}
              onClick={() => handleDeny(orderId)}
            >
              Cancel
            </Button>
          </Box>
        );
      },
    },
  ];

  const rows =
    accounts?.map((account, index) => ({
      ...account,
      order: index + 1,
      id: account.orderId, // Ensure each row has a unique id
      senderUsername: account.user.senderUsername, // Extract senderUsername
      postTitle: account.post.postTitle, 
      postContent: account.post.postContent, 
    })) || [];

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
      <Header title="Order Tracking" subtitle="Theo Dõi Đơn Hàng Từ Hệ Thống" />

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
      </Box>
    </Box>
  );
};

export default OrdertrackTable;
