import React from 'react';
import Header from './components/Header';
import Main from './components/Main'
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import AddPlacePopup from './components/AddPlacePopup';
import ImagePopup from './components/ImagePopup';
import api from './utils/Api';
import {CurrentUserContext} from './contexts/CurrentUserContext.js';



function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then((resProfile)=>{
      setCurrentUser(resProfile);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
    .then((resCards)=>{
      setCards(resCards);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []); 


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
  function handleCardLike(card){
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }
  function handleCardDelete(card){
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id && c));
    });
  }
  function handleUpdateUser(newUserInfo){
    api.redactProfile(newUserInfo.name, newUserInfo.about)
    .then((resProfile)=>{
      setCurrentUser(resProfile);
      closeAllPopups();
    })
  }
  function handleUpdateAvatar(newUserInfo){
    api.changeAvatar(newUserInfo.avatar)
    .then((resProfile)=>{
      setCurrentUser(resProfile);
      closeAllPopups();
    })
  }
  function handleAddPlaceSubmit(newCardInfo){
    api.addNewCard(newCardInfo.name, newCardInfo.link)
    .then((newCard)=>{
      setCards([newCard, ...cards]); 
      closeAllPopups()
    })
  }
  
  return (
  <CurrentUserContext.Provider value={currentUser}>
    <Header></Header>
    <Main
      cards={cards} 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete ={handleCardDelete}
    ></Main>
    <Footer></Footer>
    <EditProfilePopup 
    onClose={closeAllPopups} 
    isOpen={isEditProfilePopupOpen}
    onUpdateUser={handleUpdateUser}/>
    <AddPlacePopup
    onClose={closeAllPopups}
    isOpen={isAddPlacePopupOpen}
    onAddPlace={handleAddPlaceSubmit}/>
    <ImagePopup
      name="image-show"
      card={selectedCard}
      onClose={closeAllPopups}
    ></ImagePopup>
    <EditAvatarPopup
    onClose={closeAllPopups}
    isOpen={isEditAvatarPopupOpen}
    onUpdateAvatar={handleUpdateAvatar}/>
    <PopupWithForm
    onClose={closeAllPopups}
    name="confirm-delete"
    title="Вы уверены?"
    buttonText="Да">
    </PopupWithForm>

  </CurrentUserContext.Provider>
  );
}

export default App;
