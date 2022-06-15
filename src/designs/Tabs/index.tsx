import { Tab } from "@headlessui/react";
import { ReactComponentElement, Fragment } from "react";

import SVG from "designs/SVG";

import { TabContainer, Container, Title, Content, ListTitle } from "./styles";

interface ITabProps {
  titles: string[];
  content: ReactComponentElement<any>[];
  className?: string;
  size?: "lg" | "md";
  icon?: string;
}

const GroupTab: React.FC<ITabProps> = props => {
  const { titles, className = "", content, icon, size = "md" } = props;

  return (
    <TabContainer className={className}>
      <Tab.Group>
        <ListTitle>
          {titles?.map(title => (
            <Tab as={Fragment}>
              {({ selected }) => (
                <Title length={titles?.length || 1} active={selected}>
                  {title}
                  {icon && <SVG name={icon} width="20px" height="20px" />}
                </Title>
              )}
            </Tab>
          ))}
        </ListTitle>
        <Tab.Panels>
          <Container size={size}>
            {content?.map(content => (
              <Content>{content}</Content>
            ))}
          </Container>
        </Tab.Panels>
      </Tab.Group>
    </TabContainer>
  );
};

export default GroupTab;
