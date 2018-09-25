/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {


	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];


	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	//config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';
	config.htmlEncodeOutput = true;

	// Simplify the dialog windows.
	//config.removeDialogTabs = 'image:advanced;link:advanced';
};

CKEDITOR.on('instanceReady', function( ev ) {
  var blockTags = ['div','h1','h2','h3','h4','h5','h6','p','pre','li','blockquote','ul','ol',
  'table','thead','tbody','tfoot','td','th',];

  for (var i = 0; i < blockTags.length; i++)
  {
     ev.editor.dataProcessor.writer.setRules( blockTags[i], {
        indent : false,
        breakBeforeOpen : true,
        breakAfterOpen : false,
        breakBeforeClose : false,
        breakAfterClose : false
     });
  }
});

CKEDITOR.on( 'dialogDefinition', function( ev )
   {
      // Take the dialog name and its definition from the event data.
      var dialogName = ev.data.name;
      var dialogDefinition = ev.data.definition;
      // Check if the definition is from the dialog we're
      // interested in (the 'link' dialog).
      if ( dialogName == 'link' )
      {
         // Remove the 'Target' and 'Advanced' tabs from the 'Link' dialog.
         dialogDefinition.removeContents( 'target' );
         dialogDefinition.removeContents( 'advanced' );

         // Get a reference to the 'Link Info' tab.
         var infoTab = dialogDefinition.getContents( 'info' );
         // Remove unnecessary widgets from the 'Link Info' tab.
         //infoTab.remove( 'linkType');
         infoTab.remove( 'protocol');
      }
      if ( dialogName == 'base64imageDialog' )
      {

        var oldImplementation = dialogDefinition.onOk;

	   dialogDefinition.onOk = function (e) {
            let limit =1000*1000;
            let width,height;
            let image = document.getElementById('cke_1previewimage');

			if (image===null) return;
			naturalWidth = image.naturalWidth;
			naturalHeight =  image.naturalHeight;

			if (naturalWidth*naturalHeight <limit)
			{
				width=naturalWidth;
				height=naturalHeight;
			}else{
				rate = limit/(naturalWidth*naturalHeight);
				width = parseInt(naturalWidth *rate);
				height = parseInt(naturalHeight *rate);
			}

        let canvas = document.createElement("canvas");
            canvas.width=width;
            canvas.height=height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image,
                0,//sourceX,
                0,//sourceY,
                naturalWidth,//sourceWidth,
                naturalHeight,//sourceHeight,
                0,//destX,
                0,//destY,
                width,//destWidth,
                height//destHeight
            );

		    image.src=canvas.toDataURL("image/png");;

            oldImplementation.apply( this, [].slice.call( arguments ) );

        };
      }

   });
