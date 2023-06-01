import "./App.css";
import useMario from "./hooks/useMario";

function App() {
  const { mario } = useMario();

  return (
    <div className="sample">
      <div className="ground"></div>
      <img
        src={`${
          mario.y > 0 ? "jump" : mario.isMoving !== true ? "stand" : "walk"
        }_${mario.dir}.gif`}
        alt=""
        style={{
          left: 100 + mario.x,
          bottom: 78 + mario.y,
          transition: "all 0.5s ease-out",
        }}
      />
    </div>
  );
}

export default App;
