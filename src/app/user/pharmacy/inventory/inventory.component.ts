import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewItemComponent } from './new-item/new-item.component';
import { PharmacyService } from '../../services/pharmacy.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  data 
  filterData
  sku: FormGroup
  send
  loading

  constructor(private inventoryDialog: MatDialog, private pharmaserv: PharmacyService, private formbuid: FormBuilder, private message: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.getInventory()
    this.sku = this.formbuid.group({
      'quantity': [null]
    })
  }
  newitem(){
    let dalog = this.inventoryDialog.open(NewItemComponent)
    dalog.afterClosed().subscribe(() => {
      this.getInventory()
      this.message.open("New item in inventory", "Close", {
        duration: 2000,
      });

    })
  }

  getInventory(){
    this.loading = true
    this.pharmaserv.getInventory().subscribe(res=>{
      this.loading = false
      this.data = res.res
      this.filterData = this.data
      console.log(this.data);      
    },(err)=>{     
      this.loading = false       
      if(err.status == 401){
        window.localStorage.clear()
        this.message.open("Session expired",'close',{
          duration: 2000
        })
        this.router.navigateByUrl('login')
        return
      }
      this.message.open(err.error.message,'close',{
        duration: 2000
      })    
            
    })
  }
  filterMed(keyWord){
    this.filterData = this.data
    if (keyWord) {
      this.filterData = this.data.filter((element) => {
        let source = element.name
        source = source.toString()
        keyWord = keyWord.toString()
        if (source.indexOf(keyWord) !== -1) {
          return element
        }
      });      
    }
  }

  addSku(qty, id){ 
    this.loading = true
  
    this.pharmaserv.addSku(id,qty).subscribe(res=>{
      this.loading = false
      this.sku.reset()
      this.getInventory()
      this.message.open("New stock in inventory", "Close", {
        duration: 2000,
      });
    },(err)=>{    
      this.loading = false        
      if(err.status == 401){
        window.localStorage.clear()
        this.message.open("Session expired",'close',{
          duration: 2000
        })
        this.router.navigateByUrl('login')
        return
      }
      this.message.open(err.error.message,'close',{
        duration: 2000
      })    
            
    })
  }

}
