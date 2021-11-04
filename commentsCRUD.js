/*
    {
        id: number,
        imgUrl: string,
        namePerson: string,
        time: string,
        comment: string
    }
*/

const fs = require('fs');
const uuid = require('uuid'); //sinh id ko trùng


//!Get All:
const getAllComments = async () => {
    try {
        const jsonComments = await fs.promises.readFile('comments.json', {encoding: "utf-8"});
        const comments = JSON.parse(jsonComments);

        console.log(comments);
        return comments;
        
    } catch (err) {
        console.log(err);
        return [];
    }
}


//!Get One:
const getOneComment = async (idOne) => {
    try {
        const jsonComments = await fs.promises.readFile('comments.json', {encoding: "utf-8"});
        const comments = JSON.parse(jsonComments);

        const comment = comments.find(obj => obj.id == idOne);

        console.log (comment);
        return comment;

    } catch (err) {
        console.log(err);
        return null;
    }
}


//!Create One:
const createOneComment = async (dataComment) => {
    try {
        const jsonComments = await fs.promises.readFile('comments.json', {encoding: "utf-8"});
        const comments = JSON.parse(jsonComments);

        const newOneComment = {
            id: uuid.v1(),
            ...dataComment 
        }

        const newComments = [...comments, newOneComment];
        await fs.promises.writeFile('comments.json', JSON.stringify(newComments));

        console.log(newOneComment);
        return newOneComment;
      

    } catch (err) {
        console.log(err);
        return null;
    }
}


//!Update One:
const updateOneComment = async (idUpdate, dataUpdate ) => {
    try {
        const jsonComments = await fs.promises.readFile('comments.json', {encoding: "utf-8"});
        const comments = JSON.parse(jsonComments);

        let commentUpdateId = comments.findIndex(comment => comment.id === idUpdate); 

        if (commentUpdateId !== -1) {
            comments[commentUpdateId] = {
                ... comments[commentUpdateId],
                ...dataUpdate
            }

            await fs.promises.writeFile('comments.json', JSON.stringify(comments));

            console.log(commentUpdateId);
            return comments[commentUpdateId];
        }
        return null;

    } catch(err) {
        console.log(err);
        return null;
    }
}


//!Delete One:
const deleteOne = async (id) => {
    try {
        const jsonComments = await fs.promises.readFile('comments.json', {encoding: "utf-8"});
        const comments = JSON.parse(jsonComments);

        const newComments = comments.filter(comment => comment.id !== id);
        await fs.promises.writeFile('comments.json', JSON.stringify(newComments));
       
        return true;

    } catch (err) {
        console.log(err);
        return false;
    }
}




module.exports = {
    getAllComments,
    getOneComment,
    createOneComment,
    updateOneComment,
    deleteOne
}