export * from "./Province";
export * from "./District";
export * from "./Ward";

export interface ISummary {
  totalUsers?: number;
  totalPosts?: number;
  totalDevices?: number;
  totalConnectedDevices?: number;
  totalDisconnectedDevices?: number;
  totalPlayingDevices?: number;
  totalStoppedDevices?: number;
}
