import { randomId } from "common/functions";
import Collapse from "components/Collapse";
import { useEffect, useState } from "react";

export interface INestedItem<T> {
  data: T;
  items?: INestedItem<T>[] | undefined;
}

type INestedMenuProps<T> = {
  data: T;
  items: INestedItem<T>[] | undefined;
  /**
   * The level depth of nested menu.
   * Start by 0
   */
  level?: number;
  checkOpen: (data: T) => boolean;
  renderItem: (
    data: T,
    isOpen: boolean,
    level: number,
    hasChildren: boolean,
  ) => JSX.Element;
} & (
  | {
      smooth: true;
      estimateHeight: number;
    }
  | {
      smooth?: false;
      readonly estimateHeight?: 0;
    }
);

const NestedMenu = <T,>(props: INestedMenuProps<T>) => {
  const {
    smooth,
    data,
    items,
    estimateHeight = 5000,
    level = 0,
    renderItem,
    checkOpen,
  } = props;
  const hasChildren = Boolean(items?.length && items?.length > 0);
  const [id] = useState(randomId());
  const [isOpen, setIsOpen] = useState(checkOpen(data));

  useEffect(() => {
    setIsOpen(checkOpen(data));
  }, [checkOpen(data)]);

  if (!data) return null;
  return (
    <div>
      <div onClick={() => hasChildren && setIsOpen(!isOpen)}>
        {renderItem(data, isOpen, level, hasChildren)}
      </div>

      {hasChildren && (
        <Collapse
          show={isOpen}
          smooth={smooth as any}
          estimateHeight={estimateHeight}
        >
          {items?.map(item => {
            if (item?.items) {
              return (
                <NestedMenu
                  {...props}
                  key={id}
                  data={item.data}
                  items={item?.items}
                  level={level + 1}
                />
              );
            }
            return renderItem(item?.data, false, level + 1, false);
          })}
        </Collapse>
      )}
    </div>
  );
};

export default NestedMenu;
