/*// NUI.OVerlay //////////////////////////////////////////////////////////////
This provides a widget which covers the entire screen in (with my default css)
a translucent shade of black, blocking access to anything below. You can then
put things inside of it that demand attention.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Overlay = function(opt) {
	var that = this;

	var Property = {
		Container: 'body',
		Content: null,
		Class: null,
		Show: true,
		HandleResize: true,
		OnClick: null,
		OnClose: null
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

	// compile the element.
	Struct.Root
	.append(Property.Content.valueOf());
	
	// allow repositioning when window size changes.
	if(Property.HandleResize) jQuery(window)
	.on('resize',function(){
		var element = Property.Content.valueOf();
		
		if(!element.attr('nui-moved'))
		NUI.Util.CenterInParent(Property.Content.valueOf());
		
		return;
	});
	
	// add the elmeent into the dom.
	if(Property.Container) jQuery(Property.Container)
	.append(Struct.Root);

	// center the child.
	NUI.Util.CenterInParent(Property.Content.valueOf());

	////////////////
	////////////////
	
	this.Close = function() {
		if(Property.OnClose) Property.OnClose();
		else that.Destroy();
		
		return that;
	};
	
	jQuery(Struct.Root)
	.find('.NUI-Overlay-Close')
	.on('click',this.Close);

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
	};

};

NUI.Overlay.prototype.valueOf = function() {
	return this.Get();
};

