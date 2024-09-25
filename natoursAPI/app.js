const express = require('express');
const fs = require('fs');


const port = process.env.PORT || 3000
const app = express();

app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours',(req,res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
             tours
        }
    })
})

app.post('/api/v1/tours',(req,res) => {
    const tourId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({id: tourId},req.body);
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours,null,2),error => {
        if(error){
            res.status(500).json({message: error.message})
        }
        res.status(201).json(newTour)
    })
})


app.listen(port,()=> console.log(`Server running...PORT: ${port}`))