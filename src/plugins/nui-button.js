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
