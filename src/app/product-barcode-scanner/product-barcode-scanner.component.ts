import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as Quagga from 'quagga';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-barcode-scanner',
  templateUrl: './product-barcode-scanner.component.html',
  styleUrls: ['./product-barcode-scanner.component.css']
})
export class ProductBarcodeScannerComponent implements OnInit, OnDestroy {

  @Input() width: number = 600;
  @Input() height: number = 600;

  @Output() found: EventEmitter<string> = new EventEmitter();

  private scanner: any;

  private readonly plzDontSteal = '23952f826309dffdecd3eb67ccc76524';

  private subscription: Subscription;

  constructor(public element: ElementRef, private http: HttpClient) {
  }

  ngOnInit() {
    const scanValue = new Subject<string>();
    this.scanner = Quagga
      .decoder({readers: ['ean_reader', 'ean_8_reader']})
      .locator({patchSize: 'medium'})
      .fromSource({
        target: this.element.nativeElement,
        constraints: {
          width: 600,
          height: 600,
          facingMode: "environment"
        }
      }).addEventListener('detected', (result) => {
        scanValue.next(result.codeResult.code);
      });

    this.scanner.start();

    this.subscription = scanValue.distinctUntilChanged()
      .mergeMap(barCode => this.http.get(
        `https://api.outpan.com/v2/products/${barCode}?apikey=${this.plzDontSteal}`
      ))
      .pluck("name")
      //.filter(name => typeof name === 'string' && name !== '')
      .subscribe(name => this.found.next(<string>name));
  }

  ngOnDestroy(): void {
      this.scanner.stop();
      this.subscription.unsubscribe();
  }
}
