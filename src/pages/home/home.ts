import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	weather:any;
	location:
	{
		city:string;
		state:string;
	}

  constructor(public navCtrl: NavController,private weatherprovider:WeatherProvider,private storage:Storage) {
       
  }

  ionViewWillEnter()
  {
   this.storage.get('location').then((val)=>{
     if(val!=null)
     {
               this.location=JSON.parse(val);
     }
     else{
         this.location={
      city:'Kavali',
      state:'India'
      }
    }
      this.weatherprovider.getWeather(this.location.city,this.location.state).
    subscribe(weather =>{
      console.log(weather);
      this.weather= weather.current_observation;
    });

   });
  
  }
}
