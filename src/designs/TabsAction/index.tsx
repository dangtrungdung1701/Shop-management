import { useState } from "react";
import { Tab } from "@headlessui/react";
import { ReactComponentElement, Fragment } from "react";

import SVG from "designs/SVG";

import {
  TabContainer,
  Container,
  Title,
  Content,
  ListTitle,
  IconContainer,
} from "./styles";

import EditDialog from "./Dialog";

export interface ITab {
  id: number;
  name: string;
  record: any;
}

interface ITabProps {
  titles?: string[];
  content?: ReactComponentElement<any>[];
  className?: string;
  size?: "lg" | "md";
  tabs: ITab[];
  setTabs: (value: ITab[]) => void;
  renderProps: (value: ITab) => JSX.Element;
}

const GroupTab: React.FC<ITabProps> = props => {
  const {
    titles,
    className = "",
    content,
    size = "md",
    tabs,
    setTabs,
    renderProps,
  } = props;

  const [editDialog, setEditDialog] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<ITab | null>(null);

  const onHandleAdd = () => {
    tabs.push({
      id: tabs.length,
      record: null,
      name: "Untitled",
    });
    setTabs([...tabs]);
  };

  const onHandleEdit = (record: ITab) => {
    setEditDialog(true);
    setCurrentRecord(record);
  };

  const onHanleDelete = (record: ITab) => {
    if (tabs.length === 1) return;
    const tabsTemp = tabs.filter((value, index) => {
      return value.id !== record.id;
    });

    setTabs(tabsTemp);
  };
  return (
    <>
      <TabContainer className={className}>
        <Tab.Group>
          <ListTitle>
            {tabs?.map((value, index) => (
              <Tab as={Fragment} key={index}>
                {({ selected }) => (
                  <Title length={titles?.length || 1} active={selected}>
                    <div className="flex gap-1">
                      <p>{value.name}</p>
                      <IconContainer>
                        <SVG
                          name="common/edit"
                          height={20}
                          width={20}
                          className="cursor-pointer"
                          onClick={() => onHandleEdit(value)}
                        />
                        <SVG
                          name="common/delete"
                          height={20}
                          width={20}
                          className="cursor-pointer"
                          onClick={() => onHanleDelete(value)}
                        />
                      </IconContainer>
                    </div>
                  </Title>
                )}
              </Tab>
            ))}

            <SVG
              name="common/add"
              height={20}
              width={20}
              className="cursor-pointer"
              onClick={onHandleAdd}
            />
          </ListTitle>
          <Tab.Panels>
            <Container size={size}>
              {tabs?.map(value => (
                <Content>{renderProps(value)}</Content>
              ))}
            </Container>
          </Tab.Panels>
        </Tab.Group>
      </TabContainer>
      <EditDialog
        editDialog={editDialog}
        setEditDialog={setEditDialog}
        currentRecord={currentRecord}
        tabs={tabs}
        setTabs={setTabs}
      />
    </>
  );
};

export default GroupTab;
