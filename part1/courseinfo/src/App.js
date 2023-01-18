const Header = ({name}) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Subheader = ({name}) => {
  return (
    <>
      <h2>{name}</h2>
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
    <div>
      <Subheader name={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
    <Header name={"Web development curriculum"} />
    {courses.map(c => <Course course={c} />)}
    </>
  )
}

export default App;
