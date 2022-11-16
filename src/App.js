import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month, { Month_Lunar } from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";

function App_1(props) {
  const {check} = props
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  const [month_test, setMonth] = useState(<Month month={currenMonth}/>)


  // console.log("test",check)
  // function test()
  // {
  //   if(check===true)
  //   {
  //     const test=<Month_Lunar month={currenMonth}/>
  //     setMonth(test)
  //   }
  //   else{
  //     const test=<Month month={currenMonth}/>
  //     setMonth(test)
  //   }
  // }
  // test()
 
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
  console.log('check ', check)
  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          {
            check
            ? <Month_Lunar month={currenMonth}/>
            : <Month month={currenMonth}/>
          }
          {/* {month_test} */}
          {/* <Month month={currenMonth}/> */}
          {/* <Month month={currenMonth} /> */}
        </div>
      </div>
    </React.Fragment>
  );

}

export default App_1;

// export function App_Lunar() {
//   const [currenMonth, setCurrentMonth] = useState(getMonth());
//   const { monthIndex, showEventModal } = useContext(GlobalContext);

//   useEffect(() => {
//     setCurrentMonth(getMonth(monthIndex));
//   }, [monthIndex]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     //const data = getCalendarAPI();
//     //console.log(data);
//   }
//   return (
//     <React.Fragment>
//       {showEventModal && <EventModal />}

//       <div className="h-screen flex flex-col">
//         <CalendarHeader />
//         <div className="flex flex-1">
//           <Sidebar />
//           <Month_Lunar month={currenMonth} />
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }
