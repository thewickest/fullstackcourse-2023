const People = ({people}) => {
    return (
      <>
        {people.map(n => <li key={n.name}>{n.name} {n.number}</li>)}
      </>
    )
}

export default People