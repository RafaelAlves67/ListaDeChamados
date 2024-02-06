import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'
import img from '../assets/glpi.png'



const Nav = () => {
  return (
    <nav className={styles.navbar}>
            <NavLink to="/"><div className={styles.div_logo}><img src={img} alt="logo" /></div></NavLink>

            <div><h2>Lista de chamados</h2></div>

            <div className={styles.div_menu}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/Chamados">Chamados</NavLink>
                <NavLink to="/About">Sobre</NavLink>
            </div>
    </nav>
  )
}

export default Nav