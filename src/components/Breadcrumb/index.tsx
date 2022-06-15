import { Fragment } from "react";
import { Link } from "react-router-dom";

import CSS from "csstype";

import ArrowIcon from "designs/icons/Arrow";

import useStore from "zustand/store";

import { BreadcrumbContainer, Container, ItemWrapper, Item } from "./styles";

interface IBreadcrumbProps {
  className?: string;
  style?: CSS.Properties;
}

const Breadcrumb: React.FC<IBreadcrumbProps> = (props: IBreadcrumbProps) => {
  const { className = "" } = props;
  const { breadcrumb } = useStore();

  return (
    <BreadcrumbContainer className={className}>
      <Container>
        {breadcrumb.map((item, index) => {
          const lastItem = index === breadcrumb.length - 1;
          return (
            <Fragment key={index}>
              <ItemWrapper lastItem={lastItem}>
                {lastItem ? (
                  <Item className="">{item.name}</Item>
                ) : item?.href ? (
                  <Link to={item.href!}>{item.name}</Link>
                ) : (
                  <Item className="">{item.name}</Item>
                )}
              </ItemWrapper>
              {index !== breadcrumb.length - 1 && (
                <ArrowIcon
                  className="text-neutral-1 w-1.5 h-1.5 mx-0.5"
                  direction="RIGHT"
                />
              )}
            </Fragment>
          );
        })}
      </Container>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
