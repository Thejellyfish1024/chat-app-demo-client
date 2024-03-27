/* eslint-disable react/no-unescaped-entities */

import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {

    const { googleSigning } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleGoogle = () => {
        googleSigning()
            .then(async (result) => {
                // console.log(result.user);
                await axiosPublic.post('/users', { name: result?.user?.displayName, email: result?.user?.email })
                    .then(res => {
                        console.log(res.data);
                        navigate('/')
                    })

                navigate(location?.state || '/')

            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <h1 className="text-center text-3xl font-bold my-8">Please sign in first</h1>
            <div className="text-center mt-4 flex justify-center">
                <button onClick={handleGoogle} className="flex w-fit gap-5 hover:bg-[#52b788] font-semibold items-center justify-center py-2 px-8 rounded-full border-2 
            border-[#52b788]">
                    <FcGoogle className="text-2xl"></FcGoogle>
                    <span>Continue With Google</span>
                </button>
            </div>
        </div>
    );
};

export default Login;