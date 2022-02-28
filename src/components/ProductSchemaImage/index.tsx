interface IProductSchemaImageProps {
  className?: string;
  upperImage: string | null | undefined;
  heatherImage?: string | null;
  color: string;
}

const ProductSchemaImage: React.FC<IProductSchemaImageProps> = ({
  className = "",
  heatherImage,
  upperImage,
  color,
}) => {
  return (
    <div className={`w-full aspect-w-1 relative aspect-h-1 ${className}`}>
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: color }}
      />
      {heatherImage && (
        <img src={heatherImage} className="absolute inset-0 w-full h-full" />
      )}
      <img src={upperImage || ""} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default ProductSchemaImage;
