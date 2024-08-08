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
import "./categorydetail.css";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { packagesSelector } from "../../../../../store/sellectors";
import { postCategorySelector } from "../../../../../store/sellectors";
import {
  deletePackageThunk,
  getPackagesThunk,
} from "../../../../../store/apiThunk/packageThunk";
import {
  deletePostCategoryThunk,
  getPostCategoryThunk,
} from "../../../../../store/apiThunk/postCategoryThunk";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Coin from "../../../../../assets/coinvnd.png";
import Pagination from "../../../../../components/pagination/paginationPackage";
import { formatPaginationData } from "../../../../../components/format/formatPagination/formatPagination";
import {
  CustomNoRowsOverlay,
  GridLoadingOverlay,
  StyledBox,
} from "../../../../../components/styledTable/styledTable";
import {
  CANCELTEXT,
  CONFIRMDELETEPACKAGE,
  DELETECOMFIRM,
  DELETECOMFIRMYES,
  DELETEPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
  DELETECATEGORYSUCCESS,
  CONFIRMDELETECATEGORY
} from "../../../../../components/text/notiText/notiText";
import ExampleImage from "../../../../../assets/Sub.jpg";

export default function PackageTable(props) {
  const direction = props.direction;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const packages = useSelector(postCategorySelector);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);

  const packagesData = formatPaginationData(packages, pageNumber, pageSize);

  useEffect(() => {
    setShowLoadingModal(true);
    dispatch(getPostCategoryThunk()).then(() => setShowLoadingModal(false));
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
      field: "categoryName",
      headerName: "Subscription Type",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    

    {
      field: "activity",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row: { id } }) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          gap="10px"
        >
          {/* <Button
            variant="contained"
            color="warning"
            onClick={() =>
              navigate(`/${direction}/updateCategory`, {
                state: { packageId: id },
              })
            }
            style={{ color: "white", textTransform: "capitalize" }}
          >
            Sửa
          </Button> */}
          <Button
            variant="contained"
            color="error"
            style={{ textTransform: "capitalize" }}
            onClick={() => handleDeletePackage(id)}
          >
            Xóa
          </Button>
        </Box>
      ),
    },
  ];

  const rows = packages?.map((packageItem, index) => ({
    ...packageItem,
    order: index + 1,
    id: packageItem.categoryId,
  }));

  const handleDeletePackage = (id) => {
    Swal.fire({
      icon: "warning",
      title: CONFIRMDELETECATEGORY,
      text: DELETECOMFIRM,
      showDenyButton: true,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: DELETECOMFIRMYES,
      denyButtonText: CANCELTEXT,
      confirmButtonColor: "#55ab95",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowLoadingModal(true);
        dispatch(deletePostCategoryThunk(id))
          .unwrap()
          .then(() =>
            dispatch(getPostCategoryThunk()).then(() => {
              setShowLoadingModal(false);
              Swal.fire({
                icon: "success",
                title: SUCCESSTEXT,
                text: DELETECATEGORYSUCCESS,
                showCancelButton: false,
                showConfirmButton: false,
                background: "white",
                timer: 1500,
                timerProgressBar: true,
                scrollbarPadding: false,
              });
            })
          )
          .catch((error) => {
            setShowLoadingModal(false);
            Swal.fire({
              title: ERRORTEXT,
              text: error.message,
              icon: "error",
              showConfirmButton: false,
              background: "white",
              timer: 2000,
              timerProgressBar: true,
              scrollbarPadding: false,
            });
          });
      }
    });
  };

  return (
    <div className="packageTable">
       {/* <img src={ExampleImage} alt="example" width="100%" height="auto" /> */}
      <Box m="20px">
        {/* <div style={{color:"#3045FF", fontSize:34, fontWeight:900, marginLeft:550,fontFamily:'serif'}}>Subsciption</div>
                      <div style={{color:"#2a2d64", fontSize:20, fontWeight:900,padding:20}}>Quản Lý Gói Đăng Ký Hệ Thống</div> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Header title="CATEGORY" subtitle="Quản Lý Category Hệ Thống" />
          <Button
            onClick={() => navigate(`/${direction}/createCategory`)}
            className="createBtn"
          >
            Create
          </Button>
        </div>
        <Box height="100%" sx={StyledBox}>
          <DataGrid
            loading={showLoadingModal}
            slots={{
              loadingOverlay: () => <GridLoadingOverlay />,
              noRowsOverlay: () => <CustomNoRowsOverlay />,
              pagination: () => (
                <Pagination
                  data={packagesData}
                  pageNumber={pageNumber}
                  pageSize={pageSize}
                  setPageNumber={setPageNumber}
                  setPageSize={setPageSize}
                />
              ),
            }}
            disableRowSelectionOnClick
            rows={rows}
            columns={columns}
          />
        </Box>
      </Box>
    </div>
  );
}
