import React from 'react';
import initialProfilePhoto from '../images/kusto_photo.jpg'
import api from '../utils/Api';
import Card from './Card';

export default function Main(props){

    const [userName, setuserName] = React.useState('');
    const [userDescription , setuserDescription ] = React.useState('');
    const [userAvatar, setuserAvatar] = React.useState('');
    const [cards, setcards] = React.useState([]);
    const cardContainer = document.querySelector('.elements__grid')

    React.useEffect(() => {
      api.getUserInfo()
      .then((resProfile)=>{
        setuserName(resProfile.name);
        setuserDescription(resProfile.about);
        setuserAvatar(resProfile.avatar)
      })
      .catch((err) => {
        console.log(err);
      })

      api.getInitialCards()
      .then((resCards)=>{
        setcards(resCards.reverse());
      })
      .catch((err) => {
        console.log(err);
      })
    }, []); 

    
    return(
    <main className="content">
        <section className="profile">
          <div className="profile__user">
            <div className="profile__avatar-container">
              <img className="profile__avatar" src={userAvatar} alt="Фото профиля"/>
              <button className="profile__avatar-change" onClick={props.onEditAvatar}></button>
            </div>
            <div className="profile__info">
              <div className="profile__container">
                <h1 className="profile__name">{userName}</h1>
                <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__description">{userDescription}</p>
            </div>
          </div>
          <button className="profile__add" type="button" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements" aria-label="Набор фотографий в профиле">
          <ul className="elements__grid">
            {cards.map((cardInfo)=>{
              return <Card 
              key={cardInfo._id} 
              card={cardInfo}
              onCardClick={props.onCardClick}
              ></Card>
            })}
          </ul>
        </section>
    </main>
    
    )
}

