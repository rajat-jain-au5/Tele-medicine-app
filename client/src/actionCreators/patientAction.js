import axios from 'axios'
export function patientBooking(){
    return function(dispatch){
        return axios.get("/getbooking",
        {
            headers: {
                  "x-auth-token": window.localStorage.getItem("patientAuth"),
            }
         }).then(({data}) => {
            dispatch({ type: "patient_booking", payload: data });
         })
         .catch(({ err }) => {
            console.log(err);
        });
    }
}