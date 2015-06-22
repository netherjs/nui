NUI.Traits = {

	GetFromStruct:
	function(what) {
	/*//
	@argv string StructPropertyName default "Root"
	@return jQuery | false
	fetch the requested thing from the struct property. if what was
	requested was not found false will be returned. if nothing was
	specified then the root of the element will be returned.
	//*/
	
		if(what && this.Struct.hasOwnProperty(what)) return this.Struct[what];
		else if(what) return false;
		else return this.Struct.Root;			
	},
	
	DestroyFromStruct:
	function(what) {
	/*//
	@argv string StructPropertyName default "Root"
	@return self
	hide and remove this widget from the DOM. it'll be useless after this.
	//*/

		var el;
		
		if(el = this.Get(what))
		el.hide().remove();			
		
		return this;	
	},
	
	HideFromStruct:
	function(what) {
	/*//
	@argv string StructPropertyName default "Root"
	@return self
	hide this widget.
	//*/
	
		var el;
		
		if(el = this.Get(what))
		el.hide();
		
		return this;
	},
	
	ShowFromStruct:
	function(what) {
	/*//
	@argv string StructPropertyName default "Root"
	@return self
	show this widget.
	//*/
	
		var el;
		
		if(el = this.Get(what))
		el.show();
		
		return this;
	}

};
