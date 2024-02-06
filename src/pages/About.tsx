import React from 'react'
import styles from './About.module.css'

type Props = {}

const About = (props: Props) => {
  return (
    <div className={styles.div_about}>
          <h1>Sistema de suporte Service desk</h1>

          <p>Software desenvolvimento no intuito de resolver problemas e auxiliar empresas/pessoas que necessitam de um sistema para gerenciamento de chamados de TI em geral.</p>
    </div>
  )
}

export default About