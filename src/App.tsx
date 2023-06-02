import { Route, Routes } from "react-router-dom";
import "./App.css";
import FormsScreen from "./screens/forms-screen";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<FormsScreen />} />
      </Routes>
    </>
  );
}

export default App;
