// import { Box, Button, Divider, Popover, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../../../theme";
// import Header from "../../components/header/Header";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   allPetCoffeeShopsSelector,
//   petCoffeeShopDetailSelector,
//   postSelector,
// } from "../../../../store/sellectors";
// import { useState } from "react";
// import {
//   getAllPetCoffeeShopsThunk,
//   getPetCoffeeShopDetailThunk,
//   updateShopStatusThunk,
// } from "../../../../store/apiThunk/petCoffeeShopThunk";
// import { getPostThunk, banPostThunk,unbanPostThunk } from "../../../../store/apiThunk/postThunk";
// import { useEffect } from "react";
// import Pagination from "../../../../components/pagination/pagination";
// import {
//   StyledBox,
//   CustomNoRowsOverlay,
//   GridLoadingOverlay,
// } from "../../../../components/styledTable/styledTable";
// import { FilterComponent } from "../../../../components/filter/filterComponent";
// import { PetType, ShopStatus } from "../../../../components/mapping/mapping";
// import { ShopBackdrop } from "../../../../components/backdrop/shopBackdrop/shopBackdrop";
// import { useLocation } from "react-router-dom";
// import { FormatPhoneNumber } from "../../../../components/format/formatText/formatText";
// import {
//   FormatDate,
//   FormatDateTimeNoti,
// } from "../../../../components/format/formatDatetime/formatDatetime";
// import Swal from "sweetalert2";

// export default function ShopTableStaff() {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const shops = useSelector(postSelector);
//   const shopDetail = useSelector(petCoffeeShopDetailSelector);
//   const url = new URL(window.location.href);
//   const render = url.searchParams.get("render");
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const shopId = location?.state?.shopId;
//   const openNoti = location?.state?.openNoti;
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [popoverId, setPopoverId] = useState(null);
//   const [popoverStatus, setPopoverStatus] = useState(null);
//   const [shopType, setShopType] = useState("all");
//   const [pageSize, setPageSize] = useState(30);
//   const [pageIndex, setPageIndex] = useState(0);
//   const [open, setOpen] = useState(false);

//   const handleClose = () => {
//     setOpen(false);
//   };
//   // const handleAccept = (id) => {
//   //   setShowLoadingModal(true);
//   //   dispatch(banPostThunk(id))
//   //     .then(() => {
//   //       dispatch(getPostThunk()).then(() => {
//   //         setShowLoadingModal(false);
//   //         Swal.fire({
//   //           title: "Success!",
//   //           text: "User has been approved.",
//   //           icon: "success",
//   //         });
//   //       });
//   //     })
//   //     .catch((error) => {
//   //       setShowLoadingModal(false);
//   //       Swal.fire({
//   //         title: "Error!",
//   //         text: "There was an issue approving the user.",
//   //         icon: "error",
//   //       });
//   //     });
//   // };


//   // const handleDeny = (id) => {
//   //   Swal.fire({
//   //     title: "Are you sure?",
//   //     text: "You won't be able to revert this!",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonColor: "#3085d6",
//   //     cancelButtonColor: "#d33",
//   //     confirmButtonText: "Yes, delete it!",
//   //   }).then((result) => {
//   //     if (result.isConfirmed) {
//   //       setShowLoadingModal(true);
//   //       dispatch(unbanPostThunk(id)).then(() => {
//   //         dispatch(getPostThunk()).then(() => {
//   //           Swal.fire({
//   //             title: "Deleted!",
//   //             text: "Your file has been deleted.",
//   //             icon: "success",
//   //           }).then(() => {
//   //             setShowLoadingModal(false);
//   //           });
//   //         });
//   //       });
//   //     }
//   //   });
//   // };
//   const handleAccept = (id) => {
//     setShowLoadingModal(true);
//     dispatch(banPostThunk(id))
//       .then(() => {
//         return dispatch(getPostThunk({
//           pageIndex,
//           pageSize,
//         }));
//       })
//       .then(() => {
//         setShowLoadingModal(false);
//         Swal.fire({
//           title: "Success!",
//           text: "User has been approved.",
//           icon: "success",
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
//         dispatch(unbanPostThunk(id))
//           .then(() => {
//             return dispatch(getPostThunk({
//               pageIndex,
//               pageSize,
//             }));
//           })
//           .then(() => {
//             setShowLoadingModal(false);
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your file has been deleted.",
//               icon: "success",
//             });
//           })
//           .catch((error) => {
//             setShowLoadingModal(false);
//             Swal.fire({
//               title: "Error!",
//               text: "There was an issue deleting the user.",
//               icon: "error",
//             });
//           });
//       }
//     });
//   };



