import { IonButton, IonCard, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonSlide, IonSlides, IonTextarea } from "@ionic/react";
import React, { useRef, useState} from "react";

import './FactoryContent.css';
import {  trashOutline } from "ionicons/icons";


const FactoryContent: React.FC = () => {
    const [title,setTitle] = useState<string>();
    const [desc,setDesc] = useState<string>();
    const [numPlayers, setNumPlayers] = useState<number>(0);
    const [playerResponseString, setPlayerResponseString] = useState([
        'Player 1 Response'
    ])
    const [playerTitle, setPlayerTitle] = useState<string>();
    const [resourcesState, setResourcesState] = useState([
        {
            resource: 'Resource 1',
            equation: 'NULL',
            resourceValue: 0
        }
    ]);
    const [userResourcesState, setUserResourcesState] = useState([
        {
            resource: 'User Resource 1',
            equation: 'NULL',
            resourceValue: 0
        }
    ]);
    const [numRounds, setNumRounds] = useState<number>(1);
    const [question, setQuestion] = useState('')

    const [profitMultiplier, setProfitMultiplier] = useState<number>(1);
    const [decisionWeight, setDecisionWeight] = useState<number>(1);
    const [impactMultiplier, setImpactMultiplier] = useState<number>(1);
    
    const factorySlides = useRef(document.createElement('ion-slides'));

    const slideOpts = {
        slidesPerView: 1,
        initialSlide: 0
    };
    const [responseValue, setResponseValue] =useState([0])

    const operators = ['+','-','*','/','=',]

    function appendResources(){
        var newResource = `Resource ${resourcesState.length + 1}`;
        var newResourceValue = 0;
        setResourcesState(prevState => (prevState.concat({resource:newResource, equation:'NULL', resourceValue:newResourceValue})));
    }
    function deleteResource(index: number){
        delete resourcesState[index];
        setResourcesState(prevState => prevState.slice(0));
    }

    function changeResourceName(index: number, newResource: string){
        resourcesState[index] = {resource:newResource, equation:'NULL',resourceValue:resourcesState[index].resourceValue}
        //Needed to refresh Chips
        setResourcesState(prevState => prevState.slice(0));
    }

    function changeResourceValue(index: number, newValue: number){
        resourcesState[index] = {resource:resourcesState[index].resource, equation:'NULL', resourceValue:newValue}
        //Needed to refresh Chips
        setResourcesState(prevState => prevState.slice(0));
    }

    function appendUserResources(){
        var newResource = `User Resource ${userResourcesState.length + 1}`;
        var newResourceValue = 0;
        setUserResourcesState(prevState => (prevState.concat({resource:newResource, equation:'NULL', resourceValue:newResourceValue})));
    }
    function deleteUserResource(index: number){
        delete userResourcesState[index];
        setUserResourcesState(prevState => prevState.slice(0));
    }

    function changeUserResourceName(index: number, newResource: string){
        userResourcesState[index] = {resource:newResource, equation:'NULL',resourceValue:userResourcesState[index].resourceValue}
        //Needed to refresh Chips
        setUserResourcesState(prevState => prevState.slice(0));
    }

    function changeUserResourceValue(index: number, newValue: number){
        userResourcesState[index] = {resource:userResourcesState[index].resource, equation:'NULL', resourceValue:newValue}
        //Needed to refresh Chips
        setUserResourcesState(prevState => prevState.slice(0));
    }

    function appendResponses(){
        var newResponse = 0
        setResponseValue(prevState=>prevState.concat(newResponse));
    }

    function changeResponseValue(index:number, newValue:number){
        responseValue[index] = newValue;
    }

    function deleteResponseValue(index:number){
        delete responseValue[index];
        setResponseValue(prevState => prevState.slice(0));
    }

    function handlePlayerChange(newPlayerCount: number){
        setNumPlayers(newPlayerCount);
        console.log(numPlayers);
        var responseString = [`Player 1 Response`];
        for(let i = 1; i < newPlayerCount; i++){
            responseString.push(`Player ${i+1} Response`);
        }
        console.log(responseString);
        setPlayerResponseString(responseString);
        console.log(playerResponseString);
    }

    function updateValues(){
        setTitle(title);
        setDesc(desc);
        setNumPlayers(numPlayers);
        setPlayerTitle(playerTitle);
        setResourcesState(resourcesState);
        setNumRounds(numRounds);
        setQuestion(question);
        setProfitMultiplier(profitMultiplier);
        setDecisionWeight(decisionWeight);
        setImpactMultiplier(impactMultiplier);
    }

    const handleNext = () => {
        updateValues();
        factorySlides.current.slideNext();
    }

    const handlePrev = () => {
        updateValues();
        factorySlides.current.slidePrev();
    }
    
    return (
    <IonContent className="ion-padding">
        <IonSlides ref={factorySlides} pager={true} options={slideOpts} onIonSlideDidChange={()=>updateValues}>
            <IonSlide>
                <IonCard className="container">
                    <IonList>
                        <IonListHeader>
                            <IonLabel><strong>Simulation Title</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Simulation Title</IonLabel>
                            <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonListHeader>
                            <IonLabel><strong>Simulation Description</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Simulation Description</IonLabel>
                            <IonTextarea value={desc} onIonChange={e => setDesc(e.detail.value!)}></IonTextarea>
                        </IonItem>
                    </IonList>
                    <IonButton onClick={() => handleNext()}>Next Slide</IonButton>
                </IonCard>
            </IonSlide>
            <IonSlide>
                <IonCard className="container">
                    <IonList>
                        <IonListHeader>
                            <IonLabel><strong>Number of Players</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Number of Players</IonLabel>
                            <IonInput type="number" value={numPlayers} onIonChange={e => handlePlayerChange(parseInt(e.detail.value!, 10))}></IonInput>
                        </IonItem>
                        <IonListHeader>
                            <IonLabel><strong>Player Title</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Player Title</IonLabel>
                            <IonInput value={playerTitle} onIonChange={e => setPlayerTitle(e.detail.value!)}></IonInput>
                        </IonItem>
                    </IonList>
                    <IonButton onClick={() => handlePrev()}>Previous Slide</IonButton>
                    <IonButton onClick={() => handleNext()}>Next Slide</IonButton>
                </IonCard>
            </IonSlide>
            <IonSlide>
                <IonCard className="container">
                    <IonGrid>
                        <IonRow>
                            <IonCol><IonLabel><strong>Global Resources</strong></IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonLabel position="floating">Name of Global Resource</IonLabel></IonCol>
                            <IonCol><IonLabel position="floating">Value of Global Resource</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>{resourcesState.map((resource, index) =><IonItem><IonInput value={resource.resource} onIonChange={e => changeResourceName(index, e.detail.value!)}></IonInput><IonInput type="number" onIonChange={e => changeResourceValue(index, parseInt(e.detail.value!, 10))}></IonInput><IonButton onClick={() => deleteResource(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}</IonCol>
                        </IonRow>    
                        <IonRow><IonButton onClick={ () => appendResources()}>Add Global Resource</IonButton></IonRow>
                        <IonRow>
                            <IonCol><IonLabel><strong>User Resources</strong></IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonLabel position="floating">Name of User Resource</IonLabel></IonCol>
                            <IonCol><IonLabel position="floating">Value of User Resource</IonLabel></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>{userResourcesState.map((resource, index) =><IonItem><IonInput value={resource.resource} onIonChange={e => changeUserResourceName(index, e.detail.value!)}></IonInput><IonInput type="number" onIonChange={e => changeUserResourceValue(index, parseInt(e.detail.value!, 10))}></IonInput><IonButton onClick={() => deleteUserResource(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}</IonCol>
                        </IonRow>    
                        <IonRow><IonButton onClick={ () => appendUserResources()}>Add User Resource</IonButton></IonRow>

                    </IonGrid>
                    <IonButton onClick={() => handlePrev()}>Previous Slide</IonButton>
                    <IonButton onClick={() => handleNext()}>Next Slide</IonButton>
                </IonCard>
            </IonSlide>
            <IonSlide>
                <IonCard className="container">
                    <IonList>
                        <IonListHeader>
                            <IonLabel><strong>Number of Rounds</strong></IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonLabel position="floating">Number of Rounds</IonLabel>
                            <IonInput type="number" value={numRounds} onIonChange={e => setNumRounds(parseInt(e.detail.value!, 10))}></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Question to Display during Round</IonLabel>
                            <IonInput value={question} onIonChange={e => setQuestion(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Response Values</IonLabel>
                            {responseValue.map((response, index)=><IonItem><IonLabel>Response {index+1}</IonLabel><IonInput type="number" value={response} onIonChange={e => changeResponseValue(index,parseInt(e.detail.value!, 10))}></IonInput><IonButton onClick={() => deleteResponseValue(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}
                        </IonItem>
                        <IonButton onClick={() => appendResponses()}>Add Response</IonButton>
                    </IonList>
                    <IonButton onClick={() => handlePrev()}>Previous Slide</IonButton>
                    <IonButton onClick={() => handleNext()}>Next Slide</IonButton>
                </IonCard>
            </IonSlide>
            <IonSlide>
                <IonCard className="container">
                    <IonList>
                        <IonListHeader>
                            <IonLabel><strong>Variables and Equations</strong></IonLabel>
                        </IonListHeader>
                        <IonInput type="number" value={profitMultiplier} onIonChange={e=> setProfitMultiplier(parseInt(e.detail.value!, 10))}>Set Profit Multiplier</IonInput>
                        <IonInput type="number" value={decisionWeight} onIonChange={e=> setDecisionWeight(parseInt(e.detail.value!, 10))}>Set Decision Weight</IonInput>
                        <IonInput type="number" value={impactMultiplier} onIonChange={e=> setImpactMultiplier(parseInt(e.detail.value!, 10))}>Set Impact of Resource Multiplier</IonInput>
                        <IonListHeader>Global Resources</IonListHeader>
                        {resourcesState.map(resource =><IonChip><IonLabel>{resource.resource}</IonLabel></IonChip>)}
                        <IonListHeader>User Resources</IonListHeader>
                        {userResourcesState.map(resource=><IonChip><IonLabel>{resource.resource}</IonLabel></IonChip>)}
                        <IonListHeader>Player Response</IonListHeader>
                        {playerResponseString.map(playerResponse=><IonChip><IonLabel>{playerResponse}</IonLabel></IonChip>)}
                        <IonListHeader>Operations</IonListHeader>
                        {operators.map(operator=><IonChip><IonLabel>{operator}</IonLabel></IonChip>)}
                        
                    </IonList>
                    <IonButton onClick={() => handlePrev()}>Previous Slide</IonButton>
                    <IonButton onClick={() => handleNext()}>Next Slide</IonButton>
                </IonCard>
            </IonSlide>
        </IonSlides>
    </IonContent>
    );
};

export default FactoryContent;