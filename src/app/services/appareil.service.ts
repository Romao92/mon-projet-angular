import { Subject } from 'rxjs/Subject';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService implements OnInit{

    appareilSubject = new Subject<any[]>();

    private appareils = [];

    constructor(private httpClient: HttpClient) {

    }
    ngOnInit(): void {
      
    }

    emitAppareilSubject() {
        this.appareilSubject.next(this.appareils.slice())
    }

    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (appareilObject) => {
                return appareilObject.id === id;
            }
        );
        return appareil;
    }

    switchOnAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'allumé';
        }
        this.emitAppareilSubject();
    }

    switchOffAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'éteint';
        }
        this.emitAppareilSubject();
    }

    switchOnOne(index: number) {
        this.appareils[index].status = 'allumé';
        this.emitAppareilSubject();
    }

    switchOffOne(index: number) {
        this.appareils[index].status = 'éteint';
        this.emitAppareilSubject();
    }

    addAppareil(name: string, status: string) {
        const appareilObject = { id: 0, name: '', status: '' };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = (this.appareils.length != null && this.appareils.length > 0) ? this.appareils[(this.appareils.length - 1)].id + 1 : 0;

        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
        this.httpClient.put('https://http-client-demo-87c61.firebaseio.com/appareils.json',
            this.appareils).subscribe(
                (next) => {
                    console.log('Enregistrement DB terminé');
                },
                (error) => {
                    console.log('erreur de sauvegarde ! ' + error);
                }
            );

    }

    getAppareilsFromServer(){
        this.httpClient.get<any[]>('https://http-client-demo-87c61.firebaseio.com/appareils.json')
        .subscribe((response) => {
            this.appareils = response;
            this.emitAppareilSubject();
            },
            (error) => {
                console.log('Erreur de chargement'+error);
            }
        )
    }
}