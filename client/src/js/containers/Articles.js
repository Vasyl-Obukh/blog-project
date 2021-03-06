import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'url-search-params-polyfill';
import sortTypes, { compareFunctions } from '../constants/sortTypes';
import paths from '../constants/paths';
import { getBreadcrumbs, linkCategories, getSortType } from '../utilities';
import Articles from '../components/articles/Articles';
import * as actions from '../actions/articles';

const getUrlTemplate = (path, name) =>
  path === paths.CATEGORY_FIRST_PAGE
    ? path.replace(/:\w*/, name)
    : path === paths.CATEGORY_N_PAGE
      ? path.replace(/:.*/, name)
      : '';

const mapStateToProps = (state, props) => {
  let {
    history: {
      location: { search }
    },
    match: {
      path,
      params: { number = 1, categoryId }
    }
  } = props;
  const pageLimit = state.settings.pageLimit || 5;
  const pageNeighbours = 1;
  const sortType = getSortType(search);
  let pageNotFound = false;
  let pagesAmount = 0;

  const getOffset = () => (currentPage - 1) * pageLimit;
  const getPagesAmount = (articles = state.articles) =>
    Math.ceil(articles.length / pageLimit);
  const getArticles = (articles = state.articles) =>
    articles.sort(compareFunctions[sortType]).slice(offset, offset + pageLimit);

  number = parseInt(number);
  let currentPage = number > 0 ? number : 1;
  let offset = getOffset();

  const category = categoryId
    ? state.categories.find(category => category._id === categoryId)
    : null;
  let articles = category
    ? state.articles.filter(_ => _.categoriesId.includes(category._id))
    : [];

  const urlTemplate = getUrlTemplate(path, category ? category.name : '');
  const queryString = sortType !== sortTypes.LATEST ? `?sort=${sortType}` : '';

  switch (path) {
    case paths.MAIN_FIRST_PAGE:
      pagesAmount = getPagesAmount();
      articles = getArticles();
      break;
    case paths.MAIN_N_PAGE:
      pagesAmount = getPagesAmount();
      if (state.articles.length <= offset) {
        currentPage = pagesAmount;
        offset = getOffset();
      }
      articles = getArticles();
      break;
    case paths.CATEGORY_FIRST_PAGE:
      if (category) {
        pagesAmount = getPagesAmount(articles);
        articles = getArticles(articles);
      } else {
        pageNotFound = true;
      }
      break;
    case paths.CATEGORY_N_PAGE:
      if (category) {
        pagesAmount = getPagesAmount(articles);
        if (articles.length <= offset) {
          currentPage = pagesAmount;
          offset = getOffset();
        }
        articles = getArticles(articles);
      } else {
        pageNotFound = true;
      }
      break;
    default:
      pageNotFound = true;
  }

  articles = linkCategories(articles, state.categories);

  const breadcrumbs = getBreadcrumbs({
    categoryName: category ? category.name : null,
    currentPage,
    path
  });

  return {
    pageNotFound,
    articles,
    breadcrumbs,
    sortType,
    paginationSettings: {
      currentPage,
      pagesAmount,
      pageNeighbours,
      urlTemplate,
      queryString
    },
    changeSortType: sortType =>
      props.history.push(
        `${urlTemplate}${
          sortType !== sortTypes.LATEST ? `/?sort=${sortType}` : '/'
        }`
      )
  };
};

const mapDispatchToProps = dispatch => ({
  setArticles: articles => dispatch(actions.setArticles(articles)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Articles));
