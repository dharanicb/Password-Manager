import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {
    id,
    web,
    name,
    password,
    isShowPassword,
    initialClassName,
  } = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  //   const likeTextClassName = isShowPassword ? 'button active' : 'button'

  const showPassword = () => {
    if (isShowPassword) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          alt="stars"
          className="stars"
        />
      )
    }
    return <p className="comments">{password}</p>
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className="comment-name-container">
          <div className={initialClassName}>
            <p className="initial">{initial}</p>
          </div>
          <div className="name-container">
            <div className="username-time-container">
              <p className="username">{web}</p>
            </div>
            <p className="comment">{name}</p>
            {showPassword()}
          </div>
        </div>
        <div className="buttons-container">
          <button
            className="button"
            type="button"
            onClick={onDeleteComment}
            data-testid="delete"
          >
            <img
              className="delete"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}
export default CommentItem
