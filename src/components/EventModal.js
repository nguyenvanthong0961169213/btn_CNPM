import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

// import * as test from "../util"
// import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import App_1 from "../App";


const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
];

export default function EventModal() {
    const showdate = new Date();
    //const displaytime = showdate.getHours() + ':' + showdate.getMinutes(),
    const displaytime = moment(showdate).format("HH:mm");
    const displaytime_1 = moment(showdate).add('hours', 1).format("HH:mm"),
        // displaytime_1=showdate.getHours()+1 + ':' + showdate.getMinutes(),
        displayDate = new Date(showdate.setDate(showdate.getDate())).toISOString().split('T')[0];
    const {
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl == selectedEvent.label)
            : labelsClasses[0]
    );
    const [startTime, setStartTime] = useState(
        selectedEvent?.startTime
            ? moment(selectedEvent.startTime).format('HH:mm')
            : displaytime
    );
    const [endTime, setEndTime] = useState(
        selectedEvent?.endTime
            ? moment(selectedEvent.endTime).format('HH:mm')
            : displaytime_1
    );
    const [startDate, setStartDate] = useState(
        selectedEvent?.startDate
            ? moment(selectedEvent.startDate).format('YYYY-MM-DD')
            : daySelected ? daySelected.format('YYYY-MM-DD')
            : displayDate
    );
    const [endDate, setEndDate] = useState(
        selectedEvent?.endDate
            ? moment(selectedEvent.endDate).format('YYYY-MM-DD')
            : daySelected ? daySelected.format('YYYY-MM-DD')
            : displayDate
    );
    const[select,setSelect]=useState(
        selectedEvent ? selectedEvent.statusNotification : false

    );

    function handleSubmit(e) {
        e.preventDefault();
        var hasNoti = document.getElementById("myCheck");
        let phut = document.getElementById("phut")?.value;
        const calendarEvent = {
            title,
            description,
            id: selectedEvent?.id,
            startTime: "0001-01-01T" + startTime + ":00.000Z",
            startDate: moment(startDate).add('days', 1),
            endDate: moment(endDate).add('days', 1),
            endTime: "0001-01-01T" + endTime + ":00.000Z",
            statusNotification: hasNoti.checked,
            timeBeforNotification: phut,
            color: selectedLabel,
        };

        if(!check_time())
        {
            return;
        }

        if (selectedEvent) {
            dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: "push", payload: calendarEvent });
        }
        setShowEventModal(false);
        // window.location.reload(false);
        // <App_1 check={false}/>
    }

    function onclickTimeNotification() {
        setSelect(!select)
        // console.log("Data API: " + dataAPI?.data)
        var checkBox = document.getElementById("myCheck");
        // var ngaychuyen=convertSolar2Lunar(dayjs().date.format(yy),dayjs().month(),dayjs().year.format(yy),7)
        if (checkBox.checked === true) {
            // text.style.display = "block";
            let holder = document.getElementById("holder");
            holder.innerHTML = '<select id="phut" className="ml-4"> <option value="5">5 phút</option> <option value="10">10 phút</option> <option value="30">30 phút</option> <option value="60">60 phút</option>'
            //console.log(selectedEvent.timeBeforNotification);
            document.getElementById("phut").value = selectedEvent?.timeBeforNotification ? selectedEvent?.timeBeforNotification : 5;
        } else {
            let holder = document.getElementById("holder")
            holder.innerHTML = null
        }
    }
    function check_time(e)
    {
        if(startDate===endDate)
        {
           if(startTime<endTime)
           {
             return true;
           }
           else{
            alert('Thời gian bắt đầu phải trước thời gian kết thúc sự kiện');
            return false;
           }
        }
        else if(startDate<endDate)
        {
            return true;
        }
        else{
            alert('Thời gian bắt đầu phải trước thời gian kết thúc sự kiện');
            return false;
        }
    }

    //
function dialogDelete()
{
    if (window.confirm('You may want to delete ?')) {
        // Save it!
        {
            dispatchCalEvent({
                type: "delete",
                payload: selectedEvent,
            });
            setShowEventModal(false);
        }
      } else {
        // Do nothing!
        
      }
}
    

    function setTime() { }
    //console.log("time: ", moment(selectedEvent.startTime).format("LT"));
    console.log(endTime)
    

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/3">
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <span className="material-icons-outlined text-gray-400">
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <span
                                onClick={
                                    () => {
                                    // dispatchCalEvent({
                                    //     type: "delete",
                                    //     payload: selectedEvent,
                                    // });
                                    // setShowEventModal(false);
                                   dialogDelete()
                                }
                            }
                                className="material-icons-outlined text-gray-400 cursor-pointer"
                            >
                                delete
                            </span>
                        )}
                        <button onClick={() => setShowEventModal(false)}>
                            <span className="material-icons-outlined text-gray-400">
                                close
                            </span>
                        </button>
                    </div>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <div></div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Add title"
                            value={title}
                            required
                            className="overflow-wrap: normal pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2
                             border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <span className="material-icons-outlined text-blue-700">
                            schedule
                        </span>
                        <div>
                            <input type="time" className="w-2/5 mr-5" value={startTime} onChange={(e) => setStartTime(e.target.value)}></input>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}></input>
                        </div>

                        <span className="material-icons-outlined text-red-700">
                            schedule
                        </span>
                        <div>
                            <input type="time" className="w-2/5 mr-5" value={endTime} onChange={(e) => setEndTime(e.target.value)}></input>

                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate}></input>
                        </div>
                        <span className="material-icons-outlined  ">
                            notifications_active
                        </span>
                        <p>
                            {/* <input id="myCheck" type="checkBox" className="mr-8" onClick={onclickTimeNotification} defaultChecked={select}/> */}
                            Thông Báo: 
                            <input  id="myCheck" type="checkBox" className="mr-8 ml-3" onClick={() => setSelect(!select)} defaultChecked={select} />
                            <span id="holder" className="mr-4">
                                {
                                    select
                                    ? (
                                        <select id="phut" className="ml-4" defaultValue={selectedEvent?.timeBeforNotification ? selectedEvent?.timeBeforNotification : 5}> 
                                            <option value="5">5 phút</option> 
                                            <option value="10">10 phút</option> 
                                            <option value="30">30 phút</option> 
                                            <option value="60">60 phút</option>
                                        </select>
                                        )
                                    : null
                                }
                            </span>
                        </p>
                        <span className="material-icons-outlined text-gray-400">
                            segment
                        </span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Add a description"
                            value={description}
                            required
                            className=" t-3 border-0 text-gray-600 pb-2 w-full border-b-2
                             border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 "
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span className="material-icons-outlined text-gray-400">
                            bookmark_border
                        </span>
                        <div className="flex gap-x-2">
                            {labelsClasses.map((lblClass, i) => (
                                <span
                                    key={i}
                                    onClick={() => setSelectedLabel(lblClass)}
                                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                >
                                    {selectedLabel === lblClass && (
                                        <span className="material-icons-outlined text-white text-sm">
                                            check
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
}