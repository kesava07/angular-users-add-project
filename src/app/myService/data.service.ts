import { UserModel } from '../form.model';


export class DataService {
  users: UserModel[] = [new UserModel("chenna kesava", "chenna.ip@gmail.com", "1212121")];
  dataToEdit;
  indexToUpdate;
  getUsers() {
    return this.users;
  }
  addUser(data: UserModel) {
    return this.users.push(data);
  }
  deleteUser(user) {
    return this.users.splice(this.users.indexOf(user), 1);
  }
  editUser(editData, i) {
    this.setIndex(i);
    return this.dataToEdit = editData;
  }
  setIndex(i) {
    return this.indexToUpdate = i
  }

  updateUser(index, user) {
    return this.users.splice(index, 1, user);
  }
}
