import React, { Component } from 'react';
import { compose } from "recompose";
import { Query, graphql } from "react-apollo";

import { ALL_TODOS, ADD, REMOVE } from "../../queries";
import Note from "../components/Note";


class Home extends Component {
  constructor(props) {
    super(props);

    this.state= {
      noteText: '',
      notes: []
    }
  }

  updateNoteText(noteText) {
    this.setState({noteText: noteText.target.value})
  }

  addNote() {
    if (this.state.noteText === '') {return}
    let noteArr = this.state.notes;
    noteArr.push(this.state.noteText);

    this.props.add({
      variables: {
        title: this.state.noteText
      }
    });

    this.setState({ noteText: ''});
    this.textInput.focus();
  }

  handleKeyPress = (event) => {
    if(event.key === "Enter"){
      let noteArr = this.state.notes;
      noteArr.push(this.state.noteText);

      this.props.add({
        variables: {
          title: this.state.noteText
        }
      });

      this.setState({ noteText: ''});
    }
  };

  deleteNote (index){
    let noteArr = this.state.notes;
    noteArr.splice(index, 1);
    this.setState({ notes: noteArr });

    this.props.remove({
      variables: { id: index }
    });
  }

  render() {
    const notes = (
    <Query query={ALL_TODOS}>
      {({ loading, error, data }) => {

        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return data.todos.map( t => (
          <Note key={t.id} text={t.title}
                deleteMethod={ () => this.deleteNote(t.id) }
          />
        ));
      }}
     </Query>);

    return (
      <div className="container">
        <div className="header">Todo App</div>
        {notes}
        <div className="button" onClick={this.addNote.bind(this)}>+</div>
        <input placeholder="Enter Notes" type="text" className="input"
               ref={((input) => {this.textInput = input})}
               value={this.state.noteText}
               onChange={noteText => this.updateNoteText(noteText)}
               onKeyPress={this.handleKeyPress.bind(this)}
        />
      </div>
    );
  }
}

export default compose(
  graphql(REMOVE, {name: "remove"}),
  graphql(ADD, {name: "add"})
)(Home);


