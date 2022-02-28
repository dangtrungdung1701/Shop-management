import { PATH } from "common/constants/routes";
import { TabItemContainer, Title } from "./styles";

type ICreateProductTab =
  | "BASE_CONFIG"
  | "PRINTING_CONFIG"
  | "EMBROIDERY_CONFIG"
  | "INFO_CONFIG";

const tabs: {
  type: ICreateProductTab;
  name: string;
  url: string;
}[] = [
  {
    type: "BASE_CONFIG",
    name: "Base config",
    url: PATH.BASE_CONFIG_PRODUCT,
  },
  {
    type: "PRINTING_CONFIG",
    name: "Printing config",
    url: PATH.PRINTING_CONFIG,
  },
  {
    type: "EMBROIDERY_CONFIG",
    name: "Embroidery config",
    url: PATH.EMBROIDERY_CONFIG,
  },
  {
    type: "INFO_CONFIG",
    name: "Info config",
    url: PATH.INFO_CONFIG,
  },
];

interface IProductConfigLayoutProps {
  currTab: ICreateProductTab;
  hasPrintingTab?: boolean;
  hasEmbroideryTab?: boolean;
  productId?: string;
  isCreate?: boolean;
}

const ProductConfigLayout: React.FC<IProductConfigLayoutProps> = ({
  currTab,
  children,
  hasEmbroideryTab,
  hasPrintingTab,
  productId = "",
  isCreate = false,
}) => {
  return (
    <div className="w-full">
      <Title>Product config</Title>
      <ul className="flex flex-row gap-0.5">
        {tabs.map(({ type, name, url }) => {
          if (isCreate && type !== "BASE_CONFIG") return null;

          if (type === "PRINTING_CONFIG" && !hasPrintingTab) return null;
          if (type === "EMBROIDERY_CONFIG" && !hasEmbroideryTab) return null;

          return (
            <TabItemContainer
              key={name}
              active={type === currTab}
              to={url.replace(":id", productId)}
            >
              {name}
            </TabItemContainer>
          );
        })}
      </ul>
      <div className="p-2 phone:p-4 bg-primary-3">{children}</div>
    </div>
  );
};

export default ProductConfigLayout;
