const mongoose = require("mongoose")

module.exports = () => {
    
    const connectionParams = {
        useNewUrlParser : true,
        useUnifiedTopology : true
    };

    try {
        mongoose.connect(process.env.MONGO_CONNECT,connectionParams);
        console.log("connected to DB successfully");
    }catch(error){
        console.log(`could not connect to the Database ... ${error}`);
    }

}