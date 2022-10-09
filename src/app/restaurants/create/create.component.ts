import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { Router } from '@angular/router';
import { RestaurantsService } from '../restaurants.service';
import { FileUploadService } from '../../file-upload.service';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
   // Variable to store shortLink from api response
   shortLink: string = "";
   loading: boolean = false; // Flag variable
   file!: File; // Variable to store file
    // Create form data
    formData = new FormData(); 
    base64Output !: string;
  restaurantForm: Restaurant = {
    id: null,
    name: "",
    phone: "",
    adress: "",
    photo: null,
    photoContentType: null
  };
  fileUploadService: any;
  constructor(private restaurantsService:RestaurantsService,
    private router:Router) { }

  ngOnInit(): void {
  }
  create(){
    this.onUpload();
    //this.restaurantForm.photo=this.formData.get()?.toString;

    //this.restaurantForm.photo = null;
    //this.restaurantForm.photoContentType = null ;
    console.log("tesssssst " + this.restaurantForm.photo);
    this.restaurantsService.create(this.restaurantForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/restaurants/home"])
      },
      error:(err) => {
        console.log("errrrrrrrrrrrrrrrrrrrreur");
        console.log(err);
      }
    })
  }
  

     // On file Select
 /*    onChange(event: any) {
      this.file = event.target.files[0];
  }*/

  onChange(event: { target: { files: File[]; }; }) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.restaurantForm.photo = base64;
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }


  getBase64(file:any): Observable<string> {
    return new Observable<string>(sub => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {

        sub.next(reader.result.toString());
        sub.complete();

      };
      reader.onerror = error => {
        sub.error(error);
      };
    
    })
  }



     // OnClick of button Upload
     onUpload() {
      this.loading = !this.loading;
      console.log(this.file);
      this.formData.append("file", this.file, this.file.name);
   /*   const data = [...this.formData.entries()];
      this.restaurantForm.photo=this.formData;*/
  }


}





 


  
 

 
  
 
 

