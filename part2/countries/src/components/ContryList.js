import {Fragment} from 'react'

const Image = ({id}) => {
  const imgUrl = 'https://flagcdn.com/w320/'
  return (
    <img src={`${imgUrl}/${id.toLocaleLowerCase()}.png`} />
  )
}

const Languages = ({languages}) => {
  const entries = Object.entries(languages) //[ ['eng','English], ['fra', 'French'] ]
  return (
    <div>
      <p><b>languages:</b></p>
      {entries.map(e => 
        <li key={e[0]}>{e[1]}</li>
      )}
    </div>
  )
}

const BasicInfo = ({country}) => (
  <>
    <h1>{country.name.common}</h1>
    capital {country.capital} <br />
    area {country.area} <br />
  </>
)

const Country = ({country}) => (
  <div>
    <BasicInfo country={country} />
    <Languages languages={country.languages} />
    <Image id={country.cca2} />
  </div>
)

const CountryList = ({countries, handleButton}) => {
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
    return (<Country country={countries[0]} />)
  }
}

export default CountryList