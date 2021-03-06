/*// NUI.OVerlay //////////////////////////////////////////////////////////////
This provides a widget which covers the entire screen in (with my default css)
a translucent shade of black, blocking access to anything below. You can then
put things inside of it that demand attention.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Overlay = function(Input) {
	var that = this;

	////////////////////////
	////////////////////////

	var Property = {
		Container: 'body',
		Content: null,
		Class: null,
		Show: true,
		HandleResize: true,
		OnClick: null,
		OnClose: null,
		OnShow: null
	};

	NUI.Util.MergeProperties(Input,Property);

	////////////////////////
	////////////////////////

	this.Struct = {
		Root: (
			jQuery('<div />')
			.addClass('NUI-Widget NUI-Hidden')
			.addClass('NUI-Overlay')
			.addClass(Property.Class)
		)
	};

	this.Struct.Root
	.append(Property.Content.valueOf());

	////////////////////////
	////////////////////////

	if(Property.HandleResize) {
		jQuery(window).on('resize',function(){
			var element = that.Struct.Root.find('>:first-child');

			if(!element.attr('nui-moved'))
			NUI.Util.CenterInParent(element);

			return;
		});
	}

	if(Property.Container) {
		jQuery(Property.Container)
		.append(this.Struct.Root);
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

	this.OnShow = function() {
		jQuery(window).resize();
		return;
	};

	this.OnDestroy = function() {

		if(typeof Property.Content === 'object')
		if(typeof Property.Content.Destroy === 'function')
		Property.Content.Destroy();

		return;
	};

	this.GetProperty = function(Key){
		if(typeof Property[Key] !== "undefined")
		return Property[Key];

		else
		return Property;
	};

	this.Destroy = NUI.Traits.DestroyFromStruct.bind(this);
	this.Get = NUI.Traits.GetFromStruct.bind(this);
	this.Hide = NUI.Traits.HideFromStruct.bind(this);
	this.Show = NUI.Traits.ShowFromStruct.bind(this);

	////////////////////////
	////////////////////////

	if(Property.Show) {
		this.Show();
	}

};

NUI.Overlay.prototype.valueOf = NUI.Traits.GetFromStruct;
