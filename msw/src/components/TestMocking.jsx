import { response } from "msw";
import React, { useState } from "react";

const Item = ({ name, age }) => {
  return (
    <li>
      name : {name} / age : {age}
    </li>
  );
};

const url = process.env.REACT_APP_BASE_URL;

function TestMocking() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = () => {
    fetch(`${url}?id=react`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.errorMessage) {
          throw new Error(json.errorMessage);
        }
        setData(json.data);
      })
      .catch((error) => {
        setError(`Something Wrong : ${error}`);
      });
  };

  const handleClick2 = () => {
    fetch("/login")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(JSON.stringify(json));
      });
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={handleClick}>데이터 가져오기</button>
      <button onClick={handleClick2}>데이터 가져오기2</button>
      {data && (
        <ul>
          {data.people.map((person) => (
            <Item
              key={`${person.name}-${person.age}`}
              name={person.name}
              age={person.age}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TestMocking;
