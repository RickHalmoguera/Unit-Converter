import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Nav(){
    return(
        <div className='c-nav'>
            <FontAwesomeIcon icon={faArrowRightArrowLeft} size ='2xl' className='c-nav_logo'/>
            <h1 className='c-nav_title'>unit converter</h1>
        </div>
    )
}

export default Nav