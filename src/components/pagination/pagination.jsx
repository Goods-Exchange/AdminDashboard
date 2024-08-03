// import { Box, IconButton, FormControl, Select, MenuItem } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { useEffect } from "react";

// export default function Pagination(props) {
//     const data = props.data;
//     const pageSize = props.pageSize;
//     const setPageSize = props.setPageSize;
//     const pageNumber = props.pageNumber;
//     const setPageNumber = props.setPageNumber;

//     useEffect(() => {
//         if (data?.items?.length === 0 && pageNumber > 1) {
//             setPageNumber(1);
//         }
//     }, [data?.items?.length, pageNumber, setPageNumber]);

//     return (
//         <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             width="30%"
//             gap="30px"
//         >
//             <FormControl style={{ width: "20%" }} size="small">
//                 <Select
//                     id="pageSize"
//                     name="pageSize"
//                     value={pageSize}
//                     onChange={(e) => setPageSize(e.target.value)}
//                     color="secondary"
//                 >
//                     <MenuItem value={10}>10</MenuItem>
//                     <MenuItem value={20}>20</MenuItem>
//                     <MenuItem value={30}>30</MenuItem>
//                 </Select>
//             </FormControl>
//             <Box display="flex" justifyContent="center" alignItems="center">
//                 <IconButton
//                     disabled={!data.hasPrevious}
//                     onClick={() => setPageNumber(pageNumber - 1)}
//                 >
//                     <ArrowBackIcon fontSize="medium" />
//                 </IconButton>
//                 <span style={{ margin: "0 10px" }}>
//                     Trang {pageNumber} của{" "}
//                     {data.totalPages !== 0 ? data.totalPages : 1}
//                 </span>
//                 <IconButton
//                     disabled={!data.hasNext}
//                     onClick={() => setPageNumber(pageNumber + 1)}
//                 >
//                     <ArrowForwardIcon fontSize="medium" />
//                 </IconButton>
//             </Box>
//         </Box>
//     );
// }

import { Box, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Pagination = ({ data, pageNumber, pageSize, setPageNumber, setPageSize }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(data.totalCount / pageSize)) {
      setPageNumber(newPage);
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPageNumber(0); // Reset to the first page when page size changes
  };

  return (
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
          disabled={(pageNumber + 1) * pageSize >= data.totalCount}
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
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={70}>70</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Pagination;


