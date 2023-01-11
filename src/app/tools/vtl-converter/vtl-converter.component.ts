import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vtl-converter',
  templateUrl: './vtl-converter.component.html',
  styleUrls: ['./vtl-converter.component.css'],
})
export class VtlConverterComponent {
  vtlForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.vtlForm = this.formBuilder.group({
      inputJson: [''],
      outputVTL: ['']
    })
   }

  // Function to convert JSON to Velocity template
  convertJSONToVelocityTemplate() {
    let inputJSON = this.vtlForm.controls['inputJson'].value;
    let output = '';
    try {
      inputJSON = JSON.parse(inputJSON);
      // Iterating through each element in the input JSON object
      for (const [key, value] of Object.entries(inputJSON)) {
        // Generating Velocity template for each element in JSON
        output += `$input.path('$.${key}') ${value}\n`
      }
      this.vtlForm.controls['outputVTL'].setValue(output);
    } catch (error) { }
  }
}
