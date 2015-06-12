# NUI (Nether UI)

The JS UI framework by people who hate JavaScript, for people who hate JavaScript.

I am really surprised at how much I was able to do with so little code. Why do JS
frameworks need to be giant and overly complicated? Of course, I cheated, this
depends on jQuery, but, still, compared to like jQuery UI...

# Overview

### NUI.Overlay
Creates a translucent overlay on top of the page to stop access to what is below.

### NUI.Dialog
Creates a dialog widget, which you can shove in the overlay.

### NUI.Button
Creates a button widget, which you can shove in the dialog.

# Sample

![it working](http://i.imgur.com/hYN2O5J.png?1)

Full Size: http://i.imgur.com/hYN2O5J.png

	<html>
	<head>
		<title>nui test</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<link rel="stylesheet" type="text/css" href="/nui/dist/nui.css" />
		<script type="text/javascript" src="/nui/dist/nui.js.php"></script>
		<link rel="stylesheet" type="text/css" href="<?php $surface->FromCommon('design.css') ?>" />
	</head>
	<body>
	
	<div id="MyInputForm" class="NUI-Hidden">
		<p>We could have jQuery built this form live, have it in a saved factory,
		built a class emulating NUI classes, or just have had it embedded like right
		now.</p>
		<div class="NUI-Center">Enter Stuff: <input id="MyInputField" type="text" /></div>
	</div>
	
	<script type="text/javascript">
	var ModalOverlay = new NUI.Overlay({
		Content: new NUI.Dialog({
			Title:'Hello Human',
			Content:jQuery('#MyInputForm').show(),
			Buttons: [
				new NUI.Button({ Label:'Accept', Class:'NUI-Dialog-Accept' }),
				new NUI.Button({ Label:'Cancel', Class:'NUI-Dialog-Cancel' })
			],
			OnCancel: function(){
				ModalOverlay.Destroy();
				return;
			},
			OnAccept: function(){
				LocalSaveData(function(){ ModalOverlay.Destroy(); })
				return;
			}
		})
	});
	
	function LocalSaveData(callback) {
		var input = jQuery('#MyInputField').val();
		
		/*//
		jQuery.post(
			'/your/api/whatever',
			{ Field:input },
			function(result) {
				if(result && !result.Error)
				callback();
			}
		);
		//*/
			
		alert(input);
		callback();
		return;
	}
	</script>
	
	</body>
	</html>
	

