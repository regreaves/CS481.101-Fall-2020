import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonRadio, IonRow, IonSelect, IonSelectOption, IonSlide, IonSlides, IonTextarea, IonToggle } from "@ionic/react";
import React, { useEffect, useRef, useState} from "react";


import './FactoryContent.css';

import {  trashOutline } from "ionicons/icons";
import { InitializeSimulation, ModifySimulation } from "../util/Backend.js";
import { Component } from "ionicons/dist/types/stencil-public-runtime";


const FactoryContent: React.FC = () => {
    const server_url = "simulation.dy2ewfz2jp1x8.amplifyapp.com/page/player";
    const [title,setTitle] = useState<string>();
    const [desc,setDesc] = useState<string>();
    const [numPlayers, setNumPlayers] = useState<number>(2);
    const [simulation_id, setSimulationId] = useState<string>("");
    const [playerResponseString, setPlayerResponseString] = useState([{
        chipText:'Player 1 Response',
        number:0
    }]);
    const [playerTitle, setPlayerTitle] = useState<string>();
    const [resourcesState, setResourcesState] = useState([
        {
            name: 'Resource 1',
            equation: 'NULL',
            starting_value: 0
        }
    ]);
    
    const [userResourcesState, setUserResourcesState] = useState([
        {
            name: 'User Resource 1',
            equation: 'NULL',
            starting_value: 0
        }
    ]);
    
    const [numRounds, setNumRounds] = useState<number>(1);
    const [question, setQuestion] = useState('');

    const [startTextCheck, setStartTextCheck] = useState<boolean>(false);
    const [endTextCheck, setEndTextCheck] = useState<boolean>(false);

    const [startText, setStartText] = useState<string>('');
    const [endText, setEndText] = useState<string>('Thanks for participating!');

    const [checkProfitMultiplier, setCheckProfitMultiplier] = useState<boolean>(false);
    const [profitMultiplier, setProfitMultiplier] = useState<number>(1);
    const [checkDecisionWeight, setCheckDecisionWeight] = useState<boolean>(false);
    const [decisionWeight, setDecisionWeight] = useState<number>(1);
    const [checkImpactMultiplier, setCheckImpactMultiplier] = useState<boolean>(false);
    const [impactMultiplier, setImpactMultiplier] = useState<number>(1);
    
    const factorySlides = useRef(document.createElement('ion-slides'));

    const slideOpts = {
        slidesPerView: 1,
        initialSlide: 0
    };
    const [responseValue, setResponseValue] =useState(['0']);

    const [sliderMinResponse, setSliderMinResponse] = useState<number>(0);
    const [sliderMaxResponse, setSliderMaxResponse] = useState<number>(10);
    const [sliderStepResponse, setSliderStepResponse] = useState<number>(1);
    
    const [responseType, setResponseType] = useState('radio');
    
    const [resourceEquationSelect, setResourceEquationSelect] = useState<string>('');
    const [currentEquationToDisplay, setCurrentEquationToDisplay] = useState<string>('');

    const [initSim, setInitSim] = useState<boolean>(false);

    const operators = ['+','-','*','/','(',')'];

    useEffect(() => {
        if(initSim === true){
            InitializeSimulation({"username":username, "password":password},(response)=>afterInit(response));
            setInitSim(false);
        }
    });

    // User information
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function appendResources(){
        var newResource = `Resource ${resourcesState.length + 1}`;
        var newResourceValue = 0;
        setResourcesState(prevState => (prevState.concat({name:newResource, equation:'NULL', starting_value:newResourceValue})));
    }
    function deleteResource(index: number){
        resourcesState.splice(index,1);
        setResourcesState(prevState => prevState.slice(0));
    }

    function changeResourceName(index: number, newResource: string){
        resourcesState[index] = {name:newResource, equation:resourcesState[index].equation,starting_value:resourcesState[index].starting_value}
        //Needed to refresh Chips
        setResourcesState(prevState => prevState.slice(0));
    }

    function changeResourceValue(index: number, newValue: number){
        resourcesState[index] = {name:resourcesState[index].name, equation:resourcesState[index].equation, starting_value:newValue}
        //Needed to refresh Chips
        setResourcesState(prevState => prevState.slice(0));
    }

    function changeResourceEquation(newValue: string){
        if(resourcesState.find(resource => resource.name === resourceEquationSelect.toString()) != undefined){
            var index = resourcesState.findIndex(resource => resource.name === resourceEquationSelect.toString());
            resourcesState[index] = {name: resourcesState[index].name, equation:newValue, starting_value: resourcesState[index].starting_value};
            setCurrentEquationToDisplay(newValue);
            console.log(resourcesState[index].equation);
        } else {
            index = userResourcesState.findIndex(resource => resource.name === resourceEquationSelect.toString());
            userResourcesState[index] = {name: userResourcesState[index].name, equation:newValue, starting_value: userResourcesState[index].starting_value};
            setCurrentEquationToDisplay(newValue);
            console.log(userResourcesState[index].equation);
        }
    }

    function appendUserResources(){
        var newResource = `User Resource ${userResourcesState.length + 1}`;
        var newResourceValue = 0;
        setUserResourcesState(prevState => (prevState.concat({name:newResource, equation:'NULL', starting_value:newResourceValue})));
    }
    function deleteUserResource(index: number){
        userResourcesState.splice(index,1);
        setUserResourcesState(prevState => prevState.slice(0));
    }

    function changeUserResourceName(index: number, newResource: string){
        userResourcesState[index] = {name:newResource, equation:userResourcesState[index].equation,starting_value:userResourcesState[index].starting_value}
        //Needed to refresh Chips
        setUserResourcesState(prevState => prevState.slice(0));
    }

    function changeUserResourceValue(index: number, newValue: number){
        userResourcesState[index] = {name:userResourcesState[index].name, equation:userResourcesState[index].equation, starting_value:newValue}
        //Needed to refresh Chips
        setUserResourcesState(prevState => prevState.slice(0));
    }

    

    function appendResponses(){
        setResponseValue(prevState=>prevState.concat('0'));
    }

    function changeResponseValue(index:number, newValue:string){
        responseValue[index] = newValue;
    }

    function deleteResponseValue(index:number){
        responseValue.splice(index,1);
        setResponseValue(prevState => prevState.slice(0));
    }

    function handlePlayerChange(newPlayerCount: number){
        setNumPlayers(newPlayerCount);
        console.log(numPlayers);
        var chipObject = [{
            chipText: 'Player 1 Response',
            number: 0
        }]
        for(let i = 1; i < newPlayerCount; i++){
            chipObject.push({chipText:`Player ${i+1} Response`,number:i});
        }
        setPlayerResponseString(chipObject);
        console.log(playerResponseString);
    }


    const handleNext = () => {
        factorySlides.current.slideNext();
    }

    const handlePrev = () => {
        factorySlides.current.slidePrev();
    }

    function handleSubmitClick(){
        
        if(checkProfitMultiplier === true){
            console.log("fbnjhrfgbnj2");
            setResourcesState(prevState => (prevState.concat({name:'Profit Multiplier', equation:profitMultiplier.toString(), starting_value:profitMultiplier})));
            console.log(resourcesState);
        }
        if(checkDecisionWeight === true){
            console.log("fbnjhrfgbnj1");
            setResourcesState(prevState => (prevState.concat({name:'Decision Weight', equation:decisionWeight.toString(), starting_value:decisionWeight})));
            console.log(resourcesState);
        }

        if(checkImpactMultiplier === true){
            console.log("fbnjhrfgbnj3");
            setResourcesState(prevState => (prevState.concat({name:'Impact Multiplier', equation:impactMultiplier.toString(), starting_value:impactMultiplier})));
            
        }

        console.log("HANDLE SUBMIT CLICK");
        setInitSim(true);
        handleNext();
    }

    function handleResourceChangeEquationSlide(newResource: string){
        console.log(newResource);
        setResourceEquationSelect(newResource);
        if(resourcesState.find(resource => resource.name === newResource) !== undefined){
            var index = resourcesState.findIndex(resource => resource.name === newResource);
            setCurrentEquationToDisplay(resourcesState[index].equation);
        } else {
            index = userResourcesState.findIndex(resource => resource.name === newResource);
            setCurrentEquationToDisplay(userResourcesState[index].equation);
        }
    }

    function radioSliderBuild(){
        if(responseType ==='radio'){
            return(
                <IonItem>
                    <IonLabel position="floating">Response Values</IonLabel>
                    {responseValue.map((response, index)=><IonItem><IonLabel>Response {index+1}</IonLabel><IonInput type="number" value={response} onIonChange={e => changeResponseValue(index, e.detail.value!)}></IonInput><IonButton onClick={() => deleteResponseValue(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}
                    <IonButton onClick={() => appendResponses()}>Add Response</IonButton>
                </IonItem>
            )
        } else {
            return (
                <IonItem>
                    <IonLabel>Minimum Response: </IonLabel><IonInput value={sliderMinResponse} type="number" onIonChange={e=>setSliderMinResponse(parseInt(e.detail.value!,10))}></IonInput>
                    <IonLabel>Maximum Response: </IonLabel><IonInput value={sliderMaxResponse} type="number" onIonChange={e=>setSliderMaxResponse(parseInt(e.detail.value!,10))}></IonInput>
                    <IonLabel>Step Response: </IonLabel><IonInput value={sliderStepResponse} type="number" onIonChange={e=>setSliderStepResponse(parseInt(e.detail.value!,10))}></IonInput>
                </IonItem>

            )
        }
    }

    function afterInit(response){
        console.log("AFTER INIT");
        setSimulationId(response.id);
        // var responseValueString = JSON.stringify(Object.assign({}, responseValue));
        // var responseValueJSON = JSON.parse(responseValueString);
        // var resourceStateString = JSON.stringify(Object.assign({}, resourcesState));
        // var resourceStateJSON = JSON.parse(resourceStateString);
        // var userResourceStateString = JSON.stringify(Object.assign({}, userResourcesState));
        // var userResourceStateJSON = JSON.parse(userResourceStateString);
        // console.log("RESPONSEVALUE: " + responseValueString + ", \n RESOURCESTATE: " + resourceStateString + ",\n USERRESOURCESTATE: " + userResourceStateString);

        var responseValueJSON = {};
        if(responseType === 'radio'){
            responseValueJSON = {
                "response_type":"radio",
                "values":responseValue
            };
        } else {
            responseValueJSON = {
                "response_type":"slider",
                "values":{
                    "min_response":sliderMinResponse,
                    "max_response":sliderMaxResponse,
                    "step_response":sliderStepResponse
                }
            }
        }
        console.log(responseValueJSON);
        
        var resourceStateJSON = {};
        for(var i=0; i < resourcesState.length; i++){
            var resourceIndex = "Resource " + i;
            var resourceJSON = {"name":resourcesState[i].name,"equation":resourcesState[i].equation,"starting_value":resourcesState[i].starting_value};
            resourceStateJSON[resourceIndex] = resourceJSON;
        }
        console.log(resourceStateJSON);

        var userResourceStateJSON = {};
        for(var i=0; i < userResourcesState.length; i++){
            var userResourceIndex = "Resource " + i;
            var userResourceJSON = {"name":userResourcesState[i].name,"equation":userResourcesState[i].equation,"starting_value":userResourcesState[i].starting_value};
            userResourceStateJSON[userResourceIndex] = userResourceJSON;
        }
        console.log(userResourceStateJSON);
        
        

        

        var modifySimJson = {
            "user":{"username": username, "password": password},
            "id":response.id,
            "name":title,
            "response_timeout":1,
            "start_text":startText,
            "end_text":endText,
            "prompt":question,
            "responses":responseValueJSON,
            "round_count":numRounds,
            "user_count":numPlayers,
            "resources":resourcesState,
            "user_resources": userResourcesState
        };
        console.log("SIMULATION ID:" + response.id);
        ModifySimulation(modifySimJson, ()=>{console.log("MODIFY SIMULATION RAN")});
    }

    return (
    <IonContent className="ion-padding">
        <IonSlides ref={factorySlides} pager={true} options={slideOpts}>
            <IonSlide class="container">

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
                                <IonInput value={password} type="password" placeholder="Password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonList> 

                        <IonButton onClick={() => handleNext()}>Begin</IonButton>

                    </IonCardContent>
                </IonCard>
            </IonSlide>
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
                <IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCardHeader><IonCardTitle>Starting and Ending Text and Links</IonCardTitle></IonCardHeader>
                        </IonRow>
                        <IonRow>
                            <IonCol><IonCardSubtitle>Starting Text or Link</IonCardSubtitle></IonCol>
                            <IonCol><IonToggle checked={startTextCheck} onIonChange={e => setStartTextCheck(e.detail.checked)}/></IonCol>
                            <IonCol><IonCardSubtitle>Ending Text or Link</IonCardSubtitle></IonCol>
                            <IonCol><IonToggle checked={endTextCheck} onIonChange={e => setEndTextCheck(e.detail.checked)}/></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonInput value={startText} disabled={!startTextCheck} placeholder="Enter Starting Text or Link" onIonChange={e => setStartText(e.detail.value!)}></IonInput>
                            </IonCol>
                            <IonCol>
                                <IonInput value={endText} disabled={!endTextCheck} placeholder="Enter Ending Text or Link" onIonChange={e => setEndText(e.detail.value!)}></IonInput>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
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
                            <IonCol>{resourcesState.map((resource,index) =><IonItem><IonInput value={resource.name} onIonChange={e => changeResourceName(index, e.detail.value!)}></IonInput><IonInput type="number" onIonChange={e => changeResourceValue(index, parseInt(e.detail.value!, 10))}></IonInput><IonButton onClick={() => deleteResource(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}</IonCol>
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
                            <IonCol>{userResourcesState.map((resource, index) =><IonItem><IonInput value={resource.name} onIonChange={e => changeUserResourceName(index, e.detail.value!)}></IonInput><IonInput type="number" onIonChange={e => changeUserResourceValue(index, parseInt(e.detail.value!, 10))}></IonInput><IonButton onClick={() => deleteUserResource(index)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton></IonItem>)}</IonCol>
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
                            <IonLabel>Multiple Choice or Slider</IonLabel>
                            <IonSelect value={responseType} okText="Ok" cancelText="Dismiss" onIonChange={e => setResponseType(e.detail.value!)}>
                                <IonSelectOption value="radio">Radio</IonSelectOption>
                                <IonSelectOption value="slider">Slider</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {radioSliderBuild()}
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
                        <IonItem><IonToggle checked={checkProfitMultiplier} onIonChange={e=>{setCheckProfitMultiplier(e.detail.checked)}}></IonToggle><IonInput type="number" placeholder="Set Profit Multiplier..." disabled={!checkProfitMultiplier}value={profitMultiplier} onIonChange={e=> {setProfitMultiplier(parseInt(e.detail.value!, 10))}}>Set Profit Multiplier...</IonInput></IonItem>
                        <IonItem><IonToggle checked={checkDecisionWeight} onIonChange={e=>setCheckDecisionWeight(e.detail.checked)}></IonToggle><IonInput type="number" value={decisionWeight} disabled={!checkDecisionWeight}onIonChange={e=> setDecisionWeight(parseInt(e.detail.value!, 10))}>Set Decision Weight...</IonInput></IonItem>
                        <IonItem><IonToggle checked={checkImpactMultiplier} onIonChange={e=>setCheckImpactMultiplier(e.detail.checked)}></IonToggle><IonInput type="number" value={impactMultiplier} disabled={!checkImpactMultiplier}onIonChange={e=> setImpactMultiplier(parseInt(e.detail.value!, 10))}>Set Magnitude of Impact on Resource Multiplier...</IonInput></IonItem>
                        <IonSelect value={resourceEquationSelect} placeholder="Resource Equation..." onIonChange={e => handleResourceChangeEquationSlide(e.detail.value!)}>
                            {resourcesState.map(resource =><IonSelectOption value={resource.name}>{resource.name}</IonSelectOption>)}
                            {userResourcesState.map(resource=><IonSelectOption value={resource.name}>{resource.name}</IonSelectOption>)}
                        </IonSelect>
                        <IonItem>
                            <IonInput value={currentEquationToDisplay} placeholder="Enter Equation..." onIonChange={e=>changeResourceEquation(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonListHeader>Player Response</IonListHeader>
                        <IonChip onClick={()=>changeResourceEquation(currentEquationToDisplay.toString() + '${current_user.response}')}><IonLabel>Current User's Response</IonLabel></IonChip>
                        {playerResponseString.map(playerResponse=><IonChip onClick={()=>changeResourceEquation(currentEquationToDisplay.toString() + '${user' + playerResponse.number.toString() + '.response}')}><IonLabel>{playerResponse.chipText}</IonLabel></IonChip>)}
                        <IonChip onClick={()=>{
                            var totalString = ''; 
                            for(var i = 0; i < numPlayers; i++){
                                totalString += '${user'+i.toString()+'.response}';
                                if(i<numPlayers-1){
                                    totalString+='+';
                                }
                            }
                            changeResourceEquation(currentEquationToDisplay.toString() + totalString);
                        }}>Total Response</IonChip>
                        <IonListHeader>Global Resource Values</IonListHeader>
                        {resourcesState.map(resource=><IonChip onClick={()=>changeResourceEquation(currentEquationToDisplay.toString() + '${' + resource.name + '}')}>{resource.name}</IonChip>)}
                        <IonListHeader>User Resource Values</IonListHeader>
                        {userResourcesState.map(resource=><IonChip onClick={()=>changeResourceEquation(currentEquationToDisplay.toString() + '${current_user.'+resource.name+'}')}>Current User's {resource.name}</IonChip>)}
                        {userResourcesState.map(resource=>{return playerResponseString.map((player,index)=>(<IonChip onClick={()=>changeResourceEquation(currentEquationToDisplay.toString()+'${user'+index+'.'+resource.name+'}')}><IonLabel>Player {index+1}'s {resource.name}</IonLabel></IonChip>))})}
                        <IonListHeader>Global Impacts</IonListHeader>
                        <IonChip onClick={()=>changeResourceEquation(currentEquationToDisplay.toString() + numPlayers.toString())}>Number of Participants</IonChip>
                        <IonChip disabled={!checkProfitMultiplier} onClick={()=>changeResourceEquation(currentEquationToDisplay.toString() + '${Profit Multiplier}')}>Profit Multiplier</IonChip>
                        <IonChip disabled={!checkDecisionWeight} onClick={()=>changeResourceEquation(currentEquationToDisplay.toString() + '${Decision Weight}')}>Decision Weight</IonChip>
                        <IonChip disabled={!checkImpactMultiplier} onClick={()=>changeResourceEquation(currentEquationToDisplay.toString() + '${Impact Multiplier}')}>Impact Multiplier</IonChip>
                        <IonListHeader>Operations</IonListHeader>
                        {operators.map(operator=><IonChip onClick={()=>changeResourceEquation(currentEquationToDisplay.toString()+operator)}><IonLabel>{operator}</IonLabel></IonChip>)}
                    </IonList>
                    <IonButton onClick={() => handlePrev()}>Previous Slide</IonButton>
                    <IonButton onClick={() => handleNext()}>Next Slide</IonButton>
                </IonCard>
            </IonSlide>
            <IonSlide>
                <IonCard>
                    <IonList>
                        <IonButton onClick={handleSubmitClick}>Submit Simulation</IonButton>
                    </IonList>
                </IonCard>
            </IonSlide>

            <IonSlide>
                <IonCard>
                    <IonList lines="none">
                        <IonItem>
                            <IonLabel className="ion-text-center">Your simulation's id is {simulation_id}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="ion-text-center">
                                Invite participants to your simulation using this link: <a href={`page/player/${simulation_id}`}>{`${server_url}/${simulation_id}`}</a>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonCard>
            </IonSlide>
        </IonSlides>  
    </IonContent>


    );
};

export default FactoryContent;