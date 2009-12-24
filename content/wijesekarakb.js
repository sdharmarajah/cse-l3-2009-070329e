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


Credits

Keyborad is tested by a sinhala blogger
Pahan Sarathchandra
Blog: http://blog.pahans.com

File info

Funtionality of this javascript file is providing the standard wijesekara keyboard

This file has two main writing fuctions.
1) set text in normal text fields
2) set text in iframes

set text in normal text fields is done in this file itself

set text in iframes done with the help of overlay.js

Procedure of append text in iframes
1.Detect the iframe
2.Open popup
3.append first pressed character to popup text field
4.Set focus to popup window text field. Then text field of the popup window is considered as a normal text field
5.append characters of the rest of the keypresses to popup window
6.When OK button is pressed or ENTER is hit append text to iframe


*/


var isFrame = new Boolean();
var isRakaransa = new Boolean();
var isYansaya = new Boolean();
var isAyanna = new Boolean();
var isUyanna = new Boolean();
var isEyanna = new Boolean();
var isOyanna = new Boolean();
var isGetapilla = new Boolean();
var isBendiAkura = new Boolean();
var mouseEventAdded = new Boolean();

var isRepaya = new Boolean();
var isIrryanna = new Boolean();


var obj;
var frameobj;
var frameTag;
var divobj;

var firstBendiAkura;
var newCharacter;
var kombuState = 0;
var doubleKombuState=0;
var kombuCharacter=null;
var prevValue;
var afterValue;
mouseEventAdded=false;



