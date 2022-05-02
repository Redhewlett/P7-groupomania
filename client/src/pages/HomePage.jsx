import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import styles from './HomePage.module.css'
import { StyledCard } from '../components/Card'
import Button from '../components/Button'

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <div className={styles.recent}>
        <StyledCard color='#ffac99'>
          <div className={styles.recent_three}>
            <h1>Récemment</h1>
            <div className={styles.card_hover}>
              <StyledCard color='white'>
                <Link to='/article' className={styles.link}>
                  <h2>Article récent 1</h2>
                  <h3> Résumé article récent 1 lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, accusamus!</h3>

                  <span>publié par: auteur1</span>
                </Link>
              </StyledCard>
            </div>
            <div className={styles.card_hover}>
              <StyledCard color='white'>
                <Link to='/article' className={styles.link}>
                  <h2>Article récent 2</h2>
                  <h3> Résumé article récent 2 lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, accusamus!</h3>
                  <span>publié par: auteur2</span>
                </Link>
              </StyledCard>
            </div>
            <div className={styles.card_hover}>
              <StyledCard color='white'>
                <Link to='/article' className={styles.link}>
                  <h2>Article récent 3</h2>
                  <h3> Résumé article récent 3 lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, accusamus!</h3>
                  <span>publié par: auteur3</span>
                </Link>
              </StyledCard>
            </div>
          </div>
        </StyledCard>
      </div>
      <div className={styles.view_more}>
        <Button>Voir plus d'articles</Button>
      </div>
    </div>
  )
}
