export default class Card{

  constructor({data, cardSelector, cardClickHandler}) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._cardClickHandler = cardClickHandler;
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
    this._like = this._element.querySelector('.places__like');
    this._picture = this._element.querySelector('.places__picture');

    this._setEventListeners();

    this._element.querySelector('.places__title').textContent = this._data.name;
    this._picture.setAttribute('src', this._data.link);
    this._picture.setAttribute('alt', this._data.name);

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
    this._element.remove();
    this._element = null;
  }
}
