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

export default Course