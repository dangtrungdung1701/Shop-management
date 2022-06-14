import React from "react";
import { StatisticsItem } from "./styles";

interface IStatisticProps {
  title?: string;
  data?: number;
}

const Statistic: React.FC<IStatisticProps> = ({ title, data }) => {
  return (
    <StatisticsItem.Container>
      <StatisticsItem.Background
        src={require(`assets/images/dashboard/statistic-bg.png`)?.default}
        alt=""
      />
      <StatisticsItem.Content>
        <StatisticsItem.Label>{title}</StatisticsItem.Label>
        <StatisticsItem.Number>{data}</StatisticsItem.Number>
      </StatisticsItem.Content>
    </StatisticsItem.Container>
  );
};

export default Statistic;
