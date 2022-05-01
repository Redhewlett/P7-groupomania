import React from 'react'
import NavBar from '../components/NavBar'
import { StyledCard } from '../components/Card'
import styles from './Article.module.css'

//font awesome syntax for react is diffrent, read https://fontawesome.com/v5/docs/web/use-with/react#using-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

export default function Article() {
  return (
    <div>
      <NavBar />
      <div className={styles.main_container}>
        <div className={styles.article_container}>
          <StyledCard color='#ffac99'>
            <h1>
              Your clicked article title <FontAwesomeIcon icon={faHeart} className={styles.icon} />
            </h1>
            <div className={styles.article_text}>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At numquam possimus dignissimos, dolores architecto quaerat quam tempore ipsum!
                Deserunt tempore quibusdam nobis magni dolores aperiam animi ullam magnam! Similique vel aut veritatis eligendi expedita voluptatem iure autem
                alias, perferendis architecto cumque velit illo officia, laboriosam impedit consequuntur eveniet? Dignissimos, accusantium. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Obcaecati maxime voluptate eveniet, dolor veritatis placeat, necessitatibus officia laborum beatae animi
                dolorem quae itaque exercitationem, porro tempora quod rerum enim modi sint! Eaque, error dolorem quod, nobis, beatae deserunt minima culpa
                reiciendis expedita tempora porro! Ipsam, nostrum!
                <br />
                <br /> Facilis qui veniam molestiae. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo atque velit commodi, consequuntur quidem,
                laborum doloribus recusandae quas maxime excepturi eveniet perferendis doloremque, debitis animi repellendus culpa voluptate vitae incidunt ab.
                Quod enim vero facilis doloremque, autem impedit obcaecati magnam perferendis necessitatibus suscipit sit facere modi totam ratione excepturi
                fugiat ipsam, fuga reprehenderit accusantium nam doloribus? Placeat sapiente maiores error, voluptas distinctio maxime. Suscipit, expedita
                deserunt? Nobis qui ipsum, dolore sint unde nemo labore quam placeat facilis illum quaerat consequuntur obcaecati tenetur rerum aut quidem
                molestias totam excepturi esse quisquam rem. Veritatis fugit distinctio repellendus doloremque earum saepe soluta! Eius repellat sunt libero
                ullam rerum nostrum quas quo quibusdam nam neque! Dicta labore nihil impedit a illum, tempora laborum, voluptatem accusamus odio omnis sint
                veritatis corporis vel quo, adipisci mollitia! Repellat magni eum accusantium id eius dolor et magnam ullam veritatis rem! Corrupti numquam,
                amet ex possimus error iste architecto laudantium sit perferendis, sequi nihil exercitationem, eum atque! Numquam ipsam nesciunt veniam
                perferendis voluptatibus doloribus tenetur vitae sunt exercitationem expedita voluptate tempore aspernatur, facilis nostrum officiis animi
                maxime, fuga fugit hic excepturi eveniet. Commodi, minus molestias non modi, dolorum nam earum sint voluptate culpa dolorem nemo perspiciatis
                nobis deserunt suscipit.
              </p>
            </div>

            <span className={styles.info}>
              <p>Written by: AuteurNom AuteurPrénom le 2021-07-16</p>
            </span>

            <span className={styles.tags}>
              <p>#your-tag1</p>
              <p>#your-tag2</p>
              <p>#your-tag3</p>
              <p>#your-tag4</p>
            </span>
          </StyledCard>
        </div>
        <div className={styles.related}>
          <StyledCard color='#ffac99'>
            <h2>Related articles</h2>
            <StyledCard color='white'>
              <h2>Related article 1</h2>
              <h3> Résumé article récent 3 lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, accusamus!</h3>
              <span>publié par: auteur3</span>
            </StyledCard>
          </StyledCard>
        </div>
      </div>
    </div>
  )
}
