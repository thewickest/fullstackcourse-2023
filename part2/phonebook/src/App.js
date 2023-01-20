import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'
import peopleService from './services/people'
import Notification from './components/Notification'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [filteredPeople, setFilteredPeople] = useState(people)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(()=>{
    peopleService
      .getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
        setFilteredPeople(initialPeople)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    let newPerson ={ name: newName, number: newNumber }
    const fp = people.filter(p => p.name === newName)
    if(fp.length > 0) {
      if(window.confirm(`${newName} is already added to the notebook, replace the old number with a new one?`)){
        newPerson = {...fp[0]}
        peopleService
          .update({...newPerson, number: newNumber})
          .then(updatedPerson => {
            setNotificationMessage(`${newName} updated`)
            setTimeout(()=>setNotificationMessage(null), 5000)
            setPeople(people.map(p => p.name != newName ? p : updatedPerson))
            setFilteredPeople(filteredPeople.map(p => p.name != newName ? p : updatedPerson))
          })
          .catch(error => {
            console.log(error);
          })

      }
    }
    else {
      peopleService
        .create(newPerson)
        .then(createdPerson => {
          setNotificationMessage(`${newName} added`)
          setTimeout(()=>setNotificationMessage(null), 5000)
          setPeople(people.concat(createdPerson))
          setFilteredPeople(filteredPeople.concat(createdPerson))
        })
    }
  }

  const deletePerson = (event) => {
    const id = event.target.id
    const name = event.target.name
    if(window.confirm(`Delete ${name}?`)){
      peopleService
        .remove(id)
        .then((response => {
          setPeople(people.filter(p => p.id != id))
          setFilteredPeople(filteredPeople.filter(p => p.id != id))
        }))
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filterName = (event) => {
    const fp = people.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase())) //
    setFilteredName(event.target.value)
    setFilteredPeople(fp)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter value={filteredName} onChange={filterName} />
      <h2>add a new</h2>
      <Form onSubmit={addPerson}
            name={{value:newName, handler: handleName}}
            number={{value:newNumber,handler:handleNumber}}/>
      <h2>Numbers</h2>
      <People people={filteredPeople} handler={deletePerson}/>
    </div>
  )
}

export default App