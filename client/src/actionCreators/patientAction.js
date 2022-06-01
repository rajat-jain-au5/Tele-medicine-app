import axios from 'axios'
export function patientBooking(){
    return function(dispatch){
        return axios.get("http://localhost:3010/getbooking",
        {
            headers: {
                  "x-auth-token": window.localStorage.getItem("patientAuth"),
            }
         }).then(({data}) => {
            console.log("pateint action 14",data)
            dispatch({ type: "patient_booking", payload: data });
         })
         .catch(({ err }) => {
            console.log(err);
        });
    }
}