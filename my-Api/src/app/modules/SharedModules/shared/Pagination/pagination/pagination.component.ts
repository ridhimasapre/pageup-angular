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
  @Output() pageChange = new EventEmitter<number>();
  public pageInput: number = 1;
  public errorMsg: string = "";
  public maxPage:number=1;
  constructor() {}

  ngOnInit(): void {}

  public onPageEvent(event: PageEvent): void {
    this.pageChange.emit(event.pageIndex + 1); 
  }

  public goToPage(): void {
    if (this.pageInput > 0 && this.pageInput <= this.maxPage) {
        this.pageChange.emit(this.pageInput); 
        this.errorMsg = ''; 
    } else {
        this.errorMsg = `Page number ${this.pageInput} does not exist`; 
        this.pageInput = 1;
    }
}
}
