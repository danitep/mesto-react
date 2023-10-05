export default function Card(props){
    function handleClick() {
        props.onCardClick(props.card);
    }  

    return(
    <li className="element">
        <button className="element__delete" type="button"></button>
        <img 
        src={props.card.link} 
        alt={props.card.name} 
        className="element__image"
        onClick={handleClick}
        />
        <div className="element__info">
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__container">
                <button className="element__like" type="button"></button>
                <p className="element__count">{props.card.likes.length}</p>
            </div>
        </div>
    </li>
    
    )
}
