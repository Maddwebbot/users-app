import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://users-app-production-3930.up.railway.app/users")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Frontend Connected!</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
