import { useState } from 'react'

const Header = ({text}) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const Button = ({handleClick, name}) => {
  return (
    <>
      <button onClick={handleClick}>{name}</button>
    </>
  )
}

const Anecdote = ({anecdote}) => {
  return (
    <>
      <p>{anecdote}</p>
    </>
  )
}

const Rating = ({rate}) => {
  return (
    <>
      <p>has {rate} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))
  const [moreLiked, setMoreLiked] = useState(0)

  const getRandom = () => {
    let random = Math.floor(Math.random()*7)
    setSelected(random)
  }
  const rate = (selected) => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    if(newVotes[selected] > newVotes[moreLiked]) {
      setMoreLiked(selected)
    }
    setVotes(newVotes)
  }
  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Anecdote anecdote={anecdotes[selected]}/>
      <Rating rate={votes[selected]}/>
      <Button handleClick={()=> rate(selected)} name="vote"/>
      <Button handleClick={()=> getRandom()} name="next anecdote"/>
      <Header text="Anecdotes with most votes"/>
      <Anecdote anecdote={anecdotes[moreLiked]}/>
      <Rating rate={votes[moreLiked]}/>
    </div>
  )
}

export default App