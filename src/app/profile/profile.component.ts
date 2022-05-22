import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NotesService } from '../notes.service';

declare var $: any

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  totalLength: any = [];
  page: number = 1;
  allNotes: any = []
  Token: any = "";
  deToken: any = "";
  isload: boolean = false;
  day: any;


  constructor(private _NotesService: NotesService, private _Router: Router) {
    this.Token = localStorage.getItem('currentUser')
    this.deToken = jwtDecode(this.Token)
    console.log(this.deToken);
    let data = {
      encodeToken: this.Token,
      userID: this.deToken._id
    }
    this.getAllNotes();
    if (!localStorage.getItem("currentUser")) {
      this._Router.navigate(["/signin"]);
    }
  }
  getAllNotes() {
    let data = {
      token: this.Token,
      userID: this.deToken._id,
    };
    this._NotesService.getAllNotes(data).subscribe((res) => {
        console.log(res, 'reeeeessssss');
      this.isload = true
      if (res.message == "success") {

        this.isload = true
        this.allNotes = res.Notes;
      }
      else {

        localStorage.clear()
        this._Router.navigate(["/signup"]);

      }
    });
  }



  addForm = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
  });
  editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
  });

  addData() {
    let data = {
      title: this.addForm.value.title,
      desc: this.addForm.value.desc,
      token: this.Token,
      citizenID: this.deToken._id
    }
    this._NotesService.addNote(data).subscribe((res) => {
      if (res.message == 'success') {
        $("#addNote").modal('hide')
        this.getAllNotes()
        this.addForm.reset()
      }
    })
  }

  // ================== deleteNote =========================
  note_ID: any
  getID(id: any) {
    this.note_ID = id
  }
  deleteNote() {
    let data = {
      token: this.Token,
      noteId: this.note_ID
    }
    this._NotesService.deleteNote(data).subscribe((res) => {

      if (res.message == 'deleted') {
        $("#deleteNote").modal('hide')
        this.getAllNotes()
      }
    })
  }

  // ============================= edit=========================
  setValue() {
    for (let index = 0; index < this.allNotes.length; index++) {
      if (this.allNotes[index]._id == this.note_ID) {
        // console.log(this.AllNotes[index]);
        this.editForm.controls.title.setValue(this.allNotes[index].title)
        this.editForm.controls.desc.setValue(this.allNotes[index].desc)
      }
    }
  }
  editNote() {
    let data: any = {
      title: this.editForm.value.title,
      desc: this.editForm.value.desc,
      NoteID: this.note_ID,
      token: this.Token
    }
    this._NotesService.updateNote(data).subscribe(res => {
      console.log(data);
      if (res.message == 'updated') {
        $("#editNote").modal("hide");
        this.getAllNotes();
      }
    })
  }

  ngOnInit(): void { }
}
