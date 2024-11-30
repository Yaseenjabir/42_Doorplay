import { Outlet } from "react-router";
import Footer from "./_component/Footer/Footer";
import Header from "./_component/Header/Header";
import { useEffect } from "react";
import { apiClient } from "./apiClient/apiClient.ts";
import { GET_ALL_DOORS, GET_ALL_REVIEWS } from "./constants/constant.ts";
import useStore from "./store/Store.ts";
function App() {
  const { insertData, insertReviews, val, globalData, globalReviews } =
    useStore();
  const fetchGlobalData = async (apiEndPoint: string, insertFn: any) => {
    const cache = await caches.open("A&R-Doors");

    const cachedResult = await cache.match(apiEndPoint);
    if (cachedResult) {
      const cachedData = await cachedResult.json();
      insertFn(cachedData);
      console.log("Fetched Data from Cache");
    } else {
      try {
        console.log("Fetched Data from API");
        const res = await apiClient.get(apiEndPoint, {
          params: { skip: 0, limit: 1000000000 },
        });
        if (res.status === 200) {
          const response = new Response(JSON.stringify(res.data), {
            headers: {
              "Content-Type": "application/json",
            },
          });
          cache.put(apiEndPoint, response);
          insertFn(res.data);
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  };
  useEffect(() => {
    if (globalData.length === 0) {
      fetchGlobalData(GET_ALL_DOORS, insertData);
    }
    if (globalReviews.length === 0) {
      fetchGlobalData(GET_ALL_REVIEWS, insertReviews);
    }
  }, [val]);

  return (
    <>
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    </>
  );
}

export default App;
