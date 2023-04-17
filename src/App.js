import {Component} from 'react'

import {v4} from 'uuid'

import CommentItem from './CommentItem/index'

import './App.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class App extends Component {
  state = {
    nameInput: '',
    webInput: '',
    passwordInput: '',
    searchInput: '',
    count: 0,
    commentsList: [],
    isShowPassword: false,
  }

  onchangeShowPassword = () => {
    // const {isShowPassword} = this.state
    // const {isShowPassword} = commentsList
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        deleteComment={this.deleteComment}
        isShowPassword={this.onchangeShowPassword}
      />
    ))
  }

  onChangePasswordInput = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onChangeWebInput = event => {
    this.setState({
      webInput: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onAddComment = event => {
    event.preventDefault()
    const {webInput, nameInput, passwordInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      web: webInput,
      name: nameInput,
      password: passwordInput,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      webInput: '',
      nameInput: '',
      passwordInput: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderPasswordInputs = () => {
    const {webInput, nameInput, passwordInput} = this.state

    return (
      <div className="password-input-container">
        <div className="app-input-elements">
          <div className="flex-col">
            <h1 className="password-header">Add New Password</h1>
            <form className="app-inputs" onSubmit={this.onAddComment}>
              <div className="web-img-container">
                <div className="web-img">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="web-img-link"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input-element"
                  onChange={this.onChangeWebInput}
                  value={webInput}
                />
              </div>

              <div className="web-img-container">
                <div className="web-img">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="web-img-link"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input-element"
                  onChange={this.onChangeNameInput}
                  value={nameInput}
                />
              </div>

              <div className="web-img-container">
                <div className="web-img">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="web-img-link"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-element"
                  onChange={this.onChangePasswordInput}
                  value={passwordInput}
                />
              </div>
              <div className="text-align">
                <button type="submit" className="delete-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              className="password-manager-sm-img password-img"
              alt="password manager"
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {commentsList, searchInput, count} = this.state
    // const {id} = commentsList

    const searchResults = commentsList.filter(eachUser =>
      eachUser.web.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="password-app-container">
        <div className="flex-header-logo">
          <div className="flex-items">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="app-logo"
            />

            {this.renderPasswordInputs()}

            <div className="password-input-container">
              <div className="nav-search-input">
                <h1 className="counting">
                  Your Passwords
                  <span className="comments-count">
                    {count + commentsList.length}
                  </span>
                </h1>
                <div className="search-icon">
                  <div className="web-img icon">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                      alt="search"
                      className="web-img-link"
                    />
                  </div>
                  <input
                    type="search"
                    placeholder="Search"
                    className="input-element"
                    value={searchInput}
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>

              <hr />

              <div className="checkbox">
                <input
                  type="checkbox"
                  id="checkboxId"
                  onChange={this.onchangeShowPassword}
                />
                <label className="password-label" htmlFor="checkboxId">
                  Show Passwords
                </label>
              </div>
              <div className="search-results-container">
                {searchResults.length < 1 ? (
                  <div className="text">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                      alt=" no passwords"
                      className="no-password-img"
                    />
                    <p className="no-password">No Passwords</p>
                  </div>
                ) : (
                  <ul className="comments-list">{this.renderCommentsList()}</ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
