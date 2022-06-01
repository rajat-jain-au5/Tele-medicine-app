import axios from 'axios'
//import DocBooking from '../component/DocBooking';
export function searchSpeciality(search) {
      // console.log(search)
      return function (dispatch) {
            return axios
                  .get(`http://localhost:3010/doctor/${search}`,
                        {
                              headers: {
                                    "x-auth-token": window.localStorage.getItem("patientAuth"),
                              },
                        }
                  )
                  .then(({ data }) => {

                        dispatch({ type: "Search_Speciality", payload: data });
                  })
                  .catch(({ err }) => {
                        console.log(err);
                  });
      };
}

export function selectDoctor(id) {
      return function (dispatch) {
            return axios
                  .post(`http://localhost:3010/selectdoctor`, { myId: id },
                        {
                              headers: {
                                    "x-auth-token": window.localStorage.getItem("patientAuth"),
                              }
                        }
                  )
                  .then(({ data }) => {
                        dispatch({ type: "select_doctor", payload: data });
                  })
                  .catch(({ err }) => {
                        console.log(err);
                  });
      };
}

export function docSlott(data, id) {
      let dateStr = data.toLocaleDateString()
      return function (dispatch) {
            return axios.post("http://localhost:3010/docslot", { date: dateStr, docId: id },
                  {
                        headers: {
                              "x-auth-token": window.localStorage.getItem("patientAuth"),
                        }
                  }).then(({ data }) => {
                        if(data[0]){ dispatch({ type: "slots", payload: data[0] })}
                        else {dispatch({ type: "slots", payload: {slot_1 : {status : "false"},slot_2:{status : "false"},slot_3:{status : "false"},slot_4: {status : "false"},slot_5 :{status :  "false"},slot_6: {status : "false"}} })}
                        
                  }).catch(({ err }) => {
                        console.log(err)
                  })
      }
}

export function bookSlot(id, data) {
      data.docId = id
      data.date = data.date.toLocaleDateString()
      switch (data.slot) {
            case "slot_1":
                  data.slot_1 = true
                  return function(dispatch){
                        return axios.post("http://localhost:3010/bookslot", data,
                              {
                                    headers: {
                                          "x-auth-token": window.localStorage.getItem("patientAuth"),
                                    }
                              }).then(({ data }) => {
                                    dispatch({ type: "confirm_booking", payload: { status : true} })
                                    console.log("data at response", data)
                                    //return data
                              }).catch(({ err }) => {
                                    console.log(err)
                              })
                  }
                  //break;
            case "slot_2":
                  data.slot_2 = true
                  return function(dispatch){
                        return axios.post("http://localhost:3010/bookslot", data,
                              {
                                    headers: {
                                          "x-auth-token": window.localStorage.getItem("patientAuth"),
                                    }
                              }).then(({ data }) => {
                                    dispatch({ type: "confirm_booking", payload: { status : true} })
                                    //return data
                              }).catch(({ err }) => {
                                    console.log(err)
                              })
                  }
                  //break;

            case "slot_3":
                  data.slot_3 = true
                  return function(dispatch){
                        return axios.post("http://localhost:3010/bookslot", data,
                              {
                                    headers: {
                                          "x-auth-token": window.localStorage.getItem("patientAuth"),
                                    }
                              }).then(({ data }) => {
                                    dispatch({ type: "confirm_booking", payload: { status : true} })
                                    //return data
                              }).catch(({ err }) => {
                                    console.log(err)
                              })
                  }
                  //break;
            case "slot_4":
                  data.slot_4 = true
                  return function(dispatch){
                        return axios.post("http://localhost:3010/bookslot", data,
                              {
                                    headers: {
                                          "x-auth-token": window.localStorage.getItem("patientAuth"),
                                    }
                              }).then(({ data }) => {
                                    dispatch({ type: "confirm_booking", payload: { status : true} })
                                    //return data
                              }).catch(({ err }) => {
                                    console.log(err)
                              })
                  }
                  //break;
            case "slot_5":
                  data.slot_5 = true
                  return function(dispatch){
                        return axios.post("http://localhost:3010/bookslot", data,
                              {
                                    headers: {
                                          "x-auth-token": window.localStorage.getItem("patientAuth"),
                                    }
                              }).then(({ data }) => {
                                    dispatch({ type: "confirm_booking", payload: { status : true} })
                                    //return data
                              }).catch(({ err }) => {
                                    console.log(err)
                              })
                  }
                  //break;
            case "slot_6":
                  data.slot_6 = true
                  return function(dispatch){
                        return axios.post("http://localhost:3010/bookslot",data,
                              {
                                    headers: {
                                          "x-auth-token": window.localStorage.getItem("patientAuth"),
                                    }
                              }).then(({ data }) => {
                                    console.log("doctorAction", data)
                                    dispatch({ type: "confirm_booking", payload: { status : true} })
                              }).catch(({ err }) => {
                                    console.log(err)
                              })
                  }
                  //break;
            default:
                        

      }
}

export function docBooking(data){
      let data_1 = {date : data}
      return function (dispatch) {

           return axios.post("http://localhost:3010/booking", data_1, {
            headers: {
                  "x-auth-token": window.localStorage.getItem("doctorAuth"),
            }
      }).then(({ data }) => {
            dispatch({ type: "doc_booking", payload: data })
            
      }).catch(({ err }) => {
            console.log(err)
      })
}
}