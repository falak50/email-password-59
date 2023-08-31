import { Link } from "react-router-dom";
import './Header.css'
const Header = () => {
    return (
        <div>
           <nav>
            <Link to='/'>Hoem</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/register-rbs'>Register RBS</Link>
            <Link to='/register-bs'>Register BS</Link>
           </nav>
        </div>
    );
};

export default Header;