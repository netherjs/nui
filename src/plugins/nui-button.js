
NUI.Button = function(opt) {

	var Property = {
		Label: 'Button',
		Class: null,
		OnClick: null
	};

	NUI.Util.MergeProperties(opt,Property);
	
	////////////////
	////////////////
	
	var Struct = {
		Container: (
			jQuery('<button />')
			.addClass('NUI-Widget NUI-Button')
			.text(Property.Label)
		)
	};
	
	if(Property.OnClick) {
		Struct.Container
		.on('click',Property.OnClick);
	}
	
	if(Property.Class) {
		Struct.Container
		.addClass(Property.Class);
	}

	////////////////
	////////////////
	
	this.Get=
	function() {
		return Struct.Container;
	};
	
	this.Show=
	function() {
		Struct.Container.Show();
		return this;
	};

	return;
};

NUI.Button.prototype.valueOf = function() {
	return this.Get();
}
