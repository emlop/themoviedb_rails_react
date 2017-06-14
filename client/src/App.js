import React, { Component } from 'react';
import CommentList from './components/CommentList';
import AddForm from './components/AddForm';
// import Themoviedb from './component/Themoviedb'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      apiData: null,
      apiDataLoaded: false,
      featuredCommentId: null,
      currentlyEditing: null,
      currentlyAdding: false,
      /* inputs */
      contentValue: '',
      authorValue: '',
    };
    /* features comment */
    this.setFeature = this.setFeature.bind(this);
    /* shows edit form on individual comment */
    this.showEditForm = this.showEditForm.bind(this);
    this.showAddForm = this.showAddForm.bind(this);
    /* CRUD functionality */
    this.addComment = this.addComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    /* handles form changes */
    this.handleContentInputChange = this.handleContentInputChange.bind(this);
    this.handleAuthorInputChange = this.handleAuthorInputChange.bind(this);
  }

  /* lifecycle methods */
  componentDidMount() {
    fetch('/comments')
      .then(res => res.json()).then((jsonRes) => {
        this.setState({
          apiData: jsonRes.comments_data,
          apiDataLoaded: true,
        });
      }).catch(err => console.log(err));
  }

  /* features comment */
  setFeature(id) {
    this.setState({
      featuredCommentId: id,
    });
  }

  /* shows/hides edit form for individual comment */
  showEditForm(id) {
    fetch(`/comments/${id}`)
    .then(res => res.json()).then((jsonRes) => {
      this.setState({
        currentlyEditing: id,
        contentValue: jsonRes.comments_data.content,
        authorValue: jsonRes.comments_data.author,
        currentlyAdding: false,
      });
    }).catch(err => console.log(err));
  }

  showAddForm() {
    this.setState({
      currentlyEditing: null,
      currentlyAdding: true,
    });
  }

  /* ================ Comment CRUD =============== */
  addComment(e) {
    e.preventDefault();
    fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: {
          content: this.state.contentValue,
          author: this.state.authorValue,
        },
      }),
    }).then(res => res.json()).then((jsonRes) => {
      this.setState({
        apiData: jsonRes.comments_data,
        currentlyAdding: false,
        contentValue: '',
        authorValue: '',
      });
    }).catch(err => console.log(err));
  }

  editComment(e, id) {
    e.preventDefault();
    fetch(`/comments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: {
          content: this.state.contentValue,
          author: this.state.authorValue,
        },
      }),
    }).then(res => res.json()).then((jsonRes) => {
      this.setState({
        apiData: jsonRes.comments_data,
        currentlyEditing: null,
        contentValue: '',
        authorValue: '',
      });
    }).catch(err => console.log(err));
  }

  deleteComment(id) {
    fetch(`/comments/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()).then((jsonRes) => {
      this.setState({
        apiData: jsonRes.comments_data,
      });
    }).catch(err => console.log(err));
  }

  /* ======== FORM CONTROLS */
  handleContentInputChange(event) {
    this.setState({ contentValue: event.target.value });
  }

  handleAuthorInputChange(event) {
    this.setState({ authorValue: event.target.value });
  }

  /* ======== RENDER DECIDER */
  renderCommentList() {
    if (this.state.apiDataLoaded) {
      return (
        <CommentList
          apiData={this.state.apiData}
          setFeature={this.setFeature}
          featuredCommentId={this.state.featuredCommentId}
          deleteComment={this.deleteComment}
          currentlyEditing={this.state.currentlyEditing}
          showEditForm={this.showEditForm}
          editComment={this.editComment}
          handleAuthorInputChange={this.handleAuthorInputChange}
          handleContentInputChange={this.handleContentInputChange}
          authorValue={this.state.authorValue}
          contentValue={this.state.contentValue}
        />
      );
    }
    return <p>Loading</p>;
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        {/*<Header />*/}
        <main>
          <AddForm
            addComment={this.addComment}
            currentlyAdding={this.state.currentlyAdding}
            showAddForm={this.showAddForm}
            handleAuthorInputChange={this.handleAuthorInputChange}
            handleContentInputChange={this.handleContentInputChange}
            authorValue={this.state.authorValue}
            contentValue={this.state.contentValue}
          />
          {this.renderCommentList()}
        </main>
        {/*<Footer />*/}
      </div>
    );
  }
}

export default App;