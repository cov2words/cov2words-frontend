import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular';


export const buttonExplanations = [
  {
    icon: "save",
    name: "Speichern",
    explanation: "speichert den Fragebogen"
  },
  {
    icon: "hammer",
    name: "Kategorien",
    explanation: "Verwaltung Kategorien"
  },
  {
    icon: "add",
    name: "Fragehinzufügen",
    explanation: "fügt eine Frage hinzu"
  },
  {
    icon: "bulb",
    name: "Logik",
    explanation: "öffnet Logikanzeige"
  },
  {
    icon: "document",
    name: "Download",
    explanation: "lädt die AMZN Connect Files herunter"
  },
  {
    icon: "arrow-back",
    name: "Undo",
    explanation: "macht die letzte Aktion rückgänig"
  },
  {
    icon: "arrow-forward",
    name: "Redo",
    explanation: "wiederholt die letzte Aktion"
  }
]


@Component({
  selector: 'help-modal',
  templateUrl: 'help.modal.html',
  styleUrls: ['./control.component.scss']
})
export class HelpModal implements OnInit {

  public explanations

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.explanations = buttonExplanations
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

}