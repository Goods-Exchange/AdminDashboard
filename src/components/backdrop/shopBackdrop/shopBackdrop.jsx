import "./shopBackdrop.css";
import { Backdrop, Box, useTheme } from "@mui/material";
import {
    FormatTime,
    FormatTimeDifference,
} from "../../../components/format/formatDatetime/formatDatetime";
import { FormatPhoneNumber } from "../../../components/format/formatText/formatText";
import { PetType, ShopStatus } from "../../../components/mapping/mapping";
import { tokens } from "../../../theme";

export function ShopBackdrop(props) {
    const open = props.open;
    const handleClose = props.handleClose;
    const shopDetail = props.shopDetail;
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
                <div className="shopBackdrop">
                    <div style={{ position: "relative" }}>
                        <img
                            src={shopDetail.avatarUrl}
                            alt=""
                            className="avatar"
                        />
                        <img
                            src={shopDetail.backgroundUrl}
                            alt=""
                            className="background"
                        />
                    </div>
                    <div
                        className="role"
                        style={{
                            color:
                                shopDetail.status === "Processing"
                                    ? "#b8b800"
                                    : shopDetail.status === "Active"
                                    ? "#70d8bd"
                                    : colors.redAccent[600],
                        }}
                    >
                        {ShopStatus(shopDetail.status)}
                    </div>
                    <div className="flex-column">
                        <div className="field">
                            <span className="span">Loại: </span>
                            {FormatTimeDifference(shopDetail.endTimePackage)}
                        </div>
                        <div className="field">
                            <span className="span">Tên Post: </span>
                            {shopDetail.name}
                        </div>
                        <div className="field">
                            <span className="span">Email: </span>
                            {shopDetail.email}
                        </div>
                        <div className="field">
                            <span className="span">Số Điện Thoại: </span>
                            {FormatPhoneNumber(shopDetail.phone) || ""}
                        </div>
                        <div className="field">
                            <span className="span">Địa Chỉ: </span>
                            {shopDetail.location}
                        </div>
                        <div className="field">
                            <span className="span">Loại Post: </span>
                            {PetType(shopDetail.type)}
                        </div>
                        <div className="field">
                            <span className="span">Ngày tạo </span>
                            {FormatTime(shopDetail.startTime) || ""}
                        </div>
                        <div className="field">
                            <span className="span">Ngày hết hạn: </span>
                            {FormatTime(shopDetail.endTime) || ""}
                        </div>
                        <div className="field">
                            <span className="span">Id: </span>
                            {shopDetail.taxCode}
                        </div>
                
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
