import styles from './index.module.scss'
function Page404 () {
  return (
    <div className={styles.errorBox}>
      <img src='/public/404.png' alt='error' />
    </div>
  )
}

export default Page404
