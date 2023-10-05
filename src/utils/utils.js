import Card from '../components/Card.js'

export const createCardObject = (popupImageInfo, profileId, api)=>{
    const card = new Card({
        data: popupImageInfo.cardInfo,
        handleCardClick:(name, link)=>{
            const imageInfo = {
                name: name,
                src: link
            }
            popupImageInfo.popup.open(imageInfo);
        },
        handleLikeClick:(isLiked, cardId, evt)=>{
            if(!isLiked){
                api.setLike(cardId)
                .then((data)=>{
                    evt.target.classList.toggle('element__like_active');
                    card.setLikeCount(data.likes.length)
                })
                .catch((err) => {
                    console.log(err);
                })  
            }
            else{
                api.deleteLike(cardId)
                .then((data)=>{
                    evt.target.classList.toggle('element__like_active');
                    card.setLikeCount(data.likes.length)
                })
                .catch((err) => {
                    console.log(err);
                }) 
            }
        },
        popupConfirm: popupImageInfo.popupConfirm,
        profileId: profileId
    }, 
    popupImageInfo.templateSelector);
    return card;
}