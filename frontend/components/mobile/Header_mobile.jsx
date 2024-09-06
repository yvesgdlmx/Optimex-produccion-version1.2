import { useState } from "react"


const Header_mobile = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

  return (
    <>
    <header className="mobile__header">
        <div className="mobile__campo" onClick={toggleMenu}>
            <img className="mobile__menu" src="/img/menu.png" alt="menu" />
        </div>
        <div className="mobile__campo">
            <img className="mobile__logo" src="/img/logo_real.png" alt="logo" />
        </div>
        <div className="mobile__campo">
            <img className="mobile__user" src="/img/user.png" alt="user" />
        </div>
    </header>
    <div className="menu">
        {menuOpen && (
            <div className="menu__section">
                <label>Producción</label>
                <label>Historial</label>
                <label>Login</label>
            </div>
        )}
    </div>
    </>
  )
}

export default Header_mobile
