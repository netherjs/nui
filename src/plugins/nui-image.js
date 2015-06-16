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
	
	////////////////
	////////////////
	
	var Struct = {
		Root: (
			jQuery('<img />')
			.attr('src',Property.URL)
			.addClass(Property.Show?(''):('NUI-Hidden'))
			.addClass(Property.Class)
		)
	};
	
	if(Property.Container)
	jQuery(container).append(Struct.Root);

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
	hide the widget.
	//*/

		Struct.Root.hide();
		return this;
	};

	this.Show = function() {
	/*//
	@return self
	show the widget.
	//*/

		Struct.Root.show();
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

NUI.Image.prototype.valueOf = function() {
	return this.Get();
};
