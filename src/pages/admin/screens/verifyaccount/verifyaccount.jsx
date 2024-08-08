// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import {
//   Box,
//   Button,
//   Popover,
//   MenuItem,
//   useTheme,
//   Select,
//   InputLabel,
//   Typography,
//   FormControl,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../../../theme";
// import Header from "../../components/header/Header";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   // allAccountsSelector,
//   // userDetailSelector,
//   allVerifyUsersSelector,
//   userDetailSelector,
// } from "../../../../store/sellectors";
// import {
//   getAllVerifyUsersThunk,
//   getAllAccountsThunk,
//   getUserDetailThunk,
//   updateStatusAccountThunk,
//   approveUserThunk,
//   denyUserThunk,
// } from "../../../../store/apiThunk/userThunk";
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
// import "./verifyaccount.css";

// export default function verifyaccount() {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const accounts = useSelector(allVerifyUsersSelector);
//   const userDetail = useSelector(userDetailSelector);
//   const dispatch = useDispatch();
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [pageSize, setPageSize] = useState(5);
//   const [pageNumber, setPageNumber] = useState(0);
//   const [open, setOpen] = useState(false);
//   console.log(userDetail);
//   useEffect(() => {
//     dispatch(getAllVerifyUsersThunk());
//   }, []);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   // const handleAccept = (id) => {
//   //   setShowLoadingModal(true);
//   //   dispatch(approveUserThunk(id)).then(() => {
//   //     dispatch(getAllVerifyUsersThunk()).then(setShowLoadingModal(false));
//   //   });
//   // };
//   const handleAccept = (id) => {
//     setShowLoadingModal(true);
//     dispatch(approveUserThunk(id))
//       .then(() => {
//         dispatch(getAllVerifyUsersThunk()).then(() => {
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
//         dispatch(denyUserThunk(id)).then(() => {
//           dispatch(getAllVerifyUsersThunk()).then(() => {
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
//   const Header = ({
//     title,
//     subtitle,
//     titleColor = "black",
//     subtitleColor = "gray",
//   }) => {
//     return (
//       <Box mb={2}>
//         <Typography
//           style={{
//             fontFamily: "Source Sans Pro, sans-serif",
//             fontSize: "32px",
//             color: "black",
//             fontWeight: "700",
//           }}
//         >
//           {title}
//         </Typography>
//         <Typography variant="subtitle1" style={{ color: subtitleColor }}>
//           {subtitle}
//         </Typography>
//       </Box>
//     );
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
//       field: "email",
//       headerName: "Email",
//       flex: 2,
//       cellClassName: "name-column--cell",
//       renderCell: ({ row: { id, email } }) => {
//         const handleOpen = () => {
//           setShowLoadingModal(true);
//           dispatch(getUserDetailThunk(id)).then(() => {
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
//       field: "userName",
//       headerName: "Tên tài khoản",
//       flex: 1,
//       renderCell: ({ row: { userName } }) => <div>{userName}</div>,
//     },
//     {
//       field: "roleName",
//       headerName: "Vai Trò",
//       flex: 1,
//       renderCell: ({ row: { roleName } }) => <div>{roleName}</div>,
//     },
//     {
//       field: "profileImage",
//       headerName: "Hình ảnh",
//       headerAlign: "center",
//       flex: 2,
//       renderCell: ({ row: { profileImage } }) => (
//         <img style={{ height: "160px", padding: 20 }} src={profileImage} />
//       ),
//     },
//     {
//       field: "verifyStatus",
//       headerName: "Tình trạng",
//       flex: 1,
//       renderCell: ({ row: { verifyStatus } }) => (
//         <div
//           className={
//             verifyStatus === "Pending"
//               ? "status-pending"
//               : verifyStatus === "Approved"
//               ? "status-approved"
//               : "status-deny"
//           }
//         >
//           {verifyStatus}
//         </div>
//       ),
//     },
//     {
//       field: "action",
//       headerName: "Hành động",
//       flex: 1,
//       renderCell: ({ row: { id } }) => {
//         return (
//           <Box width="100%" display="flex" justifyContent="center" gap="4px">
//             <Button
//               variant="contained"
//               style={{
//                 // backgroundColor:
//                 //   status === "Active" ? "#55ab95" : colors.redAccent[600],
//                 backgroundColor: "#55ab95",
//                 minWidth: "50px",
//                 textTransform: "capitalize",
//               }}
//               onClick={() => handleAccept(id)}
//             >
//               Đồng ý
//             </Button>
//             <Button
//               variant="contained"
//               style={{
//                 // backgroundColor:
//                 //   status === "Active" ? "#55ab95" : colors.redAccent[600],
//                 backgroundColor: colors.redAccent[600],
//                 minWidth: "50px",
//                 textTransform: "capitalize",
//               }}
//               onClick={() => handleDeny(id)}
//             >
//               Từ chối
//             </Button>
//           </Box>
//         );
//       },
//     },
//   ];

