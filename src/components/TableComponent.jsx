import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";


const columns = [
  {
    field: "userId",
    headerClassName: "super-app-theme--header",
    headerName: "User Name",
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    headerClassName: "super-app-theme--header",
    width: 100,
  },
  {
    field: "snippet",
    headerName: "Code",
    headerClassName: "super-app-theme--header",
    type: "String",
    width: 1100,
  },
  {
    field: "lang",
    headerName: "langueage",
    headerClassName: "super-app-theme--header",
    width: 100,
  },
  {
    field: "stdIn",
    headerName: "Input",
    headerClassName: "super-app-theme--header",
    width: 100,
  },
  {
    field: "stdOut",
    headerName: "Output",
    headerClassName: "super-app-theme--header",
    width: 200,
  },
];

export default function TableComponent(props) {
  const navigate = useNavigate();
  
  return (
    <div style={{ height: "70vh", width: "90%" }}>
    <Typography>Click on row to Open it in editor</Typography>
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          "& .super-app-theme--header": {
            backgroundColor: "rgba(122, 7, 0, 0.55)",
            color: "#000000",
          },

          "& .MuiDataGrid-cell": {
            color: "#E50914",
            background: "#000000",
          },
          
          "&.MuiDataGrid-withBorderColor": {
            borderColor: "#000000",
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
    </div>
  );
}
