import {useState, useEffect} from 'react'
import countriesService from './services/countries'
import CountryList from './components/ContryList'

const App = () =>{
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [showingCountries, setShowingCountries] = useState([])

  //getAll
  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
          setCountries(initialCountries)
        }
      )
    },[])

  const handleValue = (event) => {
    const filteredCountries = countries
      .filter(c => c.name.common.toLowerCase().includes(event.target.value.toLocaleLowerCase()))
    setShowingCountries(filteredCountries)
    setValue(event.target.value)
  }

  return (
    <div>
      find countries: <input value={value} onChange={handleValue}/>
      <CountryList countries={showingCountries} />
    </div>
  )
}

export default App;
