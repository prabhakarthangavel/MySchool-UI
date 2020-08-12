import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private _snackBar: MatSnackBar) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newHeaders = req.headers;
        let token = localStorage.getItem('token');
        if (token) {
            newHeaders = newHeaders.append('Authorization', 'Bearer' + ' ' + token);
        }
        const authReq = req.clone({ headers: newHeaders });
        return next.handle(authReq).pipe(catchError(error => {
            this._snackBar.open("Error occured try after sometime", "Close", {
                duration: 5000,
                verticalPosition: 'bottom'
            });
            return throwError(error);
        })
        );
    }
}