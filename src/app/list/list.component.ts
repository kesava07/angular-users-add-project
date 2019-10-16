import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../myService/data.service';
import { UserModel } from '../form.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @ViewChild("searchInput", { static: false }) searchInput;

  users: UserModel[] = [];

  constructor(private userService: DataService, private router: Router) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
  deleteData(user) {
    this.userService.deleteUser(user);
  }

  handleEdit(user, i) {
    this.userService.editUser(user, i);
    this.router.navigate(["/"]);
  }

  handleSearchData() {
    console.log(this.searchInput.nativeElement.value)
  }

}
