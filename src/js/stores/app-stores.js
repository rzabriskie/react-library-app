var AppDispatcher = require('../dispatchers/app-dispatchers');
var AppConstants = require('../constants/app-constants');
// var assign = require('react/lib/Object.assign');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _library = [];

for(var i=1; i<6; i++){
  _library.push({
    'id': 'Book_' + i,
    'title':'Sherlock Holmes Story ' + i,
    'description': 'Sherlock Series by Sir Arthur Conan Doyle'
  });
}

var _readingItems = [];

function _removeItem(index){
  _readingItems[index].inReadingList = false;
  _readingItems.splice(index, 1);
}

function _increaseItem(index){
  _readingItems[index].qty++;
}

function _decreaseItem(index){
  if(_readingItems[index].qty>1){
    _readingItems[index].qty--;
  }
  else {
    _removeItem(index);
  }
}

function _addItem(item){
  if(!item.inReadingList){
    item['qty'] = 1;
    item['inReadingList'] = true;
    _readingItems.push(item);
  }
  else {
    _readingItems.forEach(function(cartItem, i){
      if(cartItem.id===item.id){
        _increaseItem(i);
      }
    });
  }
}



var AppStore = assign(EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },

  getReadingList: function(){
    return _readingItems
  },

  getLibrary: function(){
    return _library
  },


  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.ADD_BOOK:
        _addItem(payload.action.item);
        break;

      case AppConstants.DELETE_BOOK:
        _removeItem(payload.action.index);
        break;

      case AppConstants.INC_BOOK_COUNT:
        _increaseItem(payload.action.index);
        break;

      case AppConstants.DEC_BOOK:
        _decreaseItem(payload.action.index);
        break;
    }

    AppStore.emitChange();

    return true;
  })

})

module.exports = AppStore;
