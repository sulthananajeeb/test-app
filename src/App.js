import "./App.css";
import Test from "./Test";

function App() {
    return (
        <>
            <Test />
            <h1 ref={Test.canvasRef}>Hello world</h1>
        </>
    );
}

export default App;
