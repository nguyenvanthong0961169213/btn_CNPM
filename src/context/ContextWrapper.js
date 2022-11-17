import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { deleteRequest, postRequest } from "../api/calendarApi";
import App_1 from "../App";
import { check_flag_show_lunar } from "..";


function savedEventsReducer(state, { type, payload }) {
  console.log(payload);
  switch (type) {
    case "push":
      postRequest("Events/CreateEvent", payload);
      window.location.reload(false);
      // return;
    
       return [...state, payload];
    case "update":
      postRequest("Events/Update", payload);
      window.location.reload(false);
      // return;
      return state.map((evt) =>
        evt.id === payload.id ? payload : evt
      );
      
    case "delete":
      deleteRequest("Events/"+payload.id);
      window.location.reload(false);
      // return;
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}
// function initEvents() {

//   const storageEvents = localStorage.getItem("savedEvents");
//   const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
//   return parsedEvents;
// }
// function initest() {
//   const storageEvents = localStorage.getItem("savedEvents");
//   const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
//   return parsedEvents;
// }

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    
  );
  // const [test] = initest();

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);



  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
