// import React, { Component } from 'react';

// class Themoviedb extends Component {
//   constructor() {
//     super();
//     this.state = {
//       apiData: null,
//       apiDataLoaded: false,
//     };
//   }

//   componentDidMount() {
//     fetch('/comments').then(res => res.json()).then((jsonRes) => {
//       this.setState({
//         apiData: jsonRes.comments_data,
//         apiDataLoaded: true,
//       });
//     });
//   }

//   showCommentsOnPage() {
//     return this.state.apiData.map((comment) => {
//       return (
//         <div className="comment" key={comment.id}>
//           <p>{comment.content}</p>
//           <span className="author">{comment.author}</span>
//           <span className="content">{comment.content}</span>
//         </div>
//       );
//     });
//   }

//   render() {
//     return (
//       <div className="themoviedb">
//         <div>
//           {(this.state.apiDataLoaded) ? this.showCommentsOnPage() : <p>Loading...</p>}
//         </div>
//       </div>
//     );
//   }
// }

// export default Themoviedb;