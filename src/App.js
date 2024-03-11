import React, { useEffect, useState } from "react";
import "./styles.css";

import ColumnSection from "./component/ColumnSection";

function App() {
  const [userName, setUserName] = useState("");
  const [forks, setForks] = useState(false);
  const [data1, setData1] = useState();

  const fetchData = (props) => {
    fetch(`https://api.github.com/users/${props}/repos`)
      .then((resp) => resp.json())
      .then((dta) => {
        if (dta !== undefined) {
          var res = dta.sort(({ size: a }, { size: b }) => b - a);
          setData1(res);
        }
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetchData(userName);
  };

  return (
    <div className="App">
      <div className="input">
        <label htmlFor="username">Github username: </label>
        <input
          id="username"
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label htmlFor="fork">Include forks: </label>
        <input
          id="fork"
          type="checkbox"
          checked={forks}
          onChange={() => setForks(!forks)}
        />
        <button disabled={!userName} onClick={(e) => onSubmitHandler(e)}>
          Submit
        </button>
      </div>
      {/* starting of the table */}
      <section>
        <header>
          <div className="col">Name</div>
          <div className="col">Language</div>
          <div className="col">Description</div>
          <div className="col">Size</div>
        </header>
        {/* Will map throught the data once received/fetch */}
        {data1 && !data1.message ? (
          data1.length === 0 ? (
            <div>No repo for {userName}</div>
          ) : forks ? (
            data1.map((data) => {
              return <ColumnSection key={data.id} data={data} />;
            })
          ) : (
            data1
              .filter((data) => !data.fork)
              .map((data) => {
                return <ColumnSection key={data.id} data={data} />;
              })
          )
        ) : (
          <div>Not Found</div>
        )}
      </section>
    </div>
  );
}

export default App;
