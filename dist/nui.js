//// src/nui-main.js //////////////////////////////////////////////////////////
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
		LastX: 0,
		LastY: 0,
		
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


//// src/nui-util.js //////////////////////////////////////////////////////////
/*// NUI Utility //////////////////////////////////////////////////////////////
This contains utility methods that will be used in various parts of the
framework to prevent duplication. But I shouldn't have to explain
software engineering theory to you, i'm sure you got it.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Util = {
	
	MergeProperties:
	function(dom,sub) {
	/*//
	@argv object Override, object Original
	will overwrite the original properties from the original object with
	the properties from the Override object. of course, if they dont exist
	in the Original they will be created too.
	//*/
		
		if(typeof dom !== 'object')
		return;
		
		jQuery.each(dom,function(prop,val){
			sub[prop] = val;
			return;
		});
		
		return;
	},
	
	CenterInParent:
	function(child,parent) {
	/*//
	@argv jQuery ChildObject, jQuery ParentObject
	given these two objects, we will attempt to center the child object
	in the parent object. this means that we are dealing with dom stuff
	and that they are CSS'd to allow positioning properly.
	//*/
	
		if(!parent) parent = child.parent();
	
		var cxoff = child.outerWidth(true) / 2 ;
		var cyoff = child.outerHeight(true) / 2;
		
		var pxcen = parent.width() / 2;
		var pycen = parent.height() / 2;
		
		child.css({
			'left': (pxcen - cxoff) + 'px',
			'top': (pycen - cyoff) + 'px'
		});

		return;
	}
	
};


//// plugins/nui-button.js ////////////////////////////////////////////////////
/*// NUI.Button ///////////////////////////////////////////////////////////////
This provides a button widget that can do stuff when clicked. Amazing.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Button = function(opt) {

	var Property = {
		Label: 'Button',
		Class: null,
		OnClick: null
	};

	NUI.Util.MergeProperties(opt,Property);
	
	////////////////
	////////////////
	
	var Struct = {
		Root: (
			jQuery('<button />')
			.addClass('NUI-Widget NUI-Button')
			.text(Property.Label)
		)
	};
	
	if(Property.OnClick) {
		Struct.Root
		.on('click',Property.OnClick);
	}
	
	if(Property.Class) {
		Struct.Root
		.addClass(Property.Class);
	}

	////////////////
	////////////////
	
	this.Get = function() {
	/*//
	@return jQuery(<div>)
	return the main container object that makes up this widget. you would
	get this for interacting with the widget via jQuery.
	//*/

		return Struct.Root;
	};
	
	this.Show = function() {
	/*//
	@return self
	tell the widget to show itself.
	//*/

		Struct.Root.Show();
		return this;
	};


	this.Hide = function() {
	/*//
	@return self
	tell the widget to hide itself.
	//*/

		Struct.Root.hide();
		return;
	};
	
	return;
};

NUI.Button.prototype.valueOf = function() {
	return this.Get();
}


