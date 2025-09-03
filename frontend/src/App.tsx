import { useState } from "react";
import { trpc } from "./trpc";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const Greetings = trpc.hello.useQuery({ name: "Minhal" });

  return (
    <div>
      <div className="">React TRPC Client App</div>

      <div>
        {/*  function */}

        <p>{Greetings.data?.greeting} </p>
      </div>
    </div>
  );
}

export default App;
