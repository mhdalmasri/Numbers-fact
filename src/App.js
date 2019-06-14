import React, { Component } from "react";
import "./App.css";
// import React bindings for Redux
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    // Destructuring assignment from Props
    const { fetching, txt, onRequestTxt, error } = this.props;

    return (
      <div className="App">
        <header className="App-header">
  
          <h1 className="App-title">"{this.props.txt}"</h1>

          {<p className="App-intro">Insert a Number !</p>}
          <input
            ref={this.myRef}
            placeholder="number"
            type="number"
          />
          <br />
          {fetching ? (
            <button className="btn btn-warning" disabled>
              Fetching...
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => onRequestTxt(this.myRef.current.value)}
            >
              Request a Fact
            </button>
          )}

          {error && (
            <p style={{ color: "red" }}>Uh oh - something went wrong!</p>
          )}
        </header>
      </div>
    );
  }
}

// Extracting Data with mapStateToProps
const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    txt: state.txt,
    error: state.error
  };
};

// Dispatching actions with mapDispatchToProps
const mapDispatchToProps = dispatch => {
  return {
    onRequestTxt: num => {
      console.log(num);
      dispatch({ type: "API_CALL_REQUEST", number: num });
    }
  };
};

// the connect() function connects the React component to the Redux store.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
