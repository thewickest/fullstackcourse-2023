import {useState, useEffect} from 'react'
import countriesService from './services/countries'
import Country from './components/Country'
import {Fragment} from 'react'

const Weather = ({weather}) => {
  if(weather) {
    return (
      <div>
        <h2>{`Weather in ${weather.name}`}</h2>
        <p>temperature {Number(weather.main.temp-273).toFixed(2)} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>wind {Number(weather.wind.speed).toFixed(2)} m/s</p>
      </div>
    )
  }
}

const CountryList = ({countries, weather, handleButton}) => {
  if(countries.length >10) {
    return(<><br />Too many matches, specify another filter</>)
  }
  else if(countries.length <=10 && countries.length > 1) {
    return (countries.map(n => 
      <Fragment key={n.cca2}>
        <br/>{n.name.common}
        <button onClick={() => handleButton(n)}>show</button>
      </Fragment>
    ))
  }
  else if (countries.length == 1) {
    return (
      <>
        <Country country={countries[0]} />
      </>
    )
  }
}

const App = () =>{
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [showingCountries, setShowingCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState({})
  const [weather, setWeather] = useState(null)

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

    if(filteredCountries.length == 1) {
      setCurrentCountry(filteredCountries[0])
      countriesService
        .getWeather(filteredCountries[0].latlng[0],filteredCountries[0].latlng[1])
        .then(data => 
          setWeather(data)
        )
    }else {
      setCurrentCountry({})
      setWeather(null)
    }
    setShowingCountries(filteredCountries)
    setValue(event.target.value)
  }

  const handleButton = (c) => {
    setShowingCountries([c])
    countriesService
        .getWeather(c.latlng[0],c.latlng[1])
        .then(data => 
          setWeather(data)
        )
  }

  return (
    <div>
      find countries: <input value={value} onChange={handleValue}/>
      <CountryList 
        countries={showingCountries}
        handleButton={handleButton}
       />
      <Weather weather={weather} />
    </div>
  )
}

export default App;
