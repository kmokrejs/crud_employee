import './App.css';
import { useState } from 'react'
import React  from 'react';
import Axios from 'axios'

function App() {

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [position, setPosition] = useState('')
  const [country, setCountry] = useState('')
  const [wage, setWage] = useState('')

  const [employeeList, setEmployeeList] = useState([])
  const [newWage, setNewWage] = useState(0)
  

  const displayInfo = () => {
    console.log(name, age, position, country, wage)
    setName('')
    setAge('')
    setPosition('')
    setCountry('')
    setWage('')
  }

  const addEmployee = () =>  {
    Axios.post('http://localhost:3001/create', 
    {name: name, 
      age: age, 
      country: country, 
      position: position, 
      wage: wage}).then(() => {
        setEmployeeList([...employeeList, {
          name: name, 
          age: age, 
          country: country, 
          position: position, 
        }])
      })
    
    displayInfo()
  }

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {setEmployeeList(response.data)})
  }

  const updateEmployee = (id) => {
    Axios.put('http://localhost:3001/update', 
    {
      wage: newWage,
      id: id,
    }).then( (response) => {
      setEmployeeList( 
        employeeList.map((value) => {
        return value.id === id ? {id: value.id, name: value.name, age: value.age, country: value.country, position: value.position, wage: newWage} : value
      }))
    })
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then( (response) => {
      setEmployeeList(
        employeeList.filter( (val) => {
          return val.id !== id;
        })
      )} 
    )
  }

  return (
    <div className="App">
      <div className="wrapper_info">
        <label >Name:</label>
        <input type="text" value={name} onChange={ (event) => {
          setName(event.target.value);
          }}/>

        <label>Age:</label>
        <input type="number" value={age} onChange={ (event) => {
          setAge(event.target.value);
          }}/>

        <label>Position:</label>
        <input type="text" value={position} onChange={ (event) => {
          setPosition(event.target.value);
          }}/>

        <label>Country:</label>
        <input type="text" value={country} onChange={ (event) => {
          setCountry(event.target.value);
          }}/>

        <label>Wage:</label>
        <input type="number" value={wage} onChange={ (event) => {
          setWage(event.target.value);
          }}/>

        <button onClick={addEmployee}>Add Employee</button>

        

      </div>
      <hr />

      <div className='showEmp'>
        <div>
          <button onClick={getEmployees}>Show employees</button>
        </div>
        
        <div className='empList'>
        {employeeList.map((value,key) =>  {
          return(
            
              <div className='oneEmployee'> 
                <div className='infoBasic'>
                  <h4>{value.name}</h4>
                  <p>{value.age} y.o.</p>
                </div>

                <div className='moreInfo'>
                  <p>Position: {value.position}</p>
                  <p>Wage: {value.wage} $</p>
                </div>

                <div className='update'>
                  <input type="number" placeholder='type number...' onChange={ (event) => {setNewWage(event.target.value)}} />

                  <button onClick={() => updateEmployee(value.id)}>Update</button>

                  <button onClick={ () => deleteEmployee(value.id)}>Delete</button>
                </div>
                
              </div>
      
          )
        })}
        </div>
      </div>
      
      
      
    </div>
  );
}

export default App;
