import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, debounceTime, fromEvent, map } from 'rxjs';

interface InputPays {
  code: string;
  libelle: string;
  }

@Component({
  selector: 'app-input-pays',
  templateUrl: './input-pays.component.html',
  styleUrls: ['./input-pays.component.css']
})
export class InputPaysComponent implements AfterViewInit, OnDestroy {

  subscription!: Subscription;
  @ViewChild('input')
  inputText!: ElementRef;

  countries : Array<InputPays> = [
    {
      code :'FR',
      libelle : 'France',
    },
    {
      code :'FI',
      libelle : 'Finlande',
    },
    {
      code :'FJ',
      libelle : 'Fiji',
    },

    {
      code :'NC',
      libelle : 'Nouvelle-Caledonie',
    },
    {
      code :'NR',
      libelle : 'Nauru',
    },
    {
      code :'PF',
      libelle : 'Polynésie Francaise',
    },
    {
      code :'PW',
      libelle : 'Palau',
    },
    {
      code :'AU',
      libelle : 'Australie',
    },
    {
      code :'AR',
      libelle : 'Argentine',
    },
    {
      code :'ID',
      libelle : 'Indonesie',
    },
    {
      code :'IL',
      libelle : 'Israel',
    }


  ]

  currentCountries : Array<InputPays> = []

  ngAfterViewInit() {
      this.subscription = fromEvent(this.inputText.nativeElement,'keyup')
      .pipe(
        debounceTime(500),
        map((x)=> this.inputText.nativeElement.value)
      )
      .subscribe((x)=> {
        if(x.trim().length ==0){
          this.currentCountries = [];

        } else {
          this.currentCountries = this.countries.filter((y)=>
          y.libelle.toLowerCase().startsWith(x.toLowerCase())
          );
        }
      });
  }

  onBlur() {
    let component = this;
    setTimeout(function (){
      component.currentCountries = []
    },150);
  }

  OnFocus(){
    if (this.inputText.nativeElement.value.trim().length>0){
      this.currentCountries = this.countries.filter((y) =>
      y.libelle
      .toLowerCase()
      .startsWith(this.inputText.nativeElement.value.toLowerCase())
      );
    }
  }

  selectCountry(event: MouseEvent) {
    const selectedCountry = event.target as HTMLElement;
    this.inputText.nativeElement.value = selectedCountry.innerText;
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
  }
}