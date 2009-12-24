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

The algorithm (convert() function) for this keyboard is inherited from the Unicode Real time font conversion utility by
Language Technology Research Laboratory - University of Colombo School of Computing
http://www.ucsc.cmb.ac.lk/ltrl/services/feconverter/t1.html



File info

Funtionality of this javascript file is providing the singlish keyboard


*/


var text;
var nVowels;
var consonants= new Array()
var consonantsUni= new Array()
var vowels= new Array()
var vowelsUni= new Array()
var vowelModifiersUni= new Array()
var specialConsonants= new Array()
var specialConsonantsUni= new Array()
var specialCharUni= new Array()
var specialChar= new Array()


vowelsUni[0]="\u0D8C";    vowels[0]='oo';    vowelModifiersUni[0]="\u0DD6";
vowelsUni[1]="\u0D95";    vowels[1]='oe';    vowelModifiersUni[1]="\u0DDD";
vowelsUni[2]="\u0D95";    vowels[2]='o\\)';    vowelModifiersUni[2]="\u0DDD";
vowelsUni[3]="\u0D86";    vowels[3]='aa';    vowelModifiersUni[3]="\u0DCF";
vowelsUni[4]="\u0D86";    vowels[4]='a\\)';    vowelModifiersUni[4]="\u0DCF";
vowelsUni[5]="\u0D88";    vowels[5]='Aa';    vowelModifiersUni[5]="\u0DD1";
vowelsUni[6]="\u0D88";    vowels[6]='ae';    vowelModifiersUni[6]="\u0DD1";
vowelsUni[7]="\u0D88";    vowels[7]='A\\)';    vowelModifiersUni[7]="\u0DD1";
vowelsUni[8]="\u0D8A";    vowels[8]='ii';    vowelModifiersUni[8]="\u0DD3";
vowelsUni[9]="\u0D8A";    vowels[9]='ie';    vowelModifiersUni[9]="\u0DD3";
vowelsUni[10]="\u0D8A";    vowels[10]='ee';    vowelModifiersUni[10]="\u0DD3";
vowelsUni[11]="\u0D8A";    vowels[11]='i\\)';    vowelModifiersUni[11]="\u0DD3";
vowelsUni[12]="\u0D92";    vowels[12]='ea';    vowelModifiersUni[12]="\u0DDA";
vowelsUni[13]="\u0D92";    vowels[13]='ei';    vowelModifiersUni[13]="\u0DDA";
vowelsUni[14]="\u0D92";    vowels[14]='e\\)';    vowelModifiersUni[14]="\u0DDA";
vowelsUni[15]="\u0D8C";    vowels[15]='uu';    vowelModifiersUni[15]="\u0DD6";
vowelsUni[16]="\u0D8C";    vowels[16]='u\\)';    vowelModifiersUni[16]="\u0DD6";
vowelsUni[17]="\u0D96";    vowels[17]='au';    vowelModifiersUni[17]="\u0DDE";
vowelsUni[18]="\u0D87";    vowels[18]='A';    vowelModifiersUni[18]="\u0DD0";

vowelsUni[19]="\u0D85";    vowels[19]='a';    vowelModifiersUni[19]="";
vowelsUni[20]="\u0D87";    vowels[20]='/\a';    vowelModifiersUni[20]="\u0DD0";
vowelsUni[21]="\u0D89";    vowels[21]='i';    vowelModifiersUni[21]="\u0DD2";
vowelsUni[22]="\u0D91";    vowels[22]='e';    vowelModifiersUni[22]="\u0DD9";
vowelsUni[23]="\u0D8B";    vowels[23]='u';    vowelModifiersUni[23]="\u0DD4";
vowelsUni[24]="\u0D94";    vowels[24]='o';    vowelModifiersUni[24]="\u0DDC";
vowelsUni[25]="\u0D93";    vowels[25]='I';    vowelModifiersUni[25]="\u0DDB";
nVowels=26;

specialConsonantsUni[0]="\u0D82"; specialConsonants[0]=/\\n/g;
specialConsonantsUni[1]="\u0D83"; specialConsonants[1]=/\\h/g;
specialConsonantsUni[2]="\u0D9E"; specialConsonants[2]=/\\N/g;
specialConsonantsUni[3]="\u0D8D"; specialConsonants[3]=/\\R/g;

