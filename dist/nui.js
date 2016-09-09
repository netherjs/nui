/*// nether-onescript //
@date 2016-09-09 15:18:35
@files [
    "src\/nui-main.js",
    "src\/nui-traits.js",
    "src\/nui-util.js",
    "src\/plugins\/nui-button.js",
    "src\/plugins\/nui-dialog.js",
    "src\/plugins\/nui-image.js",
    "src\/plugins\/nui-overlay.js"
]
//*/

///////////////////////////////////////////////////////////////////////////
// src/nui-main.js ////////////////////////////////////////////////////////

/*// NUI - Nether UI //////////////////////////////////////////////////////////
The framework made by someone who hates Javascript for people who hate
Javascript. This here is the main file. Currently it does not do much except
pop open the placeholder object for the other programs to screw with. I'm sure
it will look more useful in the future.
/////////////////////////////////////////////////////////////////////////////*/

var NUI = {

	GetVersion:
	function() { return '1.0.1'; },

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

///////////////////////////////////////////////////////////////////////////
// src/nui-traits.js //////////////////////////////////////////////////////

NUI.Traits = {

	GetFromStruct:
	function(What) {
	/*//
	@argv string StructPropertyName default "Root"
	@return jQuery | false
	fetch the requested thing from the struct property. if what was
	requested was not found false will be returned. if nothing was
	specified then the root of the element will be returned.
	//*/

		if(What && this.Struct.hasOwnProperty(What)) return this.Struct[What];
		else if(What) return false;
		else return this.Struct.Root;
	},

	DestroyFromStruct:
	function(What) {
	/*//
	@argv string StructPropertyName default "Root"
	@return self
	hide and remove this widget from the DOM. it'll be useless after this.
	//*/

		var Element = this.Get(What);

		// kill it with fire via jquery.
		if(Element)
		Element.hide().remove();

		// allow the element to do things it needs on show.
		if(typeof this.OnDestroy === 'function')
		this.OnHide();

		// allow any custom show events.
		if(typeof this.GetProperty === "function")
		if(typeof this.GetProperty('OnDestroy') === "function")
		this.GetProperty('OnDestroy')();

		return this;
	},

	HideFromStruct:
	function(What) {
	/*//
	@argv string StructPropertyName default "Root"
	@return self
	hide this widget.
	//*/

		var Element = this.Get(What);

		// make it invisible via jquery.
		if(Element)
		Element.hide();

		// allow the element to do things it needs on show.
		if(typeof this.OnHide === 'function')
		this.OnHide();

		// allow any custom show events.
		if(typeof this.GetProperty === "function")
		if(typeof this.GetProperty('OnHide') === "function")
		this.GetProperty('OnHide')();

		return this;
	},

	ShowFromStruct:
	function(What) {
	/*//
	@argv string StructPropertyName default "Root"
	@return self
	show this widget.
	//*/

		var Element = this.Get(What);

		// make it visible via jquery.
		if(Element)
		Element.show().removeClass('NUI-Hidden');

		// allow the element to do things it needs on show.
		if(typeof this.OnShow === 'function')
		this.OnShow();

		// allow any custom show events.
		if(typeof this.GetProperty === "function")
		if(typeof this.GetProperty('OnShow') === "function")
		this.GetProperty('OnShow')();

		return this;
	}

};

///////////////////////////////////////////////////////////////////////////
// src/nui-util.js ////////////////////////////////////////////////////////

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
	
	GetProperty:
	function(request,source) {
	/*//
	@argv string Property, object Source
	request a specific property from an object. this function is designed
	to work with generic private properites from objects.
	//*/
	
		if(source.hasOwnProperty(request)) return source[request];
		else return false;		
	},
	
	GetStructProperty:
	function(request,source) {
	/*//
	@argv string Property, object Source
	request a specific property from an object. this function is designed to
	work with the Struct private properites in the UI classes - if no request
	is specified then it automatically returns the Root property which should
	exist in all NUI elements i didn't stuff up consistancy. this method is
	to make writing the Get methods easy.
	//*/
	
		if(request) return NUI.Util.GetProperty(request,source);
		else return source.Root;
	},
	
	CenterInParent:
	function(child,parent) {
	/*//
	@argv jQuery ChildObject, jQuery ParentObject
	given these two objects, we will attempt to center the child object
	in the parent object. this means that we are dealing with dom stuff
	and that they are CSS'd to allow positioning properly.
	//*/
	
		var cxoff = child.outerWidth(true) / 2 ;
		var cyoff = child.outerHeight(true) / 2;
		var pxcen = 0;
		var pycen = 0;
		var pxoff = 0;
		var pyoff = 0;

		if(!parent) {
			// if we didn't specify, find what the object is packed
			// inside of.
			parent = child.parent();
		}

		if(parent === window || parent[0] === jQuery('body')[0]) {
			// if it turns out its the body or the viewport, lets
			// use the viewport for math instead.
			parent = jQuery(window);

			if(child.css('position') === 'absolute') {
				// if we are using the window, and the item wants
				// to be positioned aboslute, add an offset so that
				// no matter where scrolled, it shows up in the center
				// of the viewport (rather than, the center of the
				// entire length of the body which could be off the
				// viewport completely).
				
				pyoff = jQuery(document).scrollTop();
			}
		}
		
		if(parent !== window) {
			pxcen = parent.width() / 2;
			pycen = parent.height() / 2;
		} else {
			pxcen = jQuery(window).width() / 2;
			pycen = jQuery(window).height() / 2;
		}
		
		child.css({
			'left': ((pxcen - cxoff) + pxoff) + 'px',
			'top': ((pycen - cyoff) + pyoff) + 'px'
		});

		return;
	}
	
};

