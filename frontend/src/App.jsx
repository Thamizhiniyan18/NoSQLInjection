import "./App.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit__Handler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    axios
      .post("/api/users/login", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        toast.success(response.data.flag);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
