import {
  Box,
  Button,
  useTheme,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import "./packageTable.css";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { packagesSelector } from "../../../../../store/sellectors";
import {
  deletePackageThunk,
  getPackagesThunk,
  setPriorityPackageThunk,
  setStandardPackageThunk
} from "../../../../../store/apiThunk/packageThunk";
import { useState, useEffect } from "react";
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
} from "../../../../../components/text/notiText/notiText";
import { tokens } from "../../../../../theme";

export default function PackageTable(props) {
  const theme = useTheme();
  const direction = props.direction;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const packages = useSelector(packagesSelector);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const colors = tokens(theme.palette.mode);

  const packagesData = formatPaginationData(packages, pageNumber, pageSize);

  useEffect(() => {
    setShowLoadingModal(true);
    dispatch(getPackagesThunk()).then(() => setShowLoadingModal(false));
  }, [dispatch]);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedPackage(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedPackage(null);
  };

  const handleMenuItemClick = (type) => {
    setShowLoadingModal(true);
    const action = type === "Priority" ? setPriorityPackageThunk : setStandardPackageThunk;
    dispatch(action(selectedPackage)).then(() => {
      dispatch(getPackagesThunk()).then(() => {
        setShowLoadingModal(false);
        handleClose();
      });
    });
  };

  const handleDeletePackage = (id) => {
    Swal.fire({
      icon: "warning",
      title: CONFIRMDELETEPACKAGE,
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
        dispatch(deletePackageThunk(id))
          .unwrap()
          .then(() =>
            dispatch(getPackagesThunk()).then(() => {
              setShowLoadingModal(false);
              Swal.fire({
                icon: "success",
                title: SUCCESSTEXT,
                text: DELETEPACKAGESUCCESS,
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
      field: "subcriptionType",
      headerName: "Subscription Type",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "expiryMonth",
      flex: 1,
      headerName: "Expiry Date",
      renderCell: ({ row: { expiryMonth } }) => <div>{expiryMonth} Ngày</div>,
    },
    {
      field: "price",
      flex: 1,
      headerAlign: "center",
      headerName: "Price",
      renderCell: ({ row: { price } }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          gap="6px"
        >
          {price}
          <img src={Coin} alt="" style={{ width: "35px" }} />
        </Box>
      ),
    },
    // {
    //   field: "description",
    //   flex: 1,
    //   headerName: "Description",
    //   renderCell: ({ row: { description } }) => <div>{description}</div>,
    // },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { id, description } }) => (
        <Box width="100%" display="flex" justifyContent="center" gap="4px">
          <Button
            variant="contained"
            style={{
              backgroundColor: description === "Priority" ? colors.blueAccent[800] : "#868dfb",
              minWidth: "100px",
              textTransform: "capitalize",
            }}
            onClick={(event) => handleClick(event, id)}
          >
            {description}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleMenuItemClick("Standard")}>
              Standard
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Priority")}>
              Priority
            </MenuItem>
          </Menu>
        </Box>
      ),
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
          <Button
            variant="contained"
            color="warning"
            onClick={() =>
              navigate(`/${direction}/updatePackage`, {
                state: { packageId: id },
              })
            }
            style={{ color: "white", textTransform: "capitalize" }}
          >
            Sửa
          </Button>
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

  const rows = packagesData?.items?.map((packageItem, index) => ({
    ...packageItem,
    order: index + 1,
  }));

  return (
    <div className="packageTable">
      <Box m="20px">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Header title="GÓI ĐĂNG KÝ" subtitle="Quản Lý Gói Đăng Ký Hệ Thống" />
          <Button
            onClick={() => navigate(`/${direction}/createPackage`)}
            className="createBtn"
          >
            Tạo Gói
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