///////////////////////////////////////////////////////////////////////////
// src/plugins/nui-button.js //////////////////////////////////////////////

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

	////////////////////////
	////////////////////////

	this.Struct = {
		Root: (
			jQuery('<button />')
			.addClass('NUI-Widget NUI-Button')
			.text(Property.Label)
		)
	};

	if(Property.OnClick) {
		this.Struct.Root
		.on('click',Property.OnClick);
	}

	if(Property.Class) {
		this.Struct.Root
		.addClass(Property.Class);
	}

	////////////////////////
	////////////////////////

	this.GetProperty = function(Key){
		if(typeof Property[Key] !== "undefined")
		return Property[Key];

		else
		return Property;
	};

	this.Destroy = NUI.Traits.DestroyFromStruct;
	this.Get = NUI.Traits.GetFromStruct;
	this.Hide = NUI.Traits.HideFromStruct;
	this.Show = NUI.Traits.ShowFromStruct;
};

NUI.Button.prototype.valueOf = NUI.Traits.GetFromStruct;

///////////////////////////////////////////////////////////////////////////
// src/plugins/nui-dialog.js //////////////////////////////////////////////

/*// NUI.Dialog ///////////////////////////////////////////////////////////////
This provides a widget which looks and smells like a dialog. It currently is
not movable but that is a planned feature. Right now the most useful thing to
do with this is to shove it into a NUI.Overlay.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Dialog = function(opt) {
	var that = this;

	////////////////////////
	////////////////////////

	var Property = {
		Container: 'body',
		Title: 'NUI Dialog',
		CloseLabel: '&times;',
		Content: 'This is a dialog.',
		Class: null,
		Show: true,
		Fixed: true,
		Moveable: true,
		Position: null,
		OnAccept: null,
		OnCancel: null,
		OnShow: null,
		OnClose: null,
		Buttons: [],
		Height: 'auto',
		Width: 'auto',
		IsBusy: false
	};

	NUI.Util.MergeProperties(opt,Property);

	////////////////////////
	////////////////////////

	this.Struct = {
		Root: (
			jQuery('<div />')
			.addClass('NUI-Widget')
			.addClass('NUI-Dialog')
			.addClass(Property.Show===true?'NUI-Block':'NUI-Hidden')
			.addClass(Property.Fixed===true?'NUI-PositionFixed':'NUI-PositionAbsolute')
			.addClass(Property.Class)
			.css({ 'height':Property.Height,'width':Property.Width })
		),
		TitleBar: (
			jQuery('<header />')
			.append(
				jQuery('<button />')
				.html(Property.CloseLabel)
				.on('mousedown',function(e){ return false; })
				.on('click',function(e){ that.Close(); return false; })
			)
			.append(
				jQuery('<span />')
				.text(Property.Title)
			)
		),
		Content: (
			jQuery('<section />')
			.html(Property.Content.valueOf())
		),
		ButtonBar: (
			jQuery('<footer />')
		)
	};

	////////////////////////
	////////////////////////

	// compile the dialog.
	this.Struct.Root
	.append(this.Struct.TitleBar)
	.append(this.Struct.Content)
	.append(this.Struct.ButtonBar);

	// compile the button bar.
	jQuery.each(Property.Buttons,function(){
		that.Struct.ButtonBar
		.append(this.valueOf());
	});

	// make the dialog moveable.
	if(Property.Moveable) {
		this.Struct.TitleBar
		.addClass('NUI-Moveable')
		.on('mousedown',function(){ NUI.Move.Register(that.Struct.Root); })
		.on('mouseup',function(){ NUI.Move.Unregister(that.Struct.Root); });
	}

	// add dialog to the page.
	if(Property.Container) {
		jQuery(Property.Container)
		.append(this.Struct.Root);
	}

	// position the dialog.
	if(Property.Position) {
		this.Struct.Root
		.css({
			'top': Property.Position[1],
			'left': Property.Position[0]
		});
	} else {
		NUI.Util.CenterInParent(this.Struct.Root);
	}

	////////////////////////
	////////////////////////

	this.Accept = function() {
	/*//
	@return self
	tell the widget that the user has accepted whatever the dialog was about
	and to execute the OnAccept action if any.
	//*/

		if(Property.IsBusy) return;

		if(Property.OnAccept) Property.OnAccept();
		else that.Destroy();

		return that;
	};

	this.Cancel = function() {
	/*//
	@return self
	tell the widget that the user has canceled whatever the dialog was about
	and to execute the OnCancel action if any.
	//*/

		if(Property.IsBusy) return;

		if(Property.OnCancel) Property.OnCancel();
		else that.Destroy();

		return that;
	};

	this.Close = function() {
	/*//
	@return self
	tell the widget that the user has canceled the dialog via the close button.
	//*/

		if(Property.IsBusy) return;

		if(Property.OnClose) Property.OnClose();
		else if(Property.OnCancel) Property.OnCancel();
		else that.Destroy();

		return that;
	};

	this.Struct.Root
	.find('.NUI-Dialog-Accept')
	.click(this.Accept);

	this.Struct.Root
	.find('.NUI-Dialog-Cancel')
	.click(this.Cancel);

	this.Struct.Root
	.find('.NUI-Dialog-Close')
	.click(this.Cancel);

	////////////////////////
	////////////////////////

	this.SetBusy = function(state) {
	/*//
	@argv bool IsThinking
	@return self
	a convenience method. it will hide any buttons in the footer and show any
	images in there. allows you to do something like throw a hidden NUI.Image
	in the buttons array to quickly toggle a "please wait" style display while
	the OnAccept waits on async stuff (or whatever you wish). this does assume
	however that you ONLY add NUI.Button or NUI.Image to the button bar of the
	dialog. if you do not add a hidden NUI.Image, it will appear to have no
	effect other than hiding any buttons in there.
	//*/

		Property.IsBusy = state;

		if(state) {
			this.Struct.ButtonBar
			.find('button').hide();

			this.Struct.ButtonBar
			.find('img').show();
		} else {
			this.Struct.ButtonBar
			.find('img').hide();

			this.Struct.ButtonBar
			.find('button').show();
		}

		return this;
	};

	////////////////
	////////////////

	this.GetProperty = function(Key){
		if(typeof Property[Key] !== "undefined")
		return Property[Key];

		else
		return Property;
	};

	this.Destroy = NUI.Traits.DestroyFromStruct;
	this.Get = NUI.Traits.GetFromStruct;
	this.Show = NUI.Traits.ShowFromStruct;
	this.Hide = NUI.Traits.HideFromStruct;
};