//   useEffect(() => {
//     const fetchShops =
//       shopType !== "all"
//         ? dispatch(
//             getPostThunk({
//               pageIndex,
//               pageSize,
//             })
//           )
//         : dispatch(
//             getPostThunk({
//               pageIndex,
//               pageSize, 
//             })
//           );
//     setShowLoadingModal(true);
//     fetchShops.then(() => setShowLoadingModal(false));
//   }, [pageIndex, pageSize]);

//   // useEffect(() => {
//   //   const removeRenderQueryParameter = () => {
//   //     const url = new URL(window.location.href);
//   //     url.searchParams.delete("render");
//   //     window.history.replaceState({}, "", url);
//   //   };

//   //   if (shopId && openNoti) {
//   //     setShowLoadingModal(true);
//   //     dispatch(
//   //       getPostThunk({
//   //         id: shopId,
//   //         latitude: 1,
//   //         longitude: 1,
//   //       })
//   //     ).then(() => {
//   //       removeRenderQueryParameter();
//   //       setShowLoadingModal(false);
//   //       setOpen(openNoti);
//   //     });
//   //   }
//   // }, [openNoti, shopId, render]);

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
//       field: "postTitle",
//       headerName: "Tiêu đề Post",
//       flex: 1,
//       cellClassName: "name-column--cell",
//       renderCell: ({ row: { id, postTitle } }) => {
//         const handleOpen = () => {
//           setShowLoadingModal(true);
//           dispatch(
//             getPostThunk({
//               id,
//             })
//           ).then(() => {
//             setShowLoadingModal(false);
//             setOpen(true);
//           });
//         };
//         return (
//           <div onClick={handleOpen} style={{ cursor: "pointer" }}>
//             {postTitle}
//           </div>
//         );
//       },
//     },
//     {
//       field: "postContent",
//       headerName: "Nội dung",
//       flex: 1,
//     },
//     {
//       field: "creationDate",
//       headerName: "Ngày tạo",
//       flex: 1,
//       renderCell: ({ row: { creationDate } }) => (
//         <div>{FormatDate(creationDate)}</div>
//       ),
//     },
//     {
//         field: "status",
//         headerName: "Tình trạng",
//         flex: 1,
//         renderCell: ({ row: { status } }) => (
//           <div
//             style={{
//               color: status === "Unban" ? "green" : "red",
//             }}
//           >
//             {status}
//           </div>
//         ),
//       },
//     {
//         field: "action",
//         headerName: "Hành động",
//         flex: 1,
//         renderCell: ({ row: { id } }) => {
//           return (
//             <Box width="100%" display="flex" justifyContent="center" gap="4px">
//               <Button
//                 variant="contained"
//                 style={{
//                   // backgroundColor:
//                   //   status === "Active" ? "#55ab95" : colors.redAccent[600],
//                   backgroundColor: "#55ab95",
//                   minWidth: "50px",
//                   textTransform: "capitalize",
//                 }}
//                 onClick={() => handleAccept(id)}
//               >
//                 Chặn
//               </Button>
//               <Button
//                 variant="contained"
//                 style={{
//                   // backgroundColor:
//                   //   status === "Active" ? "#55ab95" : colors.redAccent[600],
//                   backgroundColor: colors.redAccent[600],
//                   minWidth: "50px",
//                   textTransform: "capitalize",
//                 }}
//                 onClick={() => handleDeny(id)}
//               >
//                 Hủy chặn
//               </Button>
//             </Box>
//           );
//         },
//       },
//   ];

//   const rows =
//     shops?.items?.map((shop, index) => ({
//       ...shop,
//       order: index + 1,
//     })) || [];

//   return (
//     <Box m="20px">
//       <Header title="POST" subtitle="Quản Lý POTS từ Hệ Thống" />
   
//       <Box height="100%" sx={StyledBox}>
//         <DataGrid
//           disableRowSelectionOnClick
//           loading={showLoadingModal}
//           slots={{
//             loadingOverlay: () => <GridLoadingOverlay />,
//             noRowsOverlay: () => <CustomNoRowsOverlay />,
//             pagination: () => (
//               <Pagination
//                 data={shops}
//                 pageNumber={pageIndex}
//                 pageSize={pageSize}
//                 setPageNumber={setPageIndex}
//                 setPageSize={setPageSize}
//               />
//             ),
//           }}
//           rows={rows}
//           columns={columns}
//         />
//         <ShopBackdrop
//           open={open}
//           handleClose={handleClose}
//           shopDetail={shopDetail}
//         />
//       </Box>
//     </Box>
//   );
// }

