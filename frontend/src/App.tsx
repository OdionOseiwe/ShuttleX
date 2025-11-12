import { io } from "socket.io-client";

// connect to your backend
const socket = io("http://localhost:5000");

// confirm connection
socket.on("connect", () => {
  console.log("🔗 Connected to server as:", socket.id);
});

function App() {

  return (
    <>
      <h1 className="text-blue-500 text-3xl">hello world</h1>
    </>
  )
}

export default App
         