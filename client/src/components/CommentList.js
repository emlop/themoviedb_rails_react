import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
  render() {
    return (
      <div className="commentbox">
        {this.props.apiData.map((comment) => {
          if (this.props.currentlyEditing === comment.id) {
            return (
              <div className="editform" key={comment.id}>
                <form
                  onSubmit={e => this.props.editComment(e, comment.id)}
                  className="edit"
                >
                  <input
                    type="text"
                    name="author"
                    value={this.props.authorValue}
                    onChange={this.props.handleAuthorInputChange}
                  />
                  <input
                    type="text"
                    name="content"
                    value={this.props.contentValue}
                    onChange={this.props.handleContentInputChange}
                  />
                  <input type="submit" value="Edit it!" />
                </form>
              </div>
            );
          }
          return (
            <Comment
              comment={comment}
              setFeature={this.props.setFeature}
              featuredCommentId={this.props.featuredCommentId}
              deleteComment={this.props.deleteComment}
              showEditForm={this.props.showEditForm}
              key={comment.id}
            />);
        })}
      </div>
    );
  }
}

export default CommentList;