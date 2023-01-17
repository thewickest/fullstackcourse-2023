const Hello = (props) => (
  <div>
    <p>Hello World {props.name}</p>
  </div>
)


const App = () => {
  return (
    <div>
    <p>Greetings</p>
    <Hello name='George'/>
    <Hello name='Daisy'/>
  </div>
  )
}

export default App;
