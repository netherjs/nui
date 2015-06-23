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
		else this.Destroy();
		
		return this;
	};
	
	this.Cancel = function() {
	/*//
	@return self
	tell the widget that the user has canceled whatever the dialog was about
	and to execute the OnCancel action if any.
	//*/
	
		if(Property.IsBusy) return;
		
		if(Property.OnCancel) Property.OnCancel();
		else this.Destroy();

		return this;
	};
	
	this.Close = function() {
	/*//
	@return self
	tell the widget that the user has canceled the dialog via the close button.
	//*/
	
		if(Property.IsBusy) return;
		
		if(Property.OnClose) Property.OnClose();
		else if(Property.OnCancel) Property.OnCancel();
		else this.Destroy();
	
		return this;
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
	
	this.Destroy = NUI.Traits.DestroyFromStruct;
	this.Get = NUI.Traits.GetFromStruct;
	this.Show = NUI.Traits.ShowFromStruct;
	this.Hide = NUI.Traits.HideFromStruct;		
};

NUI.Dialog.prototype.valueOf = NUI.Traits.GetFromStruct;
