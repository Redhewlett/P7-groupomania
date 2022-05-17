import styles from './DeleteButton.module.css'
import trash from '../assets/icons/trash-can-regular.svg'

export default function DeleteButton({ children, type, onClick }) {
  return <img className={styles.trash} src={trash} alt='trash icon' onClick={onClick} />
}
