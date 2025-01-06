export interface LoaderProps {
  title?: string;
}

const Loader: React.FunctionComponent<LoaderProps> = (props) => {
  const { title } = props;
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "1em",
        textTransform: "uppercase",
      }}
    >
      {title ? <p>{title}</p> : <p>WORKING...</p>}

      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
