import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../formatDate';

export default function Article({ article }) {
  return (
    <article className='article'>
      <h2 className='article--title'>
        <Link to={`/articles/${article.id}`}>{article.title}</Link>
      </h2>

      <div className='article--cat-n-date'>
        <div className='categories'>
          <span>Category: </span>
          {article.category.map((article, id) => {
            return (
              <Link key={id} to={`/categories/${article}`}>
                {article}
              </Link>
            );
          })}
        </div>

        <div className='date'>
          <span>{formatDate(article.date)}</span>
        </div>
      </div>

      <div className='article--thumbnail'>
        <img src={article.thumbnailUrl} alt='post thumbnail' />
      </div>

      <div className='article--overview'>
        <p>{article.overview}</p>
      </div>

      <div className='article--comments-n-link'>
        <span>Comments: {article.commentsNumber}</span>
        <Link to={`/articles/${article.id}`}>Read more...</Link>
      </div>
    </article>
  );
}
