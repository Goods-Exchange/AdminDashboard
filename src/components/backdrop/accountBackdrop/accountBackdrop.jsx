import "./accountBackdrop.css";
import { Backdrop, Box, Divider, useTheme } from "@mui/material";
import { FormatPhoneNumber } from "../../format/formatText/formatText";
import {
    AccRole,
    AccountStatus,
    PetType,
    ShopStatus,
} from "../../mapping/mapping";
import { tokens } from "../../../theme";
import NoBackground from "../../../assets/noBackground.png";
import NoAvatar from "../../../assets/noAvatar.png";

export function AccountBackdrop(props) {
    const open = props.open;
    const handleClose = props.handleClose;
    const userDetail = props.userDetail;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            onClick={handleClose}
        >
            <Box sx={style}>
                <div className="accountBackdrop">
                    <div style={{ position: "relative" }}>
                        <img
                            src={userDetail.avatar || NoAvatar}
                            alt=""
                            className="avatar"
                        />
                        <img
                            src={userDetail.profileImage || NoBackground}
                            alt=""
                            className="background"
                        />
                    </div>
                    <div
                        className="role"
                        style={{
                            color: "#70d8bd",
                        }}
                    >
                        {AccRole(userDetail.role)}
                    </div>
                    <div className="flex-column">
                        <div className="field">
                            <span className="span">Tình Trạng: </span>
                            <span
                                style={{
                                    color:
                                        userDetail.status === "Verifying"
                                            ? "#b8b800"
                                            : userDetail.status === "Active"
                                            ? "#70d8bd"
                                            : colors.redAccent[600],
                                }}
                            >
                                {AccountStatus(userDetail.status)}
                            </span>
                        </div>
                        <div className="field">
                            <span className="span">Họ Tên: </span>
                            {userDetail.fullName}
                        </div>
                        <div className="field">
                            <span className="span">Email: </span>
                            {userDetail.email}
                        </div>
                        <div className="field">
                            <span className="span">Số Điện Thoại: </span>
                            {FormatPhoneNumber(userDetail.phoneNumber) || ""}
                        </div>
                        <div className="field">
                            <span className="span">Địa Chỉ: </span>
                            <span>{userDetail.address}</span>
                        </div>
                        <Divider
                            color="#55ab95"
                            style={{ marginBlock: "10px" }}
                        />
                        {userDetail?.shopResponses?.map((shop, index) => (
                            <div
                                className="shopField"
                                key={index}
                                style={{
                                    gap: "20px",
                                    fontSize: "17px",
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                <img
                                    src={shop.avatarUrl}
                                    alt=""
                                    className="shop_img"
                                />
                                <div>
                                    <p>
                                        <span className="shop_span">
                                            Tên Cửa Hàng:{" "}
                                        </span>
                                        <span className="shop_name">
                                            {shop?.name}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="shop_span">
                                            Tình Trạng:{" "}
                                        </span>
                                        <span
                                            style={{
                                                color:
                                                    shop.status === "Active"
                                                        ? "#70d8bd"
                                                        : shop.status ===
                                                          "Inactive"
                                                        ? colors.redAccent[600]
                                                        : "#b8b800",
                                            }}
                                        >
                                            {ShopStatus(shop?.status)}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="shop_span">
                                            Loại Cửa Hàng:{" "}
                                        </span>
                                        {PetType(shop?.shopType)}
                                    </p>
                                    <p>
                                        <span className="shop_span">
                                            Email:{" "}
                                        </span>
                                        {shop?.email}
                                    </p>
                                    <p>
                                        <span className="shop_span">
                                            Số Điện Thoại:{" "}
                                        </span>
                                        {FormatPhoneNumber(shop?.phone)}
                                    </p>
                                    <p style={{ display: "flex" }}>
                                        <span className="shop_span">
                                            Địa Chỉ:{" "}
                                        </span>
                                        <span>{shop?.location}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Box>
        </Backdrop>
    );
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#121d3c",
    boxShadow: 24,
    p: 4,
    minWidth: 759.2,
};
