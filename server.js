const fs = require('fs');
const reviews = require('./db/reviews.json');
const express = require('express');
// Helper method for generating unique ids
// commented out const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET request for reviews
app.get('/api/reviews', (req, res) => {
  // Log our request to the terminal
  console.info(`${req.method} request received to get reviews`);
  
  fs.readFile('./db/reviews.json', 'utf8', (err, data) => {
    const reviews = JSON.parse(data);
    res.json(reviews);
  });

});

// GET request for a single review
app.get('/api/reviews/:review_id', (req, res) => {
  if (req.body && req.params.review_id) {
    console.info(`${req.method} request received to get a single a review`);
    const reviewId = req.params.review_id;
    for (let i = 0; i < reviews.length; i++) {
      const currentReview = reviews[i];
      if (currentReview.review_id === reviewId) {
        res.json(currentReview);
        return;
      }
    }
    res.json('Review ID not found');
  }
});

// POST request to add a review
app.post('/api/reviews', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);
  console.log(req);
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newReview = {
      title,
      text,
    };

    // Obtain existing reviews
    fs.readFile('./db/reviews.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedReviews = JSON.parse(data);

        // Add a new review
        parsedReviews.push(newReview);

        // Write updated reviews back to the file
        fs.writeFile(
          './db/reviews.json',
          JSON.stringify(parsedReviews, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json('Error in posting review');
  }
});

app.delete('/api/reviews/:review_id', (req, res) => {
  if (req.body && req.params.review_id) {
    console.info(`${req.method} request received to get a single a review`);
    const reviewId = req.params.review_id;
    for (let i = 0; i < reviews.length; i++) {
      const currentReview = reviews[i];
      if (currentReview.review_id === reviewId) {
        res.json(currentReview);
        return;
      }
    }
    res.json('Review ID not found');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
