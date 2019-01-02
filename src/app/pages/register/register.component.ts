import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUser: User = new User();

  constructor(private profileService: ProfileService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  register() {
    this.registerUser.picture = null;
    this.profileService.register(this.registerUser).toPromise().then((retorno: any) => {
      this.toastr.success(`Usuário ${this.registerUser.name} registrado com sucesso, aguarde a aprovação do administrador do sistema`)
    }).catch((err) => {
      this.toastr.error(`Problema ao inserir usuário no sistema, tente novamente`)
    });
  }

}