//   const rows =
//     accounts?.map((account, index) => ({
//       ...account,
//       order: index + 1,
//       // id: account.userId,
//     })) || [];
//   const handlePageChange = (newPage) => {
//     setPageNumber(newPage);
//   };

//   const handlePageSizeChange = (event) => {
//     setPageSize(event.target.value);
//     setPageNumber(0); // Reset to the first page when page size changes
//   };
//   const paginatedRows = rows.slice(
//     pageNumber * pageSize,
//     (pageNumber + 1) * pageSize
//   );
//   const CustomFooter = () => (
//     <Box
//       display="flex"
//       justifyContent="space-between"
//       alignItems="center"
//       p={1}
//       sx={{ color: "black", borderRadius: 1, gap: 1 }}
//     >
//       <Box display="flex" alignItems="center" gap={1}>
//         <Button
//           onClick={() => handlePageChange(pageNumber - 1)}
//           disabled={pageNumber === 0}
//           sx={{ color: "black", backgroundColor: "#7CB9E8" }}
//         >
//           Previous
//         </Button>
//         <Box p={1} sx={{ color: "black" }}>
//           {pageNumber + 1}
//         </Box>
//         <Button
//           onClick={() => handlePageChange(pageNumber + 1)}
//           disabled={(pageNumber + 1) * pageSize >= rows.length}
//           sx={{ color: "black", backgroundColor: "#7CB9E8" }}
//         >
//           Next
//         </Button>
//       </Box>
//       <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 120 }}>
//         <InputLabel id="page-size-select-label" style={{ color: "black" }}>
//           Rows per page
//         </InputLabel>
//         <Select
//           labelId="page-size-select-label"
//           id="page-size-select"
//           value={pageSize}
//           onChange={handlePageSizeChange}
//           label="Rows per page"
//           sx={{
//             "& .MuiOutlinedInput-input": {
//               padding: "8px 14px",
//               fontSize: "0.875rem",
//               color: "black",
//             },
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "black",
//             },
//             "&:hover .MuiOutlinedInput-notchedOutline": {
//               borderColor: "black",
//             },
//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               borderColor: "black",
//             },
//           }}
//         >
//           <MenuItem value={5}>5</MenuItem>
//           <MenuItem value={10}>10</MenuItem>
//           <MenuItem value={20}>20</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );

//   return (
//     <Box m="20px">
//       <Header
//         title="XÁC MINH TÀI KHOẢN"
//         subtitle="Xác minh Tài Khoản Hệ Thống"
//       />

