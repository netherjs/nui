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
	</script>
	

