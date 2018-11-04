import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title="Learnspace";

  schema = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    'name': 'Learnspace',
    'url': 'https://learnspace.co.nz',
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+64-021-02264770",
      "contactType": "Customer service"
    }
  };
  schemaData = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    'name': 'LearnspaceTutor',
    "aggregateRating": {
      "@type": "aggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "5438"
    },
    "priceRange": "25$/hr to 40$/hr",
    'description' : "good tutor.",
    'productId' : '1004'
  };  
}