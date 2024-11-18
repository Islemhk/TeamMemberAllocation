import { useState,useEffect} from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"
import Employees from "./Employees"
import employeData from "./EmployeData"
import GroupedTeamMembers from "./GroupedTeamMembers"
import Nav from "./Nav"
import NotFound from './NotFound'
function App() {
  const [selectedTeam,setSelectedTeam]=useState(JSON.parse(localStorage.getItem("SelectedTeam")) || "TeamA")
  const [employees,setEmployees] =useState(JSON.parse(localStorage.getItem("employeeList")) || employeData)

  useEffect(()=>{
    localStorage.setItem('employeeList',JSON.stringify(employees))
  },[employees])
  
  useEffect(()=>{
    localStorage.setItem('SelectedTeam',JSON.stringify(selectedTeam))
    console.log(JSON.parse(localStorage.getItem("SelectedTeam")))
  },[selectedTeam])
  function handleTeamSelectionChange(event){
      const {value,name} = event.target
      console.log(value)
      setSelectedTeam(value)
  }
  function handleEmployeeCradClick(event){
      
      const transformedEmployees=employees.map((employe)=>
          employe.id==parseInt(event.currentTarget.id)
          ?employe.teamName==selectedTeam
          ?{...employe,teamName:""}
          :{...employe,teamName:selectedTeam}
          :employe
      )
      setEmployees(transformedEmployees)
  }
  
  
  
  return (
    <Router>
      <Nav/>
      <Header selectedTeam={selectedTeam}
              teamMemeberCount={employees.filter((employe)=>employe.teamName==selectedTeam).length}
              />
      <Routes>
        <Route path="/"
          element={
          <Employees 
            employees={employees}
            selectedTeam={selectedTeam}
            handleTeamSelectionChange={handleTeamSelectionChange}
            handleEmployeeCradClick={handleEmployeeCradClick}
            />
            }></Route>
        <Route path='/GroupedTeamMembers' element={<GroupedTeamMembers 
                        employees={employees} 
                        selectedTeam={selectedTeam}
                        setTeam={setSelectedTeam}
                        />}> </Route>     
        <Route path='*' element={<NotFound/>}> </Route>      

      </Routes>
      <Content/>
      <Footer/>
    </Router>
  )
}

export default App
