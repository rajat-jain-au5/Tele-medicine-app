//import { doctor } from "../../../backend/Controllers/DoctorController";

const intialState = {
    patientData : []
}

 export default function (state = intialState, action) {
       let stateCopy = JSON.parse(JSON.stringify(state)) 
       switch (action.type) {
             case "patient_booking":
                  stateCopy.patientData = action.payload.booking
                  return stateCopy
             
             default:
                   return state;
       }
 }