//// plugins/nui-dialog.js ////////////////////////////////////////////////////
/*// NUI.Dialog ///////////////////////////////////////////////////////////////
This provides a widget which looks and smells like a dialog. It currently is
not movable but that is a planned feature. Right now the most useful thing to
do with this is to shove it into a NUI.Overlay.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Dialog = function(opt) {
	
	var Property = {
		Container: null,
		Title: 'NUI Dialog',
		Content: 'This is a dialog.',
		Class: null,
		Show: true,
		Move: true,
		OnAccept: null,
		OnCancel: null,
		Buttons: []
	};
	
	NUI.Util.MergeProperties(opt,Property);
	
	////////////////
	////////////////
	
	var Struct = {
		Root: (
			jQuery('<div />')
			.addClass('NUI-Widget')
			.addClass('NUI-Dialog')
			.addClass(Property.Show?'NUI-Block':'NUI-Hidden')
			.addClass(Property.Class)
		),
		TitleBar: (
			jQuery('<header />')
			.text(Property.Title)
		),
		Content: (
			jQuery('<section />')
			.html(Property.Content.valueOf())	
		),
		ButtonBar: (
			jQuery('<footer />')
		)
	};

	jQuery.each(Property.Buttons,function(){
		Struct.ButtonBar
		.append(this.valueOf());
	});
	
	Struct.Root
	.append(Struct.TitleBar)
	.append(Struct.Content)
	.append(Struct.ButtonBar);
	
	if(Property.Move) {
		Struct.TitleBar
		.on('mousedown',function(){ NUI.Move.Register(Struct.Root); })
		.on('mouseup',function(){ NUI.Move.Unregister(Struct.Root); });	
	}

	////////////////
	////////////////
	
	this.Accept = function() {
	/*//
	@return self
	tell the widget that the user has accepted whatever the dialog was about
	and to execute the OnAccept action if any.
	//*/
		
		if(Property.OnAccept)
		Property.OnAccept();
		
		return this;
	};
	
	this.Cancel = function() {
	/*//
	@return self
	tell the widget that the user has canceled whatever the dialog was about
	and to execute the OnCancel action if any.
	//*/
		
		if(Property.OnCancel)
		Property.OnCancel();

		return this;
	};
	
	Struct.Root.find('.NUI-Dialog-Accept')
	.click(this.Accept);
	
	Struct.Root.find('.NUI-Dialog-Cancel')
	.click(this.Cancel);
	
	////////////////
	////////////////
	
	this.Get = function() {
	/*//
	@return jQuery(<div>)
	return the main container object that makes up this widget. you would
	get this for interacting with the widget via jQuery.
	//*/

		return Struct.Root;	
	};
	
	this.Show = function() {
	/*//
	@return self
	tell the widget to show itself.
	//*/

		Struct.Root.show();
		return;
	};

	this.Hide = function() {
	/*//
	@return self
	tell the widget to hide itself.
	//*/

		Struct.Root.hide();
		return;
	};

};

NUI.Dialog.prototype.valueOf = function() {
	return this.Get();
};


//// plugins/nui-overlay.js ///////////////////////////////////////////////////
/*// NUI.OVerlay //////////////////////////////////////////////////////////////
This provides a widget which covers the entire screen in (with my default css)
a translucent shade of black, blocking access to anything below. You can then
put things inside of it that demand attention.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Overlay = function(opt) {

	var Property = {
		Container: 'body',
		Content: null,
		Class: null,
		Show: true
	};

	NUI.Util.MergeProperties(opt,Property);

	////////////////
	////////////////

	var Struct = {
		Root: (
			jQuery('<div />')
			.addClass('NUI-Widget')
			.addClass('NUI-Overlay')
			.addClass(Property.Show===true?'NUI-Block':'NUI-Hidden')
			.addClass(Property.Class)
		)
	};

	jQuery(Property.Container).append(
		Struct.Root
		.append(Property.Content.valueOf())
	);

	NUI.Util.CenterInParent(Property.Content.valueOf());

	////////////////
	////////////////
	
	this.Get = function() {
	/*//
	@return jQuery(<div>)
	return the main container object that makes up this widget. you would
	get this for interacting with the widget via jQuery.
	//*/

		return Struct.Root;
	};

	this.Hide = function() {
	/*//
	@return self
	tell the overlay to go away for now.
	//*/

		Struct.Root.hide();
		return this;
	};

	this.Show = function() {
	/*//
	@return self
	tell the overlay to come back. also centers whatever is inside it.
	//*/

		Struct.Root.show();
		NUI.Util.CenterInParent(Property.Content.valueOf());
		return this;
	};

	this.Destroy = function() {
	/*//
	@return self
	hide and remove the widget from the dom. use when done with it.
	//*/

		this.Hide();
		Struct.Root.remove();
		return this;
	}

};

NUI.Overlay.prototype.valueOf = function() {
	return this.Get();
};



