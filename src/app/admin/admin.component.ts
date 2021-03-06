import { Component, OnInit, Input,  ViewChild } from '@angular/core';
import {  DataService } from '../data.service';
import {  NgForm } from '@angular/forms';
import {  ActivatedRoute,  Params, Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminStatus: boolean = JSON.parse(sessionStorage.getItem("adminStatus"));
  // dtOptions: DataTables.Settings;
  dtTrigger: Subject<any> = new Subject();
  users: any[];
  user: object = {};
  memberID: number;
  errorMessage: string;
  successMessage: string;
  adminOn: object = {
    'admin': true
  }

  adminOff: object = {
    'admin': false
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  getUsers() {
    this.dataService.getRecords('getAllMembers')
      .subscribe(
        events => {
          this.users = events;
          for (let i = 0; this.users.length; i++) {
            if (this.users[i].id === this.memberID) {
              // this.users = this.users.filter(item => item.id !==this.memberID)
              this.users.splice(i, 1)
              break;
            }
          }
          this.dtTrigger.next();
          console.log(this.users)
        });
  }

  updateUser(id, admin) {
    console.log('Clicked ID = ' + id);
    console.log('Admin currently = ' + admin);
    // determine which object to send
    let adminObj: object;
    if (admin) {
      adminObj = this.adminOff;
    } else {
      adminObj = this.adminOn;
    }

    // console.log('##################################### within admin.component and updateUser');
    this.dataService.editEventRecord('member', adminObj, id)
    .subscribe(
      user => {this.getUsers()
      this.adminStatus = JSON.parse(sessionStorage.getItem("adminStatus"));}
    );

    console.log('this.adminStatus = ' + this.adminStatus);
    console.log('JSON = ' + JSON.parse(sessionStorage.getItem("adminStatus")));
    this.adminStatus = JSON.parse(sessionStorage.getItem("adminStatus"));
  }

  ngOnInit() {
    this.memberID = (JSON.parse(sessionStorage.getItem("currentUser"))).id;
    this.getUsers();
  }

}
