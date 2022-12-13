import React ,{useRef , useReducer , useEffect , useState} from 'react';

import './ValidationForm.css'

import axios from 'axios';

import PopUp from './PopUp';
import Loading from './Loading';

        // tabKey disabled
document.addEventListener('keydown',tabKey)
function tabKey(event){
    if(event.keyCode === 9){
        event.preventDefault();
        alert('TabKey Not Support');
    }
}



const ValidationForm = () => {

    // set data for create popUp
    const popUpValue={
        status:"",
        color:'#e74c3c' ,
        paragraph:'',
    }
    const reducer=(state , action)=> {
        switch(action){
            case "true":
                return {color:'#5a8919' ,status:"signin" , paragraph:'Sign in Successful'}
            case "false":
                return {color:'#e74c3c' ,status:"signinFaild" , paragraph:'Sign in Failed. Please Cheke Your Password and Email'}
            case "signUP":
                return {color:'#5a8919' ,status:"signUp" , paragraph:'Sign Up Successful'}
            default:
                return state
        }
    }
    const [creatPopUpVal , creatPopUp]=useReducer(reducer , popUpValue)



                    // sign in statements

    const signUp=useRef(null);
    const signIn=useRef(null);
    const overlayContainer=useRef(null);

    const switchOverlay=()=>{
        signUp.current.classList.toggle('sign-upAnime');
        signIn.current.classList.toggle('sign-inAnime');
        overlayContainer.current.classList.toggle('changeOverlayPosition');
    }

    const signClickHandler=(title)=>{
        document.title=title;
        switchOverlay();
    }

    const email=useRef(null);
    const password=useRef(null);
    const [userData , setUserData]=useState({});
    const [loading , setLoading]=useState(false);
    const [displayPop , setDisplayPop]=useState(false);


    const signInHandler=()=>{
        setLoading(true);
        if(email.current.value.includes('@') && password.current.value.length>=8){
            axios
                .post("https://jsonplaceholder.typicode.com/posts",{
                    userMail:email.current.value,
                    userPassword:password.current.value
                })
                    .then((respo) => {
                        setUserData(respo.data);
                        creatPopUp("true");
                        setDisplayPop(true)
                        email.current.value="";
                        password.current.value="";
                    })
        }
        else{
            creatPopUp("false");
            setDisplayPop(true);
        }
    }

    // delete sign in popup component after a delay
    useEffect(()=>{
        if(displayPop){
            setTimeout(() => {
                setDisplayPop(false);
                setUserData({});
                setLoading(false);
            }, 4501);
        }
    },[displayPop])
    



                                                    // sign up statements

    const [truForm , setTruForm]=useState(false);

    const mailRegex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const [signUpData ,setSignUpData]=useState({
        name:'',
        SignUpEmail:'',
        signUpPassword:'',
        signUpRenterPassword:''
    });

    const signUpChangeHandler=(event) => {
        const tru=()=> {
            setSignUpData({...signUpData ,[event.target.name]:event.target.value});
            event.target.style.borderColor='#cecece';
            setTruForm(true)
        }
        const fals=() => {
            setSignUpData({...signUpData ,[event.target.name]:event.target.value});
            event.target.style.borderColor='red';
            setTruForm(false)
        }
        switch(event.target.name){
            case 'name':
                if(event.target.value && !event.target.value.includes(" ") ){
                   tru();
                }
                else{
                   fals()
                }
            break;
            case 'SignUpEmail':
                if(event.target.value && event.target.value.match(mailRegex) ){
                   tru();
                }
                else{
                     fals()
                }
            break;
            case 'signUpPassword':
                if(event.target.value && event.target.value.length>=8){
                    tru();
                }
                else{
                    fals()
                }
            break;
            case "signUpRenterPassword":
                if(event.target.value === signUpData.signUpPassword){
                    tru();
                }
                else{
                     fals()
                }
            break;
        }
        
    }


    // sed user data to api and show PopUp for wellcome to user
    const [userInfo ,setUserInfo]=useState({});
    const [signupDisplayPopup, setSignupDisplayPopup]=useState(false);

    const signUpHandler=() => {
        if(truForm){
            setLoading(true);
            axios
                .post("https://jsonplaceholder.typicode.com/posts" , signUpData)
                    .then((respo)=>{
                        setUserInfo(respo.data);
                        creatPopUp('signUP');
                        setSignupDisplayPopup(true);
                    })
        }
    }

    // delete sign up popup component after a delay
    useEffect(()=>{
        if(signupDisplayPopup){
            setTimeout(() => {
                setSignupDisplayPopup(false);
                setLoading(false);
            }, 4501);
        }
    },[signupDisplayPopup])

    return (
        <>
                <main className="container">
                    <div className="form sign-inForm" ref={signIn}>
                        <h1>Sign in</h1>
                        <div className="socialcontainer">
                            <i className="fa-brands fa-google"></i>
                            <i className="fa-brands fa-linkedin"></i>
                            <i className="fa-brands fa-facebook"></i>
                        </div>
                        <p>or use your account</p>
                        <input type="email" name="email for login" id="email" placeholder="Email" ref={email} />
                        <input type="password" name="password" id="password" placeholder="Password (8 chr)" ref={password} />
                        <p className="ForgetPass">Forget your password?</p>
                        <button id="sign-inSubmit" onClick={signInHandler}> { loading  ? (<Loading />) : "SIGN IN"}</button>
                    </div>

                    <div className="form sign-upForm" ref={signUp}>
                        <h1>Sign up</h1>
                        <div className="socialcontainer">
                            <i className="fa-brands fa-google"></i>
                            <i className="fa-brands fa-linkedin"></i>
                            <i className="fa-brands fa-facebook"></i>
                        </div>
                        <p>or use your email for registration</p>
                        <input type="text" name="name" id="name" placeholder="Name" value={signUpData.name} onChange={signUpChangeHandler} />
                        <input type="email" name="SignUpEmail" id="sign-upEmail" placeholder="Email"  value={signUpData.SignUpEmail} onChange={signUpChangeHandler} />
                        <input type="password" name="signUpPassword" id="sign-upPassword" placeholder="Password (8 chr)"  value={signUpData.signUpPassword} onChange={signUpChangeHandler}/>
                        <input type="password" name="signUpRenterPassword" id="sign-upRenterPassword" placeholder="ReEnter Password"  value={signUpData.signUpRenterPassword} onChange={signUpChangeHandler} />
                        <button id="sign-upSubmit" onClick={signUpHandler}>   { loading  ? (<Loading />) : "SIGN UP"}</button>
                    </div>
                    <div className="overlayContainer" ref={overlayContainer}>
                        <div className="overlay">
                            <div className="overlayContent sign-upOverlay">
                                <h1>Hi There!</h1>
                                <p>Enter your personal details to Creat an account with us</p>
                                <button className="overlayBtn" onClick={ ()=> signClickHandler('SIGN UP') } >SIGN UP</button>
                            </div>
                            <div className="overlayContent sign-inOverlay">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal details</p>
                                <button className="overlayBtn" onClick={()=> signClickHandler('SIGN IN')}>SIGN IN</button>
                            </div>
                        </div>
                    </div>
                </main>
                    
                    {displayPop && <PopUp data={creatPopUpVal} userData={userData} /> }
                    {signupDisplayPopup && <PopUp data={creatPopUpVal} userData={userInfo} /> }
        </>
    );
};

export default ValidationForm;