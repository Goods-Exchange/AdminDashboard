// import { Box, Button, Popover, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../../../theme";
// import Header from "../../components/header/Header";
// import { useDispatch, useSelector } from "react-redux";
// import Coin from "../../../../assets/coinvnd.png";
// import {
//   allAccountsSelector,
//   // userDetailSelector,
//   allVerifyUsersSelector,
// } from "../../../../store/sellectors";
// import {
//     allPetCoffeeShopsSelector,
//     walletSelector,
//     petCoffeeShopDetailSelector,
//     postSelector,
//   } from "../../../../store/sellectors";
// import {
//   getAllVerifyUsersThunk,
//   getAllAccountsThunk,
//   getUserDetailThunk,
//   updateStatusAccountThunk,
//   getAllUsersThunk,
//   approveUserThunk,
//   denyUserThunk,
//   banUserThunk,
//   unbanUserThunk
// } from "../../../../store/apiThunk/userThunk";
// import {getWalletThunk } from "../../../../store/apiThunk/walletThunk";
// import { useEffect, useState } from "react";
// import Pagination from "../../../../components/pagination/pagination";
// import { AccRole } from "../../../../components/mapping/mapping";
// import {
//   StyledBox,
//   CustomNoRowsOverlay,
//   GridLoadingOverlay,
// } from "../../../../components/styledTable/styledTable";
// import { FilterComponent } from "../../../../components/filter/filterComponent";
// import { FormatPhoneNumber } from "../../../../components/format/formatText/formatText";
// import { AccountBackdrop } from "../../../../components/backdrop/accountBackdrop/accountBackdrop";
// import Swal from "sweetalert2";

// export default function WalletTable() {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const accounts = useSelector(walletSelector);
//   const dispatch = useDispatch();
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [pageSize, setPageSize] = useState(10);
//   const [pageNumber, setPageNumber] = useState(1);
//   console.log(accounts);
//   useEffect(() => {
//     dispatch(getWalletThunk());
//   }, []);

//   // const handleAccept = (id) => {
//   //   setShowLoadingModal(true);
//   //   dispatch(approveUserThunk(id)).then(() => {
//   //     dispatch(getAllVerifyUsersThunk()).then(setShowLoadingModal(false));
//   //   });
//   // };
//   const handleAccept = (id) => {
//     setShowLoadingModal(true);
//     dispatch(banUserThunk(id))
//       .then(() => {
//         dispatch(getAllUsersThunk()).then(() => {
//           setShowLoadingModal(false);
//           Swal.fire({
//             title: "Success!",
//             text: "User has been approved.",
//             icon: "success",
//           });
//         });
//       })
//       .catch((error) => {
//         setShowLoadingModal(false);
//         Swal.fire({
//           title: "Error!",
//           text: "There was an issue approving the user.",
//           icon: "error",
//         });
//       });
//   };

//   const handleDeny = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setShowLoadingModal(true);
//         dispatch(unbanUserThunk(id)).then(() => {
//           dispatch(getAllUsersThunk()).then(() => {
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your file has been deleted.",
//               icon: "success",
//             }).then(() => {
//               setShowLoadingModal(false);
//             });
//           });
//         });
//       }
//     });
//   };

//   const columns = [
//     {
//       field: "order",
//       headerName: "STT",
//       headerAlign: "center",
//       renderCell: ({ row: { order } }) => (
//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           width="100%"
//         >
//           {order}
//         </Box>
//       ),
//     },
//     {
//         field: "id",
//         headerName: "ID Giao dịch",
//         flex: 1,
//         renderCell: ({ row: { id } }) => <div>{id}</div>,
//       },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//       cellClassName: "name-column--cell",
//       renderCell: ({ row: { id, email } }) => {
//         const handleOpen = () => {
//           setShowLoadingModal(true);
//           dispatch(getWalletThunk(id)).then(() => {
//             setShowLoadingModal(false);
//             setOpen(true);
//           });
//         };
//         return (
//           <div onClick={handleOpen} style={{ cursor: "pointer" }}>
//             {email}
//           </div>
//         );
//       },
//     },
//     {
//       field: "username",
//       headerName: "User Name",
//       flex: 1,
//       renderCell: ({ row: { username } }) => <div>{username}</div>,
//     },
//     {
//         field: "action",
//         headerName: "Hành động",
//         flex: 1,
//         renderCell: ({ row: { action } }) => <div>{action}</div>,
//       },
//       {
//         field: "amount",
//         flex: 1,
//         headerAlign: "center",
//         headerName: "Số tiền nạp",
//         renderCell: ({ row: { amount } }) => (
//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             width="100%"
//             gap="6px"
//           >
//             {amount}
//             <img src={Coin} alt="" style={{ width: "35px" }} />
//           </Box>
//         ),
//       },

