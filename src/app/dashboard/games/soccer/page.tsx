"use client";
import { useQuery } from "react-query";
import GamesLayout from "../GamesLayout";
import { getEvents } from "@/services/sportsService";
import SportsTable from "@/components/SportsTable/SportsTable";
import {
  GridValueFormatterParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Image from "next/image";
import { leagueIcons, teamIcons } from "./types";
import { Box } from "@mui/material";
import styles from "./page.module.css";

export default function SoccerGames() {
  const { data: events, isLoading, error } = useQuery("events", getEvents);
  const tableTitle = "Upcoming Fixtures";

  const soccerColumns = [
    {
      field: "homeTeam",
      headerName: "Home Team",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        const teamLogoUrl = teamIcons[params.value as string];
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {teamLogoUrl && (
              <Image
                width={24}
                height={24}
                src={teamLogoUrl}
                alt={params.value as string}
                style={{
                  backgroundColor: "transparent",
                }}
              />
            )}
            {params.value}
          </div>
        );
      },
    },
    {
      field: "awayTeam",
      headerName: "Away Team",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        const teamLogoUrl = teamIcons[params.value as string];
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {teamLogoUrl && (
              <Image
                width={24}
                height={24}
                src={teamLogoUrl}
                alt={params.value as string}
                style={{
                  backgroundColor: "transparent",
                }}
              />
            )}
            {params.value}
          </div>
        );
      },
    },
    {
      field: "league",
      headerName: "League",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image
            width={24}
            height={24}
            src={leagueIcons[params.value as string]}
            alt={params.value as string}
            style={{
              backgroundColor: "transparent",
            }}
          />
          {params.value}
        </div>
      ),
    },
    { field: "location", headerName: "Location", width: 285 },
    {
      field: "date",
      headerName: "Date",
      width: 250,
      valueFormatter: (params: GridValueFormatterParams) => {
        if (params.value instanceof Date) {
          return params.value.toLocaleString();
        }
        return params.value.toDate().toLocaleString();
      },
    },
  ];
  return (
    <Box>
      <GamesLayout>
        <SportsTable
          title={tableTitle}
          columns={soccerColumns}
          data={events || []}
        />
      </GamesLayout>
    </Box>
  );
}
