import dayjs from "dayjs";
//import React, { useContext, useState, useEffect } from "react";
import React, { useContext, useEffect, useState } from "react";
import { getRequest } from "../api/calendarApi";
import GlobalContext from "../context/GlobalContext";
import { convertSolar2Lunar } from "../util";
import { convertSolar2LunarMonth } from "../util";
import { flag_handleMonth } from "./CalendarHeader"
import * as testmonth from "./Month"

export function ShowLunarCalendar2() {
}

export default function Day({ day, rowIdx, _events }) {
  const dayEvents = initest();
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  function initest() {
    // const events = _events.filter(
    //   (evt) =>
    //     dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    // );
    // return events;
  }

  useEffect(() => {
    //console.log("evt: ", dataEvents)
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    // setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-17"
      : "";
  }
  function getcolorLichAm() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "text-white"
      : "text-yellow-600";
  }

  function ShowLunar(dd, mm, yy, timezone) {
    var dayLaner = convertSolar2Lunar(dd, mm, yy, timezone)
    var monthLaner = convertSolar2LunarMonth(dd, mm, yy, timezone)
    var cform = dayLaner + "/" + monthLaner

    if (document.getElementById(day.format("DD/MM/YYYY")) != null) {
      document.getElementById(day.format("DD/MM/YYYY")).innerHTML = cform;
    }
    else {
      // document.getElementById(dd).innerHTML=""
    }
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}

        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}

          <div ></div>

          <p id={day.format("DD/MM/YYYY")} className={`${getcolorLichAm()}`}>
            {convertSolar2Lunar(parseInt(day.format("DD")), parseInt(day.format("MM")), parseInt(day.format("YYYY")), +7)}
            /
            {convertSolar2LunarMonth(parseInt(day.format("DD")), parseInt(day.format("MM")), parseInt(day.format("YYYY")), +7)}
          </p>
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {_events.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.color}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
        {/* <div
          // key={idx}
          onClick={() => setSelectedEvent({ _events.title, _events.description, color, startDate, endDate, startTime, endTime })}
          style={{ backgroundColor: color ? setDaySelected.color : "", width: "100%", textAlign: 'center', height: "100%", color: '#fff' }}
          className={`bg-${color}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
        >
          <h2>{title}</h2>
          <p>{description}</p>
        </div> */}
      </div>
    </div>
  );

}
