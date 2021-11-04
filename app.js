const express = require('express');

const commentCRUD = require("./commentsCRUD");

const app = express();

app.use(express.json());


//!Trang Chủ localhost:8080/
app.get('/', async (req, res) => {
    res.send("Bài tập về Comments")
})


//!Get All localhost:8080/comments
app.get('/comments', async (req, res) => {
    const allComments = await commentCRUD.getAllComments();

    res.send({
        data: allComments
    })
})


//!Get One localhost:8080/comments/id
app.get('/comments/:idOneComment', async (req, res) => {
    const { idOneComment } = req.params;
    const oneComment = await commentCRUD.getOneComment(String(idOneComment));

    res.send({
        data: oneComment
    })
})

//!Create One localhost:8080/comments
app.post('/comments', async (req, res) => {
        const dataComment = req.body;

        console.log(dataComment);

        const newOneComment = await commentCRUD.createOneComment(dataComment);
        res.send({
            data: newOneComment,
        })

})

//!Update One localhost:8080/comments
app.put('/comments/:updateCommentId', async (req, res) => {
    const {updateCommentId} = req.params;
    const dataUpdate = req.body;

    const updateComment = await commentCRUD.updateOneComment(updateCommentId, dataUpdate);
    res.send({
        data: updateComment,
    })
})


//!Delete One:
app.delete('/comments/:deleteCommentId', async (req, res) => {
    const {deleteCommentId} = req.params;

    const newCommentsAfterDelete = await commentCRUD.deleteOne(deleteCommentId);
    res.send({
        data: newCommentsAfterDelete,
    })
}) 

//listen 8080:
app.listen(8080, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log ('Server Started')
})