import { Route, Routes } from "react-router-dom";
import Root from "./pages/root";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
    </Routes>
  );
}
