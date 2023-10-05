import React from 'react';
import Header from './components/Header';
import Main from './components/Main'
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';




function App() {


  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  
  const [selectedCard, setselectedCard] = React.useState({});
  
  function handleCardClick(card){
    setselectedCard(card);
  }

  function closeAllPopups(){
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setselectedCard({});
  }
  function handleEditProfileClick(){
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true);
  }

  
  return (
  <>
    <Header></Header>
    <Main 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
    ></Main>
    <Footer></Footer>
    <PopupWithForm
    onClose={closeAllPopups}
    isOpen={isEditProfilePopupOpen}
    name="account-change"
    title="Редактировать профиль"
    buttonText="Сохранить">
      <div className="popup__field-container">
        <input type="text" className="popup__input" id="profile__name__field" name="profile__name"  placeholder="Имя" required minLength="2" maxLength="40"/>
        <span className="popup__error" id="profile__name__field-error">errortext</span>
      </div>
      <div className="popup__field-container">
        <input type="text" className="popup__input" id="profile__description__field" name="profile__description" placeholder="О себе" required minLength="2" maxLength="200"/>
        <span className="popup__error" id="profile__description__field-error">errortext</span>
      </div>
    </PopupWithForm>
    <PopupWithForm
    onClose={closeAllPopups}
    isOpen={isAddPlacePopupOpen}
    name="image-load"
    title="Новое место"
    buttonText="Создать">
      <div className="popup__field-container">
        <input type="text" className="popup__input" id="place__name__field" name="place__name"  placeholder="Название" required minLength="2" maxLength="30"/>
        <span className="popup__error" id="place__name__field-error">errortext</span>
      </div>
      <div className="popup__field-container">
        <input type="url" className="popup__input" id="place__image__field" name="place__image" placeholder="Ссылка на картинку" required/>
        <span className="popup__error" id="place__image__field-error">errortext</span>
      </div>
    </PopupWithForm>
    <ImagePopup
      name="image-show"
      card={selectedCard}
      onClose={closeAllPopups}
    ></ImagePopup>
    <PopupWithForm
    onClose={closeAllPopups}
    isOpen={isEditAvatarPopupOpen}
    name="avatar-change"
    title="Обновить аватар"
    buttonText="Сохранить">
      <div className="popup__field-container">
        <input type="url" className="popup__input" id="avatar__image__field" name="avatar__image" placeholder="Ссылка на картинку" required/>
        <span className="popup__error" id="avatar__image__field-error">errortext</span>
      </div>
    </PopupWithForm>
    <PopupWithForm
    onClose={closeAllPopups}
    name="confirm-delete"
    title="Вы уверены?"
    buttonText="Да">
    </PopupWithForm>

  </>
  );
}

export default App;
