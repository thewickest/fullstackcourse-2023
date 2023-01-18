const Header = ({name}) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  /**Exercise 2.3 already done */
  const total = parts.reduce((total, p) => total + p.exercises, 0) //in a moment
  return (
    <div>
      {parts.map(p => <Part key= {p.id} part={p} />)}
      <Total total={total} />
    </div>
  )
}

const Total = ({total}) => {
  return (
    <>
      <p><b>total of exercises {total}</b></p>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App;
