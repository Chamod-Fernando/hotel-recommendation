import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // Required for browser apps
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP requests
import { RouterModule } from '@angular/router'; // Import RouterModule for routing
import { CommonModule } from '@angular/common'; // Optional but useful for common directives
import { FormsModule } from '@angular/forms';


// No need to declare components like HomeComponent, LoginComponent, etc.
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule, // Add this to use HTTP client
    RouterModule, // Add this for routing
    FormsModule,
  ],
  providers: [], // If you need to add services, they go here
})
export class AppModule { }
