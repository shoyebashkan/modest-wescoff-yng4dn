const CoulmnSection = ({ data, forks }) => {
  return (
    <section>
      <header>
        <div className="col">Name</div>
        <div className="col">Language</div>
        <div className="col">Description</div>
        <div className="col">Size</div>
      </header>

      {forks
        ? data.map((data) => {
            return (
              <div key={data.id}>
                <div className="col">{data.name}</div>
                <div className="col">{data.language}</div>
                <div className="col">{data.description}</div>
                <div className="col">{data.size}</div>
              </div>
            );
          })
        : data
            .filter((data) => !data.fork)
            .map((data) => {
              return (
                <div key={data.id}>
                  <div className="col">{data.name}</div>
                  <div className="col">{data.language}</div>
                  <div className="col">{data.description}</div>
                  <div className="col">{data.size}</div>
                </div>
              );
            })}
    </section>
  );
};

export default CoulmnSection;
