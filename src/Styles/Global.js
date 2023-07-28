import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;

    }
    
    body{
        background-color: ${({theme}) => theme.backgroundColor};
        transition: all linear 0.25s;
    }

    .canvas{
        min-height: 100vh;
        width: 100vw;
        display: grid;
        grid-auto-flow: row;
        grid-template-rows: auto 1fr auto;
    }

    .upper-menu{
        border: 2px solid ${({theme}) => theme.borderColor};
        border-radius: 10px;
        margin-block: 30px;
        padding-inline: 50px;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .timer{
        border: 1px solid ${({theme}) => theme.borderColor};
        color: ${({theme}) => theme.textColor};
        border-radius: 5px;
        padding: 8px 20px;
        display: flex;
        gap: 15px;
        align-items: center;
        font-size: 1.5rem;
    }

    .type-box{
        max-width: 1000px;
        height: 350px;
        padding: 5px;
        border: 2px solid ${({theme}) => theme.borderColor};
        color: ${({theme}) => theme.typeBoxText};
        border-radius: 10px;
        margin-inline: auto;
        overflow: hidden;
    }

    .typing-msg{
        font-size: 2rem;
        font-weight: 600;
        color: ${({theme}) => theme.textColor};
    }

    .words{
        font-size: 1.5rem;
        display: flex;
        flex-wrap: wrap;
    }

    .word{
        margin: 5px;
        padding-right: 2px;
    }

    .handle-input{
        display: block;
        width: 200px;
        margin: 10px auto;
        opacity: 0;
    }

    .current{
        border-left: 2px solid;
        animation: blinking 2s linear infinite;
        @keyframes blinking {
            0%{
                border-left-color: #fff;
            }
            25%{
                border-left-color: #000;
            }
            50%{
                border-left-color: #fff;
            }
            75%{
                border-left-color: #000;
            }
            100%{
                border-left-color: #fff;
            }
        }
    }

    .current-right{
        border-right: 2px solid;
        animation: blinking-right 2s linear infinite;
        @keyframes blinking-right {
            0%{
                border-right-color: #fff;
            }
            25%{
                border-right-color: #000;
            }
            50%{
                border-right-color: #fff;
            }
            75%{
                border-right-color: #000;
            }
            100%{
                border-right-color: #fff;
            }
        }
    }

    .correct{
        color: green;
    }

    .incorrect{
        color: red;
    }

    .theme{
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .stat-box{
        display: flex;
        gap: 20px;
        height: 360px;
    }

    .left-stat{
        width: 30%;
        border: 2px solid ${({theme}) => theme.borderColor};
        border-radius: 10px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        place-items: center;
        color: ${({theme}) => theme.textColor};
    }

    .right-stat, .graphData, .tableData{
        width: 70%;
        border: 2px solid ${({theme}) => theme.borderColor};
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title{
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
    }

    .sub-title{
        font-size: 1.2rem;
        font-weight: 500;
        text-align: center;
    }

    .stat-item{
        width: 90%;
        height: 90%;
        border: 1px solid ${({theme}) => theme.borderColor};
        border-radius: 10px;
       display: flex;
       flex-direction: column;
       justify-content: center;
    }

    .UserPage{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 50px;
        padding-block: 30px;
    }

    .userData{
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .user-profile{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 70%;
        background-color: ${({theme}) => theme.appBar};
        ${'' /* border: 2px solid ${({theme}) => theme.borderColor}; */}
        border-radius: 10px;
        padding: 20px;
    }

    .user-info{
        font-size: 1.5rem;
        font-weight: bold;
        color: ${({theme}) => theme.textColor};
        border-left: 2px solid ${({theme}) => theme.textColor};
        padding-left: 100px;
    }

    .user-info span{
        font-weight: normal;
        font-style: italic;
        line-height: 3rem;
    }
`;