import { Box, Button, Popover,MenuItem , useTheme,Select ,InputLabel ,Typography,FormControl  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { postSelector, petCoffeeShopDetailSelector } from "../../../../store/sellectors";
import { useState, useEffect } from "react";
import { getPostThunk, banPostThunk, unbanPostThunk } from "../../../../store/apiThunk/postThunk";
import Pagination from "../../../../components/pagination/pagination";
import { StyledBox, CustomNoRowsOverlay, GridLoadingOverlay } from "../../../../components/styledTable/styledTable";
import Swal from "sweetalert2";
import { ShopBackdrop } from "../../../../components/backdrop/shopBackdrop/shopBackdrop";
import "./shopTable.css"

export default function ShopTableStaff() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const shops = useSelector(postSelector);
  const shopDetail = useSelector(petCoffeeShopDetailSelector);
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = (id) => {
    setShowLoadingModal(true);
    dispatch(banPostThunk(id))
      .then(() => dispatch(getPostThunk({ pageIndex, pageSize })))
      .then(() => {
        setShowLoadingModal(false);
        Swal.fire({
          title: "Success!",
          text: "User has been approved.",
          icon: "success",
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
        dispatch(unbanPostThunk(id))
          .then(() => dispatch(getPostThunk({ pageIndex, pageSize })))
          .then(() => {
            setShowLoadingModal(false);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            setShowLoadingModal(false);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the user.",
              icon: "error",
            });
          });
      }
    });
  };

  useEffect(() => {
    setShowLoadingModal(true);
    dispatch(getPostThunk({ pageIndex, pageSize }))
      .then(() => setShowLoadingModal(false));
  }, [dispatch, pageIndex, pageSize]);
  
  const Header = ({ title, subtitle, titleColor = "black", subtitleColor = "gray" }) => {
    return (
      <Box mb={2}>
        <Typography style={{ fontFamily:'Source Sans Pro, sans-serif',fontSize:'32px',color:'black',fontWeight:'700' }}>
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
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          {order}
        </Box>
      ),
    },
    {
      field: "postTitle",
      headerName: "Post Title",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { id, postTitle } }) => {
        const handleOpen = () => {
          setShowLoadingModal(true);
          dispatch(getPostThunk({ id })).then(() => {
            setShowLoadingModal(false);
            setOpen(true);
          });
        };
        return (
          <div onClick={handleOpen} style={{ cursor: "pointer" }}>
            {postTitle}
          </div>
        );
      },
    },
    {
      field: "postContent",
      headerName: "Post Content",
      flex: 1,
    },
    {
      field: "creationDate",
      headerName: "Creation Date",
      flex: 1,
      renderCell: ({ row: { creationDate } }) => (
        <div>{creationDate}</div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => (
        <div className={status === "Unban" ? "status-not-ban" : "status-ban"}>
          {status}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Box width="100%" display="flex" justifyContent="center" gap="4px">
            <Button
              variant="contained"
              style={{ backgroundColor: "#55ab95", minWidth: "50px", textTransform: "capitalize" }}
              onClick={() => handleAccept(id)}
            >
              Chặn
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: colors.redAccent[600], minWidth: "50px", textTransform: "capitalize" }}
              onClick={() => handleDeny(id)}
            >
              Hủy chặn
            </Button>
          </Box>
        );
      },
    },
  ];

  const rows = shops?.items?.map((shop, index) => ({
    ...shop,
    order: index + 1,
  })) || [];

  return (
    <Box m="20px">
      <Header title="POST" subtitle="Quản Lý POTS từ Hệ Thống" />
      <Box height="100%" sx={StyledBox}>
        <DataGrid
          disableRowSelectionOnClick
          loading={showLoadingModal}
          slots={{
            loadingOverlay: () => <GridLoadingOverlay />,
            noRowsOverlay: () => <CustomNoRowsOverlay />,
            pagination: () => (
              <Pagination
                data={shops}
                pageNumber={pageIndex}
                pageSize={pageSize}
                setPageNumber={setPageIndex}
                setPageSize={setPageSize}
              />
            ),
          }}
          rows={rows}
          columns={columns}
        />
         <ShopBackdrop
          open={open}
          handleClose={handleClose}
          shopDetail={shopDetail}
        />
      </Box>
    </Box>
  );
}
