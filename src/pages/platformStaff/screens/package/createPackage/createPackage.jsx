import * as React from "react";
import "./createPackage.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import {
    getPackagesThunk,
    createPackageThunk,
} from "../../../../../store/apiThunk/packageThunk";
import Header from "../../../components/header/Header";
import { BackButton } from "../../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../../components/modal/loadingModal/loadingModal";
import { FormatCurrency } from "../../../../../components/format/formatAmount/formatAmount";
import { ADDPACKAGESUCCESS, ERRORTEXT, SUCCESSTEXT } from "../../../../../components/text/notiText/notiText";

export default function CreatePackage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showLoadingModal, setShowLoadingModal] = useState(false);

    const formik = useFormik({
        initialValues: {
            description: "",
            expiryMonth: "",
            price: "",
            subcriptionType: "",
        },
        validationSchema: Yup.object({
            description: Yup.string().required("Mô tả không thể trống"),
            expiryMonth: Yup.number().required("Tháng không thể trống"),
            
        }),
        onSubmit: async (values) => {
            setShowLoadingModal(true);
            dispatch(
                createPackageThunk({
                    description: values.description,
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

    // const handleInputChange = (event, formik) => {
    //     let inputValue = event.target.value;
    //     let rawValue = inputValue.replace(/[^0-9]/g, "");
    //     formik.setFieldValue("promotionAmount", rawValue);
    //     event.target.value = FormatCurrency(rawValue);
    // };

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
                    />
                    {formik.touched.subcriptionType &&
                        formik.errors.subcriptionType && (
                            <div className="login__validation__error">
                                <p>{formik.errors.subcriptionType}</p>
                            </div>
                        )}
                </>
                     {/* description */}
                     <>
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
                    />
                    {formik.touched.description &&
                        formik.errors.description && (
                            <div className="login__validation__error">
                                <p>{formik.errors.description}</p>
                            </div>
                        )}
                </>
                
                {/* expiryMonth */}
                <>
                    <TextField
                        id="expiryMonth"
                        label={
                            <span>
                                Thời Hạn (tháng){" "}
                                <span style={{ color: "red" }}>*</span>
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
                    />
                    {formik.touched.expiryMonth && formik.errors.expiryMonth && (
                        <div className="login__validation__error">
                            <p>{formik.errors.expiryMonth}</p>
                        </div>
                    )}
                </>
                {/* price */}
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
                        <BackButton />
                        <Button
                            className="login__btn"
                            style={{
                                backgroundColor: "#70d8bd",
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
