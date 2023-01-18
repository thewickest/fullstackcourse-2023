import { useState } from 'react'

const Numbers = ({numbers}) => {
  return (
    <>
      {numbers.map(n => <li key={n.name}>{n.name}</li>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const filteredPersons = persons.filter(p => p.name === newName)
    if(filteredPersons.length > 0) alert(`${newName} already added to the notebook`)
    else {setPersons(persons.concat({name: newName}))}
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers numbers={persons} />
    </div>
  )
}

export default App