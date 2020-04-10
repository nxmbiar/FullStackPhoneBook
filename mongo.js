const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Add password')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://nambiar:${password}@cluster0-dhvjz.mongodb.net/phone-app?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

console.log('Connected')
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
console.log('Schema made')

const Person = mongoose.model('Person',personSchema)
console.log('Model made')

if(process.argv.length === 3){
    console.log('phonebook')
    Person.find({}).then(result => {
        result.forEach(person => console.log(person.name, person.number))
        mongoose.connection.close()
    })
}
else if(process.argv.length === 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(person, ' added')
        mongoose.connection.close()
    })
}