import { Component } from '@angular/core';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  COLOR: string = "red";


  ngOnInit() {
    setTimeout(() => {
      console.log("Starting...");
      this.extractConstituencyImages();
    }, 1000);
  }


  private nodeIdForExport: string = 'js-card';

  private saveAndOpen(dataUrl: any, currentConstituency: number) {
    var link = document.createElement('a');
    link.download = 'gujarat-constituency-' + currentConstituency + '-' + this.COLOR.replace('#', '');
    link.href = dataUrl;
    link.click();
    this.resetStyles(currentConstituency);
  }

  private resetStyles(currentConstituency: number) {
    let el = document.getElementById('GUJARAT-' + currentConstituency);
    el.style.fill = 'transparent';
  }

  generateCard(filetype: string = 'jpg', currentConstituency: number) {

    let nodeToExport = document.getElementById(this.nodeIdForExport);

    switch (filetype) {

      case "svg":
        domtoimage.toSvg(nodeToExport)
          .then((dataUrl) => this.saveAndOpen(dataUrl, currentConstituency));
        break;

      case "jpg":
        domtoimage.toJpeg(nodeToExport, { quality: 1 })
          .then((dataUrl) => this.saveAndOpen(dataUrl, currentConstituency));
        break;
      case "png":
      default:
        domtoimage.toPng(nodeToExport, { quality: 1 })
          .then((dataUrl) => this.saveAndOpen(dataUrl, currentConstituency));
        break;
    }
  }

  extractConstituencyImages(color: string = this.COLOR) {
    for (let i = 1; i <= 182; i++) {
      setTimeout(() => {
        let e = document.getElementById('GUJARAT-' + i);
        e.style.fill = color;

        this.generateCard('png', i);
      }, 3000 + (3000 * i));
    }
  }


}
