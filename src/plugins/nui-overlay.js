/*// NUI.OVerlay //////////////////////////////////////////////////////////////
This provides a widget which covers the entire screen in (with my default css)
a translucent shade of black, blocking access to anything below. You can then
put things inside of it that demand attention.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Overlay = function(opt) {

	var Property = {
		Container: 'body',
		Content: null
	};
	
	NUI.Util.MergeProperties(opt,Property);	

	////////////////
	////////////////

	var Struct = {
		Container: (
			jQuery('<div />')
			.addClass('NUI-Widget')
			.addClass('NUI-Overlay')
		)
	};
	
	jQuery(Property.Container).append(
		Struct.Container
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

		return Struct.Container;
	};
	
	this.Hide = function() {
	/*//
	@return self
	tell the overlay to go away for now.
	//*/
	
		Struct.Container.hide();
		return this;
	};
	
	this.Show = function() {
	/*//
	@return self
	tell the overlay to come back. also centers whatever is inside it.
	//*/
	
		Struct.Container.show();
		NUI.Util.CenterInParent(Property.Content.valueOf());
		return this;
	};
	
	this.Destroy = function() {
	/*//
	@return self
	hide and remove the widget from the dom. use when done with it.
	//*/
	
		this.Hide();		
		Struct.Container.remove();		
		return this;
	}

};

NUI.Overlay.prototype.valueOf = function() {
	return this.Get();
};

