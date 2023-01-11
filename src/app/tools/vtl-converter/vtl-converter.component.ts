import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vtl-converter',
  templateUrl: './vtl-converter.component.html',
  styleUrls: ['./vtl-converter.component.css'],
})
export class VtlConverterComponent {
  vtlForm: FormGroup;
  tabCounter = -1;
  errorMessage: unknown;

  constructor(private formBuilder: FormBuilder) {
    this.vtlForm = this.formBuilder.group({
      inputJson: [''],
      outputVTL: [''],
    });
  }

  // Function to convert JSON to Velocity template
  convertJSONToVelocityTemplate() {
    let inputJSON = this.vtlForm.controls['inputJson'].value;
    let output = '';
    let start = `#set($inputRoot = $input.path('$'))
    {\n`;
    try {
      inputJSON = JSON.parse(inputJSON);
      output += this.recursiveApproach(inputJSON, start);
      this.vtlForm.controls['outputVTL'].setValue(output + '}');
    } catch (error) {
      this.errorMessage = error;
    }
  }

  recursiveApproach(inputJSON: any, output: string) {
    this.tabCounter = this.tabCounter + 1;
    // Iterating through each element in the input JSON object
    for (const [key, value] of Object.entries(inputJSON)) {
      // Generating Velocity template for each element in JSON
      if (typeof value == 'string')
        output +=
          this.addTabs(this.tabCounter) +
          `\t"${key}" : "$util.escapeJavaScript($inputRoot.${key})"\n`;
      else if (typeof value == 'number')
        output +=
          this.addTabs(this.tabCounter) +
          `\t"${key}" : "$util.escapeJavaScript($inputRoot.${key})"\n`;
      else if (typeof value == 'object') {
        if (Array.isArray(value)) {
          output +=
            this.addTabs(this.tabCounter) +
            `\t"${key}" : $util.escapeJavaScript($inputRoot.${key})\n`;
        } else {
          output +=
            this.addTabs(this.tabCounter) +
            `"${key}" : ` +
            this.recursiveApproach(value, '{\n\t') +
            this.addTabs(this.tabCounter) + '}' +
            `\n`;
        }
      }
    }
    this.tabCounter = this.tabCounter - 1;
    return output;
  }

  addTabs(tabCounter: number) {
    try {
      if (tabCounter > 0) {
        let temp = Array(tabCounter).fill('\t').join('');
        return temp;
      }
    } catch (error) {
      debugger;
      console.log(error);
    }
    return '';
    debugger;
  }
}

/**
 * example JSON
 * {
	"glossary": {
		"title": "example glossary",
		"GlossDiv": {
			"title": "S",
			"GlossList": {
				"GlossEntry": {
					"ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
						"para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
					},
					"GlossSee": "markup"
				}
			}
		}
	}
}
 */
