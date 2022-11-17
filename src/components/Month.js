import React, { useEffect, useState } from "react";
import { getRequest } from "../api/calendarApi";
import Day, { Day_Lunar } from "./Day";
import moment from 'moment';

export default function Month({ month }) {

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
            let eventDay = {}
            let eventOfDate = data.filter(s => day.format('YYYY-MM-DD') == moment(s.startDate).format('YYYY-MM-DD'));
            if (eventOfDate.length > 0) {
              eventDay = {
                rowIdx: i,
                day: day,
                events: eventOfDate.map(event => {
                  return {
                    id: event.id,
                    title: event.title,
                    color: event.color,
                    label: event.color,
                    description: event.description,
                    startDate: moment(event.startDate).format('YYYY-MM-DD'),
                    endDate: moment(event.endDate).format('YYYY-MM-DD'),
                    startTime: event.startTime,
                    endTime: event.endTime,
                    timeBeforNotification: event.timeBeforNotification,
                    statusNotification: event.statusNotification
                  }
                })
              }
            }
            else {
              eventDay = {
                rowIdx: i,
                day: day,
                events: []
              }
            }
            show.push(eventDay);
          }
          )
        })
        // console.log(show)
        setDataEvents(show)
      } catch (error) {
        console.log(error);
      }
    })()
  }, []);
  function getEvent() {
    return dataEvents;
  }

  const events = getEvent();
  // console.log(events);
  return (
    console.log("nextMonth",month),
    getEvent(),
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {/* {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} _events={events} />
          ))}
        </React.Fragment>
      ))} */}
      {dataEvents.map((data, idx) =>
        <Day day={data.day} key={idx} rowIdx={data.rowIdx} _events={data.events} />
      )}
    </div>
  );
}


export function Month_Lunar({ month }) {

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
            let eventDay = {}
            let eventOfDate = data.filter(s => day.format('YYYY-MM-DD') == moment(s.startDate).format('YYYY-MM-DD'));
            if (eventOfDate.length > 0) {
              eventDay = {
                rowIdx: i,
                day: day,
                events: eventOfDate.map(event => {
                  return {
                    id: event.id,
                    title: event.title,
                    color: event.color,
                    label: event.color,
                    description: event.description,
                    startDate: moment(event.startDate).format('YYYY-MM-DD'),
                    endDate: moment(event.endDate).format('YYYY-MM-DD'),
                    startTime: event.startTime,
                    endTime: event.endTime,
                    timeBeforNotification: event.timeBeforNotification,
                    statusNotification: event.statusNotification
                  }
                })
              }
            }
            else {
              eventDay = {
                rowIdx: i,
                day: day,
                events: []
              }
            }
            show.push(eventDay);
          }
          )
        })
        console.log(show)
        setDataEvents(show)
      } catch (error) {
        console.log(error);
      }
    })()
  }, []);

  const events = getEvent();
  // console.log(events);
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
        <Day_Lunar day={data.day} key={idx} rowIdx={data.rowIdx} _events={data.events} />
      )}
    </div>
  );
}

