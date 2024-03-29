import styles from './form.module.scss'

export const Form = () => {
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('onSubmitHandle')
  }

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <input type="number" max="100" min="0" />
      <button>Start</button>
    </form>
  )
}