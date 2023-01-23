const People = ({people, handler}) => {
    return (
      <>
        {people.map(n => 
          <li key={n.name}>
            {n.name} {n.number}
            <button id={n.id} name={n.name} onClick={handler}>Delete</button>
          </li>)}
      </>
    )
}

export default People