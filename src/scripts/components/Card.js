export default class Card{

  constructor({data, cardSelector, cardClickHandler}) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._cardClickHandler = cardClickHandler;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);

    return cardElement;
  }

  generateCard(){
    this._element = this._getTemplate();
    this._removeBtn = this._element.querySelector('.places__remove');
    this._like = this._element.querySelector('.places__like');

    this._setEventListeners();

    this._element.querySelector('.places__title').textContent = this._name;
    this._element.querySelector('.places__picture').setAttribute('src', this._link);
    this._element.querySelector('.places__picture').setAttribute('alt', this._name);

    return this._element;
  }

  _setEventListeners(){
    /*open picture popup*/
    this._element.querySelector('.places__picture').addEventListener('click', () => {
      this._cardClickHandler(this._link, this._name);
    });

    /* like event */
    this._like.addEventListener('click',this._handleLikeBtnClick.bind(this));
    /* remove event*/
    this._removeBtn.addEventListener('click', this._handleRemoveBtnClick.bind(this));
  }

  _handleLikeBtnClick(evt){
    evt.preventDefault();
    this._like.classList.toggle('places__like_state_active');
  }

  _handleRemoveBtnClick(evt){
    evt.preventDefault();
    evt.target.closest('.places__place').remove();
  }
}
