const express = require('express');
const app = express();
const awsRouter = require('./routes/aws.router.js')
const PORT = process.env.PORT || 5001;
const cors = require('cors');


/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));
app.use(cors());

/** ---------- ROUTES ---------- **/
app.use('/api/aws', awsRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
