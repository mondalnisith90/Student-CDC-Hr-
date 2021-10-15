import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import "../../css/Signup.css";

import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CameraAltIcon from '@material-ui/icons/CameraAlt';



const reactToastStyle = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    };

const SignUp = ()=>{

    const history = useHistory();

    const [inputFormData, setInputFormData] = useState({
        name: "",
        branch: "",
        course: "",
        email: "",
        password: "",
        phoneNumber: "",
        type: "student"
    });

    const inputFieldChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setInputFormData({...inputFormData, [fieldName]: fieldValue});
    }


    const {name, branch, course, email, password, phoneNumber} = inputFormData;

    const studentSignupFormSubmit = async (event) => {
        event.preventDefault();
        const apiUrl = `http://localhost:8000/student/signup`;
        try {
            const serverResponse = await axios.post(apiUrl, inputFormData);
            if(serverResponse.status==201){
                setInputFormData({name: "", branch: "", course: "", email: "", password: "", phoneNumber: ""});
                toast.success("Registration successfull.", reactToastStyle);
                setTimeout(()=>{
                    history.push("/login");
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response.data, reactToastStyle);
        }
    }

    return(
        <>
          <div className="signup_root_div">
           <div className="signup_main_div">
            <h2 style={{color: "#05e374", fontStyle: "italic", textAlign: "center"}}>Student Registration</h2>
            <ToastContainer />
            <hr className="hr_line" />
            <div className="signup_form_div">
            <form action="POST" className="signup" onSubmit={studentSignupFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label form_input_label"><PersonIcon className="signup_icon"/>Name*</label>
                    <input type="text" placeholder="Enter name" className="form-control signup_form_input" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" required value={name} onChange={inputFieldChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputBranch" className="form-label form_input_label">Branch*</label>
                    <input type="text" placeholder="Enter branch name" className="form-control signup_form_input" id="exampleInputEmail1" aria-describedby="emailHelp" name="branch" required  value={branch} onChange={inputFieldChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputCourse" className="form-label form_input_label">Course*</label>
                    <input type="text"  placeholder="Enter course name" className="form-control signup_form_input" id="exampleInputEmail1" aria-describedby="emailHelp" name="course" required  value={course} onChange={inputFieldChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputProfilePic" className="form-label form_input_label"><CameraAltIcon className="signup_icon"/>Profoile Picture</label>
                    <input type="file"  placeholder="" className="form-control signup_form_input" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label form_input_label"><EmailIcon className="signup_icon"/>Email address*</label>
                    <input type="email" placeholder="Enter email address"  className="form-control signup_form_input" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" required  value={email} onChange={inputFieldChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label form_input_label" required value=""><LockIcon className="signup_icon"/>Password*</label>
                    <input type="password"  placeholder="Enter password"  className="form-control signup_form_input" id="exampleInputPassword1" name="password"  value={password} onChange={inputFieldChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPhone" className="form-label form_input_label">Phone Number*</label>
                    <input type="number" placeholder="Enter phone number" className="form-control signup_form_input" id="exampleInputPhone" aria-describedby="emailHelp" name="phoneNumber"  value={phoneNumber} onChange={inputFieldChange}  required />
                </div>
                <button type="submit" className="btn btn-success mt-4"><PersonAddIcon className="mr-2"/>SignUp</button>
            </form>
            </div>
            </div>
            </div>
        </>
    );
}
export default SignUp;