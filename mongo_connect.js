///////////////////////
//DATABASE CONNECTION//
///////////////////////

// establish connection
mongoose.connect(DATABASE_URL)

// connection events
mongoose.connection
    .on('open', () => console.log('you are connected to mongoose'))
    .on('close', () => console.log('you are not connected to mongoose'))
    .on('error', (error) => console.log(error))