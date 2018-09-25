import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
/*import { PostServiceService } from '../post-service.service';*/
import {
  FormControl,
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  AfterContentInit
} from '@angular/core';
import '../../../../../../../assets/ckeditor/ckeditor';
import {
  config
} from 'rxjs';
import {
  ResourceRepositoryService
} from '../../../../../../services/repositories/resource-repository.service';


//import {CKEDITOR} from '../../assets/ckeditor/ckeditor';

declare var CKEDITOR: any;

@Component({
  selector: 'app-article-modify',
  templateUrl: './article-modify.component.html',
  styleUrls: ['./article-modify.component.css']
})
export class ArticleModifyComponent implements OnInit {

  @ViewChild('myckeditor') public ckeditor: any;
  public ckConfig: any;
  mycontent: object;

  @Input() mode: string;

  @Input() content: string;

  @Output() collectEditorContent: EventEmitter < object > = new EventEmitter < object > ();

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.isMobile() === true) {
      this.ckeditor = CKEDITOR.replace('editor1', {
        //extraPlugins: "mathjax,smiley,preview,eqneditor,base64image,tableresize,autogrow",
        extraPlugins: "mathjax,smiley,preview,eqneditor,base64image",
        removePlugins: "about,image",
        mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
        language: 'en',
        allowedContent: true,
        toolbarGroups: [{
            "name": "basicstyles",
            "groups": ["basicstyles"]
          },
          {
            "name": "links",
            "groups": ["links"]
          },
          {
            "name": "paragraph",
            "groups": ["list", "blocks"]
          },
          {
            "name": "document",
            "groups": ["mode"]
          },
          {
            "name": "insert",
            "groups": ["insert"]
          },
          {
            "name": "styles",
            "groups": ["styles"]
          },
          {
            "name": "about",
            "groups": ["about"]
          }
        ],
        removeButtons: 'HorizontalRule,Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,Source,Preview,Smiley,Table',
        width: '100%',
        height: 300,
        on: {
          instanceReady: function (ev) {
            // Output paragraphs as <p>Text</p>.
            this.dataProcessor.writer.setRules('p', {
              indent: false,
              breakBeforeOpen: true,
              breakAfterOpen: false,
              breakBeforeClose: false,
              breakAfterClose: true
            });
          }
        }
      });
    } else {
      this.ckeditor = CKEDITOR.replace('editor1', {
        extraPlugins: "mathjax,smiley,preview,eqneditor,base64image",
        removePlugins: "about,image",
        mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
        language: 'en',
        allowedContent: true,
        removeButtons: 'Source,Underline,Anchor,HorizontalRule',
        width: '100%',
        height: 500,
        textarea: {contentsCss: "body {font-size: 40px;}"} ,
        on: {
          instanceReady: function (ev) {
            // Output paragraphs as <p>Text</p>.
            this.dataProcessor.writer.setRules('p', {
              indent: false,
              breakBeforeOpen: true,
              breakAfterOpen: false,
              breakBeforeClose: false,
              breakAfterClose: true
            });
          }
        }
      });
    }

    CKEDITOR.addCss('.cke_editable img { max-width: 100% !important; height: auto !important; }');

    CKEDITOR.editorConfig = function (config) {
      config.width = "auto";
      config.height = "auto";
    }

    this.ckeditor.on('change', (ev) => {
      this.mycontent = CKEDITOR.instances.editor1.getData();
      console.log('HEY, here is my content....');
      console.log(this.mycontent);
      this.collectEditorContent.emit(this.mycontent);
    });
    this.ckeditor.on('dialogShow', function (ev) {
      let dialogName = ev.data.definition.title
      if (dialogName === 'Image') {
        //remove some element manually
        if (document.getElementsByClassName('cke_dialog_ui_input_text')[19] === undefined) {
          (document.querySelectorAll('.cke_dialog_ui_input_text')[0] as HTMLElement).style.display = 'none';
          (document.querySelectorAll('.cke_dialog_ui_input_text')[3] as HTMLElement).style.display = 'none';
          (document.querySelectorAll('.cke_dialog_ui_labeled_label')[2] as HTMLElement).style.display = 'none';
          (document.querySelectorAll('.cke_dialog_ui_checkbox_input')[0] as HTMLElement).style.display = 'none';
          (document.querySelectorAll('.cke_dialog_ui_checkbox_input')[1] as HTMLElement).style.display = 'none';
          document.getElementsByTagName('label')[0].style.display = "none";
          document.getElementsByTagName('label')[2].style.display = "none";
        } else {
          (document.querySelectorAll('.cke_dialog_ui_input_text')[19] as HTMLElement).style.display = 'none';
          (document.querySelectorAll('.cke_dialog_ui_input_text')[21] as HTMLElement).style.display = 'none';
          (document.querySelectorAll('.cke_dialog_ui_labeled_label')[13] as HTMLElement).style.display = 'none';
          (document.querySelectorAll('.cke_dialog_ui_checkbox_input')[0] as HTMLElement).style.display = 'none';
          (document.querySelectorAll('.cke_dialog_ui_checkbox_input')[1] as HTMLElement).style.display = 'none';
          document.getElementsByTagName('label')[11].style.display = "none";
          document.getElementsByTagName('label')[13].style.display = "none";

        };


      }
      if (dialogName === 'Table Properties') {
        //remove summery manually
        console.log(document.querySelectorAll('.cke_dialog_ui_labeled_label'));
        console.log(document.querySelectorAll('.cke_dialog_ui_input_text'));
        if (document.getElementsByClassName('cke_dialog_ui_input_text')[30] === undefined) {
          (document.querySelectorAll('.cke_dialog_ui_labeled_label')[10] as HTMLElement).style.display = 'none';
          (document.querySelectorAll('.cke_dialog_ui_input_text')[17] as HTMLElement).style.display = 'none';
        } else {
          (document.querySelectorAll('.cke_dialog_ui_labeled_label')[19] as HTMLElement).style.display = 'none';
          (document.querySelectorAll('.cke_dialog_ui_input_text')[30] as HTMLElement).style.display = 'none';
        }
      }
    });

    if (this.mode == "edit") {
      if (this.content != null)
        this.setEditorData(this.content);
    }
  }

  serviceCalls(ob) {
    console.log(ob)
    this.ckeditor.on('change', function (ev) {
      this.mycontent = CKEDITOR.instances.editor1.getData();
      console.log(this.mycontent);
    });
  }

  onResize(event) {
    //console.log(event.target.innerWidth); // window width
  }

  isMobile() {
    let is_mobile = true;
    let element = document.getElementById('mobile-element'),
      style = window.getComputedStyle(element),
      display = style.getPropertyValue('display');

    if (display === 'none') {
      is_mobile = false;
    }
    return is_mobile
  }

  setEditorData(content) {
    CKEDITOR.instances.editor1.setData(content);
  }

}
