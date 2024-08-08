
  import * as React from "react";
  import "./updateCategory.css";
  import { Button, TextField } from "@mui/material";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { useState, useEffect } from "react";
  import * as Yup from "yup";
  import Swal from "sweetalert2";
  import { useFormik } from "formik";
  import {
    getPackageDetailThunk,
    updatePackageThunk,
  } from "../../../../../store/apiThunk/packageThunk";
  import {
      getPostCategoryThunk,
      getPostCategoryDetailThunk,
      updatePostCategoryThunk,
    } from "../../../../../store/apiThunk/postCategoryThunk";
  import { postCategoryDetailSelector } from "../../../../../store/sellectors";
  import Header from "../../../components/header/Header";
  import { BackButton } from "../../../../../components/modal/backModal/backModal";
  import LoadingModal from "../../../../../components/modal/loadingModal/loadingModal";
  import {
    ERRORTEXT,
    SUCCESSTEXT,
    UPDATEPACKAGESUCCESS,
    UPDATECATEGORYSUCCESS
  } from "../../../../../components/text/notiText/notiText";

  export default function updateCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const categoryId = location.state?.categoryId;
    const packageDetail = useSelector(postCategoryDetailSelector);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showRender, setShowRender] = useState(false);

    useEffect(() => {
      setShowRender(true);
      dispatch(getPostCategoryDetailThunk(categoryId)).then(() => setShowRender(false));
    }, [categoryId, dispatch]);

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
          categoryName: packageDetail.categoryName || '',
    
      },
      validationSchema: Yup.object({
          categoryName: Yup.string().required("Mô tả không thể trống"),
        
      }),
      onSubmit: async (values) => {
        setShowLoadingModal(true);
        dispatch(
          updatePostCategoryThunk({
            id: categoryId,
            categoryName: values.categoryName,
          
          })
        )
          .unwrap()
          .then(() => {
            setShowLoadingModal(false);
            Swal.fire({
              title: SUCCESSTEXT,
              text: UPDATECATEGORYSUCCESS,
              icon: "success",
              showCancelButton: false,
              showConfirmButton: false,
              background: "white",
              timer: 1500,
              timerProgressBar: true,
              scrollbarPadding: false,
            }).then(() => {
              navigate(-1);
            });
          })
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
      },
    });

    return (
      <div className="updatePackage">
        <Header
          title="Cập Nhật Gói Đăng Ký"
          subtitle="Cung cấp thông tin gói đăng ký"
        />
        {!showRender ? (
          <form onSubmit={formik.handleSubmit}>
            {/* categoryName */}
            <TextField
              id="categoryName"
              label={
                <span>
                  Category Name <span style={{ color: "red" }}>*</span>
                </span>
              }
              variant="outlined"
              value={formik.values.categoryName}
              onChange={formik.handleChange}
              fullWidth
              autoComplete="categoryName"
              margin="dense"
              color="secondary"
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{
                style: {
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  color: "black",
                },
              }}
            />
            {formik.touched.categoryName && formik.errors.categoryName && (
              <div className="login__validation__error">
                <p>{formik.errors.categoryName}</p>
              </div>
            )}
            

            {!showLoadingModal ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                  marginBottom: "50px",
                  marginTop: "30px",
                }}
              >
                <BackButton type="update" />
                <Button
                  className="login__btn"
                  style={{
                      backgroundColor: "#70d8bd",
                      fontSize: '14px', // Thay đổi kích cỡ chữ của nút Tạo
                  }}
                  variant="contained"
                  type="submit"
                >
                  Cập Nhật
                </Button>
              </div>
            ) : (
              <LoadingModal />
            )}
          </form>
        ) : (
          <LoadingModal />
        )}
      </div>
    );
  }
