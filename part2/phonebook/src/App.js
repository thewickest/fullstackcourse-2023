import { useState } from 'react'

const Persons = ({persons}) => {
  return (
    <>
      {persons.map(n => <li key={n.name}>{n.name} {n.number}</li>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '55374-7473'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const filteredPersons = persons.filter(p => p.name === newName)
    if(filteredPersons.length > 0) alert(`${newName} already added to the notebook`)
    else {setPersons(persons.concat({name: newName, number: newNumber}))}
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleName}/></div>
        <div>number: <input value={newNumber} onChange={handleNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App