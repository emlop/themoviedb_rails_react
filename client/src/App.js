import React, { Component } from 'react';
import Movie from './components/Movie';
// import Currentmovie from './components/Currentmovie';
import CommentList from './components/CommentList';
import AddForm from './components/AddForm';
import Header from './components/Header';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movieData: null,
      commentData: null,
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
    Promise.all([
      fetch('/comments'),
      fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=e61e251b82e0c0d13065d29fb5cc9772&language=en-US&page=1')
    ]).then(res => {
        return Promise.all(res.map((response) => {
        return response.json()
    }))
    }).then((jsonRes) => {
      console.log(jsonRes);
        this.setState({
          commentData: jsonRes[0].comments_data,
          apiDataLoaded: true,
          movieData: jsonRes[1].results
        });
        console.log(this.setState.movieData)
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
        <div className="important">
        {/*<div className='moviething'>*/}
        <Movie movieData={this.state.movieData[0]} />
        <Movie movieData={this.state.movieData[1]} />
        <Movie movieData={this.state.movieData[2]} />
        <Movie movieData={this.state.movieData[3]} />
        <Movie movieData={this.state.movieData[4]} />
        <Movie movieData={this.state.movieData[5]} />
        <Movie movieData={this.state.movieData[6]} />
        <Movie movieData={this.state.movieData[7]} />
        <Movie movieData={this.state.movieData[8]} />
        <Movie movieData={this.state.movieData[9]} />
        <Movie movieData={this.state.movieData[10]} />
        <Movie movieData={this.state.movieData[11]} />
        <Movie movieData={this.state.movieData[12]} />
        <Movie movieData={this.state.movieData[13]} />
        <Movie movieData={this.state.movieData[14]} />
        <Movie movieData={this.state.movieData[15]} />
        <Movie movieData={this.state.movieData[16]} />
        <Movie movieData={this.state.movieData[17]} />
        <Movie movieData={this.state.movieData[18]} />
        <Movie movieData={this.state.movieData[19]} />
        {/*</div>*/}
       
        <AddForm
          addComment={this.addComment}
          currentlyAdding={this.state.currentlyAdding}
          showAddForm={this.showAddForm}
          handleAuthorInputChange={this.handleAuthorInputChange}
          handleContentInputChange={this.handleContentInputChange}
          authorValue={this.state.authorValue}
          contentValue={this.state.contentValue}
        />
      
        <CommentList
          apiData={this.state.commentData}
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

                  
        /></div>
      );
    }
    return <p>Loading</p>;
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Header />
        <main>
          {this.renderCommentList()} 
        </main>
      </div>
    );
  }
}

export default App;