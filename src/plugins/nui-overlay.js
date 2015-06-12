
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
	
	this.Get=
	function() {
		return Struct.Container;
	};
	
	this.Hide=
	function() {
		Struct.Container.hide();
		return this;
	};
	
	this.Show=
	function() {
		Struct.Container.show();
		NUI.Util.CenterInParent(Property.Content.valueOf());
		
		return this;
	};
	
	this.Destroy=
	function() {
		this.Hide();
		
		Struct.Container.remove();		
		return;
	}

};
