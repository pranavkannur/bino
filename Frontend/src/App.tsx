import { BrowserRouter, Route, Routes } from "react-router";
import PageLayout from "./components/PageLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Stocks from "./pages/Stocks";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClinet= new QueryClient();

export function App(){
  
  return(
    <QueryClientProvider client={queryClinet}>
    <BrowserRouter useTransitions={false}>
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stocks"
          element={
            <ProtectedRoute>
              <Stocks />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
  </QueryClientProvider>
  );
}