//       <Box sx={StyledBox} height="100%">
//         <DataGrid
//           disableRowSelectionOnClick
//           loading={showLoadingModal}
//           rows={paginatedRows}
//           columns={columns}
//           pagination
//           paginationMode="client"
//           pageSize={pageSize}
//           page={pageNumber}
//           onPageChange={handlePageChange}
//           rowCount={rows.length} // Total number of rows
//           rowsPerPageOptions={[]} // Hides the rows per page selector
//           components={{
//             Pagination: CustomFooter, // Custom footer component
//           }}
//         />
//         <AccountBackdrop
//           open={open}
//           handleClose={handleClose}
//           userDetail={userDetail}
          
//         />
//       </Box>
//     </Box>
//   );
// }


import {
  Box,
  Button,
  Popover,
  MenuItem,
  useTheme,
  Select,
  InputLabel,
  Typography,
  FormControl,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  allVerifyUsersSelector,
  userDetailSelector,
} from "../../../../store/sellectors";
import {
  getAllVerifyUsersThunk,
  getUserDetailThunk,
  approveUserThunk,
  denyUserThunk,
} from "../../../../store/apiThunk/userThunk";
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
import "./verifyaccount.css";

export default function VerifyAccount() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const accounts = useSelector(allVerifyUsersSelector);
  const userDetail = useSelector(userDetailSelector);
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [open, setOpen] = useState(false);
  console.log(userDetail);
  
  useEffect(() => {
    dispatch(getAllVerifyUsersThunk());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = (id) => {
    setShowLoadingModal(true);
    dispatch(approveUserThunk(id))
      .then(() => {
        dispatch(getAllVerifyUsersThunk()).then(() => {
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
      confirmButtonText: "Yes, deny it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowLoadingModal(true);
        dispatch(denyUserThunk(id)).then(() => {
          dispatch(getAllVerifyUsersThunk()).then(() => {
            Swal.fire({
              title: "Denied!",
              text: "The user has been denied.",
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
            color: titleColor,
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
      field: "email",
      headerName: "Email",
      flex: 2,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { id, email } }) => {
        const handleOpen = () => {
          setShowLoadingModal(true);
          dispatch(getUserDetailThunk(id)).then(() => {
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
      field: "userName",
      headerName: "Tên tài khoản",
      flex: 1,
      renderCell: ({ row: { userName } }) => <div>{userName}</div>,
    },
    {
      field: "roleName",
      headerName: "Vai Trò",
      flex: 1,
      renderCell: ({ row: { roleName } }) => <div>{roleName}</div>,
    },
    {
      field: "profileImage",
      headerName: "Hình ảnh",
      headerAlign: "center",
      flex: 2,
      renderCell: ({ row: { profileImage } }) => (
        <img style={{ height: "160px", padding: 20 }} src={profileImage} />
      ),
    },
    {
      field: "verifyStatus",
      headerName: "Tình trạng",
      flex: 1,
      renderCell: ({ row: { verifyStatus } }) => (
        <div
          className={
            verifyStatus === "Pending"
              ? "status-pending"
              : verifyStatus === "Approved"
              ? "status-approved"
              : "status-deny"
          }
        >
          {verifyStatus}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Hành động",
      flex: 1,
      renderCell: ({ row: { id, verifyStatus } }) => {
        if (verifyStatus === "Pending") {
          return (
            <Box width="100%" display="flex" justifyContent="center" gap="4px">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#55ab95",
                  minWidth: "50px",
                  textTransform: "capitalize",
                }}
                onClick={() => handleAccept(id)}
              >
                Đồng ý
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: colors.redAccent[600],
                  minWidth: "50px",
                  textTransform: "capitalize",
                }}
                onClick={() => handleDeny(id)}
              >
                Từ chối
              </Button>
            </Box>
          );
        } else {
          return null;
        }
      },
    },
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
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Box m="20px">
      <Header
        title="XÁC MINH TÀI KHOẢN"
        subtitle="Xác minh Tài Khoản Hệ Thống"
      />

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
        <AccountBackdrop
          open={open}
          handleClose={handleClose}
          userDetail={userDetail}
        />
      </Box>
    </Box>
  );
}
