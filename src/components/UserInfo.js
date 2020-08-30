export default class UserInfo{
  constructor({nameSelector, professionSelector, avatarSelector}){
    this._nameElement = document.querySelector(nameSelector);
    this._professionElement = document.querySelector(professionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo(){
    return {
      name: this._nameElement.textContent,
      profession: this._professionElement.textContent
    };
  }

  setUserInfo({name, profession, avatar, userId}){
    if(typeof name !== 'undefined' && typeof profession !== 'undefined'){
      this._nameElement.textContent = name;
      this._professionElement.textContent = profession;
    }
    if(typeof avatar !== 'undefined'){
      this._avatarElement.setAttribute('src', avatar);
    }
    if(typeof userId !== 'undefined'){
      this._userId = userId;
    }
  }

  getUserId(){
    return this._userId;
  }
}
