import { useState } from 'react'

const Header = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Button = ({onClick, name}) => {
  return (
    <>
    <button onClick={onClick}>{name}</button>
    </>
  )
}

const Statistic = ({name, number}) => {
  if(name==="positive"){
    return(<p>{name} {number} %</p>)
  }else {
    return(<p>{name} {number}</p>)
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getTotal = () => {
    return bad+good+neutral
  }

  return (
    <div>
      <Header name="Give feedback"/>
      <Button onClick={()=> setGood(good + 1)} name="good"/>
      <Button onClick={()=> setNeutral(neutral + 1)} name="neutral"/>
      <Button onClick={()=> setBad(bad + 1)} name="bad"/>
      <Header name="Statistics"/>
      <Statistic name="good" number={good}/>
      <Statistic name="neutral" number={neutral}/>
      <Statistic name="bad" number={bad}/>
      <Statistic name="all" number={getTotal()}/>
      <Statistic name="average" number={(good-bad)/getTotal()}/>
      <Statistic name="positive" number={(good/getTotal()*100)}/>
    </div>
  )
}

export default App