qsfox_wijesekara={

    handleSinhala: function (e){
		
        if(checkRange(e)){              //check whether the key is within the range of wijesekara keyboard specific keys

            qsfox.showKeyElement(e);

            /////////////////////////FIND TARGET OBJECT TYPE////////////////////////////////////////////////////////////////
            if (e.target.value==null){
                obj=e.originalTarget;
			    
            }
            else{
                obj=e.target;                        //normal text field
				
                isFrame=false;
            
            }
            if (obj.value==null){                   //iframes
                frameobj=e.view.frameElement;
				divobj=obj;
				frameTag=obj.tagName;
				isFrame=true;
            
            }
			
            if (e && e.preventDefault)              //prevent default action by keyboard
                e.preventDefault();


            ////////////////////////////////////////////////////FOR NORMAL TEXT FIELDS///////////////////////////////////////////////////
            if(!isFrame){
                if(!mouseEventAdded){
                    obj.addEventListener("click", resetCharaters, true);
                    mouseEventAdded=true;
                }

                /////////////////////////MAIN KEY CONVERSION CODE////////////////////////////////////////////////////////////////

                var prevCurserPosition=obj.selectionEnd;        //get curser position

                //////////////////////////////HANDLE KOMBUWA//////////////////////////

                /*
                 Special Attension must be paid for Kombuwa
  
                    About kombuState
                    3 States
  
                    kombuState=0 - No kombuwa has inseted
                    kombuState=1 - Kombuwa has inseted but there is no after character is inseted
                    kombuState=2 - Kombuwa has inseted and also a after character is inseted
                    kombuState=3 - Kombuwa + after character + pilla have inserted
  
                    the character inseted after the kombuwa is denoted by kombuCharacter variable
                */




                if((kombuState==2) && (e.charCode==102)){
                    kombuState=0;
                }
                if((kombuState==3) && (e.charCode==102)){
                    kombuState=0;
                }

                if((kombuState==1) && (e.charCode==102)){

                    kombuState=0;
                    isRakaransa=false;
                    isYansaya=false;
                    doubleKombuState=1;

                    newCharacter ="\u200B\u0DDB";
                    prevValue=obj.value.substr(0,prevCurserPosition-1);
                    afterValue=obj.value.substr(prevCurserPosition);
                    obj.value=prevValue + newCharacter + afterValue;
                    obj.selectionEnd=prevCurserPosition+2;
                }
                else if(kombuState==0 && e.charCode==102){

                    newCharacter ="\u200B\u0DD9";
                    prevValue=obj.value.substr(0,prevCurserPosition);
                    afterValue=obj.value.substr(prevCurserPosition);
                    obj.value=prevValue + newCharacter + afterValue;
                    obj.selectionEnd=prevCurserPosition+2;
                    kombuState=1;
                }
                else if((kombuState==2) && (e.charCode==96)){
                    if(!isRakaransa){
                        isRakaransa=true;
                        prevValue=obj.value.substr(0,prevCurserPosition-2);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + kombuCharacter +"\u0DCA\u200D\u0DBB\u0DD9"+ afterValue;
                        obj.selectionEnd=prevCurserPosition+3;
                    }
                }
                else if((kombuState==2) && (e.charCode==72)){
                    if(!isYansaya){
                        isYansaya=true;
                        prevValue=obj.value.substr(0,prevCurserPosition-2);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + kombuCharacter +"\u0DCA\u200D\u0DBA\u0DD9"+ afterValue;
                        obj.selectionEnd=prevCurserPosition+3;
                    }

                }

                else if((kombuState==2) && (checkKombuPili(e))){

                    var pilla = getPili(e);
                    if(isRakaransa){
                        prevValue=obj.value.substr(0,prevCurserPosition-5);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + kombuCharacter +"\u0DCA\u200D\u0DBB"+pilla+ afterValue;
                        obj.selectionEnd=prevCurserPosition;

                    }
                    else if(isYansaya){
                        prevValue=obj.value.substr(0,prevCurserPosition-5);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + kombuCharacter +"\u0DCA\u200D\u0DBA"+pilla+ afterValue;
                        obj.selectionEnd=prevCurserPosition;

                    }
                    else{
                        prevValue=obj.value.substr(0,prevCurserPosition-1);//////////////////////////////////**********
                        afterValue=obj.value.substr(prevCurserPosition);
                        //obj.value=prevValue + kombuCharacter +pilla+ afterValue;
                        obj.value=prevValue +pilla+ afterValue;
                        obj.selectionEnd=prevCurserPosition;
                    }
                    kombuState=3;

                }
                else if((kombuState==3) && (e.charCode==97)){
                    var pilla="\u0DDD";
                    if(isRakaransa){
                        prevValue=obj.value.substr(0,prevCurserPosition-5);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + kombuCharacter +"\u0DCA\u200D\u0DBB"+pilla+ afterValue;
                        obj.selectionEnd=prevCurserPosition;
                    }
                    else if(isYansaya){
                        prevValue=obj.value.substr(0,prevCurserPosition-5);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + kombuCharacter +"\u0DCA\u200D\u0DBA"+pilla+ afterValue;
                        obj.selectionEnd=prevCurserPosition;
                    }
                    else{
                        prevValue=obj.value.substr(0,prevCurserPosition-1);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue +pilla+ afterValue;
                        obj.selectionEnd=prevCurserPosition;
                    }
                    kombuState=0;
                    isRakaransa=false;
                }
                //////////////////////////////PILI////////////////////////////////////////////////////////////////////
                else if(checkPili(e)){
                    if(e.charCode!=68){
                        isGetapilla=false;
                    }
                    switch(e.charCode){

                        case 97:
                            if(e.altKey){
                                newCharacter ="\u0DFF";
                            }
                            else{
                                newCharacter ="\u0DCA";
                            }
                            break;
                        case 100:
                            newCharacter ="\u0DCF";
                            break;
                        case 65:
                            newCharacter ="\u0DDF";
                            break;
                        case 101:
                            newCharacter ="\u0DD0";
                            break;
                        case 69:
                            newCharacter ="\u0DD1";
                            break;
                        case 115:
                            newCharacter ="\u0DD2";
                            break;
                        case 83:
                            newCharacter ="\u0DD3";
                            break;
                        case 68:
                            if(!isGetapilla){
                                newCharacter ="\u0DD8";
                                isGetapilla=true;
                            }
                            else{
                                newCharacter ="\u0DF2";

                            }
                            break;
                        case 113:
                            newCharacter ="\u0DD4";
                            break;
                        case 81:
                            newCharacter ="\u0DD6";
                            break;

                    }
                     //////////////////////////////PILI FOLLOWED BY VOWELS//////////////////////////
                    if(isAyanna && (e.charCode==100||e.charCode==101||e.charCode==69)){
                        isAyanna = false;
                        switch(e.charCode){
                            case 100:
                                newCharacter ="\u0D86";
                                break;

                            case 101:
                                newCharacter ="\u0D88";
                                break;
                            case 69:
                                newCharacter ="\u0D87";
                                break;

                        }
                        prevValue=obj.value.substr(0,prevCurserPosition-1);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + newCharacter + afterValue;
                        obj.selectionEnd=prevCurserPosition;


                    }
                    else if(isUyanna && (e.charCode==65)){
                        isUyanna = false;
                        newCharacter ="\u0D8C";

                        prevValue=obj.value.substr(0,prevCurserPosition-1);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + newCharacter + afterValue;
                        obj.selectionEnd=prevCurserPosition;

                    }
                    else if(isIrryanna && (e.charCode==68)){
                        isIrryanna = false;
                        newCharacter ="\u0D8E";

                        prevValue=obj.value.substr(0,prevCurserPosition-1);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + newCharacter + afterValue;
                        obj.selectionEnd=prevCurserPosition;

                    }
                    else if(isEyanna && (e.charCode==97)){
                        isEyanna = false;
                        newCharacter ="\u0D92";

                        prevValue=obj.value.substr(0,prevCurserPosition-1);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + newCharacter + afterValue;
                        obj.selectionEnd=prevCurserPosition;

                    }
                    else if(isOyanna && (e.charCode==97)){
                        isOyanna = false;
                        newCharacter ="\u0D95";

                        prevValue=obj.value.substr(0,prevCurserPosition-1);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + newCharacter + afterValue;
                        obj.selectionEnd=prevCurserPosition;

                    }

                    else if(isOyanna && (e.charCode==65)){
                        isOyanna = false;
                        newCharacter ="\u0D96";

                        prevValue=obj.value.substr(0,prevCurserPosition-1);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + newCharacter + afterValue;
                        obj.selectionEnd=prevCurserPosition;

                    }
                    else if(isGetapilla &&(newCharacter =="\u0DF2")){
                        prevValue=obj.value.substr(0,prevCurserPosition-1);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + newCharacter + afterValue;
                        obj.selectionEnd=prevCurserPosition;
                        isGetapilla=false;
                    }


                    else{
                        prevValue=obj.value.substr(0,prevCurserPosition);
                        afterValue=obj.value.substr(prevCurserPosition);
                        obj.value=prevValue + newCharacter + afterValue;
                        obj.selectionEnd=prevCurserPosition+1;
                    }
                }

                //////////////////////////////HANDLE REST OF THE CHARACTERS//////////////////////////
                else{
                    resetCharacterSet2();
                    switch(e.charCode){

                        case 96:
                            newCharacter ="\u0DCA\u200D\u0DBB";
                            break;
                        case 98:
                            newCharacter ="\u0D89";
                            break;
                        case 99:
                            if(e.altKey){
                                newCharacter ="\u0DA6";
                            }else{
                                newCharacter ="\u0DA2";
                            }
                            break;

                        case 102:
                            break;
                        case 103:
                            newCharacter ="\u0DA7";
                            break;
                        case 104:
                            newCharacter ="\u0DBA";
                            break;
                        case 105:
                            newCharacter ="\u0DC3";
                            break;
                        case 106:
                            newCharacter ="\u0DC0";
                            break;
                        case 107:
                            newCharacter ="\u0DB1";
                            break;
                        case 108:
                            newCharacter ="\u0D9A";
                            break;
                        case 109:
                            newCharacter ="\u0DB4";
                            break;
                        case 110:
                            newCharacter ="\u0DB6";
                            break;
                        case 111:
                            if(e.altKey){
                                newCharacter ="\u0DB3";
                            }else{
                                newCharacter ="\u0DAF";
                            }
                            break;
                        case 112:
                            newCharacter ="\u0DA0";
                            break;

                        case 114:
                            newCharacter ="\u0DBB";
                            break;

                        case 116:
                            newCharacter ="\u0D91";
                            isEyanna = true;
                            break;
                        case 117:
                            newCharacter ="\u0DB8";
                            break;
                        case 118:
                            if(e.altKey){
                                newCharacter ="\u0DAC";
                            }else{
                                newCharacter ="\u0DA9";
                            }
                            break;
                        case 119:
                            isAyanna = true;
                            newCharacter ="\u0D85";
                            break;
                        case 120:
                            if(e.altKey){
                                newCharacter ="\u0D83";
                            }else{
                                newCharacter ="\u0D82";
                            }
                            break;
                        case 121:
                            newCharacter ="\u0DC4";
                            break;
                        case 122:
                            newCharacter ="\u0027";
                            break;

                        case 66:
                            newCharacter ="\u0D8A";
                            break;
                        case 67:
                            newCharacter ="\u0DA3";
                            break;


                        case 70:
                            newCharacter ="\u0DC6";
                            break;
                        case 71:
                            newCharacter ="\u0DA8";
                            break;
                        case 72:
                            newCharacter ="\u0DCA\u200D\u0DBA";
                            break;
                        case 73:
                            newCharacter ="\u0DC2";
                            break;
                        case 74:
                            newCharacter ="\u0DC5\u0DD4";
                            break;
                        case 75:
                            newCharacter ="\u0DAB";
                            break;
                        case 76:
                            newCharacter ="\u0D9B";
                            break;
                        case 77:
                            newCharacter ="\u0DB5";
                            break;
                        case 78:
                            newCharacter ="\u0DB7";
                            break;
                        case 79:
                            newCharacter ="\u0DB0";
                            break;
                        case 80:
                            newCharacter ="\u0DA1";
                            break;
                        case 92:
                            firstBendiAkura = newCharacter;
                            isBendiAkura = true;
                            break;
                        case 82:
                            newCharacter ="\u0D8D";
                            isIrryanna = true;
                            break;

                        case 84:
                            isOyanna = true;
                            newCharacter ="\u0D94";
                            break;
                        case 85:
                            newCharacter ="\u0DB9";
                            break;
                        case 86:
                            newCharacter ="\u0DAA";
                            break;
                        case 87:
                            isUyanna = true;
                            newCharacter ="\u0D8B";
                            break;
                        case 88:
                            newCharacter ="\u0D9E";
                            break;
                        case 89:
                            newCharacter ="\u0DC1";
                            break;
                        case 90:
                            newCharacter ="\u0022";
                            break;
                        case 126:
                            newCharacter ="\u0DBB\u0DCA\u200D";
                            isRepaya =true;
                            break;
                        case 46:
                            if(e.altKey){
                                newCharacter ="\u0D9F";
                            }else{
                                newCharacter ="\u0D9C";
                            }
                            break;
                        case 62:
                            newCharacter ="\u0D9D";
                            break;
                        case 91:
                            newCharacter ="\u0DA4";
                            break;
                        case 123:
                            newCharacter ="\u0DA5";
                            break;
                        case 59:
                            newCharacter ="\u0DAD";
                            break;
                        case 58:
                            newCharacter ="\u0DAE";
                            break;
                        case 39:
                            if(e.altKey){
                                newCharacter ="\u0DF4";
                            }else{
                                newCharacter ="\u002E";
                            }
                            break;
                        case 34:
                            newCharacter ="\u002C";
                            break;
                        case 44:
                            if(e.altKey){
                                newCharacter ="\u0D8F";
                            }else{
                                newCharacter ="\u0DBD";
                            }
                            break;
                        case 60:
                            newCharacter ="\u0DC5";
                            break;
                        case 93:
                            newCharacter ="\u003B";
                            break;
                        case 125:
                            newCharacter ="\u003A";
                            break;

                    }
                    if(((kombuState==2)||(kombuState==3))&&(!isBendiAkura)){
                        kombuState=0;
                        isRakaransa=false;
                        isYansaya=false;

                    }

                    if(kombuState==1){
                        prevValue=obj.value.substr(0,prevCurserPosition-2);
                        afterValue=obj.value.substr(prevCurserPosition);
                        if(e.charCode==116){
                            newCharacter="\u0D93";
                            kombuState=0;
                        }
                        else{
                            kombuCharacter=newCharacter;
                            newCharacter+="\u0DD9";
                            kombuState=2;
                        }

                        obj.value=prevValue + newCharacter + afterValue;
                        obj.selectionEnd=prevCurserPosition;


                    }else if(doubleKombuState==1){
                        if(e.charCode==116){
                            prevValue=obj.value.substr(0,prevCurserPosition);
                            afterValue=obj.value.substr(prevCurserPosition);
                            obj.value=prevValue + newCharacter + afterValue;

                            doubleKombuState=0;
                        }
                        else{
                            prevValue=obj.value.substr(0,prevCurserPosition-2);
                            afterValue=obj.value.substr(prevCurserPosition);
                            kombuCharacter=newCharacter;
                            newCharacter+="\u0DDB";
                            obj.value=prevValue + newCharacter + afterValue;
                            obj.selectionEnd=prevCurserPosition;
                            doubleKombuState=0;
                        }
                    }
                    else if(isRepaya){

                        prevValue=obj.value.substr(0,prevCurserPosition-1);
                        afterValue=obj.value.substr(prevCurserPosition-1);
                        obj.value=prevValue + newCharacter + afterValue;
                        obj.selectionEnd=prevCurserPosition+3;
                        isRepaya=false;

                    }
                    else if((e.charCode==92)){
                    //do nothing
                    }
                    else{
                        if(isBendiAkura){
                            newCharacter="\u0DCA\u200D"+newCharacter;
                            kombuCharacter=firstBendiAkura+newCharacter;

                            if(kombuState==2){
                                newCharacter+="\u0DD9";
                            }

                        }

                        if(kombuState==2){

                            prevValue=obj.value.substr(0,prevCurserPosition-1);
                            afterValue=obj.value.substr(prevCurserPosition);
                            obj.value=prevValue + newCharacter + afterValue;
                            obj.selectionEnd=prevCurserPosition+3;
                            isBendiAkura=false;

                        }
                        else{

                            prevValue=obj.value.substr(0,prevCurserPosition);
                            afterValue=obj.value.substr(prevCurserPosition);
                            obj.value=prevValue + newCharacter + afterValue;
					
                            if(e.charCode==96 || e.charCode==72)
                                obj.selectionEnd=prevCurserPosition+3;
                            else if(e.charCode==74){
                                obj.selectionEnd=prevCurserPosition+2;
                            }
                            else if(isBendiAkura){
                                obj.selectionEnd=prevCurserPosition+3;
                                isBendiAkura=false;
                            }
                            else
                                obj.selectionEnd=prevCurserPosition+1;
							
                        }
                    }
                }
            }

            ///////////////////////////////////////////////////////FOR IFRAMES///////////////////////////////////////////////////////////////////////
            else{
                newCharacter = "";
                resetCharaters();
            
                switch(e.charCode){

                    case 96:
                        newCharacter ="\u0DCA\u200D\u0DBB";
                        break;
                    case 98:
                        newCharacter ="\u0D89";
                        break;
                    case 99:
                        if(e.altKey){
                            newCharacter ="\u0DA6";
                        }else{
                            newCharacter ="\u0DA2";
                        }
                        break;

                    case 102:
                        newCharacter ="\u200B\u0DD9";
                        kombuState=1;
                        break;
                    case 103:
                        newCharacter ="\u0DA7";
                        break;
                    case 104:
                        newCharacter ="\u0DBA";
                        break;
                    case 105:
                        newCharacter ="\u0DC3";
                        break;
                    case 106:
                        newCharacter ="\u0DC0";
                        break;
                    case 107:
                        newCharacter ="\u0DB1";
                        break;
                    case 108:
                        newCharacter ="\u0D9A";
                        break;
                    case 109:
                        newCharacter ="\u0DB4";
                        break;
                    case 110:
                        newCharacter ="\u0DB6";
                        break;
                    case 111:
                        if(e.altKey){
                            newCharacter ="\u0DB3";
                        }else{
                            newCharacter ="\u0DAF";
                        }
                        break;
                    case 112:
                        newCharacter ="\u0DA0";
                        break;
                    case 114:
                        newCharacter ="\u0DBB";
                        break;
                    case 116:
                        newCharacter ="\u0D91";
                        isEyanna = true;
                        break;
                    case 117:
                        newCharacter ="\u0DB8";
                        break;
                    case 118:
                        if(e.altKey){
                            newCharacter ="\u0DAC";
                        }else{
                            newCharacter ="\u0DA9";
                        }
                        break;
                    case 119:
                        isAyanna = true;
                        newCharacter ="\u0D85";
                        break;
                    case 120:
                        if(e.altKey){
                            newCharacter ="\u0D83";
                        }else{
                            newCharacter ="\u0D82";
                        }
                        break;
                    case 121:
                        newCharacter ="\u0DC4";
                        break;
                    case 122:
                        newCharacter ="\u0027";
                        break;
                    case 66:
                        newCharacter ="\u0D8A";
                        break;
                    case 67:
                        newCharacter ="\u0DA3";
                        break;
                    case 70:
                        newCharacter ="\u0DC6";
                        break;
                    case 71:
                        newCharacter ="\u0DA8";
                        break;
                    case 72:
                        newCharacter ="\u0DCA\u200D\u0DBA";
                        break;
                    case 73:
                        newCharacter ="\u0DC2";
                        break;
                    case 74:
                        newCharacter ="\u0DC5\u0DD4";
                        break;
                    case 75:
                        newCharacter ="\u0DAB";
                        break;
                    case 76:
                        newCharacter ="\u0D9B";
                        break;
                    case 77:
                        newCharacter ="\u0DB5";
                        break;
                    case 78:
                        newCharacter ="\u0DB7";
                        break;
                    case 79:
                        newCharacter ="\u0DB0";
                        break;
                    case 80:
                        newCharacter ="\u0DA1";
                        break;
                    case 92:
                        firstBendiAkura = newCharacter;
                        isBendiAkura = true;
                        break;
                    case 82:
                        newCharacter ="\u0D8D";
                        isIrryanna = true;
                        break;

                    case 84:
                        isOyanna = true;
                        newCharacter ="\u0D94";
                        break;
                    case 85:
                        newCharacter ="\u0DB9";
                        break;
                    case 86:
                        newCharacter ="\u0DAA";
                        break;
                    case 87:
                        isUyanna = true;
                        newCharacter ="\u0D8B";
                        break;
                    case 88:
                        newCharacter ="\u0D9E";
                        break;
                    case 89:
                        newCharacter ="\u0DC1";
                        break;
                    case 90:
                        newCharacter ="\u0022";
                        break;
                    case 126:
                        newCharacter ="\u0DBB\u0DCA\u200D";
                        isRepaya =true;
                        break;
                    case 46:
                        if(e.altKey){
                            newCharacter ="\u0D9F";
                        }else{
                            newCharacter ="\u0D9C";
                        }
                        break;
                    case 62:
                        newCharacter ="\u0D9D";
                        break;
                    case 91:
                        newCharacter ="\u0DA4";
                        break;
                    case 123:
                        newCharacter ="\u0DA5";
                        break;
                    case 59:
                        newCharacter ="\u0DAD";
                        break;
                    case 58:
                        newCharacter ="\u0DAE";
                        break;
                    case 39:
                        if(e.altKey){
                            newCharacter ="\u0DF4";
                        }else{
                            newCharacter ="\u002E";
                        }
                        break;
                    case 34:
                        newCharacter ="\u002C";
                        break;
                    case 44:
                        if(e.altKey){
                            newCharacter ="\u0D8F";
                        }else{
                            newCharacter ="\u0DBD";
                        }
                        break;
                    case 60:
                        newCharacter ="\u0DC5";
                        break;
                    case 93:
                        newCharacter ="\u003B";
                        break;
                    case 125:
                        newCharacter ="\u003A";
                        break;

                }
                firstPopupCharacter=newCharacter;
                showpopup(frameobj);            //show popup window (located at overlay.js)
           }
        }
    }

}

