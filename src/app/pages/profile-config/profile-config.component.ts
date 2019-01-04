import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ProfileService } from '../../services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.scss']
})
export class ProfileConfigComponent implements OnInit {

  userLogged: User = new User();
  user: User = new User();
  userInfo: User = new User();
  checkboxGitHub: boolean = false;
  checkBoxFiles: boolean = false;

  selectedIndex;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;

  constructor(private profileService: ProfileService, private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshInfo();
  }

  nextStep() {
    this.selectedIndex++;
  }

  refreshInfo() {
    this.userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    if (!this.userLogged.picture) {
      this.userLogged.picture = './assets/img/avatar.png';
    }
    this.userAttributes();
  }

  userAttributes() {
    this.userInfo = this.userLogged;
  }

  viewPassword(fieldID) {

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    document.getElementById('picture_select').style.display = 'none';
    // document.getElementById('picture_select').classList.add('active');
  }

  imageCropped(event: ImageCroppedEvent) {
    this.userInfo.picture = event.base64;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  loadImageFailed() {
    // show message
    console.log('Load Image Failed Function');
  }

  openModal() {
    // Get the modal
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
  }

  changedCheckbox(field, value) {
    if (field == 'gitHub') {
      this.checkboxGitHub = value;
    } else {
      this.checkBoxFiles = value;
    }
  }

  saveChanges() {
    this.profileService.updateProfile(this.userInfo).toPromise().then((retorno) => {
      this.toastr.success('Informações Alteradas com Sucesso!', 'Sucesso!');
    }).catch((err) => {
      if (err.status === 413) {
        this.toastr.error('Imagem escolhida muito grande, favor redimensionar ou escolher uma nova imagem', 'Erro no Upload');
      }
    })
  }

}
