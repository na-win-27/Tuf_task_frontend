import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { Typography, Box } from "@mui/material";

const columns = [
  {
    field: "userId",
    headerClassName: "super-app-theme--header",
    headerName: "User Name",
    sortable: false,
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Date",
    headerClassName: "super-app-theme--header",
    sortable: false,
    width: 100,
    valueGetter: (params) =>
      new Date(params.row.createdAt).toLocaleDateString(),
  },
  {
    field: "snippet",
    headerName: "Code",
    headerClassName: "super-app-theme--header",
    sortable: false,
    type: "String",
    valueGetter: (params) => `${params.row.snippet.substr(0, 99)}`,
    width: 750,
  },
  {
    field: "lang",
    headerName: "langueage",
    headerClassName: "super-app-theme--header",
    sortable: false,
    width: 100,
  },
  {
    field: "stdIn",
    headerName: "Input",
    headerClassName: "super-app-theme--header",
    sortable: false,
    width: 250,
  },
  {
    field: "stdOut",
    headerName: "Output",
    sortable: false,
    headerClassName: "super-app-theme--header",
    width: 250,
  },
];

export default function TableComponent(props) {
  const navigate = useNavigate();
  return (
    <Box mt="10px" height="65vh">
      <Typography> Click on row to Open it in editor</Typography>

      <DataGrid
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu
        disableEval
        loading={props.loading}
        sx={{
          "& .MuiDataGrid-cell:hover": {
            color: "black",
            backgroundColor: "red",
          },
          "& .MuiDataGrid-columnHeader": {
            borderRight: "3px black solid",
          },
          "& .super-app-theme--header": {
            backgroundColor: "rgba(122, 7, 0, 0.55)",
            color: "#000000",
          },
          "& .MuiDataGrid-cell": {
            color: "#E50914",
            background: "#000000",
          },

          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "rgba(122, 7, 0, 0.55)",
            color: "#000000",
            borderColor: "#000000",
            borderTop: 0,
          },
        }}
        rows={props.codes}
        onRowClick={(d) => {
          navigate(`/${d.id}`);
        }}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 11 },
          },
        }}
      />
    </Box>
  );
}