//     // {
//     //   field: "profileImage",
//     //   headerName: "Hình ảnh",
//     //   flex: 1,
//     //   renderCell: ({ row: { profileImage } }) => <img style={{height:"160px",padding:20}} src={profileImage} />,
//     // },

//     // {
//     //   field: "action",
//     //   headerName: "Hành động",
//     //   flex: 1,
//     //   renderCell: ({ row: { id } }) => {
//     //     return (
//     //       <Box width="100%" display="flex" justifyContent="center" gap="4px">
//     //         <Button
//     //           variant="contained"
//     //           style={{
//     //             // backgroundColor:
//     //             //   status === "Active" ? "#55ab95" : colors.redAccent[600],
//     //             backgroundColor: "#55ab95",
//     //             minWidth: "50px",
//     //             textTransform: "capitalize",
//     //           }}
//     //           onClick={() => handleAccept(id)}
//     //         >
//     //           Chặn
//     //         </Button>
//     //         <Button
//     //           variant="contained"
//     //           style={{
//     //             // backgroundColor:
//     //             //   status === "Active" ? "#55ab95" : colors.redAccent[600],
//     //             backgroundColor: colors.redAccent[600],
//     //             minWidth: "50px",
//     //             textTransform: "capitalize",
//     //           }}
//     //           onClick={() => handleDeny(id)}
//     //         >
//     //           Hủy chặn
//     //         </Button>
//     //       </Box>
//     //     );
//     //   },
//     // },
//   ];

//   const rows =
//     accounts?.map((account, index) => ({
//       ...account,
//       order: index + 1,
//     })) || [];

//   return (
//     <Box m="20px">
//       <Header title="TÀI KHOẢN" subtitle="Quản Lý Tài Khoản Hệ Thống" />
//       {/* <div
//         style={{
//           color: "#3045FF",
//           fontSize: 34,
//           fontWeight: 900,
//           marginLeft: 550,
//           fontFamily: "serif",
//         }}
//       >
//         TÀI KHOẢN
//       </div> */}
//       {/* <div
//         style={{
//           color: "#2a2d64",
//           fontSize: 20,
//           fontWeight: 900,
//           padding: 20,
//         }}
//       >
//         Quản Lý Tài Khoản Hệ Thống
//       </div> */}
//       {/* <FilterComponent
//         label="Vai Trò"
//         name="role"
//         role={role}
//         setRole={setRole}
//       /> */}
//       <Box sx={StyledBox} height="59vh">
//         <DataGrid
//           disableRowSelectionOnClick
//           loading={showLoadingModal}
//           slots={{
//             loadingOverlay: () => <GridLoadingOverlay />,
//             noRowsOverlay: () => <CustomNoRowsOverlay />,
//             pagination: () => (
//               <Pagination
//                 data={accounts}
//                 pageNumber={pageNumber}
//                 pageSize={pageSize}
//                 setPageNumber={setPageNumber}
//                 setPageSize={setPageSize}
//               />
//             ),
//           }}
//           rows={rows}
//           columns={columns}
//         />
//         {/* <AccountBackdrop
//                     open={open}
//                     handleClose={handleClose}
//                     userDetail={userDetail}
//                 /> */}
//         {/* {accounts.email} */}
//       </Box>
//     </Box>
//   );
// }

///////////////////////////////////////////////////////
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Button,
  Popover,
  useTheme,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import Coin from "../../../../assets/coinvnd.png";
import {
  allAccountsSelector,
  // userDetailSelector,
  allVerifyUsersSelector,
} from "../../../../store/sellectors";
import {
  allPetCoffeeShopsSelector,
  walletSelector,
  petCoffeeShopDetailSelector,
  postSelector,
} from "../../../../store/sellectors";
import {
  getAllVerifyUsersThunk,
  getAllAccountsThunk,
  getUserDetailThunk,
  updateStatusAccountThunk,
  getAllUsersThunk,
  approveUserThunk,
  denyUserThunk,
  banUserThunk,
  unbanUserThunk,
} from "../../../../store/apiThunk/userThunk";
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

