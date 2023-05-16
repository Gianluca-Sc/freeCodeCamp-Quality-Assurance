/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const book = require("../models/book");
const Book = require("../models/book");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        const result = await Book.find({});
        const books = result.map((book) => {
          return { ...book._doc, commentcount: book.comments.length };
        });
        res.json(books);
      } catch (error) {
        console.log(error);
      }
    })
    .post(async function (req, res) {
      try {
        let title = req.body.title;

        if (!title) {
          return res.send("missing required field title");
        }

        const findBook = await Book.findOne({ title });
        if (findBook) {
          res.json({ _id: findBook._id, title });
        } else {
          const book = await Book.create({ title });
          if (!book) res.send("error saving book");

          res.json({ _id: book._id, title });
        }
      } catch (error) {
        console.log(error);
      }

      //response will contain new book object including atleast _id and title
    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'
      try {
        const result = await Book.deleteMany({});
        if (result) res.send("complete delete successful");
      } catch (error) {
        console.log(error);
      }
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      try {
        let bookid = req.params.id;
        //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
        const book = await Book.findById(bookid);
        if (!book) return res.send("no book exists");
        res.json({ ...book._doc, commentcount: book.comments.length });
      } catch (error) {
        console.log(error);
      }
    })

    .post(async function (req, res) {
      try {
        let bookid = req.params.id;
        let comment = req.body.comment;
        //json res format same as .get
        if (!comment) return res.send("missing required field comment");

        const book = await Book.findById(bookid);
        if (!book) return res.send("no book exists");
        book.comments.push(comment);
        book.save();
        res.json({ ...book._doc, commentcount: book.comments.length });
      } catch (error) {
        console.log(error);
      }
    })

    .delete(async function (req, res) {
      try {
        //if successful response will be 'delete successful'
        let bookid = req.params.id;
        const result = await Book.findByIdAndDelete(bookid);
        if (!result) return res.send("no book exists");
        res.send("delete successful");
      } catch (error) {
        console.log(error);
      }
    });
};
