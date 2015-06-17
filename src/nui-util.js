/*// NUI Utility //////////////////////////////////////////////////////////////
This contains utility methods that will be used in various parts of the
framework to prevent duplication. But I shouldn't have to explain
software engineering theory to you, i'm sure you got it.
/////////////////////////////////////////////////////////////////////////////*/

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
	
	GetProperty:
	function(request,source) {
	/*//
	@argv string Property, object Source
	request a specific property from an object. this function is designed
	to work with generic private properites from objects.
	//*/
	
		if(source.hasOwnProperty(request)) return source[request];
		else return false;		
	},
	
	GetStructProperty:
	function(request,source) {
	/*//
	@argv string Property, object Source
	request a specific property from an object. this function is designed to
	work with the Struct private properites in the UI classes - if no request
	is specified then it automatically returns the Root property which should
	exist in all NUI elements i didn't stuff up consistancy. this method is
	to make writing the Get methods easy.
	//*/
	
		if(request) return NUI.Util.GetProperty(request,source);
		else return source.Root;
	},
	
	CenterInParent:
	function(child,parent) {
	/*//
	@argv jQuery ChildObject, jQuery ParentObject
	given these two objects, we will attempt to center the child object
	in the parent object. this means that we are dealing with dom stuff
	and that they are CSS'd to allow positioning properly.
	//*/
	
		var cxoff = child.outerWidth(true) / 2 ;
		var cyoff = child.outerHeight(true) / 2;
		var pxcen = 0;
		var pycen = 0;
		var pxoff = 0;
		var pyoff = 0;

		if(!parent) {
			// if we didn't specify, find what the object is packed
			// inside of.
			parent = child.parent();
		}

		if(parent === window || parent[0] === jQuery('body')[0]) {
			// if it turns out its the body or the viewport, lets
			// use the viewport for math instead.
			parent = jQuery(window);

			if(child.css('position') === 'absolute') {
				// if we are using the window, and the item wants
				// to be positioned aboslute, add an offset so that
				// no matter where scrolled, it shows up in the center
				// of the viewport (rather than, the center of the
				// entire length of the body which could be off the
				// viewport completely).
				
				pyoff = jQuery(document).scrollTop();
			}
		}
		
		if(parent !== window) {
			pxcen = parent.width() / 2;
			pycen = parent.height() / 2;
		} else {
			pxcen = jQuery(window).width() / 2;
			pycen = jQuery(window).height() / 2;
		}
		
		child.css({
			'left': ((pxcen - cxoff) + pxoff) + 'px',
			'top': ((pycen - cyoff) + pyoff) + 'px'
		});

		return;
	}
	
};
