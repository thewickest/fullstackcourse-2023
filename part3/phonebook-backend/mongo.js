const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}else if(process.argv.length >= 3){
  const password = process.argv[2]

  const url =
  `mongodb+srv://graubuntu:${password}@cluster0.yttzt.mongodb.net/personApp?retryWrites=true&w=majority`

  mongoose.set('strictQuery',false)
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  if(process.argv.length === 3) {
    Person.find({}).then(result => {
      result.map(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
  }else{
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
      name: name,
      number: number,
    })

    person.save().then(() => {
      console.log('note saved!')
      mongoose.connection.close()
    })
  }
}