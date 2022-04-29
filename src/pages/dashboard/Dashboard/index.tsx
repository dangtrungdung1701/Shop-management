import SVG from "designs/SVG";
import { useBreadcrumb } from "hooks/useBreadcrumb";
import useStore from "zustand/store";

import {
  DashboardContainer,
  DashboardTitle,
  ListStatistics,
  NonBreadcrumb,
  StatisticsItem,
  DevicesStatistics,
  DevicesTitle,
  DeviceItem,
} from "./styles";

const Overview: React.FC = () => {
  const { currentUser } = useStore();
  useBreadcrumb([]);
  return (
    <DashboardContainer>
      <NonBreadcrumb>Xin chào</NonBreadcrumb>
      <DashboardTitle>{currentUser?.userInfo?.displayName}</DashboardTitle>
      <ListStatistics>
        {statisticData.map((item, index) => (
          <StatisticsItem.Container key={index}>
            <StatisticsItem.Background
              src={require(`assets/images/dashboard/statistic-bg.png`)?.default}
              alt=""
            />
            <StatisticsItem.Content>
              <StatisticsItem.Label>{item.name}</StatisticsItem.Label>
              <StatisticsItem.Number>{item.number}</StatisticsItem.Number>
            </StatisticsItem.Content>
          </StatisticsItem.Container>
        ))}
      </ListStatistics>
      <DevicesTitle>Thống kê thiết bị</DevicesTitle>

      <DevicesStatistics>
        {devicesData.map((item, index) => (
          <DeviceItem.Container key={index}>
            <SVG name={item.icon} width={36} height={36} />
            <DeviceItem.Content>
              <DeviceItem.Label>{item.name}</DeviceItem.Label>
              <DeviceItem.Number>{item.number}</DeviceItem.Number>
            </DeviceItem.Content>
          </DeviceItem.Container>
        ))}
      </DevicesStatistics>
    </DashboardContainer>
  );
};

export default Overview;

const statisticData = [
  {
    name: "Tổng người dùng",
    number: 2000,
  },
  {
    name: "Tổng thiết bị",
    number: 60040,
  },
  {
    name: "Tổng bài viết",
    number: 3400,
  },
];

const devicesData = [
  {
    name: "Hoạt động",
    number: 2000,
    icon: "overview/tick-circle",
  },
  {
    name: "Mất kết nối",
    number: 60040,
    icon: "overview/info-circle",
  },
  {
    name: "Đang phát",
    number: 3400,
    icon: "overview/volume-high",
  },
  {
    name: "Đang nghỉ",
    number: 3400,
    icon: "overview/volume-slash",
  },
];
