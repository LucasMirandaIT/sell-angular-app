import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loading: boolean;
  username;
  password;

  constructor(private auth: AuthService, private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
  }

  login(username, password) {
    this.loading = true;
    this.auth.login(username, password).toPromise().then((retorno: any) => {
      if (retorno._body !== '[]') {
        this.loading = false;
        sessionStorage.setItem('userLogged', JSON.stringify(retorno[0]));
        this.auth.loggedIn.next(true);
        this.router.navigate(['/']);
      } else {
        this.loading = false;
        this.auth.loggedIn.next(false);
        this.toastr.error('Verifique os dados informados e tente novamente', 'Erro');
      }
    }).catch((err: any) => {
      this.loading = false;
      this.auth.loggedIn.next(false);
      this.toastr.error('Erro na comunicação, tente novamente', 'Erro');
    })
  }

}
