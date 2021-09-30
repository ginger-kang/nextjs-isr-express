import styles from './Post.module.css'

const Post = ({ id, identicon }) => {
  const icon = `data:image/png;base64,${identicon}`

  return (
    <div className={styles.container}>
      <p className={styles.hash}>{id}</p>
      <img className={styles.icon} src={icon} alt="icon" />
    </div>
  )
}

export default Post
