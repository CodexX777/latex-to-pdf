const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Book = require("./models/bookSchema");

app.use(bodyParser.json());

// const AddDocuments=async()=>{

//     const books = [
//         {
//           title: 'The Hitchhiker\'s Guide to the Galaxy',
//           author: 'Douglas Adams',
//           publishedYear: 1979,
//           genre: 'Science Fiction',
//           pageCount: 224,
//           price: 9.99,
//           ratings: [4, 5, 4, 3, 5],
//           reviews: [
//             { username: 'john_doe', text: 'Great book!', rating: 5 },
//             { username: 'jane_doe', text: 'A classic!', rating: 4 },
//             { username: 'bob_smith', text: 'Meh...', rating: 3 }
//           ]
//         },
//         {
//           title: 'To Kill a Mockingbird',
//           author: 'Harper Lee',
//           publishedYear: 1960,
//           genre: 'Fiction',
//           pageCount: 281,
//           price: 12.99,
//           ratings: [5, 5, 4, 5],
//           reviews: [
//             { username: 'alice_smith', text: 'One of the best books ever written!', rating: 5 },
//             { username: 'bob_jones', text: 'A timeless classic', rating: 5 },
//             { username: 'jane_doe', text: 'Really enjoyed this book', rating: 4 }
//           ]
//         },
//         {
//           title: 'The Great Gatsby',
//           author: 'F. Scott Fitzgerald',
//           publishedYear: 1925,
//           genre: 'Fiction',
//           pageCount: 180,
//           price: 7.99,
//           ratings: [4, 3, 5, 4, 3],
//           reviews: [
//             { username: 'john_doe', text: 'Beautifully written', rating: 5 },
//             { username: 'jane_doe', text: 'Overrated in my opinion', rating: 3 },
//             { username: 'bob_smith', text: 'Not my cup of tea', rating: 2 }
//           ]
//         }
//       ];

//       await Book.insertMany(books).then(()=>{
//         console.log("Successfull document addition");
//       });

// }

app.get("/api/pageCount", async (req, res, next) => {
  try {
    const result = await Book.aggregate([
      {
        $match: {
          $or: [{ pageCount: { $gte: 200 } }, { price: { $lte: 10 } }],
        },
      },
    ]);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong" });
  }
});

app.get("/api/pageCount", async (req, res, next) => {
  try {
    const result = await Book.aggregate([
      {
        $match: {
          $or: [{ pageCount: { $gte: 200 } }, { price: { $lte: 10 } }],
        },
      },
    ]);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong" });
  }
});

app.get("/api/appendSpam", async (req, res, next) => {
  try {
    const result = await Book.aggregate([
      {
        $addFields: {
          //this is actually reassigning the value of reviews, if the name was different then it would add a new field and not change the value of reviews
          reviews: {
            $map: {
              input: "$reviews", //map function will work on this array
              as: "review", //name of each element in reviews
              in: {
                $mergeObjects: [
                  //$mergeObjects merge key values of 2 or more objects into one
                  "$$review", //$$ is used to give reference of the review element
                  {
                    spam: {
                      $cond: {
                        if: { $gte: ["$$review.rating", 3] },
                        then: false,
                        else: true,
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ]);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong" });
  }
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xvgrljc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

//   AddDocuments();
