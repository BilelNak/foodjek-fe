import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { Router } from '@angular/router';
import { RestaurantsService } from '../restaurants.service';
import { FileUploadService } from '../../file-upload.service';
import { Observable } from 'rxjs';

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

  restaurantForm: Restaurant = {
    id: "",
    name: "",
    phone: "",
    adress: "",
    photo: "",
    photoContentType: ""
  };
  fileUploadService: any;
  constructor(private restaurantsService:RestaurantsService,
    private router:Router) { }

  ngOnInit(): void {
  }
  create(){
    this.restaurantsService.create(this.restaurantForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/restaurants/home"])
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
  

     // On file Select
     onChange(event: any) {
      this.file = event.target.files[0];
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





 


  
 

 
  
 
 

