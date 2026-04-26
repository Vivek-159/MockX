import Body from "./Body"
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from "./Login";
import Practice from "./Practice";
import Resume from "./ProfileComplete";
import Practiceq from "./Practiceq";
import Meeting from "./Meeting";
import InterviewScheduler from "./InterviewScheduler";
import PracticeWithMic from "./PracticeWithMic";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Body/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/user/resume" element={<Resume/>}></Route>
                    <Route path="/practice" element={<Practice/>}></Route>
                    <Route path="/practice-questions" element={<Practiceq/>}></Route>
                    <Route path="/meeting" element={<Meeting/>}></Route>
                    <Route path="/interview-scheduler" element={<InterviewScheduler/>}></Route>
                    <Route path="/practice-with-mic" element={<PracticeWithMic/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
