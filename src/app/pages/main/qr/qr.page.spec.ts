import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QRPage } from './qr.page';
import { IonicModule } from '@ionic/angular';

describe('QRPage', () => {
  let component: QRPage;
  let fixture: ComponentFixture<QRPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QRPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});