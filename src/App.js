import React, { useEffect, useState } from "react";
import "./styles.css";

import ColumnSection from "./component/ColumnSection";

function App() {
  const [userName, setUserName] = useState("");
  const [forks, setForks] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState({
    isError: true,
    message: "",
  });

  const fetchData = (name) => {
    fetch(`https://api.github.com/users/${name}/repos`)
      .then((resp) => resp.json())
      .then((dta) => {
        if (dta.message) {
          setError({
            isError: true,
            message: dta.message,
          });
        } else if (dta.length === 0) {
          setError({
            isError: true,
            message: `No repo found for ${name}`,
          });
        } else {
          var res = dta.sort(({ size: a }, { size: b }) => b - a);
          setData(res);
          setError({
            isError: false,
            message: "",
          });
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
      {error.isError ? (
        <div className="error">{error.message}</div>
      ) : (
        <ColumnSection data={data} forks={forks} />
      )}
    </div>
  );
}

export default App;
