import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  'apiBaseAddress' = 'http://horizon.spiceafrica.com:8080/api'; 
  'apiDistributionAddress' = 'http://horizon.spiceafrica.com:8081/distribution';  
  'apiSeocontentAddress' = 'http://192.168.207.202:8080/mziiki/api';  
  'apiNotificationAddress' = 'http://52.19.55.201:8080/notification/api';
  'apiNotificationAddressBeatz' = 'http://skclapi.scontentzone.com/notification/api';  
} 