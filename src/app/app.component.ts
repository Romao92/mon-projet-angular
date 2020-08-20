import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { AppareilComponent } from './appareil/appareil.component';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  secondes:number;
  counterSubscription: Subscription;  

  constructor(){}
  ngOnInit(): void {
    this.counterSubscription = interval(1000).subscribe(
      (value:number) => { this.secondes = value; }
    );
      // counter.subscribe((value:number) => {
      //   this.secondes = value;
      // }, (error:any) => {
      //   console.log('Une erreur a été rencontrée avec l\'interval observable');
      // },
      // () => {
      //   console.log('Observable complétée !');
      // }
      // );
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
  
}
