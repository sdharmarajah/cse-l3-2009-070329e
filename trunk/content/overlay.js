

/*

Author Information

@author Isuru Udana Loku Narangoda
Department of Computer Science & Engineering,
University of Moratuwa,
Sri Lanka.

Blog: http://mytecheye.blogspot.com/
Facebook : http://www.facebook.com/isudana
GoogleTalk : isudana
Skype: isudana
Twitter: http://twitter.com/isudana

File info

This is the main javascript file which contains most of the methods which overlay.xul uses.




*/




var keyboard;
var isSinhala = new Boolean();
var isSinglish = new Boolean();
var firstrun = new Boolean();
var helpviewed = new Boolean();
var isPopupBoxCreated = new Boolean();
var popupPrevText;
var newPopupText;
var firstPopupCharacter;

var qsfox = {
    onLoad: function() {
        // initialization code
        this.initialized = true;
        firstrun = true;
        helpviewed = true;
        boxcreated = false;
        this.strings = document.getElementById("qsfox-strings");
        document.getElementById("contentAreaContextMenu")
        .addEventListener("popupshowing", function(e) {                         //Event handler for context menu
            this.showContextMenu(e);
        }, false);
        
        var Prefs = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefService);
        Prefs = Prefs.getBranch("extensions.qsfox.");

	
        var gExtensionManager = Components.classes["@mozilla.org/extensions/manager;1"]
        .getService(Components.interfaces.nsIExtensionManager);
        var current = gExtensionManager.getItemForID("qsFOX@isuru.udana.loku.narangoda").version;      //get extension version
        
        try{
            prev = Prefs.getCharPref("version");                                //get preferences
            firstrun = Prefs.getBoolPref("firstrun");
            helpviewed = Prefs.getBoolPref("helpviewed");

        }catch(e){
        //nothing
        }finally{

 //////////////////////////////////////////////////////////////////////////////////////////////////////FIRST RUN CODE///////////////////////////
            if (firstrun || current!=prev){

                Prefs.setCharPref("version",current);                           
                qsfox.showWizard();
	   
            }

 ///////////////////////////////////////////////////////////////////////////////////////END OF FIRST RUN CODE////////////////////////////////

            if(helpviewed==false){                                        //show help page after finishing the wizard
                setTimeout("qsfox.showWelcome()",3000);
                Prefs.setBoolPref("helpviewed",true);
            }
		}
        
        isSinhala=false;
        keyboard="English";
        isSinglish=false;
        resetCharaters();                             //located at wijesekarakb.js
        addFont();

		
    },

   
    //////////////////////////////////////////////////Wijesekara Layout functions/////////////////////////////////////////////////////

    //  These two fuctions are used to show the pressed key of the wijesekara keyboard layout
    


    hideKeyElement: function(){     //hide pressed key

        for(i=96;i<=122;i++){
            keyElement="cmd"+i;
            document.getElementById(keyElement).setAttribute("disabled","true");
        }
        document.getElementById("cmd91").setAttribute("disabled","true");
        document.getElementById("cmd92").setAttribute("disabled","true");
        document.getElementById("cmd93").setAttribute("disabled","true");
        document.getElementById("cmd44").setAttribute("disabled","true");
        document.getElementById("cmd46").setAttribute("disabled","true");
        document.getElementById("cmd59").setAttribute("disabled","true");
        document.getElementById("cmd39").setAttribute("disabled","true");
    },

    showKeyElement: function(e){                //show pressed key
        if((e.charCode>=65)&&(e.charCode<=90)){
            tmpKeyElement = e.charCode+32;
            keyElement="cmd"+tmpKeyElement;

        }
        else if(e.charCode==126){
            keyElement="cmd96";
        }
        else if(e.charCode==123){
            keyElement="cmd91";
        }
        else if(e.charCode==125){
            keyElement="cmd93";
        }
        else if(e.charCode==60){
            keyElement="cmd44";
        }
        else if(e.charCode==62){
            keyElement="cmd46";
        }
        else if(e.charCode==58){
            keyElement="cmd59";
        }
        else if(e.charCode==34){
            keyElement="cmd39";
        }
        else{
            keyElement="cmd"+e.charCode;
        }
        document.getElementById(keyElement).setAttribute("disabled","false");
        setTimeout("qsfox.hideKeyElement()",200);
  
    
    },

    //////////////////////////////////////////////////End of Wijesekara Layout functions/////////////////////////////////////////////////////


    //////////////////////////////////////////////////Main screen//////////////////////////////////////////////////////////////////////////

    showScreen: function(){                //show main screen
        if(document.getElementById('qsfox-pane').hidden == true){
            document.getElementById('qsfox-pane').setAttribute("hidden","false");
            document.getElementById('qsfox-splitter').setAttribute("hidden","false");
        }else{
            document.getElementById('qsfox-pane').setAttribute("hidden","true");
            document.getElementById('qsfox-splitter').setAttribute("hidden","true");
        }        
    },
	
    showLayout: function(){               //show main screen - wijesekara layout tab
        document.getElementById('qsfox-toolbarSinglish').setAttribute("checked","false");
        document.getElementById('qsfox-toolbarAbout').setAttribute("checked","false");
        document.getElementById('qsfox-toolbarLayout').setAttribute("checked","true");
        document.getElementById('qsfox-kblayout').setAttribute("hidden","false");
        document.getElementById('qsfox-singlish').setAttribute("hidden","true");
        document.getElementById('qsfox-about').setAttribute("hidden","true");
    },

    showSinglish: function(){               //show main screen - singlish tab
        document.getElementById('qsfox-toolbarSinglish').setAttribute("checked","true");
        document.getElementById('qsfox-toolbarAbout').setAttribute("checked","false");
        document.getElementById('qsfox-toolbarLayout').setAttribute("checked","false");
        document.getElementById('qsfox-kblayout').setAttribute("hidden","true");
        document.getElementById('qsfox-singlish').setAttribute("hidden","false");
        document.getElementById('qsfox-about').setAttribute("hidden","true");
    },

    showAbout: function(){                  //show main screen - About tab
        document.getElementById('qsfox-toolbarSinglish').setAttribute("checked","false");
        document.getElementById('qsfox-toolbarAbout').setAttribute("checked","true");
        document.getElementById('qsfox-toolbarLayout').setAttribute("checked","false");
        document.getElementById('qsfox-kblayout').setAttribute("hidden","true");
        document.getElementById('qsfox-singlish').setAttribute("hidden","true");
        document.getElementById('qsfox-about').setAttribute("hidden","false");
    },

    //////////////////////////////////////////////////End of Main screen/////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////Switch keyboards/////////////////////////////////////////////////////////////////

    switchKeynoard: function(){
        /*this function is used to switch between keyboards.
         *This function is called when the user click on status bar keyboard icon
         */
        if(keyboard=="English"){                    
            qsfox.enableSinhala();
        }
        else if(keyboard=="Sinhala"){
            qsfox.enableSinglish();
        }
        else{
            qsfox.enableEnglish();
        }

    },

    enableEnglish: function(e){
        //this function enables the english keyboard.
    	
	
        keyboard="English";
        document.getElementById('mnuEnglishKb').setAttribute("checked","true");             //set attributes of context menu
        document.getElementById('mnuSinhalaKb').setAttribute("checked","false");
        document.getElementById('mnuSinglishKb').setAttribute("checked","false");
        document.getElementById('statusbarKeyboardImage').setAttribute("src","chrome://qsfox/skin/images/english.png");

        if(isSinhala)
            window.removeEventListener("keypress", qsfox_wijesekara.handleSinhala, true);
        if(isSinglish)
            window.removeEventListener("keypress", qsfox_singlish.handleSinglish, true);

        isSinhala=false;
        isSinglish=false;
        qsfox.showStatusBalloon();
    },



    enableSinhala: function(e){
    //this function enables the sinhala keyboard.
    
        keyboard="Sinhala";
        isSinhala=true;
        document.getElementById('mnuEnglishKb').setAttribute("checked","false");
        document.getElementById('mnuSinhalaKb').setAttribute("checked","true");
        document.getElementById('mnuSinglishKb').setAttribute("checked","false");
        document.getElementById('statusbarKeyboardImage').setAttribute("src","chrome://qsfox/skin/images/sinhala.png");


        if(isSinglish)
            window.removeEventListener("keypress", qsfox_singlish.handleSinglish, true);
        window.addEventListener("keypress", qsfox_wijesekara.handleSinhala, true);
        isSinglish=false;
        qsfox.showStatusBalloon();
    },
    enableSinglish: function(e){
    //this function enables the singlish keyboard.
     
        keyboard="Singlish";
        isSinglish=true;
        document.getElementById('mnuEnglishKb').setAttribute("checked","false");
        document.getElementById('mnuSinhalaKb').setAttribute("checked","false");
        document.getElementById('mnuSinglishKb').setAttribute("checked","true");
        document.getElementById('statusbarKeyboardImage').setAttribute("src","chrome://qsfox/skin/images/singlish.png");

        if(isSinhala)
            window.removeEventListener("keypress", qsfox_wijesekara.handleSinhala, true);
        window.addEventListener("keypress", qsfox_singlish.handleSinglish, true);
        isSinhala=false;
        qsfox.showStatusBalloon();
    },

    //////////////////////////////////////////////////End of Switch keyboards/////////////////////////////////////////////////////////////////


    showStatusBalloon: function(){
      //This function is used to show a popup ballon at the status bar indicating the language when language is switched

        if(isSinhala){
            document.getElementById('statusPopupImage').src="chrome://qsfox/skin/images/statussinhala.png"
        }
        else if(isSinglish){
            document.getElementById('statusPopupImage').src="chrome://qsfox/skin/images/statussinglish.png"
        }
        else{
            document.getElementById('statusPopupImage').src="chrome://qsfox/skin/images/statusenglish.png"
        }

        objStatus = document.getElementById('qsfox-status');
        document.getElementById('statusPopup').openPopup( objStatus , "before_end" , false);
        setTimeout("document.getElementById('statusPopup').hidePopup();",1500);

	
    },
	
	 showSinglishBalloon: function(input){
      //This function is used to show a popup ballon at the status bar indicating the converted singlish text

        
        document.getElementById('singlishText').value=input;
        objStatus = document.getElementById('qsfox-status');
        document.getElementById('singlishPopup').openPopup( objStatus , "before_end" , false);
        

	
    },
	
	
	

    showContextMenu: function(event) {                                          //method used to show context menu
        document.getElementById("context-qsfox").hidden = gContextMenu.onImage;
    },
    showHelp: function(e){
        gBrowser.selectedTab = gBrowser.addTab("http://qsfox.mozdev.org/help.html");
    },
    showWelcome: function(){
        gBrowser.selectedTab = gBrowser.addTab("chrome://qsfox/content/welcome.html/");
    },
    showWebsite: function(){
        gBrowser.selectedTab = gBrowser.addTab("http://qsfox.mozdev.org/");
    },
	
    setEventToLogo: function(){
        document.getElementById("imgLogo").addEventListener('click', qsfox.showWebsite, false);
    },

	


    showWizard: function(e) {
    /*Before run the wizard we are checking the os compatibility. Wizard is only available in Windows.
     *It allows this some functionalities of this extension to work in linux by stopping unneccessary file operations
     *
     */
			  
        var osString = Components.classes["@mozilla.org/xre/app-info;1"]
        .getService(Components.interfaces.nsIXULRuntime).OS;                    //get the Operating system
	
        if(osString=="WINNT"){
            var w=window.openDialog("chrome://qsfox/content/wizard.xul","Converter_preferences", "toolbar,centerscreen");   //open wizard in a new window
            w.focus();
        }
        else if(osString=="Linux"){
            alert('Wizard is not available in Linux');
		
            var Prefs2 = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefService);
            Prefs2 = Prefs2.getBranch("extensions.qsfox.");
            Prefs2.setBoolPref("firstrun",false);                               //mark wizard has executed
        }
        else{
            alert('Wizard is not available in this OS');
		
            var Prefs2 = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefService);
            Prefs2 = Prefs2.getBranch("extensions.qsfox.");
            Prefs2.setBoolPref("firstrun",false);                               //mark wizard has executed
        }
    },
	

   //////////////////////////////////////////////////Popup box to type in iframes/////////////////////////////////////////////////////////////////

    settext: function(){                                    //set text to iframe
        var popuptext = document.getElementById('popuptextbox').value;
       
		if(frameTag=='DIV'){
		     divobj.innerHTML = popuptext;
 		}
		else{
		frameobj.contentDocument.execCommand('inserthtml', false, popuptext);
		}
        document.getElementById('popuptextbox').reset();
        document.getElementById("popuptextbox").value="";
        document.getElementById('popuppanel').hidePopup();
        qsfox.popupHiding();
       
    },

    cleartext: function(){                                 //clear text in popup window


        document.getElementById('popuptextbox').reset();
        document.getElementById("popuptextbox").value="";
        document.getElementById('popuppanel').hidePopup();
        qsfox.popupHiding();
        
	
    },


    popupHiding: function(){             //executes when popup is hiding
        window.removeEventListener("keypress", qsfox.appendByEnter, true);
        resetCharaters();
	
    },

    popupShowing: function(){             //executes when popup is showing

        window.addEventListener("keypress", qsfox.appendByEnter, true);
	
    },

    popupShown: function(){              //executes when popup is shown
	
              
        try{
            popupPrevText = document.getElementById("popuptextbox").value;
        }
        catch(e){
            popupPrevText="";
        }
        finally{
			
			if(frameTag=='DIV'){
			newPopupText = divobj.innerHTML;	
			s = '<br>';
            v = '';
            r = new RegExp(s, "g");
            newPopupText = newPopupText.replace(r, v);	
			}
			else{
            newPopupText = popupPrevText+firstPopupCharacter;
			}
			document.getElementById("popuptextbox").value = newPopupText;
            document.getElementById('popuptextbox').focus();
			
			
        }
    },





    appendByEnter: function(e){             //Append text to frame when enter is pressed
	

        if(e.which==13){
            if (e && e.preventDefault)
                e.preventDefault();
            qsfox.settext();
        }
	
    }
};

function showpopup(obj){

document.getElementById('popuppanel').openPopup( obj , "after_pointer" , false);

}

//////////////////////////////////////////////////End of Popup box to type in iframes/////////////////////////////////////////////////////////////////

function addFont() {
 /*This function is used to add font resources to windows via qsfox.dll
 *Before adding font resources it checks for operating system. If it is not windows font will not be installed
 */

    var osString = Components.classes["@mozilla.org/xre/app-info;1"]
    .getService(Components.interfaces.nsIXULRuntime).OS;
    if(osString=="WINNT"){
	
	
        const cid = "@qsfox/qsfox;1";
        var obj = Components.classes[cid].createInstance();
        obj = obj.QueryInterface(Components.interfaces.Iqsfox);


        var MY_ID = "qsFOX@isuru.udana.loku.narangoda";
        var em = Components.classes["@mozilla.org/extensions/manager;1"].
        getService(Components.interfaces.nsIExtensionManager);
        var file = em.getInstallLocation(MY_ID).getItemFile(MY_ID, "content/other/FM-MalithiUW46.ttf");
        var filestring = file.path;
        var res = obj.addfont(filestring);
    }

}

window.addEventListener("load", function(e) { 
    qsfox.onLoad(e);
}, false);

