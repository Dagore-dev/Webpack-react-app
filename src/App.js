import { useState } from "react";

export default function App () {

  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);

  function handleClick () {
    setCounter(counter + 1);
    setValues(values.concat(counter))
  }

  return (
    <div className="container">
      <h1>Hola mundo!</h1>
      <button onClick={handleClick}>Try this!</button>
      <div><strong>{counter}</strong></div>
    </div>
  )
}