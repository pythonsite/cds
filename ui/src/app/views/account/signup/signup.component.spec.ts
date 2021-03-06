/* tslint:disable:no-unused-variable */

import {TestBed, tick, fakeAsync} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

import {UserService} from '../../../service/user/user.service';
import {AuthentificationStore} from '../../../service/auth/authentification.store';
import {AppModule} from '../../../app.module';
import {SignUpComponent} from './signup.component';
import {AccountModule} from '../account.module';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CDS: SignUPComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                UserService,
                AuthentificationStore,
            ],
            imports : [
                AppModule,
                RouterTestingModule.withRoutes([]),
                AccountModule,
                HttpClientTestingModule
            ]
        });
    });

    it('SignUp OK', fakeAsync( () => {
        const http = TestBed.get(HttpTestingController);

        // Create loginComponent
        let fixture = TestBed.createComponent(SignUpComponent);
        let component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();

        let compiled = fixture.debugElement.nativeElement;

        // Start detecting change in model
        fixture.detectChanges();
        tick(50);

        // Simulate user typing
        let inputUsername = compiled.querySelector('input[name="username"]');
        inputUsername.value = 'foo';
        inputUsername.dispatchEvent(new Event('input'));

        let inputFullname = compiled.querySelector('input[name="fullname"]');
        inputFullname.value = 'foo bar';
        inputFullname.dispatchEvent(new Event('input'));

        let inputEmail = compiled.querySelector('input[name="email"]');
        inputEmail.value = 'bar@foo.bar';
        inputEmail.dispatchEvent(new Event('input'));

        // Simulate user click
        compiled.querySelector('#signUpButton').click();

        const req = http.expectOne('http://localhost:8081/user/signup');
        expect(req.request.body.user.username).toBe('foo');
        expect(req.request.body.user.email).toBe('bar@foo.bar');
        expect(req.request.body.user.fullname).toBe('foo bar');
        req.flush(null);

        expect(fixture.componentInstance.showWaitingMessage).toBeTruthy('Waiting Message must be true');
    }));
});
