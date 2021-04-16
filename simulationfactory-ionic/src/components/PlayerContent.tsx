import { IonButton, IonCard, IonCardContent, IonRefresher, IonRefresherContent, IonItemDivider, IonRange, IonCardHeader, IonInput, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRadioGroup, IonRadio, IonList, IonRippleEffect, IonRow, IonSlide, IonSlides, IonTextarea, IonHeader, IonListHeader } from "@ionic/react";
import React, {useRef, useState } from "react";

import './PlayerContent.css';
import { BeginSim, SubmitResponse } from "./../util/Backend";
import { RefresherEventDetail } from '@ionic/core';

const PlayerContent: React.FC = () => {
    //Javascript
    const [username,setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [simulation_id, setSimulationID] = useState<string>();
    const [response, setResponse] = useState<string>();

    //Sim variables
    //Use State Single variables
    const [turnNumber, setTurnNumber] = useState<number>();
    const [prompt, setPrompt] = useState<string>();
    const [userID, setUserID] = useState<string>();
    const [userWaiting, setUserWaiting] = useState<boolean>();
     
    //Use State variables for slider elements
    //The minimum and maximum values for the slider
    //The Step value or the offset between slider ticks
    const [minResponse, setMinResponse] = useState<number>(0);
    const [maxResponse, setMaxResponse] = useState<number>(10);
    const [stepResponse, setStepResponse] = useState<number>(1);

    //Use State arrays
    const [responses, setResponses] = useState([]);
    const [history, setHistory] = useState([]);
    const [userHistory, setUserHistory] = useState([]);
    const [currentResponse, setCurrentResponse] = useState({});
       
    var SimResponses = [1];

const userData = {'user':{'username':username, 'password':password}, 'id':simulation_id};
const playerSlides = useRef(document.createElement('ion-slides'));

const next = () =>{
    playerSlides.current.slideNext();
}
function previous(){
    playerSlides.current.slidePrev();
}
const verify = () =>{
    //next();
   
    StartSim();
    
    
}

function doRefresh() {
    console.log('Begin async operation');
  
    setTimeout(function(){ alert("Hello"); previous(); }, 3000);
    //previous();
  }


//Back end function specifically for join simulation
function StartSim(){
    /*input state variable with response */
    try{
        // console.log("Username is "+userData.user.username+ "\nPassword is " +userData.user.password+ "\nThis is the sim id " + userData.id);
        console.log("Environment variable "+ process.env.REACT_APP_SIMULATION_FACTORY_URL);
        BeginSim( userData, InitSim);
        console.log("Begin sim has finished running ");
        //this sends the user data to the database and returns with response
        //response is an any type variable
    }
    catch(error){
        console.log("Invalid User credentials");
    }
}
function InitSim (response){
    console.log("Initilizing Simulation Variables");

    //Single Json objects
    setTurnNumber(response.turn_number);
    setPrompt(response.prompt);
    setUserID(response.user_id);
    setUserWaiting(response.user_waiting);

    //Setting Arrays    
    setCurrentResponse(response.history[response.history.length-1]);
    console.log("Current Response entry----" + JSON.stringify(currentResponse))
    console.log("Response History is ---" + JSON.stringify(response.history))

    //if statement to determine if the response type is a slider or radio button        
    // if(response.type === 'slider'){
    //     setMinResponse(response.min_response);
    //     setMaxResponse(response.max_response);
        
    //     //since it is one by default we don't need to set 
    //     //the Use State variables if it is one
    //     if(response.step_response !== 1){
    //         //if the step response is not one we set it
    //         setStepResponse(response.step_response);
    //     }
    // } 
    // //else if it's a radio button, currently we only have sliders or radios
    // else{
    //     setResponses(response.responses);
    // }
    
    
    next();
}

//will be used once I get beginSim to work
function SubmitRes (){
    //id is simulation id
    var UserResponse = {
        'user':{'username':username, 'password':password},
        'id': simulation_id,
        'response': response   
    };
    try{
        SubmitResponse(UserResponse, SubmitCallBack);
    }
    catch(error){
        console.log("Error: Could not submit Response")
    }

    //end the method by sending the user to next slide
    next();
}
function SubmitCallBack(){
    /*
    Empty method
        In case there is a need for a callback of SubmitResponse
        An example is: if you wanted to do something but only if the backend succeeded such as backend credentials
    */
}
    return (
    <IonContent className="ion-padding">
        <IonGrid>   
            <IonRow className="ion-justify-content-center">
                <IonCol className="ion-text-center">
                    <IonSlides ref={playerSlides} onEnded={() => doRefresh()}>
                        <IonSlide class="swiper-no-swiping">

                            <IonCard className="container">
                                <IonCardHeader color="primary">
                                    <IonCardTitle>Simulation Player</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonList lines="none">
                                        <IonItem>
                                            <IonLabel className="ion-text-center">Enter Your Player credentials</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonInput value={username} placeholder="Username"onIonChange={e => setUsername(e.detail.value!)}></IonInput>                                    
                                        </IonItem>

                                        <IonItem>
                                            <IonInput value={password} placeholder="Password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                                        </IonItem>

                                        <IonItem>
                                            <IonInput value={simulation_id} placeholder="SimulationID" onIonChange={e => setSimulationID(e.detail.value!)}></IonInput>
                                        </IonItem>
                                        
                                    </IonList> 

                                    <IonButton routerLink="/page/player" routerDirection="root">
                                        Begin
                                        <IonRippleEffect></IonRippleEffect>
                                    </IonButton>
                                    <IonButton onClick={() => verify()}>Add Resource</IonButton>

                                </IonCardContent>
                            </IonCard>
                        </IonSlide>

                        <IonSlide class="swiper-no-swiping">
                            <IonCard className="container">
                                <IonCardHeader color="primary">
                                    <IonCardTitle>Simulation {username} Player</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonList lines="none">
                                        <IonItem>
                                            <IonLabel>The environment resource is: {/*History resources */}</IonLabel>
                                            <IonLabel>{/*first players resource name or function call */} is at---</IonLabel><IonLabel>{/*first players resource name or function call */} is at---</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Simulation Prompt: {prompt}</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel slot="start">How would you like to affect your production</IonLabel>
                                            <IonLabel slot="end">Current round: {turnNumber}</IonLabel>
                                        </IonItem>

                                    { /* Remember this divider for the future.
                                    <IonItemDivider>Default</IonItemDivider> 
                                    */}
                                    <IonItem>
                                        <IonRange pin={true} min={-5} max={5} snaps onIonChange={e => setResponse(e.detail.value.toString())}/>
                                        <IonLabel slot="start" color="tertiary">min</IonLabel>
                                        <IonLabel slot="end" color="tertiary">Max</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>Value: {response}</IonLabel>
                                    </IonItem>

                                    </IonList>
                                    <IonButton onClick={() => SubmitRes()}>Submit</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonSlide>

                        <IonSlide class="swiper-no-swiping" > 
                            <IonCard className="container">
                                <IonCardHeader color="primary">
                                    <IonCardTitle>Please wait on other participating users</IonCardTitle>
                                     {/*-- Custom Refresher Content --*/}
                                    <IonContent>
                                        <IonLabel>{() =>doRefresh()}</IonLabel>
                                    </IonContent>
                                </IonCardHeader>

                                
                            </IonCard>
                        </IonSlide>

                    </IonSlides>

                </IonCol>
            </IonRow>
        </IonGrid>
    </IonContent>
    );
};

export default PlayerContent;
