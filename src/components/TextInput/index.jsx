import {BiSearch} from '../'
import './styles.scss'
const TextInput = () => {
  return (
    <div className='inputSearchContainer'>
      <input type="text" placeholder="Pesquisar..." className='inputSearch'/><BiSearch className="inputSearchIcon"/>
    </div>
  )
}

export default TextInput