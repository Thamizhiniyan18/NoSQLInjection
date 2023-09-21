import "./App.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit__Handler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success(response.message);
          toast.success(response.flag);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App">
      <div className="form" onSubmit={onSubmit__Handler}>
        <form>
          <div className="input-container">
            <label>Username </label>
            <input
              type="text"
              name="uname"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              name="pass"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
      <ToastContainer />
      {isLoading && (
        <div className="Loader">
          <h1>loading.....</h1>
        </div>
      )}
    </div>
  );
};

export default App;
