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
	
	////////////////////////
	////////////////////////
	
	this.Struct = {
		Root: (
			jQuery('<button />')
			.addClass('NUI-Widget NUI-Button')
			.text(Property.Label)
		)
	};
	
	if(Property.OnClick) {
		this.Struct.Root
		.on('click',Property.OnClick);
	}
	
	if(Property.Class) {
		this.Struct.Root
		.addClass(Property.Class);
	}

	////////////////////////
	////////////////////////
	
	this.Destroy = NUI.Traits.DestroyFromStruct;
	this.Get = NUI.Traits.GetFromStruct;
	this.Hide = NUI.Traits.HideFromStruct;
	this.Show = NUI.Traits.ShowFromStruct;
};

NUI.Button.prototype.valueOf = NUI.Traits.GetFromStruct;