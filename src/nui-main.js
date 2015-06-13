/*// NUI - Nether UI //////////////////////////////////////////////////////////
The framework made by someone who hates Javascript for people who hate
Javascript. This here is the main file. Currently it does not do much except
pop open the placeholder object for the other programs to screw with. I'm sure
it will look more useful in the future.
/////////////////////////////////////////////////////////////////////////////*/

var NUI = {
	
	GetVersion:
	function() { return '1.0.0'; },

	Move: {
	/*//
	this subobject will hold the API for allowing for and moving any widgets
	which wish to be moved around the screen by dragging them around.
	//*/

		Queue: [],
		/*//
		@type array
		a list of all the objects that which to be moved.
		//*/
		
		LastX: 0, LastY: 0,
		/*//
		@type int
		the last known position of the mouse prior to the current move.
		//*/
		
		On:
		function(e){
		/*//
		@argv Event EventObject
		handle moving any widgets which have requested to be moved. this
		queue system will allow us to select multiple things to move at
		once if we so choose to do so later, maybe like for some icon list
		or whatever.
		//*/
			
			var DeltaX = this.LastX - e.clientX;
			var DeltaY = this.LastY - e.clientY;
			
			if(this.Queue.length)
			jQuery.each(this.Queue,function(key,object){
				object.offset(function(idx,pos){
					object.attr('nui-moved','true');
					return {
						left: (pos.left - DeltaX),
						top: (pos.top - DeltaY)
					};
				});
			});
			
			this.LastX = e.clientX;
			this.LastY = e.clientY;
			return;
		},
		
		Register:
		function(object){
		/*//
		@argv jQuery Object
		add something to the list of things that wants to be moved around
		so that it can be processed later.
		//*/
		
			var found = false;
			jQuery.each(this.Queue,function(key,value){
				if(value === object) found = true;
			});
			
			if(!found) {
				jQuery('body').addClass('NUI-NoSelect');
				this.Queue.push(object);
			}
			
			return;
		},
		
		Unregister:
		function(object){
		/*//
		@argv jQuery Object
		remove something from the list of things that wants to be moved
		around so that it stops moving around.
		//*/
		
			var found = false;
			var that = this;
			jQuery.each(this.Queue,function(key,value){
				if(value === object) {
					that.Queue.splice(key,1);
				}
			});
			
			if(!that.Queue.length)
			jQuery('body').removeClass('NUI-NoSelect');
			
			return;		
		}		
	}

};

jQuery(document).ready(function(){
	
	jQuery(this)
	.on('mousemove',function(e){ NUI.Move.On(e); });
	
});
