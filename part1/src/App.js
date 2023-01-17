const Hello = ({name,age}) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - age
  }

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}


const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <div>
    <p>Greetings</p>
    <Hello name='Maya' age={26+10}/>
    <Hello name={name} age={age}/>
  </div>
  )
}

export default App;
