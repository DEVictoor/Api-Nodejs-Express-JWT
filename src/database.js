import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/companydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true       esta opcion ya no esta soportada
    // useFindAndModify: true,    esta opcion ya no esta soportada
})
    .then(db => console.log('Db is connected'))
    .catch(error  => console.log(error) )