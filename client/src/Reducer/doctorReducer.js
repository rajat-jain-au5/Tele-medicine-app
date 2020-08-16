//import { doctor } from "../../../backend/Controllers/DoctorController";

const intialState = {
   search:[],
   selecteddoctor : {},
   booking : {},
   cBooking : {status : false},
   docSlot: {slot_1 : {status: "false"},slot_2 : {status: "false"},slot_3 : {status: "false"},slot_4 : {status: "false"},slot_5 : {status: "false"},slot_6 : {status: "false"}}
}

export default function (state = intialState, action) {
      let stateCopy = JSON.parse(JSON.stringify(state)) 
      switch (action.type) {
            case "Search_Speciality":
             stateCopy.search= action.payload
             return stateCopy
             case "select_doctor":
                  stateCopy.selecteddoctor= action.payload
                  return stateCopy
            case "slots":
                  stateCopy.docSlot = action.payload
            return stateCopy
            case "doc_booking":
                  stateCopy.booking= action.payload
            return stateCopy
            case "confirm_booking":
                  stateCopy.cBooking= action.payload
            return stateCopy
            default:
                  return state;
      }
}