
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