export default function WalletTable() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const accounts = useSelector(walletSelector);
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  console.log(accounts);
  useEffect(() => {
    dispatch(getWalletThunk());
  }, []);

  // const handleAccept = (id) => {
  //   setShowLoadingModal(true);
  //   dispatch(approveUserThunk(id)).then(() => {
  //     dispatch(getAllVerifyUsersThunk()).then(setShowLoadingModal(false));
  //   });
  // };
  const handleAccept = (id) => {
    setShowLoadingModal(true);
    dispatch(banUserThunk(id))
      .then(() => {
        dispatch(getAllUsersThunk()).then(() => {
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

  const handleDeny = (id) => {
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
        dispatch(unbanUserThunk(id)).then(() => {
          dispatch(getAllUsersThunk()).then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => {
              setShowLoadingModal(false);
            });
          });
        });
      }
    });
  };
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
      headerName: "ID Giao dịch",
      flex: 1,
      renderCell: ({ row: { id } }) => <div>{id}</div>,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { id, email } }) => {
        const handleOpen = () => {
          setShowLoadingModal(true);
          dispatch(getWalletThunk(id)).then(() => {
            setShowLoadingModal(false);
            setOpen(true);
          });
        };
        return (
          <div onClick={handleOpen} style={{ cursor: "pointer" }}>
            {email}
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
      headerName: "Action History",
      flex: 1,
      renderCell: ({ row: { action } }) => (
        <div
          style={{
            color:
              action === "Purchase Denied"
                ? "red"
                : action === "Purchase denied"
                ? "red"
                : action === "Deposit into Wallet"
                ? "green"
                : action === "purchase cancled"
                ? "#00A7CE"
                : "#0D9494",
          }}
        >
          {action}
        </div>
      ),
    },
    {
      field: "amount",
      flex: 1,
      // headerAlign: "center",
      headerName: "Money (vnđ)",
      renderCell: ({ row: { amount } }) => (
        <Box
          display="flex"
          alignItems="center"
          // justifyContent="center"
          width="100%"
          gap="6px"
        >
          <img src={Coin} alt="" style={{ width: "35px" }} />
          {amount}
        </Box>
      ),
    },

    // {
    //   field: "profileImage",
    //   headerName: "Hình ảnh",
    //   flex: 1,
    //   renderCell: ({ row: { profileImage } }) => <img style={{height:"160px",padding:20}} src={profileImage} />,
    // },

    // {
    //   field: "action",
    //   headerName: "Hành động",
    //   flex: 1,
    //   renderCell: ({ row: { id } }) => {
    //     return (
    //       <Box width="100%" display="flex" justifyContent="center" gap="4px">
    //         <Button
    //           variant="contained"
    //           style={{
    //             // backgroundColor:
    //             //   status === "Active" ? "#55ab95" : colors.redAccent[600],
    //             backgroundColor: "#55ab95",
    //             minWidth: "50px",
    //             textTransform: "capitalize",
    //           }}
    //           onClick={() => handleAccept(id)}
    //         >
    //           Chặn
    //         </Button>
    //         <Button
    //           variant="contained"
    //           style={{
    //             // backgroundColor:
    //             //   status === "Active" ? "#55ab95" : colors.redAccent[600],
    //             backgroundColor: colors.redAccent[600],
    //             minWidth: "50px",
    //             textTransform: "capitalize",
    //           }}
    //           onClick={() => handleDeny(id)}
    //         >
    //           Hủy chặn
    //         </Button>
    //       </Box>
    //     );
    //   },
    // },
  ];

  const rows =
    accounts?.map((account, index) => ({
      ...account,
      order: index + 1,
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
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Box m="20px">
      <Header title="GIAO DỊCH" subtitle="Quản Lý Giao Dịch Hệ Thống" />
      {/* <div
        style={{
          color: "#3045FF",
          fontSize: 34,
          fontWeight: 900,
          marginLeft: 550,
          fontFamily: "serif",
        }}
      >
        TÀI KHOẢN
      </div> */}
      {/* <div
        style={{
          color: "#2a2d64",
          fontSize: 20,
          fontWeight: 900,
          padding: 20,
        }}
      >
        Quản Lý Tài Khoản Hệ Thống
      </div> */}
      {/* <FilterComponent
        label="Vai Trò"
        name="role"
        role={role}
        setRole={setRole}
      /> */}
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
                    userDetail={userDetail}
                /> */}
        {/* {accounts.email} */}
      </Box>
    </Box>
  );
}
