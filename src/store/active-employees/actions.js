import axios from "axios";

export async function getActiveEmployees(context) {
  try {
    const response = await axios.get('http://localhost:8080/api/employees')
    context.commit('setEmployees', response.data)
    return response
  } catch (err) {
    console.log(err);
    context.commit('setPageStatus', err)
  }
}
export async function getSearchedEmployees(context, payload) {
  console.log('search data: ', payload)
  try {
    const response = await axios.post('http://localhost:8080/api/search_employees', payload)
    console.log('searched employees: ', response.data)
    context.commit('setSearchedEmployees', response.data)
    context.commit('setResultForStateFilter', response.data)
    return response
  } catch (err) {
    console.log(err);
    context.commit('setSearchStatus', err)
  }
}
export async function getEmployeeProfile(context, payload) {
  console.log('employee by id: ', payload)
  try {
    const response = await axios.get(`http://localhost:8080/api/employee/${payload}`)
    console.log('employee profile: ', response.data)
    context.commit('setEmployeeProfile', response.data)
    return response.data[0]
  } catch (err) {
    console.log(err);
    context.commit('setSearchStatus', err)
  }
}