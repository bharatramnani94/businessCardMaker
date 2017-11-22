import { Component } from '@angular/core';
import domtoimage from 'dom-to-image';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
      
    name:string = 'Bharat Ramnani';
    designation:string = 'CTO';
    phone:string = '975.237.5491';
    place:string = 'Mumbai IN 400020';
    mail:string = 'hi@bharatramnani.com';
    color:any = '#ffffff';
    background:any = '#0090ff';
    backgroundOpacity:string = '0.8';
    patternOpacity:string = '1';
    letterSpacing:string = '0.14';
    pattern:string = '/assets/patterns/pattern1.jpg';
    borderRadius:string = '2';
    alignment:string = 'left';  // left, center, right

    patternsList:string[] = [
        'pattern1.jpg',
        'pattern2.gif'
    ];


    private nodeIdForExport:string = 'js-card';

    private saveAndOpen(dataUrl: any) {
        var link = document.createElement('a');
        link.download = this.name + ' Business Card';
        link.href = dataUrl;
        link.click();
    }

    generateCard(filetype:string = 'jpg') {

        let nodeToExport = document.getElementById(this.nodeIdForExport);

        switch (filetype) {
            
            case "svg":
                domtoimage.toSvg(nodeToExport)
                    .then((dataUrl) => this.saveAndOpen(dataUrl));
                break;
            
            case "jpg":
                domtoimage.toJpeg(nodeToExport, { quality: 1 })
                    .then((dataUrl) => this.saveAndOpen(dataUrl));
                break;
            case "png":
            default:
                domtoimage.toPng(nodeToExport, { quality: 1 })
                    .then((dataUrl) => this.saveAndOpen(dataUrl));
                break;
        }
    }

    patternChanged(patternName:string) {
        this.pattern = '/assets/patterns/' + patternName;
    }

    alignmentChanged(newAlignment:string = 'left') {
        this.alignment = newAlignment;
    }

    customBackgroundChanged(event:any) {
        let file = event.target.files[0];
        this.readFile(file);
    }

    private readFile(file:any) {
        let reader = new FileReader();
        reader.onload = (event) => {
            this.pattern = event.target["result"];
        };
        reader.onerror = (event) => {
            alert("File could not be read! Code " + event.target.error.code);
        };
        reader.readAsDataURL(file);
    }


}
