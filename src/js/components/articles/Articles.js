import React from 'react';
import Article from './Article';
import { Link } from 'react-router-dom';

export default function Articles({ articles }) {
  return (
    <>
      {articles.map(article => (
        <Article key={article.id} article={article} />
      ))}
    </>
  );
}
