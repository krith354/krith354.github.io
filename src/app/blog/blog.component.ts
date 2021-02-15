import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private titleService: Title) { }
  newTitle = 'Coki Mu Solutions Blog';
  pass = 'capstone2021';

  ngOnInit(): void {
    this.setTitle(this.newTitle);
    const password = prompt('Please enter password to see this site: ', '');
    if (password === this.pass) {
      alert('Correct. Please press OK to enter.');
    } else {
      window.location.reload();
    }
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
