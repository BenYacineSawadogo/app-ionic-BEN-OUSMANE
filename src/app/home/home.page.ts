import { Component } from '@angular/core';
import { Note } from './note.model';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  newNote: Note = new Note(0, '', '');
  notes: Note[] = [];
  editing = false;
  editedNote:Note = { score: 0, course: "", semester: "" };

  semesters = ["S1", "S2", "S3", "S4", "S5", "S6","S7","S8","S9","S10"];


  constructor(private nativeStorage: NativeStorage) {}

  addNote() {
    this.notes.push(new Note(this.newNote.score, this.newNote.course, this.newNote.semester));
    this.newNote = new Note(0, '', '');
  }
  deleteNote(note: Note) {
    const index = this.notes.indexOf(note);
    this.notes.splice(index, 1);
  }
  editNote(note: Note) {

    this.editing = true;

    const index = this.notes.indexOf(note);
    this.notes[index] = { ...note };
    this.editedNote=note
    }
  cancelEdit() {
    this.editing = false;
    this.newNote = new Note(0, '', '');
  }

  saveEdit() {
    const index = this.notes.findIndex(n => n.course === this.editedNote.course);
    this.notes[index] = this.editedNote;
    this.editing = false;
    this.editedNote = { score: 0, course: "", semester: ""};
  }


  getAverage(notes: Note[] = this.notes) {
    if (notes.length === 0) {
      return 0;
    }
    return notes.reduce((acc, note) => acc + note.score, 0) / notes.length;
  }

  getSemesterAverage(semester: string) {
    const semesterNotes = this.notes.filter(note => note.semester === semester);
    return this.getAverage(semesterNotes);
  }

  }

