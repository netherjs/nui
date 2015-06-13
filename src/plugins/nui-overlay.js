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

