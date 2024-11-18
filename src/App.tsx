import { Outlet } from "react-router";
import Footer from "./_component/Footer/Footer";
import Header from "./_component/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
