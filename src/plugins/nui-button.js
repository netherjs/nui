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
		Container: (
			jQuery('<button />')
			.addClass('NUI-Widget NUI-Button')
			.text(Property.Label)
		)
	};
	
	if(Property.OnClick) {
		Struct.Container
		.on('click',Property.OnClick);
	}
	
	if(Property.Class) {
		Struct.Container
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

		return Struct.Container;
	};
	
	this.Show = function() {
	/*//
	@return self
	tell the widget to show itself.
	//*/

		Struct.Container.Show();
		return this;
	};


	this.Hide = function() {
	/*//
	@return self
	tell the widget to hide itself.
	//*/

		Struct.Container.hide();
		return;
	};
	
	return;
};

NUI.Button.prototype.valueOf = function() {
	return this.Get();
}
