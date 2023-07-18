import { createContext, useContext, useState } from "react";

const TestModeContext = createContext()

export const TestModeContextProvider = ({children}) => {
    const [testTime, setTestTime] = useState(15) //Initialised the testTime with 15(default) and defined setTestTime function
    const [startTimer, setStartTimer] = useState(false) //Initialised the startTimer with false and defined setStartTimer function
    const [testOver, setTestOver] = useState(false) //Initialised the testOver with false and defined setTestOver function
    const [intervalID, setIntervalID] = useState(null); //Initialised the intervalID with null and defined setIntervalID function
    const [graphData, setGraphData] = useState([]) //Initialised the graphData and defined setGraphData function
    const [correctChars, setCorrectChars] = useState(0); //Initialised the correctChars and defined setCorrectChars function
    const values = {
        testTime, setTestTime, startTimer, setStartTimer, testOver, setTestOver, intervalID, setIntervalID, graphData, setGraphData, correctChars, setCorrectChars
    }
    return(
        //Wrap the children to make the value available to all the components
        <TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>
    )
}

//Created useTestMode hook
export const useTestMode = () => useContext(TestModeContext)