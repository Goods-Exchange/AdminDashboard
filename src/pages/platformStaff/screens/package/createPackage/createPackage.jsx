import * as React from "react";
import "./createPackage.css";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { createPackageThunk } from "../../../../../store/apiThunk/packageThunk";
import Header from "../../../components/header/Header";
import { BackButton } from "../../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../../components/modal/loadingModal/loadingModal";
import { ADDPACKAGESUCCESS, ERRORTEXT, SUCCESSTEXT } from "../../../../../components/text/notiText/notiText";

export default function CreatePackage() {
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
            // description: "",
            expiryMonth: "",
            price: "",
            subcriptionType: "",
        },
        validationSchema: Yup.object({
            // description: Yup.string().required("Mô tả không thể trống"),
            expiryMonth: Yup.number().required("Tháng không thể trống"),
            price: Yup.number().required("Giá không thể trống"),
            subcriptionType: Yup.string().required("Mô tả không thể trống"),
        }),
        onSubmit: async (values) => {
            setShowLoadingModal(true);
            dispatch(
                createPackageThunk({
                    // description: values.description,
                    expiryMonth: values.expiryMonth,
                    price: values.price,
                    subcriptionType: values.subcriptionType,
                })
            )
                .unwrap()
                .then(() => {
                    setShowLoadingModal(false);
                    Swal.fire({
                        title: SUCCESSTEXT,
                        text: ADDPACKAGESUCCESS,
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
                title="Tạo Gói Đăng Ký"
                subtitle="Cung cấp thông tin gói đăng ký"
            />
            <form onSubmit={formik.handleSubmit}>
                {/* subcriptionType */}
                <>
                    <TextField
                        id="subcriptionType"
                        label={
                            <span>
                                Loại Gói <span style={{ color: "red" }}>*</span>
                            </span>
                        }
                        variant="outlined"
                        value={formik.values.subcriptionType}
                        onChange={formik.handleChange}
                        fullWidth
                        autoComplete="subcriptionType"
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
                    {formik.touched.subcriptionType &&
                        formik.errors.subcriptionType && (
                            <div className="login__validation__error">
                                <p>{formik.errors.subcriptionType}</p>
                            </div>
                        )}
                </>
                {/* description */}
                {/* <>
                    <TextField
                        id="description"
                        label={
                            <span>
                                Mô tả <span style={{ color: "red" }}>*</span>
                            </span>
                        }
                        variant="outlined"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        fullWidth
                        autoComplete="description"
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
                    {formik.touched.description &&
                        formik.errors.description && (
                            <div className="login__validation__error">
                                <p>{formik.errors.description}</p>
                            </div>
                        )}
                </> */}
                {/* expiryMonth */}
                <>
                    <TextField
                        id="expiryMonth"
                        label={
                            <span>
                                Thời Hạn (ngày) <span style={{ color: "red" }}>*</span>
                            </span>
                        }
                        variant="outlined"
                        value={formik.values.expiryMonth}
                        onChange={formik.handleChange}
                        fullWidth
                        autoComplete="expiryMonth"
                        margin="dense"
                        type="number"
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
                    {formik.touched.expiryMonth && formik.errors.expiryMonth && (
                        <div className="login__validation__error">
                            <p>{formik.errors.expiryMonth}</p>
                        </div>
                    )}
                </>
                {/* price */}
                <>
                    <TextField
                        id="price"
                        label={"Gía tiền"}
                        variant="outlined"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        fullWidth
                        autoComplete="price"
                        margin="dense"
                        type="number"
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
                    {formik.touched.price &&
                        formik.errors.price && (
                            <div className="login__validation__error">
                                <p>{formik.errors.price}</p>
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
