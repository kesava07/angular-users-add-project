import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../myService/data.service';
import { UserModel } from '../form.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @ViewChild("searchInput", { static: false }) searchInput: ElementRef;

  users: UserModel[];
  searchedUsers: UserModel[];

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

    if (this.searchInput.nativeElement.value !== '') {
      let regex = new RegExp(this.searchInput.nativeElement.value);
      const copyUsers = [...this.users];
      this.users = copyUsers.filter((val) => {
        if (val && val.userName.match(regex)) {
          return val;
        }
      });
    } else {
      this.users = this.userService.getUsers();
    }
  }

}
