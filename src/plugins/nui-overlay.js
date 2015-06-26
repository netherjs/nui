/*// NUI.OVerlay //////////////////////////////////////////////////////////////
This provides a widget which covers the entire screen in (with my default css)
a translucent shade of black, blocking access to anything below. You can then
put things inside of it that demand attention.
/////////////////////////////////////////////////////////////////////////////*/

NUI.Overlay = function(opt) {

	var that = this;
	this.Destroy = NUI.Traits.DestroyFromStruct;
	this.Get = NUI.Traits.GetFromStruct;
	this.Hide = NUI.Traits.HideFromStruct;
	this.Show = NUI.Traits.ShowFromStruct;
	
	this.OnShow = function() {
		jQuery(window).resize();
		return;
	};

	////////////////////////
	////////////////////////

	this.Config = {
		Container: 'body',
		Content: null,
		Class: null,
		Show: true,
		HandleResize: true,
		OnClick: null,
		OnClose: null,
		OnShow: null
	};

	NUI.Util.MergeProperties(opt,this.Config);

	////////////////////////
	////////////////////////

	this.Struct = {
		Root: (
			jQuery('<div />')
			.addClass('NUI-Widget NUI-Hidden')
			.addClass('NUI-Overlay')
			.addClass(this.Config.Class)
		)
	};

	this.Struct.Root
	.append(this.Config.Content.valueOf());

	////////////////////////
	////////////////////////

	if(this.Config.HandleResize) {
		jQuery(window).on('resize',function(){
			var element = that.Config.Content.valueOf();
			
			if(!element.attr('nui-moved'))
			NUI.Util.CenterInParent(that.Config.Content.valueOf());
			
			return;
		});
	}
	
	if(this.Config.Container) {
		jQuery(this.Config.Container)
		.append(this.Struct.Root);
	}
	
	if(this.Config.Show) {
		this.Show();
	}

	////////////////////////
	////////////////////////
	
	this.Close = function() {
		if(this.Config.OnClose) this.Config.OnClose();
		else that.Destroy();
		
		return that;
	};
	
	jQuery(this.Struct.Root)
	.find('.NUI-Overlay-Close')
	.on('click',this.Close);

	////////////////////////
	////////////////////////

};

NUI.Overlay.prototype.valueOf = NUI.Traits.GetFromStruct;
