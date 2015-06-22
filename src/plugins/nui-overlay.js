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

	////////////////////////
	////////////////////////

	this.Struct = {
		Root: (
			jQuery('<div />')
			.addClass('NUI-Widget')
			.addClass('NUI-Overlay')
			.addClass(Property.Show===true?'NUI-Block':'NUI-Hidden')
			.addClass(Property.Class)
		)
	};

	// compile the element.
	this.Struct.Root
	.append(Property.Content.valueOf());
	
	// allow repositioning when window size changes.
	if(Property.HandleResize) {
		jQuery(window).on('resize',function(){
			var element = Property.Content.valueOf();
			
			if(!element.attr('nui-moved'))
			NUI.Util.CenterInParent(Property.Content.valueOf());
			
			return;
		});
	}
	
	// add the elmeent into the dom.
	if(Property.Container) {
		jQuery(Property.Container)
		.append(this.Struct.Root);
	}

	// center the child.
	if(Property.Content) {
		NUI.Util.CenterInParent(Property.Content.valueOf());
	}

	////////////////////////
	////////////////////////
	
	this.Close = function() {
		if(Property.OnClose) Property.OnClose();
		else that.Destroy();
		
		return that;
	};
	
	jQuery(this.Struct.Root)
	.find('.NUI-Overlay-Close')
	.on('click',this.Close);

	////////////////////////
	////////////////////////
	
	this.Destroy = NUI.Traits.DestroyFromStruct;
	this.Get = NUI.Traits.GetFromStruct;
	this.Hide = NUI.Traits.HideFromStruct;
	this.Show = NUI.Traits.ShowFromStruct;
};

NUI.Overlay.prototype.valueOf = NUI.Traits.GetFromStruct;

