import {useState} from 'react'
import Employees from './Employees'
const GroupedTeamMembers= (props)=>{
    const [groupedEmployees,setGroupedData] =useState(groupTeamMembers())

    function groupTeamMembers(){
        var teams=[]
        var teamAMembers=props.employees.filter((employee)=>employee.teamName=="TeamA")
        var teamA={team:'TeamA',members:teamAMembers,collapsed:props.selectedTeam=="TeamA"?false:true}
        teams.push(teamA)

        var teamBMembers=props.employees.filter((employee)=>employee.teamName=="TeamB")
        var teamB={team:'TeamB',members:teamBMembers,collapsed:props.selectedTeam=="TeamB"?false:true}
        teams.push(teamB)

        var teamCMembers=props.employees.filter((employee)=>employee.teamName=="TeamC")
        var teamC={team:'TeamC',members:teamCMembers,collapsed:props.selectedTeam=="TeamC"?false:true}
        teams.push(teamC)

        var teamDMembers=props.employees.filter((employee)=>employee.teamName=="TeamD")
        var teamD={team:'TeamD',members:teamDMembers,collapsed:props.selectedTeam=="TeamD"?false:true}
        teams.push(teamD)
        return teams
    }

    function handleTeamClick(event){
         var newGroupData=groupedEmployees.map((groupedData)=>groupedData.team==event.currentTarget.id
                                                            ?{...groupedData,collapsed:!groupedData.collapsed}
                                                            :groupedData)
        setGroupedData(newGroupData)
        props.setTeam(event.currentTarget.id)
        
    }

    return(
        <header className="container">
            <main>
                {
                    groupedEmployees.map((item)=>{
                        return(
                            <div key={item.team} className='card mt-2' style={{cursor:"pointer"}}>
                                <h4 id={item.team} className='card-header text-secondary' onClick={handleTeamClick}>
                                    Team Name:{item.team}
                                </h4>
                                {item.collapsed&&<div id={'collapse_'+item.team} 
                                className={item.collapsed?"collapsed":""}>
                                    <hr />
                                    {
                                        item.members.map(member=>{
                                            return(
                                                <div className='mt-2'>
                                                    <h5 className='card-title mt-2'>
                                                        <span className='text-dark'>Full Name:</span>{member.fullName}
                                                        </h5>
                                                    <p className='mt-2'>Designation: {member.designation}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>}
                            </div>
                        )
                    })
                }
            </main>
        </header>
    ) 
}

export default GroupedTeamMembers