function checkRange(e){
    //This function detect the range of the keycodes which are used in Wijesekara keyboard
    key=e.charCode;
    cKeys=!((e.ctrlKey)||(checkALTGr(e))||(e.metaKey));
    if(cKeys && (((key>=65)&&(key<=90))||((key>=96)&&(key<=122)))){
        return true;
    }
    else if(cKeys && ((key==46)||(key==62)||(key==91)||(key==123)||(key==59)||(key==58)||(key==39)||(key==34)||(key==44)||(key==60)||(key==126)||(key==93)||(key==92)||(key==125))){
        return true;
    }
    else{
        resetCharaters();
        return false;
    }

}

function checkALTGr(e){
    //this function checks whether ALT key is pressed
    returnValue = false;
    key=e.charCode;
    if(e.altKey){
        returnValue = true;
        if((key==97)||(key==99)||(key==111)||(key==118)||(key==120)||(key==46)||(key==39)||(key==44)){
            returnValue = false;
        }
    }
    else{
        returnValue = false;
    }
    return returnValue;


}


function checkKombuPili(e){
    //check pili which are used with kombuwa
    key=e.charCode;
    if(key==100||key==97||key==65)
        return true;
    else
        return false;
}

function checkPili(e){
    //detect pili
    key=e.charCode;
    if(key==100||key==97||key==65||key==101||key==69||key==115||key==83||key==68||key==113||key==81)
        return true;
    else
        return false;
}

function getPili(e){
    //convert keycodes of pilis into unicode characters
    key=e.charCode;
    if(key==100){
        return "\u0DDC";
    }else if(key==97){
        return "\u0DDA";
    }else if(key==65){
        return "\u0DDE";

    }
}


function resetCharaters(){
    //this function reset stored data about keys. (ex. kombuwa is inseted)
    isBendiAkura=false;
    kombuState=0;
    doubleKombuState=0;
    isRakaransa=false;
    isYansaya=false;
    resetCharacterSet2();

}

function resetCharacterSet2(){
    //this function reset stored data about keys.
    isGetapilla=false;
    isRepaya = false;
    isAyanna = false;
    isUyanna = false;
    isIrryanna = false;
    isEyanna =false;
    isOyanna = false;

}


