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
		Moveable: true,
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
	if(Property.Moveable) Struct.TitleBar
	.on('mousedown',function(){ NUI.Move.Register(Struct.Root); })
	.on('mouseup',function(){ NUI.Move.Unregister(Struct.Root); });	
	
	// add the elmeent into the dom.
	if(Property.Container)
	jQuery(Property.Container).append(Struct.Root);

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
