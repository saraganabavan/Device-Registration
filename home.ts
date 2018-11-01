import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { NetworkInterface } from "@ionic-native/network-interface";
import { Device } from "@ionic-native/device"; //UUID
import { AppVersion } from "@ionic-native/app-version"; //App version

//npm install -g cordova ionic
//$ ionic cordova plugin add cordova-plugin-networkinterface
//$ npm install --save @ionic-native/network-interface

//ionic cordova platform add browser
//ionic cordova run browser
//ionic serve.

//imei OR uuid
//$ ionic cordova plugin add cordova-plugin-device
//$ npm install --save @ionic-native/device

//aP VERSION
//$ ionic cordova plugin add cordova-plugin-app-version
//$ npm install --save @ionic-native/app-version

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  resposeData: any;
  registerData = {
    metadata: {
      ip: "106.208.200.107",
      requestID: "",
      app_id: ""
    },
    data: {
      device_name: "",
      imei: "",
      app_version: ""
    }
  };

  constructor(
    public navCtrl: NavController,
    private authProvider: AuthProvider,
    private toastCtrl: ToastController,
    private networkInterface: NetworkInterface,
    private device: Device,
    private appVersion: AppVersion
  ) {
    this.registerUser();
  }
  registerUser() {
    let imei = ""; //imei = this.device.uuid || 0;  imei = this.device.serial;  run on reaL DEVICE
    // let appVer = this.appVersion.getVersionNumber(); // NEED To RUN ON REAL DEVICE
    //let deviceName=this.device.platform; // NEED REAL DEVICE
    //let ip = this.networkInterface.getWiFiIPAddress()||this.networkInterface.getCarrierIPAddress();
    //this.registerData.data.imei
    //this.registerData.data.device_name=deviceName;
    //this.registerData.data.app_version=appVer;
    //this.registerData.data.imei=imei;
    //this.registerData.metadata.ip=ip;

    // if app_id avilable in local storage then assign to the request Json array(registerData) else app_id=0
    let registeredDataapp_id = localStorage.getItem("registeredDataapp_id"); //get app_id from local storage if avilable
    this.registerData.metadata.app_id =
      registeredDataapp_id != "undefined" && registeredDataapp_id != ""
        ? registeredDataapp_id
        : "0";

    //Convert Time In to Milli SEC
    let date = new Date();
    let millisec =
      (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) *
      1000;
    //if imei not available then requestID should be ""app_id+currentTimeinMillies"".
    this.registerData.metadata.requestID = imei
      ? "imei+currentTimeinMillies"
      : this.registerData.metadata.app_id + millisec;

    // Provider for Http request

    if (1) {
      this.authProvider
        .postData(this.registerData, "Inv/Init/AppRegistration/1.0.0")
        .then(
          result => {
            this.resposeData = result;

            //store app_id on local storage
            localStorage.setItem(
              "registeredDataapp_id",
              this.resposeData.data.app_id
            );

            console.log(this.resposeData);
          },
          err => {
            this.presentToast("Please Cheack Your Device Internet Connection.");
          }
        );
    }
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
