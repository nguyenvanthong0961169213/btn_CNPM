import React, { useEffect, useState } from "react";
import { getRequest } from "../api/calendarApi";
import Day from "./Day";
import moment from 'moment';

export default function Month({ month }) {

  function getEvent() {
    // Call owr ddaay

    var result = [];
    result.map(s => {
      return {
        id: s.id,
        title: s.name,
        day: s.beginHour,
        // p: s.
      };
    })
    //const storageEvents = localStorage.getItem("savedEvents");
    //const parsedEvents  = storageEvents ? JSON.parse(storageEvents) : [];
    return result;
    //return parsedEvents;
  }

  const [dataEvents, setDataEvents] = useState([])

  useEffect(() => {
    //console.log("evt: ", dataEvents)
    (async () => {
      try {
        let data = await getRequest("Events/AllEvent")
        // setDataEvents(data)
        let show = []
        month.map((row, i) => {
          row.map(day => {
            let repeatCheck = {}
            data.map(event => {
              let dayDate = day.format('YYYY-MM-DD')
              let startDate = moment(event.startDate).format('YYYY-MM-DD')
              let endDate = moment(event.endDate).format('YYYY-MM-DD')
              if (dayDate >= startDate && dayDate <= endDate) {
                repeatCheck = {
                  ...repeatCheck, rowIdx: i,
                  day: day,
                  title: event.title,
                  color: "red", //event.color
                  description: event.description,
                  startDate: startDate,
                  endDate: endDate,
                  startTime: event.startTime,
                  endTime: event.endTime
                }
              } else {
                repeatCheck = {
                  ...repeatCheck,
                  rowIdx: i,
                  day: day,
                }
              }
            })
            show.push(repeatCheck)
          }
          )
        })
        setDataEvents(show)
      } catch (error) {
        console.log(error);
      }
    })()
  }, []);

  const events = getEvent();
  console.log(events);
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {/* {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} _events={events} />
          ))}
        </React.Fragment>
      ))} */}
      {dataEvents.map((data, idx) =>
        <Day day={data.day} key={idx} rowIdx={data.rowIdx} _events={events} title={data.title} color={data.color}
          description={data.description} startDate={data.startDate}
          endDate={data.endDate} startTime={data.startTime} endTime={data.endTime} />
      )}
    </div>
  );
}

