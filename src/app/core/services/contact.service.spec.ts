import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';
describe('ContactService', () => {
  it('posts only to the server endpoint', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const service = TestBed.inject(ContactService);
    const http = TestBed.inject(HttpTestingController);
    service
      .send({
        name: 'Alberto',
        email: 'test@example.com',
        company: '',
        projectType: '',
        budget: '',
        message: 'Consulta',
        privacy: true,
        website: '',
      })
      .subscribe();
    const request = http.expectOne('/api/contact');
    expect(request.request.method).toBe('POST');
    request.flush({});
    http.verify();
  });
});
