
NUI.Dialog = function(opt) {
	
	var Property = {
		Container: null,
		Title: 'NUI Dialog',
		Content: 'This is a dialog.',
		OnAccept: null,
		OnCancel: null,
		Buttons: []
	};
	
	NUI.Util.MergeProperties(opt,Property);
	
	////////////////
	////////////////
	
	var Struct = {
		Root: (
			jQuery('<div />')
			.addClass('NUI-Widget')
			.addClass('NUI-Dialog')
		),
		TitleBar: (
			jQuery('<header />')
			.text(Property.Title)
		),
		Content: (
			jQuery('<section />')
			.html(Property.Content.valueOf())	
		),
		ButtonBar: (
			jQuery('<footer />')
		)
	};
	
	Struct.Root
	.append(Struct.TitleBar)
	.append(Struct.Content)
	.append(Struct.ButtonBar);
	
	jQuery.each(Property.Buttons,function(){
		Struct.ButtonBar
		.append(this.valueOf());
	});
	
	////////////////
	////////////////
	
	this.Accept=
	function() {
		
		if(Property.OnAccept)
		Property.OnAccept();
		
		Struct.Root.hide();		
		return;
	};
	
	this.Cancel=
	function() {
		
		if(Property.OnCancel)
		Property.OnCancel();
		
		Struct.Root.hide();
		return;			
	};
	
	Struct.Root.find('.NUI-Dialog-Accept')
	.click(this.Accept);
	
	Struct.Root.find('.NUI-Dialog-Cancel')
	.click(this.Cancel);
	
	////////////////
	////////////////
	
	this.Get=
	function() {
		return Struct.Root;	
	};
	
	this.Show=
	function() {
		Struct.Root.show();
		return;
	};
	
};

NUI.Dialog.prototype.valueOf = function() {
	return this.Get();
};
