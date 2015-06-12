// C:\Users\bob\Desktop\nui\www\nui/src/nui-main.js


var NUI = {
	GetVersion: function() { return '1.0.0'; }
};


// C:\Users\bob\Desktop\nui\www\nui/src/nui-util.js


NUI.Util = {
	
	MergeProperties:
	function(dom,sub) {
	/*//
	@argv object Override, object Original
	will overwrite the original properties from the original object with
	the properties from the Override object. of course, if they dont exist
	in the Original they will be created too.
	//*/
		
		if(typeof dom !== 'object')
		return;
		
		jQuery.each(dom,function(prop,val){
			sub[prop] = val;
			return;
		});
		
		return;
	},
	
	CenterInParent:
	function(child,parent) {
	/*//
	@argv jQuery ChildObject, jQuery ParentObject
	given these two objects, we will attempt to center the child object
	in the parent object. this means that we are dealing with dom stuff
	and that they are CSS'd to allow positioning properly.
	//*/
	
		if(!parent) parent = child.parent();
	
		var cxoff = child.outerWidth(true) / 2 ;
		var cyoff = child.outerHeight(true) / 2;
		
		var pxcen = parent.width() / 2;
		var pycen = parent.height() / 2;
		
		child.css({
			'left': (pxcen - cxoff) + 'px',
			'top': (pycen - cyoff) + 'px'
		});

		return;
	}
	
};


// C:\Users\bob\Desktop\nui\www\nui/src/plugins/nui-button.js


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


// C:\Users\bob\Desktop\nui\www\nui/src/plugins/nui-dialog.js


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


// C:\Users\bob\Desktop\nui\www\nui/src/plugins/nui-overlay.js


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


