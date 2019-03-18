import {
  ADD_ARTICLE,
  DELETE_ARTICLE,
  CHANGE_ARTICLE,
  CHANGE_ARTICLE_COMMENTS_NUMBER } from '../constants/actionTypes';


export const addArticle = ({ title, text, overview, thumbnailUrl, category }) => {
  return {
    type: ADD_ARTICLE,
    title,
    text,
    overview,
    thumbnailUrl,
    category
  };
};

export const deleteArticle = id => {
  return {
    type: DELETE_ARTICLE,
    id
  };
};

export const changeArticle = ({ id, title, text, overview, thumbnailUrl, category }) => {
  return {
    type: CHANGE_ARTICLE,
    id,
    title,
    text,
    overview,
    thumbnailUrl,
    category
  };
};

export const changeCommentsNumber = ( commentsNumberChange ) => {
  return {
    type: CHANGE_ARTICLE_COMMENTS_NUMBER,
    commentsNumberChange
  };
};