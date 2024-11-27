import { Outlet } from "react-router";
import Footer from "./_component/Footer/Footer";
import Header from "./_component/Header/Header";
import { useEffect } from "react";
import { apiClient } from "./apiClient/apiClient.ts";
import { GET_ALL_DOORS } from "./constants/constant.ts";
import useStore from "./store/Store.ts";
function App() {
  const { data, insertData } = useStore();

  useEffect(() => {
    const fetchGlobalData = async () => {
      console.log("RUN");
      try {
        const res = await apiClient.get(GET_ALL_DOORS, {
          params: { skip: 0, limit: 1000000000 },
        });
        if (res.status === 200) {
          insertData(res.data);
        }
      } catch (error) {}
    };
    if (data.length === 0) {
      fetchGlobalData();
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
