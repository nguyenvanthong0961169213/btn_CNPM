import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
// import { getCalendarAPI } from "./api/calendarApi";
import axios from 'axios';

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //const data = getCalendarAPI();
    //console.log(data);
  }

  // const [dataAPI, setDataAPI] = useState("");
  // const getCalendarAPI = async () => {
  //   try {
  //     const res = await axios.get(`https://localhost:44371/api/Events`, {
  //       headers: {
  //       },
  //       params: {},
  //     });
  //     setDataAPI(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // console.log("Data API: " + dataAPI?.data)

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
