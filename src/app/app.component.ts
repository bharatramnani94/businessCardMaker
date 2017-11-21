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
    borderRadius:string = '2';


    private nodeIdForExport:string = 'js-card';

    private saveAndOpen(dataUrl: any) {
        var link = document.createElement('a');
        link.download = this.name + ' Business Card';
        link.href = dataUrl;
        link.click();
    }

    generateCard(filetype:string) {

        let nodeToExport = document.getElementById(this.nodeIdForExport);

        switch (filetype) {
            
            case "svg":
                debugger;
                domtoimage.toSvg(nodeToExport)
                    .then((dataUrl) => this.saveAndOpen(dataUrl));
                break;
                
            default:
                domtoimage.toJpeg(nodeToExport, { quality: 1 })
                    .then((dataUrl) => this.saveAndOpen(dataUrl));
                break;
        }
    }


}
