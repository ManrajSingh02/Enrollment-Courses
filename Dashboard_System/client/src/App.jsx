import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import NoteDetails from "./pages/NoteDetails";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import Users from "./pages/Users";
import AccessDenied from "./pages/AccessDenied";

import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
      

          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notes/:id"
            element={
              <ProtectedRoute>
                <NoteDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-note"
            element={
              <ProtectedRoute roles={["admin", "editor"]}>
                <CreateNote />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute roles={["admin", "editor"]}>
                <EditNote />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route path="/denied" element={<AccessDenied />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
