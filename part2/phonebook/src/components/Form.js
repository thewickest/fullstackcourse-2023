const Form = ({onSubmit, name, number }) => {
    return (
        <form onSubmit={onSubmit}>
        <div>name: <input value={name.value} onChange={name.handler}/></div>
        <div>number: <input value={number.value} onChange={number.handler}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form