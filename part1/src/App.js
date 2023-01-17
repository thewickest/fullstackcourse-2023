import { useState } from 'react'

const Display = ({counter}) => (<div>{counter}</div>)

const Button = ({name, onClick}) => (<button onClick={onClick}>{name}</button>)

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const decreaseByOne = () => setCounter(counter - 1)
  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      <Button onClick={decreaseByOne} name={"minus"}/>
      <Button onClick={setToZero} name={"zero"}/>
      <Button onClick={increaseByOne} name={"plus"}/>
    </div>
  )
}

export default App