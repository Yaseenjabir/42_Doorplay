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
      try {
        const cachedData = await cachedResult.json();
        const currentTime = Date.now();
        const cacheTimestamp = cachedData.timestamp;

        const cacheExpired =
          cacheTimestamp && currentTime - cacheTimestamp > 12 * 60 * 60 * 1000; // 12 hours

        if (!cacheExpired) {
          insertFn(cachedData.data);
          return;
        }
      } catch (e) {
        console.error("Error parsing cached data:", e);
      }
    }

    // If cache is expired or missing, fetch from API
    try {
      const res = await apiClient.get(apiEndPoint, {
        params: { skip: 0, limit: 1000000000 },
      });

      if (res.status === 200) {
        const responseData = res.data;
        const responseWithTimestamp = {
          data: responseData,
          timestamp: Date.now(),
        };

        const response = new Response(JSON.stringify(responseWithTimestamp), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        cache.put(apiEndPoint, response);
        insertFn(responseData);
      }
    } catch (ex) {
      console.error("Error fetching from API:", ex);
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
