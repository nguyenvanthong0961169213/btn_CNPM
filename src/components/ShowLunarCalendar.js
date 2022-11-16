import React, { useContext, useState } from "react";
import { check_flag_show_lunar } from "..";
import GlobalContext from "../context/GlobalContext";


export default function ShowLunarCalendar() {
    const [check, setCheck] = useState(false)

    const setShow = () => {
      setCheck(!check)
      check_flag_show_lunar(!check)
    }
    // const { ShowLunar, updateShowLunar } = useContext(GlobalContext);
    return (
      <React.Fragment>
        <p className="text-gray-500 font-bold mt-10">ShowLunar</p>
        <input
              id="myCheckbox"
              type="checkbox"
              className={`form-checkbox h-5 w-5 rounded focus:ring-0 cursor-pointer`}
              value={check}
              onChange={setShow}
            />
         <span className="text-gray-700 ml-2">Show</span>   
         
      </React.Fragment>
    );
  }

// export function setShow(){
//        const checkbox = document.getElementById('myCheckbox')
//        checkbox.addEventListener('change', (event) => {
//         console.log('click')
//             if (event.currentTarget.checked) {
//               check_flag_show_lunar(true)
//             } else {
//               check_flag_show_lunar(false)
//             }
//         })
// }  