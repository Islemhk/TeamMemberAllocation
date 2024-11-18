import { useState } from "react"
import femaleProfile from "./assets/femaleProfile.jpg"
import maleProfile from "./assets/maleProfile.jpg"

const Employees= (props)=>{
   
   const styles={
        border:"4px solid #000"
   }
    const employesArray=props.employees.map((employe)=>{
        return (
            <div key={employe.id} id={employe.id} className="card m-2" style={employe.teamName==props.selectedTeam?styles:undefined} onClick={props.handleEmployeeCradClick}>
                <img src={employe.gender=="male"?maleProfile:femaleProfile} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{employe.fullName}</h5>
                    <p className="card-text">{employe.designation}</p>
                </div>
            </div>
        )
    })


    return(
        <main className="container">
            <div className="row justify-content-center mt-3 mb-3">
                <div className="col-8">
                    <select className="form-select form-select-lg" value={props.selectedTeam} onChange={props.handleTeamSelectionChange}>
                        <option value="TeamA">TeamA</option>
                        <option value="TeamB">TeamB</option>
                        <option value="TeamC">TeamC</option>
                        <option value="TeamD">TeamD</option>

                    </select>
                </div>
            </div>

            <div className="row justify-content-center mt-3 mb-3">
                <div className="col-8">
                    <div className="card-collection">
                        {employesArray}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Employees