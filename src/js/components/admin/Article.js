import React, { Component } from 'react';
import Modal, { handleShow, handleHide, onOutsideClick } from '../Modal';
import ArticleShort from './ArticleShort';

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNew: this.props.new ? this.props.new : false,
      showModal: false,
      title: this.props.article ? this.props.article.title : '',
      text: this.props.article ? this.props.article.text : '',
      overview: this.props.article ? this.props.article.overview : '',
      thumbnailUrl: this.props.article ? this.props.article.thumbnailUrl : '',
      categoriesId: this.props.article ? this.props.article.categoriesId : []
    };
    this.handleShow = handleShow.bind(this);
    this.handleHide = handleHide.bind(this);
    this.onOutsideClick = onOutsideClick.bind(this);
  }

  onFileLoad = e => {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ thumbnailUrl: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  onCheck = e => {
    const { categoriesId } = this.state;
    let index;

    if (e.target.checked) {
      categoriesId.push(e.target.value);
    } else {
      index = categoriesId.indexOf(e.target.value);
      categoriesId.splice(index, 1);
    }
    this.setState({categoriesId})
  };

  onSubmit = e => {
    e.preventDefault();
    this.state.addNew
      ? this.props.addArticle({
          title: this.state.title,
          text: this.state.text,
          overview: this.state.overview,
          thumbnailUrl: this.state.thumbnailUrl,
          categoriesId: this.state.categoriesId
        })
      : this.props.changeArticle({
          id: this.props.article.id,
          title: this.state.title,
          text: this.state.text,
          overview: this.state.overview,
          thumbnailUrl: this.state.thumbnailUrl,
          categoriesId: this.state.categoriesId
        });
    this.handleHide();
  };

  render() {
    return (
      <div className='admin-article'>
        {this.state.addNew ? (
          <div className='article-add'>
            <button onClick={this.handleShow}>&#43; Add article</button>
          </div>
        ) : (
          <ArticleShort
            article={this.props.article}
            handleShow={this.handleShow}
            categories={this.props.categories.filter(category => this.props.article.categoriesId.includes(category.id)).map(category => category.name)}
            deleteArticle={this.props.deleteArticle}
          />
        )}
        {this.state.showModal ? (
          <Modal
            onOutsideClick={this.onOutsideClick}
            handleHide={this.handleHide}
          >
            <form className='modal--form' onSubmit={this.onSubmit}>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                id='title'
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
                placeholder='Enter article title'
                autoComplete='off'
                required
              />
              <label htmlFor='text'>Article text</label>
              <textarea
                id='text'
                value={this.state.text}
                onChange={e => this.setState({ text: e.target.value })}
                rows='12'
                placeholder='Enter article text'
                required
              />
              <label htmlFor='overview'>Article overview</label>
              <textarea
                id='overview'
                maxLength='400'
                value={this.state.overview}
                onChange={e => this.setState({ overview: e.target.value })}
                rows='3'
                placeholder='Enter article overview'
                required
              />
              <input
                type='file'
                accept='image/*'
                onChange={this.onFileLoad}
                required={this.state.thumbnailUrl === '' ? 'required' : null}
              />
              {this.state.thumbnailUrl !== '' ? (
                <img
                  className='modal-thumbnail'
                  src={this.state.thumbnailUrl}
                />
              ) : null}
              {this.props.categories.map(category => (
                <label key={category.id}>
                  {category.name}
                  <input
                    type='checkbox'
                    defaultChecked={this.state.categoriesId.includes(category.id)}
                    onChange={this.onCheck}
                    value={category.id}
                  />
                </label>
              ))}
              <button type='submit'>Submit</button>
            </form>
          </Modal>
        ) : null}
      </div>
    );
  }
}