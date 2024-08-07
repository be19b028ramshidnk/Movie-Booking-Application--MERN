import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { Movies } from "./components/Movies/Movies";
import { Admin } from "./components/Admins/Admin";
import { Auth } from "./components/Auth/Auth";

function App() {
  return (
    <div>
      <Header/>  
      <section>
        <Routes>
          <Route path = "/" element={<HomePage />}  />
          <Route path = "/movies" element={<Movies />}  />
          <Route path = "/admin" element={<Admin />}  />
          <Route path = "/auth" element={<Auth />}  />

        </Routes>

      </section>
    </div>
  );
}

export default App;


