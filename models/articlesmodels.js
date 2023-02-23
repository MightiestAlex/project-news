const db = require('../db/connection.js');

module.exports = {

    allArticles: function(){
        return db.query(
            `SELECT articles.*, COUNT(comments.article_id)::INT AS comment_count 
            FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id
            GROUP BY articles.article_id, comments.article_id 
            ORDER BY articles.created_at DESC;
            `)
        .then((data) => {
            return data.rows;
        })
    },

    articleFromArticle_id: function(article_id){
        return db.query(
            `SELECT *
            FROM articles
            WHERE articles.article_id = $1;`, [article_id]
        )
        .then((article)=>{  
            if(article.rows.length === 0){
                return Promise.reject({msg: 'Article not found check article_id.'})
            }
            return article.rows[0]
        })
    }
};