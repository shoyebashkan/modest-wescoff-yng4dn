const CoulmnSection = ({ data }) => {
  return (
    <div>
      <div className="col">{data.name}</div>
      <div className="col">{data.language}</div>
      <div className="col">{data.description}</div>
      <div className="col">{data.size}</div>
    </div>
  );
};

export default CoulmnSection;
