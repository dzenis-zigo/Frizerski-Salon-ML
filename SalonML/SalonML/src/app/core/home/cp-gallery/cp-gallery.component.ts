import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { BaseHomeComponent } from '../base-home.component';
import { DynamicContentService, Editable } from '../dynamic-content.service';

@Component({
  selector: 'app-cp-gallery',
  templateUrl: './cp-gallery.component.html',
  styleUrls: ['./cp-gallery.component.css',
    '../shared-styles.css',
    '../../../shared/creative-parallax/css/style.css'],
  encapsulation: ViewEncapsulation.None
})
export class CpGalleryComponent extends BaseHomeComponent implements OnInit {
  subtitle: Editable = <Editable>{};
  title: Editable = <Editable>{};
  imageArray: Editable[] = <Editable[]>[{}];

  constructor(protected override authService: AuthService,
              protected override dynContentService: DynamicContentService) {
    super(authService, dynContentService);

    dynContentService.onNewDataLoaded.subscribe(() => {
      this.subtitle = dynContentService.getEditable("cp-gallery-subtitle");
      this.title = dynContentService.getEditable("cp-gallery-title");
      this.imageArray = dynContentService.getEditableArray("cp-gallery-image-array");
    });
  }

  ngOnInit(): void {
  }

  addImage() {
    if (this.authService.isTestAdmin)
      console.log("Could not add new image - result from ASP.NET CreateItem method is needed");

    var onImageCreate: Subject<void> = this.dynContentService.addBlankItemToArray("cp-gallery-image-array");

    onImageCreate.subscribe(() => {
      this.imageArray = this.dynContentService.getEditableArray("cp-gallery-image-array");
    });
  }

  deleteImageFromArray(index: number) {
    const imageToDelete = this.imageArray[index];

    // remove from array
    this.imageArray.splice(index, 1);

    this.dynContentService.deleteItemFromArray(imageToDelete, this.imageArray);
  }

  saveImagePosition(imageArray: Editable[], oldIndex: number, event: any) {
    var imageToMove = imageArray[oldIndex];
    imageToMove.isEditing = false;

    if (event.target.value == '')
      return;

    var newIndex = event.target.value;

    this.imageArray.splice(oldIndex, 1);
    this.imageArray.splice(newIndex, 0, imageToMove);

    // update the orderIndexes on backend
    this.dynContentService.saveEditableArray(imageArray[0].name, this.imageArray);
  }
}
