import React, { Component } from 'react';

class AddForm extends Component {
  renderButtonOrForm() {
    if (this.props.currentlyAdding) {
      return (
        <form 
          className='none'
          onSubmit={e => this.props.addComment(e)}
        >
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={this.props.authorValue}
            onChange={this.props.handleAuthorInputChange}
          /> 
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={this.props.contentValue}
            onChange={this.props.handleContentInputChange}
          />
          <input type="submit" value="Add it!" />
        </form>
      );
    }
    return (
      <span
        role="button"
        tabIndex="2"
         className="showform"
        onClick={() => this.props.showAddForm()}
      >Add a comment</span>
    );
  }
  render() {
    return (
      <div className="addcomment">
        {this.renderButtonOrForm()}
      </div>
    );
  }
}

export default AddForm;