import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return (
      <div className="comment-container">
      <div className={
        (this.props.featuredCommentId === this.props.comment.id)
        }>
       <div className="featureme">
          <i
            role="button"
            tabIndex={parseInt(this.props.comment.id, 10) * 3}
            onClick={() => this.props.setFeature(this.props.comment.id)}
          />
        </div>
        </div>
        <div className="commentcontent">
          <h3>{this.props.comment.content}</h3>
 
          
            <span className="addform">{this.props.comment.author}</span> 
          
          <div className="edit-delete">
            <span
              role="button"
              tabIndex={(parseInt(this.props.comment.id, 10) * 3) + 1}
              className="delete"
              onClick={() => this.props.deleteComment(this.props.comment.id)}
            >Delete</span> <br />
            <span
              role="button"
              tabIndex={(parseInt(this.props.comment.id, 10) * 3) + 2}
              className="edit"
              onClick={() => this.props.showEditForm(this.props.comment.id)}
              >Edit
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;