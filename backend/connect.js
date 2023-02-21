const { default: mongoose } = require("mongoose")
mongoose.set("strictQuery", false)

const connectDB = (uri) => {
    return mongoose.connect(uri).catch((err) => console.log(err))
}


module.exports = connectDB