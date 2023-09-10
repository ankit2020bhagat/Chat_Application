import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Home = ({ userName, setuserName, room, setRoom, socket }) => {
  const navigate = useNavigate();
  const joinRome = () => {
    if (room !== "" && userName !== "") {
      console.log(userName);
      socket.emit("join_room", { userName, room });
    }
    navigate("/chat", { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={(e) => setuserName(e.target.value)}
        />

        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>

        <button
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={joinRome}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
