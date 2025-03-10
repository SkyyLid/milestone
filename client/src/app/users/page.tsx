"use client";

import { useGetUsersQuery } from "@/state/api";
import { useAppSelector } from "../../../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const customToolbar = () => {
  return (
    <GridToolbarContainer className="flex gap-2">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "profilePicUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="size-9">
            <Image
              src={`/${params.row.profile_pic ? params.row.profile_pic : ""}`}
              alt={params.row.username}
              width={100}
              height={50}
              className="h-full rounded-full object-cover"
            />
          </div>
        </div>
      );
    },
  },
];

const Users = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: users, isError, isLoading } = useGetUsersQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError || !users) return <div>Error fetching users</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users || ""}
          columns={columns}
          getRowId={(row) => row.id}
          pagination
          slots={{
            toolbar: customToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Users;
