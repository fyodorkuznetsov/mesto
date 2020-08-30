export default class Card{

  constructor({data, cardSelector, cardClickHandler, deleteHandler, likeHandler}) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._cardClickHandler = cardClickHandler;
    this._deleteHandler = deleteHandler;
    this._likeHandler = likeHandler;
    this._id = data.id;
    this._isMine = data.isOwner;
    this._isLiked = data.isLiked;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.places__place')
      .cloneNode(true);

    return cardElement;
  }

  generateCard(){
    this._element = this._getTemplate();
    this._removeBtn = this._element.querySelector('.places__remove');
    this._like = this._element.querySelector('.places__like-btn');
    this._picture = this._element.querySelector('.places__picture');
    this._likeCounter = this._element.querySelector('.places__like-counter');


    this._setEventListeners();

    if(this._isLiked){
      this._like.classList.toggle('places__like-btn_state_active');
    }

    if(!this._isMine){
      this._removeBtn.remove();
      this._removeBtn = null;
    }

    this._element.querySelector('.places__title').textContent = this._data.name;
    this._picture.setAttribute('src', this._data.link);
    this._picture.setAttribute('alt', this._data.name);
    this._likeCounter.textContent = this._data.likes > 0 ? this._data.likes : 0;

    return this._element;
  }

  _setEventListeners(){
    /*open picture popup*/
    this._picture.addEventListener('click', () => {
      this._cardClickHandler(
        {
          link: this._data.link,
          name: this._data.name
        }
      );
    });

    this._like.addEventListener('click', this._likeHandler.bind(this));
    this._removeBtn.addEventListener('click', this._deleteHandler.bind(this));
  }

  processLikeBtnClick(){
    this._like.classList.toggle('places__like-btn_state_active');
  }

  updateLikeCounter(count){
    this._likeCounter.textContent = count;
  }

  removeElement(){
    this._element.remove();
    this._element = null;
  }

  isLiked(){
    return this._like.classList.contains('places__like-btn_state_active');
  }
}