specialConsonantsUni[4]="\u0DBB\u0DCA"+"\u200D"; specialConsonants[4]=/R/g;
specialConsonantsUni[5]="\u0DBB\u0DCA"+"\u200D"; specialConsonants[5]=/\\r/g;

consonantsUni[0]="\u0DAC"; consonants[0]='nnd';
consonantsUni[1]="\u0DB3"; consonants[1]='nndh';
consonantsUni[2]="\u0D9F"; consonants[2]='nng';
consonantsUni[3]="\u0DAE"; consonants[3]='Th';
consonantsUni[4]="\u0DB0"; consonants[4]='Dh';
consonantsUni[5]="\u0DA5"; consonants[5]='GN';
consonantsUni[6]="\u0DA1"; consonants[6]='Ch';
consonantsUni[7]="\u0DB5"; consonants[7]='ph';
consonantsUni[8]="\u0DB7"; consonants[8]='bh';
consonantsUni[9]="\u0DC1"; consonants[9]='sh';
consonantsUni[10]="\u0DC2"; consonants[10]='Sh';
consonantsUni[11]="\u0D9D"; consonants[11]='G';
consonantsUni[12]="\u0DA4"; consonants[12]='KN';
consonantsUni[13]="\u0DC5\u0DD4"; consonants[13]='Lu';
consonantsUni[14]="\u0DAF"; consonants[14]='dh';
consonantsUni[15]="\u0DA0"; consonants[15]='ch';
consonantsUni[16]="\u0D9B"; consonants[16]='K';
consonantsUni[17]="\u0DAD"; consonants[17]='th';

consonantsUni[18]="\u0DA7"; consonants[18]='t';
consonantsUni[19]="\u0D9B"; consonants[19]='kh';  
//consonantsUni[36]="\u0D9B"; consonants[36]='kh';
consonantsUni[20]="\u0DA9"; consonants[20]='d';
consonantsUni[21]="\u0DB1"; consonants[21]='n';
consonantsUni[22]="\u0DB4"; consonants[22]='p';
consonantsUni[23]="\u0DB6"; consonants[23]='b';
consonantsUni[24]="\u0DB8"; consonants[24]='m';
consonantsUni[25]="\u0DBA"; consonants[25]='y';
consonantsUni[26]="\u200D\u0DBA"; consonants[26]='Y';
consonantsUni[27]="\u0DBA"; consonants[27]='\\u005C' + 'y';
consonantsUni[28]="\u0DA2"; consonants[28]='j';
consonantsUni[29]="\u0DBD"; consonants[29]='l';
consonantsUni[30]="\u0DC0"; consonants[30]='v';
consonantsUni[31]="\u0DC0"; consonants[31]='w';
consonantsUni[32]="\u0DC3"; consonants[32]='s';
consonantsUni[33]="\u0DC4"; consonants[33]='h';
consonantsUni[34]="\u0DAB"; consonants[34]='N';
consonantsUni[35]="\u0DC5"; consonants[35]='L';
consonantsUni[36]="\u0D9A"; consonants[36]='k';
consonantsUni[37]="\u0D9D"; consonants[37]='gh';
consonantsUni[38]="\u0DA8"; consonants[38]='T';
consonantsUni[39]="\u0DAA"; consonants[39]='D';
consonantsUni[40]="\u0DB5"; consonants[40]='P';
consonantsUni[41]="\u0DB9"; consonants[41]='B';
consonantsUni[42]="\u0DC6"; consonants[42]='f';
consonantsUni[43]="\u0DA3"; consonants[43]='q';
consonantsUni[44]="\u0D9C"; consonants[44]='g';

consonantsUni[45]="\u0DBB"; consonants[45]='r';

specialCharUni[0]="\u0DF2"; specialChar[0]='ruu';
specialCharUni[1]="\u0DD8"; specialChar[1]='ru';
//specialCharUni[2]="\u0DCA\u200D\u0DBB"; specialChar[2]='ra';





