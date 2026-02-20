import { useState } from "react";
import { trpc } from "./trpc";
import "./App.css";

function App() {
  const [count, setCount] = useState({ a: "", b: "", result: 0 });
  const [time, setTime] = useState("");

  const [error, setError] = useState<string | null>(null);

  const User = trpc.user.userInfo.useQuery({
    email: "minhalalikhan@gmail.com",
  });


  trpc.clock.useSubscription(
    { interval: 1000 },
    {
      onData(data) {
        setTime(data);
      },
      onError(err) {
        console.error(err);
      },
    }
  );
  // const dummy = trpc.hello.useQuery({ boi: "minhal" });

  const Addfunc = trpc.add.useMutation({
    onSuccess: (data) => {
      setCount({ ...count, result: data });
    },
  });

  function add() {
    if (isNaN(Number(count.a)) || isNaN(Number(count.b))) {
      setError("Please enter valid numbers");
      return;
    }

    if (count.a === "" || count.b === "") {
      setError("input cant be empty");
      return;
    }

    Addfunc.mutate({ a: Number(count.a), b: Number(count.b) });
  }
  return (
    <div className="container">
      <div className="">React TRPC Client App</div>

      <div>
        <p>Server Time: {time}</p>
      </div>

      {/*  function */}

      <p>{User.data?.name}</p>
      <p>{User.data?.email}</p>
      <p>{User.data?.age}</p>

      <div className="calc">
        <input
          value={count.a}
          onChange={(e) => setCount({ ...count, a: e.target.value })}
        />
        <input
          value={count.b}
          onChange={(e) => setCount({ ...count, b: e.target.value })}
        />
        {error && (
          <p className="error" style={{ color: "red" }}>
            Error: {error}
          </p>
        )}
        <button onClick={add}>Add</button>
        <p>Result: {count.result}</p>
      </div>
    </div>
  );
}

export default App;
