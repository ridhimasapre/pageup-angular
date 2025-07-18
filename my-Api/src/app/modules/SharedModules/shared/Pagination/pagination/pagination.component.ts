import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Input,Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {
  @Input() totalEntriesCount: number = 0;
  @Input() pageSize: number =10;
  @Input() pageIndex: number = 0; 
  @Output() pageChange = new EventEmitter<PageEvent>();
  public pageInput: number = 1;
  public errorMsg: string = "";
  public maxPage:number=1;
  constructor() {}

  ngOnInit(): void {
    this.calculateMaxPage();
    this.pageInput = this.pageIndex + 1; 
  }

  public onPageEvent(event: PageEvent): void {
    this.pageChange.emit(event); 
    this.pageInput = this.pageIndex + 1;  
  }
  private calculateMaxPage(): void {
    this.maxPage = Math.ceil(this.totalEntriesCount / this.pageSize);
  }
 public goToPage(): void {
  this.calculateMaxPage(); 
  if (this.pageInput && this.pageInput > 0 && this.pageInput <= this.maxPage) {
    const pageEvent: PageEvent = {
      pageIndex: this.pageInput - 1, 
      pageSize: this.pageSize,
      length: this.totalEntriesCount
    };
    this.pageChange.emit(pageEvent);
    this.errorMsg = ''; 
  } else {
    this.errorMsg = `Page number ${this.pageInput} does not exist`;
  }
}
}

