import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ChallengeIcon from "@mui/icons-material/SportsMma";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { DataGrid } from "@mui/x-data-grid";
import { Tabs, Tab, Box, Button, Typography } from "@mui/material";
import { Friend } from "./types";
import { formatDistanceToNow } from "date-fns";
import { mockFriends, mockIncomingRequests, mockOutgoingRequest } from "./mock";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import { GridRenderCellParams, GridAlignment } from "@mui/x-data-grid";
import { formatCurrency } from "@/utils/designUtils";
import { FriendRequest } from "@/models/FriendRequest";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const columns = [
  {
    field: "profile",
    headerName: "Profile",
    renderCell: (params: GridRenderCellParams) => (
      <Avatar alt={params.row.name} src={params.row.profilePicture} />
    ),
    width: 125,
    headerAlign: "center" as GridAlignment, // Corrected type casting
    align: "center" as GridAlignment, // Corrected type casting
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    headerAlign: "center" as GridAlignment, // Corrected type casting
    align: "center" as GridAlignment, // Corrected type casting
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params: GridRenderCellParams) => (
      <>
        <StatusIndicator status={params.row.status} />
        {params.row.status}
      </>
    ),
    width: 150,
    headerAlign: "center" as GridAlignment, // Corrected type casting
    align: "center" as GridAlignment, // Corrected type casting
  },
  {
    field: "lastActive",
    headerName: "Last Active",
    valueGetter: (params: GridRenderCellParams) =>
      `${formatDistanceToNow(new Date(params.row.lastActive), {
        addSuffix: true,
      })}`,
    width: 175,
    headerAlign: "center" as GridAlignment, // Corrected type casting
    align: "center" as GridAlignment, // Corrected type casting
  },
  {
    field: "netResult",
    headerName: "Net Result",
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      const value = params.value as number; // Cast to number if necessary
      const formattedValue = formatCurrency(value);
      const color = value > 0 ? "green" : value < 0 ? "red" : "grey";

      return <div style={{ color: color }}>{formattedValue}</div>;
    },
    headerAlign: "center" as GridAlignment,
    align: "center" as GridAlignment,
  },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: () => (
      <>
        <IconButton aria-label="challenge">
          <ChallengeIcon />
        </IconButton>
        <IconButton aria-label="remove">
          <PersonRemoveIcon />
        </IconButton>
      </>
    ),
    width: 200,
    headerAlign: "center" as GridAlignment,
    align: "center" as GridAlignment,
  },
];

const incomingRequestColumns = [
  {
    field: "from",
    headerName: "From",
    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt={params.row.senderName}
          src={params.row.senderProfilePicture}
          sx={{ width: 30, height: 30, marginRight: 2 }}
        />
        <Typography variant="body2" noWrap>
          {params.row.sender}
        </Typography>
      </Box>
    ),
    headerAlign: "center" as GridAlignment, // Corrected type casting
    align: "center" as GridAlignment, // Corrected type casting
  },
  {
    field: "sentDate",
    headerName: "Sent Date",
    width: 250,
    valueGetter: (params: GridRenderCellParams) =>
      `${formatDistanceToNow(new Date(params.row.createdAt), {
        addSuffix: true,
      })}`,
    headerAlign: "center" as GridAlignment, // Corrected type casting
    align: "center" as GridAlignment, // Corrected type casting
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 180,
    renderCell: () => (
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        <IconButton aria-label="accept" color="success" size="small">
          <CheckCircleOutlineIcon />
        </IconButton>
        <IconButton aria-label="decline" color="error" size="small">
          <CancelIcon />
        </IconButton>
      </Box>
    ),
    headerAlign: "center" as GridAlignment,
    align: "center" as GridAlignment,
  },
];

const outgoingRequestColumns = [
  {
    field: "sent to",
    headerName: "To",
    width: 200,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          alt={params.row.receiverName}
          src={params.row.receiverProfilePicture}
        />
        <span>{params.row.receiver}</span>
      </Box>
    ),
  },
  {
    field: "sentDate",
    headerName: "Sent Date",
    width: 180,
    valueGetter: (params: GridRenderCellParams) =>
      formatDistanceToNow(new Date(params.row.createdAt), { addSuffix: true }),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 180,
    renderCell: () => (
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        <IconButton aria-label="cancel request" color="warning" size="small">
          <CancelIcon />
        </IconButton>
      </Box>
    ),
    headerAlign: "center" as GridAlignment,
    align: "center" as GridAlignment,
  },
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </Box>
  );
}

const FriendsTable: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [tabValue, setTabValue] = useState(0);
  const [incomingRequests, setIncomingRequests] = useState<FriendRequest[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<FriendRequest[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setFriends(mockFriends);
    setIncomingRequests(mockIncomingRequests);
    setOutgoingRequests(mockOutgoingRequest);
  }, []);

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="friend tabs"
        >
          <Tab label="Friends" />
          <Tab label="Incoming Requests" />
          <Tab label="Outgoing Requests" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={friends}
            columns={columns}
            disableRowSelectionOnClick
          />
        </div>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={incomingRequests}
            columns={incomingRequestColumns}
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnSelector
          />
        </div>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={outgoingRequests}
            columns={outgoingRequestColumns}
            disableRowSelectionOnClick
          />
        </div>
      </TabPanel>
    </>
  );
};

export default FriendsTable;