var qsfox_singlish={


    handleSinglish: function(e){

        
        if(e.charCode==32||e.charCode==44||e.charCode==46){      //for dot, comma, space
            setTimeout("document.getElementById('singlishPopup').hidePopup();",1000);                  //hide popup indicator containing currently typing word
            if (e.target.value==null){      //iframe
                obj=e.originalTarget;
            
            }
            else{                           //normal text field
                obj=e.target;
               
            }
         
            if (obj.value!=null){           //FOR NORMAL TEXT FIELDS
                text = obj.value;
                obj.value = qsfox_singlish.convert(text);               //set text to field

                
            }
        }
        else if(checkRange(e)){
			
            if (e.target.value==null){
                obj=e.originalTarget;
								
            }
            else{                                  //for small popup indicator containing currently typing word
                obj=e.target;
                var curserPosition=obj.selectionEnd;
           

                var str=obj.value+String.fromCharCode(e.charCode);
              
                if(curserPosition==str.length-1){              

                    var output="";

                    var spaceindex = str.lastIndexOf(" ");
                    var commaindex = str.lastIndexOf(",");
                    var dotindex = str.lastIndexOf(".");

                    var lastindex=spaceindex;                                    //finding last word


                    if(spaceindex>commaindex && spaceindex>dotindex){
                        lastindex=spaceindex+1;
                    }
                    else if(commaindex>spaceindex && commaindex>dotindex){
                        lastindex=commaindex+1;
                    }
                    else if(dotindex>spaceindex && dotindex>commaindex){
                        lastindex=dotindex+1;
                    }


                    for(i=lastindex;i<str.length;i++){
                        output = output+str.charAt(i);
                    }
                    qsfox.showSinglishBalloon(qsfox_singlish.convert(output));
                    setTimeout("qsfox.showSinglishBalloon('Press SPACE to convert');",10000);  //display a help massege near status bar if the user hasn't press a key for 10sec
               
                }
            }
            if (obj.value==null){                       //FOR IFRAMES (IFRAME HANDLING PROCEDURE IS MENTIONED IN wijesekarakb.js)
                frameobj=e.view.frameElement;
				divobj=obj;
				frameTag=obj.tagName;
				firstPopupCharacter=String.fromCharCode(e.charCode);
                showpopup(frameobj);                    //show popup window (located at overlay.js)
                if (e && e.preventDefault)
                    e.preventDefault();                //prevent default action
            }
            
        }
        else{

            setTimeout("document.getElementById('singlishPopup').hidePopup();",1000);          //hide popup indicator containing currently typing word


        }



    },

    convert: function(input){
        //this function convert singlish text to sinhala

        var s,r,v;
        counter=0;
                
        //special consonents
        for (var i=0; i<specialConsonants.length; i++){
            input = input.replace(specialConsonants[i], specialConsonantsUni[i]);
        }
        //consonents + special Chars
        for (var i=0; i<specialCharUni.length; i++){
            for (var j=0;j<consonants.length;j++){
                s = consonants[j] + specialChar[i];
                v = consonantsUni[j] + specialCharUni[i];
                r = new RegExp(s, "g");
                input = input.replace(r, v);
            }
        }
        //consonants + Rakaransha + vowel modifiers
        for (var j=0;j<consonants.length;j++){
            for (var i=0;i<vowels.length;i++){
                s = consonants[j] + "r" + vowels[i];
                v = consonantsUni[j] + "\u0DCA\u200D\u0DBB" + vowelModifiersUni[i];
                r = new RegExp(s, "g");
                input = input.replace(r, v);
            }
            s = consonants[j] + "r";
            v = consonantsUni[j] + "\u200D\u0DCA\u0DBB";
            r = new RegExp(s, "g");
            input = input.replace(r, v);
        }
        //consonents + vowel modifiers
        for (var i=0;i<consonants.length;i++){
            for (var j=0;j<nVowels;j++){
                s = consonants[i]+vowels[j];
                v = consonantsUni[i] + vowelModifiersUni[j];
                r = new RegExp(s, "g");
                input = input.replace(r, v);
            }
        }

        //consonents + HAL
        for (var i=0; i<consonants.length; i++){
            r = new RegExp(consonants[i], "g");
            input = input.replace(r, consonantsUni[i]+"\u0DCA");
        }

        //vowels
        for (var i=0; i<vowels.length; i++){
            r = new RegExp(vowels[i], "g");
            input = input.replace(r, vowelsUni[i]);
        }
                
        return input;
    }
}























