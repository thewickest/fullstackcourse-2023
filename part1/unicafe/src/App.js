import { useState } from 'react'

const Header = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

/**We have already refactored the button */
const Button = ({onClick, name}) => {
  return (
    <>
    <button onClick={onClick}>{name}</button>
    </>
  )

}
/**We have already refactored the Statistic */
const Statistic = ({name, number}) => {
  if(name==="positive"){
    return(
      <tr>
        <td>{name}</td><td>{number} %</td>
      </tr>
    )
  }else {
    return(
      <tr>
        <td>{name}</td><td>{number}</td>
      </tr>
    )
  }
}

const Statistics = ({good,neutral,bad, total}) => {
  if(total >0) {
    return (
      <table>
        <Statistic name="good" number={good}/>
        <Statistic name="neutral" number={neutral}/>
        <Statistic name="bad" number={bad}/>
        <Statistic name="all" number={total}/>
        <Statistic name="average" number={(good-bad)/total}/>
        <Statistic name="positive" number={(good/total*100)}/>
      </table>
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getTotal = () => bad+good+neutral

  return (
    <div>
      <Header name="Give feedback"/>
      <Button onClick={()=> setGood(good + 1)} name="good"/>
      <Button onClick={()=> setNeutral(neutral + 1)} name="neutral"/>
      <Button onClick={()=> setBad(bad + 1)} name="bad"/>
      <Header name="Statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} total={getTotal()}/>
    </div>
  )
}

export default App