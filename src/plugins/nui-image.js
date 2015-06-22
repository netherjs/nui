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
	
	////////////////////////
	////////////////////////
	
	this.Struct = {
		Root: (
			jQuery('<img />')
			.attr('src',Property.URL)
			.addClass(Property.Show?(''):('NUI-Hidden'))
			.addClass(Property.Class)
		)
	};
	
	if(Property.Container) {
		jQuery(Property.Container)
		.append(this.Struct.Root);
	}

	////////////////////////
	////////////////////////

	this.Destroy = NUI.Traits.DestroyFromStruct;
	this.Get = NUI.Traits.GetFromStruct;
	this.Hide = NUI.Traits.HideFromStruct;
	this.Show = NUI.Traits.ShowFromStruct;
};

NUI.Image.prototype.valueOf = NUI.Traits.GetFromStruct;
