import React, { useState, useEffect } from 'react'
//local imports
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
//import apis
import { fetchPersons,createPerson,deletePerson, updatePerson } from './api/persons'
//import notifications
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [ search, setSearch] = useState('')
  const [ message, setMessage] = useState('')
  const [ type, setType] = useState('')

  useEffect(
    ()=>{
      fetchPersons()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
      
    },[]
  )
 
  const handleAdd = (event) => {
    event.preventDefault()
    const personExists = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
    if(personExists){
      const confirm = window.confirm(`${newName} is already in the phonebook, do you want update the phone number?`)
      if (confirm){
        const personUpdate =  {...personExists, number: newPhone}
        updatePerson(personUpdate)
          .then((returnedPerson)=>{
            setMessage('The operation was successful')
            setType('info')

            setTimeout(() => {
              setMessage(null)
            }, 2000)
            setPersons(
              persons.map(person => person.id !== personExists.id ? person : returnedPerson)
            )
            clear()
          })
          .catch((error)=>{
            setMessage(error.message)
            setType('error')

            setTimeout(() => {
              setMessage(null)
            }, 2000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newPhone
      }
      
      createPerson(personObject)
        .then((returnedPersons) =>{
          
          setMessage('The operation was successful')
          setType('success')

          setTimeout(() => {
            setMessage(null)
          }, 2000)
          setPersons([...persons,returnedPersons])
          clear()
  
  
        })
        .catch((error)=>{
          
          setMessage(error.message)
          setType('error')

          setTimeout(() => {
            setMessage(null)
          }, 2000)
          
        })
      
      clear()

    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  //delete person
  const handleDelete = (person) => {
    if ( window.confirm(`You sure you want to delete ${person.name} ?`)) {
      deletePerson(person.id).then(() => {
        setMessage('The operation was successful')
        setType('warning')

        setTimeout(() => {
          setMessage(null)
        }, 2000)
        setPersons(persons.filter((p) => p.id !== person.id));
      })
      .catch((error) =>{
        console.log(error)
      })

    }
  }
  
  const clear = () => {
    setNewName('')
    setNewPhone('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
     
      <Filter search={search} handleSearchChange={handleSearchChange}/>
      <h2>Add a New</h2>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        handleAdd={handleAdd}
      />
      <h2>Numbers</h2>
      {
        persons && ( <Persons persons={persons} search={search} handleDelete={handleDelete}/>)
      }
       
      
    </div>
  )
}

export default App

