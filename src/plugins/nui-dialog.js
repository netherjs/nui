/*// NUI.Dialog ///////////////////////////////////////////////////////////////
This provides a widget which looks and smells like a dialog. It currently is
not movable but that is a planned feature. Right now the most useful thing to
do with this is to shove it into a NUI.Overlay.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Dialog = function(opt) {
	
	var Property = {
		Container: 'body',
		Title: 'NUI Dialog',
		Content: 'This is a dialog.',
		Class: null,
		Show: true,
		Fixed: true,
		Moveable: true,
		Position: null,
		OnAccept: null,
		OnCancel: null,
		OnShow: null,
		Buttons: [],
		Height: 'auto',
		Width: 'auto'
	};
	
	NUI.Util.MergeProperties(opt,Property);
	
	////////////////
	////////////////
	
	var Struct = {
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

	// compile the button bar.
	jQuery.each(Property.Buttons,function(){
		Struct.ButtonBar
		.append(this.valueOf());
	});
	
	// compile the dialog.
	Struct.Root
	.append(Struct.TitleBar)
	.append(Struct.Content)
	.append(Struct.ButtonBar);
	
	// apply settings.
	if(Property.Moveable) {
		Struct.TitleBar
		.addClass('NUI-Moveable')
		.on('mousedown',function(){ NUI.Move.Register(Struct.Root); })
		.on('mouseup',function(){ NUI.Move.Unregister(Struct.Root); });
	}	
	
	// add the element into the dom.
	if(Property.Container) {
		jQuery(Property.Container)
		.append(Struct.Root);	
	}
	
	if(Property.Position) {
		Struct.Root
		.css({
			'top': Property.Position[1],
			'left': Property.Position[0]
		});
	} else {
		NUI.Util.CenterInParent(Struct.Root);
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
	
	this.SetLoading = function(state) {
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
	
		if(state) {
			Struct.ButtonBar.find('button').hide();
			Struct.ButtonBar.find('img').show();
		} else {
			Struct.ButtonBar.find('img').hide();
			Struct.ButtonBar.find('button').show();
		}
		
		return this;
	};
	
	////////////////
	////////////////
	
	this.Get = function(prop) {
	/*//
	@return jQuery(*)
	return the specified structure from the private Struct property. if
	nothing is specified then you will be handed Struct.Root by default.
	//*/
	
		return NUI.Util.GetStructProperty(prop,Struct);
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
	
	this.Destroy = function() {
	/*//
	@return self
	hide and remove the widget from the dom. use when done with it.
	//*/

		this.Hide();
		Struct.Root.remove();
		return this;
	};

};

NUI.Dialog.prototype.valueOf = function() {
	return this.Get();
};
