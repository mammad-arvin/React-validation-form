import React from 'react';

import styled from 'styled-components';

const PopUpTag=styled.div`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px);
    z-index: 150;
    display: ${props => props.display ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    transform: scale(0);
    animation: popUpAnime 4.5s ease forwards;

    @keyframes popUpAnime {
        0%,15%{
            transform: scale(.1);
        }
        15%,30%{
            transform: scale(1);

        }
        30%,90%{
            transform: scale(1);
        }
        90%,95%{
            transform: scale(1);
        }
        95%,100%{
            transform: scale(0);

        }
    }
`;

const PopUpContent=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    width: 250px;
    height: 90px;
    border-radius: 5px;
    background-color: ${props =>props.color};
    backdrop-filter: blur(3px);
    backdrop-filter: opacity(50%);
    box-shadow: 0px 0px 2px 1px ${props =>props.color};
    overflow: hidden;

    h1{
        font-size: 15px;
    }
    p{
        span{
            color: blue;
            font-weight: bold;
        }
        font: 15px/30px Montserrat;
        text-align: center;
        padding: 0 10px;
        color: white;
    }
    .progress{
        position: absolute;
        bottom: 0 ;
        width: 1%;
        height: 2px;
        background-color: #fff;
        animation: wi 4.5s ease forwards;
        @keyframes wi {
            to{ 
                width: 100%;
            }
        }
    }
`;


const PopUp = (props) => {

    const {status , color , paragraph }=props.data;
    const {name}=props.userData;
    const {userMail}=props.userData;
    let userMailName=[];
    if(userMail){
        userMailName=userMail.split('@');
    } 

    return (
        <>
        <PopUpTag display={status}>
            <PopUpContent color={color} >
                {userMail && <p>wellCome <span>{userMailName[0]}</span></p>}
                {name && <p>wellCome <span>{name}</span></p>}
                <p>{paragraph}</p>
                <div className="progress" ></div>
            </PopUpContent>
        </PopUpTag>
        </>
    );
};

export default PopUp;