NUI.Dialog.prototype.valueOf = NUI.Traits.GetFromStruct;

///////////////////////////////////////////////////////////////////////////
// src/plugins/nui-image.js ///////////////////////////////////////////////

/*// NUI.Image //////////////////////////////////////////////////////////////
It's uh... an image.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Image = function(opt) {

	var Property = {
		Container: null,
		Class: null,
		URL: null,
		Show: true
	};

	NUI.Util.MergeProperties(opt,Property);

	////////////////////////
	////////////////////////

	this.Struct = {
		Root: (
			jQuery('<img />')
			.attr('src',Property.URL)
			.addClass(Property.Show?(''):('NUI-Hidden'))
			.addClass(Property.Class)
		)
	};

	if(Property.Container) {
		jQuery(Property.Container)
		.append(this.Struct.Root);
	}

	////////////////////////
	////////////////////////

	this.GetProperty = function(Key){
		if(typeof Property[Key] !== "undefined")
		return Property[Key];

		else
		return Property;
	};

	this.Destroy = NUI.Traits.DestroyFromStruct;
	this.Get = NUI.Traits.GetFromStruct;
	this.Hide = NUI.Traits.HideFromStruct;
	this.Show = NUI.Traits.ShowFromStruct;
};

NUI.Image.prototype.valueOf = NUI.Traits.GetFromStruct;

///////////////////////////////////////////////////////////////////////////
// src/plugins/nui-overlay.js /////////////////////////////////////////////

/*// NUI.OVerlay //////////////////////////////////////////////////////////////
This provides a widget which covers the entire screen in (with my default css)
a translucent shade of black, blocking access to anything below. You can then
put things inside of it that demand attention.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Overlay = function(Input) {
	var that = this;

	////////////////////////
	////////////////////////

	var Property = {
		Container: 'body',
		Content: null,
		Class: null,
		Show: true,
		HandleResize: true,
		OnClick: null,
		OnClose: null,
		OnShow: null
	};

	NUI.Util.MergeProperties(Input,Property);

	////////////////////////
	////////////////////////

	this.Struct = {
		Root: (
			jQuery('<div />')
			.addClass('NUI-Widget NUI-Hidden')
			.addClass('NUI-Overlay')
			.addClass(Property.Class)
		)
	};

	this.Struct.Root
	.append(Property.Content.valueOf());

	////////////////////////
	////////////////////////

	if(Property.HandleResize) {
		jQuery(window).on('resize',function(){
			var element = that.Struct.Root.find(':first-child');

			if(!element.attr('nui-moved'))
			NUI.Util.CenterInParent(element);

			return;
		});
	}

	if(Property.Container) {
		jQuery(Property.Container)
		.append(this.Struct.Root);
	}

	////////////////////////
	////////////////////////

	this.Close = function() {
		if(Property.OnClose) Property.OnClose();
		else that.Destroy();

		return that;
	};

	jQuery(this.Struct.Root)
	.find('.NUI-Overlay-Close')
	.on('click',this.Close);

	////////////////////////
	////////////////////////

	this.OnShow = function() {
		jQuery(window).resize();
		return;
	};

	this.GetProperty = function(Key){
		if(typeof Property[Key] !== "undefined")
		return Property[Key];

		else
		return Property;
	};

	this.Destroy = NUI.Traits.DestroyFromStruct.bind(this);
	this.Get = NUI.Traits.GetFromStruct.bind(this);
	this.Hide = NUI.Traits.HideFromStruct.bind(this);
	this.Show = NUI.Traits.ShowFromStruct.bind(this);

	////////////////////////
	////////////////////////

	if(Property.Show) {
		this.Show();
	}

};

NUI.Overlay.prototype.valueOf = NUI.Traits.GetFromStruct;

