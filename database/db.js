const mongoose = require("mongoose");
const dontenv = require(dotenv);

dotenv.config();
const mongouri = process.env.MONGO_URI;

const connectDatabase = () => {
	mongoose.set('strictQuery', false);
	mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("database connected successfully");
	})
}

module.exports = connectDatabase;