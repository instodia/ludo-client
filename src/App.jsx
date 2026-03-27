import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PassAndPlayPage from "./pages/PassAndPlayPage";
import RoomLobbyPage from "./pages/RoomLobbyPage";
import RoomGamePage from "./pages/RoomGamePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pass-and-play" element={<PassAndPlayPage />} />
        <Route path="/room-lobby" element={<RoomLobbyPage />} />
        <Route path="/room-game/:roomCode" element={<RoomGamePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}