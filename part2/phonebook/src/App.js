import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [filteredPeople, setFilteredPeople] = useState(people)

  //get people
  useEffect(()=>{
    axios
      .get('http://localhost:3001/people')
      .then(response => {
        setPeople(response.data)
        setFilteredPeople(response.data)
      })
  },[])

  //create person
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson ={ name: newName, number: newNumber }
    const fp = people.filter(p => p.name === newName)
    if(fp.length > 0) alert(`${newName} already added to the notebook`)
    else {
      axios
        .post('http://localhost:3001/people',newPerson)
        .then(response => {
          setPeople(people.concat(response.data))
          setFilteredPeople(filteredPeople.concat(response.data))
        })
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
      <Filter value={filteredName} onChange={filterName} />
      <h2>add a new</h2>
      <Form onSubmit={addPerson}
            name={{value:newName, handler: handleName}}
            number={{value:newNumber,handler:handleNumber}}/>
      <h2>Numbers</h2>
      <People people={filteredPeople} />
    </div>
  )
}

export default App