import Card from '../components/Card.js';

export const createCardMarkup = ({item, picturePopup}) => {
  const card = new Card(
    {
      data: item,
      cardSelector: '#place-template',
      cardClickHandler : (link, title) => {
        picturePopup.open(link, title);
      }
    }
  )
  return card.generateCard();
}
