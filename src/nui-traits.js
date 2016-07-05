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
