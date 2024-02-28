import { FriendRequest } from "@/models/FriendRequest";

export const mockFriends = [
  {
    id: "dc946bfa-545e-422d-9984-8067e9270be7",
    name: "Tiffany Fisher",
    profilePicture: "https://placeimg.com/67/10/any",
    status: "Online",
    lastActive: "2023-06-11T22:43:03",
    netResult: -589,
  },
  {
    id: "0770ab5a-3306-41d2-9321-f5ba82c4f00e",
    name: "Christopher Brown",
    profilePicture: "https://placeimg.com/459/148/any",
    status: "Offline",
    lastActive: "2024-02-15T15:12:16",
    netResult: -371,
  },
  {
    id: "de7ead31-f28d-4177-86c0-8ce0bb88edc4",
    name: "Angel Pugh",
    profilePicture: "https://placeimg.com/603/974/any",
    status: "Offline",
    lastActive: "2023-06-08T14:24:04",
    netResult: 900,
  },
  {
    id: "ddf27bd8-372f-4ba6-a420-47fe50263c85",
    name: "Tamara Roberts",
    profilePicture: "https://dummyimage.com/223x66",
    status: "Offline",
    lastActive: "2023-08-20T22:24:27",
    netResult: 415,
  },
  {
    id: "09f9ce58-448a-4772-9b27-028be1b670f0",
    name: "Christopher Brown Jr.",
    profilePicture: "https://placeimg.com/99/901/any",
    status: "Online",
    lastActive: "2023-09-11T16:24:24",
    netResult: 671,
  },
  {
    id: "3841c261-8007-4df8-890e-f53c7d306491",
    name: "Edwin Lucas",
    profilePicture: "https://dummyimage.com/479x625",
    status: "Offline",
    lastActive: "2023-07-02T20:05:07",
    netResult: 388,
  },
  {
    id: "3c6b57e4-aede-40d1-9d32-3fae84698cc0",
    name: "Denise Crane",
    profilePicture: "https://placeimg.com/601/633/any",
    status: "Offline",
    lastActive: "2024-02-13T20:59:54",
    netResult: -778,
  },
  {
    id: "d8be6da6-bd70-4a22-b87b-8036b7432572",
    name: "Melody Rosales",
    profilePicture: "https://www.lorempixel.com/398/411",
    status: "Online",
    lastActive: "2023-09-21T09:22:39",
    netResult: 987,
  },
  {
    id: "a1d49e72-bbf4-4324-8f76-fdfc9ada73b4",
    name: "Richard Williams",
    profilePicture: "https://placeimg.com/594/530/any",
    status: "Online",
    lastActive: "2023-12-11T02:12:47",
    netResult: 584,
  },
  {
    id: "a7e03d8d-3cdd-4cd9-85a9-c9184d51e0d7",
    name: "Patricia Hobbs",
    profilePicture: "https://www.lorempixel.com/185/689",
    status: "Offline",
    lastActive: "2023-03-16T10:26:50",
    netResult: -780,
  },
];

// Mock data for incoming friend requests
export const mockIncomingRequests: FriendRequest[] = [
  {
    id: "fr-001",
    sender: "user001",
    receiver: "currentUser",
    status: "pending",
    createdAt: "2024-02-24T10:00:00",
  },
  {
    id: "fr-002",
    sender: "user002",
    receiver: "currentUser",
    status: "pending",
    createdAt: "2024-02-25T11:20:00",
  },
  {
    id: "fr-003",
    sender: "user003",
    receiver: "currentUser",
    status: "pending",
    createdAt: "2024-02-26T15:35:00",
  },
];

export const mockOutgoingRequest: FriendRequest[] = [
  {
    id: "fr-001",
    sender: "currentUser",
    receiver: "user001",
    status: "pending",
    createdAt: "2024-02-24T10:00:00",
  },
  {
    id: "fr-002",
    sender: "currentUser",
    receiver: "user002",
    status: "pending",
    createdAt: "2024-02-25T11:20:00",
  },
  {
    id: "fr-003",
    sender: "currentUser",

    receiver: "user003",
    status: "pending",
    createdAt: "2024-02-26T15:35:00",
  },
];
