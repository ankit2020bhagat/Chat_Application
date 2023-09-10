import styles from "./styles.module.css";
import MessagesReceived from "./message";
import SendMessgae from "./send-message";
const chat = ({ socket, username, room }) => {
  return (
    <div className={styles.chatContainer}>
      <div>
        <MessagesReceived socket={socket} />
        <SendMessgae socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default chat;
