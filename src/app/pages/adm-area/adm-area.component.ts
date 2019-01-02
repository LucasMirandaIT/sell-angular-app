import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adm-area',
  templateUrl: './adm-area.component.html',
  styleUrls: ['./adm-area.component.scss']
})
export class AdmAreaComponent implements OnInit {

  users: User[];
  usersToAproove: User[];

  constructor(private profileService: ProfileService, private toastr: ToastrService) { }

  ngOnInit() {
    this.users = [];
    this.refreshUsers();
  }

  refreshUsers() {
    this.profileService.getUsersToAproove().toPromise().then((retorno: any) => {
      this.usersToAproove = retorno;
    });
    this.profileService.getUsers().toPromise().then((retorno: any) => {
      this.users = retorno;
    })
  }

  userAproove(user, action) {
    if (action == 'accept') {
      this.profileService.aprooveDeleteById(user._id).toPromise().then((retorno: any) => {
        this.profileService.aprooveCreateUser(user).toPromise().then((createRetorno: any) => {
          this.toastr.success('Usuário aprovado com sucesso', 'Sucesso!');
          this.refreshUsers();
        }).catch((err: any) => {
          this.toastr.error('Erro na aprovação do Usuário, solicite uma nova criação', 'Erro!');
        });
      }).catch((err: any) => {
        this.toastr.error('Erro na aprovação do Usuário, tente novamente', 'Erro!');
      });
    } else {
      this.profileService.aprooveDeleteById(user._id).toPromise().then((retorno: any) => {
        this.toastr.success('Usuário reprovado com sucesso', 'Sucesso!');
        this.refreshUsers();
      }).catch((err: any) => {
        this.toastr.error('Erro na reprovação do Usuário, tente novamente', 'Erro!');
      });
    }
  }
}
