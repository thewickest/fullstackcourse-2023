import { useState } from 'react'

const People = ({people}) => {
  return (
    <>
      {people.map(n => <li key={n.name}>{n.name} {n.number}</li>)}
    </>
  )
}

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [filteredPeople, setFilteredPeople] = useState(people)

  const addPerson = (event) => {
    event.preventDefault()
    const fp = people.filter(p => p.name === newName)
    if(fp.length > 0) alert(`${newName} already added to the notebook`)
    else {
      setPeople(people.concat({name: newName, number: newNumber}))
      setFilteredPeople(people.concat({name: newName, number: newNumber}))
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
      filter show with <input value={filteredName} onChange={filterName}/>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleName}/></div>
        <div>number: <input value={newNumber} onChange={handleNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People people={filteredPeople} />
    </div>
  )
}

export default App