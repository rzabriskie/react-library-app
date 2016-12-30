var Dispatcher = require('flux').Dispatcher;
// var assign = require('react/lib/Object.assign');
var assign = require('object-assign');
/*AppDispatcher is an instance of the Dispatcher from the flux package with some addtional preprties(action in this case).
It has the handleViewAction method which passes the action to be passed to the registered Store via the callback.
In flux package, lib/Dispatcher.js check the Dispatcher.prototype.dispatch function, which actually dispatches the payload to the Store, which has the callback registered to it.
*/
var AppDispatcher = assign(new Dispatcher(),{
	handleViewAction: function(action){
	  console.log('action',action);
	  this.dispatch ({
	    source: 'VIEW_ACTION',
	    action: action
	  })
	}
});


module.exports = AppDispatcher;
