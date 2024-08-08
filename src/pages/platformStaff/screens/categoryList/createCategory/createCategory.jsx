import * as React from "react";
import "./createCategory.css";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { createPackageThunk } from "../../../../../store/apiThunk/packageThunk";
import { createPostCategoryThunk } from "../../../../../store/apiThunk/postCategoryThunk";
import Header from "../../../components/header/Header";
import { BackButton } from "../../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../../components/modal/loadingModal/loadingModal";
import { ADDPACKAGESUCCESS, ERRORTEXT, SUCCESSTEXT,ADDCATEGORYSUCCESS } from "../../../../../components/text/notiText/notiText";

export default function createCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showLoadingModal, setShowLoadingModal] = useState(false);

    const Header = ({ title, subtitle, titleColor = "black", subtitleColor = "gray" }) => {
        return (
            <Box mb={2}>
                <Typography style={{ fontFamily: 'Source Sans Pro, sans-serif', fontSize: '32px', color: titleColor, fontWeight: '700' }}>
                    {title}
                </Typography>
                <Typography variant="subtitle1" style={{ color: subtitleColor }}>
                    {subtitle}
                </Typography>
            </Box>
        );
    };

    const formik = useFormik({
        initialValues: {
            categoryName: "",
            
        },
        validationSchema: Yup.object({
            categoryName: Yup.string().required("Mô tả không thể trống"),
           
        }),
        onSubmit: async (values) => {
            setShowLoadingModal(true);
            dispatch(
                createPostCategoryThunk({
                    categoryName: values.categoryName,
             
                })
            )
                .unwrap()
                .then(() => {
                    setShowLoadingModal(false);
                    Swal.fire({
                        title: SUCCESSTEXT,
                        text: ADDCATEGORYSUCCESS,
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
        <div className="createPackage">
            <Header
                title="Tạo Category"
                subtitle="Cung cấp category"
            />
            <form onSubmit={formik.handleSubmit}>
                {/* categoryName */}
                <>
                    <TextField
                        id="categoryName"
                        label={
                            <span>
                                Tên Category <span style={{ color: "red" }}>*</span>
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
                            style: { color: 'black' } // Đặt màu sắc của nhãn thành màu đen
                        }}
                        InputProps={{
                            style: {
                                backgroundColor: '#f5f5f5', // Nền của input màu xám nhạt
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Hiệu ứng bóng nhẹ
                                color: 'black' // Màu chữ bên trong ô input
                            }
                        }}
                    />
                    {formik.touched.categoryName &&
                        formik.errors.categoryName && (
                            <div className="login__validation__error">
                                <p>{formik.errors.categoryName}</p>
                            </div>
                        )}
                </>
              
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
                        <BackButton style={{ fontSize: '14px' }} /> {/* Thay đổi kích cỡ chữ ở đây */}
                        <Button
                            className="login__btn"
                            style={{
                                backgroundColor: "#70d8bd",
                                fontSize: '14px', // Thay đổi kích cỡ chữ của nút Tạo
                            }}
                            variant="contained"
                            type="submit"
                        >
                            Tạo
                        </Button>
                    </div>
                ) : (
                    <LoadingModal />
                )}
            </form>
        </div>
    );
}
