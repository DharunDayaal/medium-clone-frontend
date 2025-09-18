"use client";

import NotFound from "@/app/not-found";
import { LoginProps, LoginState } from "@/interfaces/auth";
import { SignIn, SignUp } from "@/services/authService";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import Button from "../button";

const LoginLayout = () => {
    const loginData: LoginState = {
        values: {
            name: "",
            email: "",
            password: "",
        },
        message: "",
        error: {
            name: "",
            email: "",
            password: "",
        },
    };

    const [isSignUp, setIsSignUp] = useState(false);
    const router = useRouter();
    const [state, formAction, isLoading] = useActionState(
        handleLogin,
        loginData
    );

    const { setAuth } = useAuthStore();

    async function handleLogin(
        prevState: LoginState,
        formData: FormData
    ): Promise<LoginState> {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const error: LoginState["error"] = {};

        if (isSignUp && (!name || !name.trim())) {
            error.name = "Name is required";
        }
        if (!email || !email.trim()) {
            error.email = "Email is required";
        }
        if (!password || !password.trim()) {
            error.password = "Password is required";
        }

        if (Object.keys(error).length > 0) {
            return {
                error,
                message: "Please fill all the required fields",
                values: {
                    name: name,
                    email: email,
                    password: password,
                },
            };
        }

        const payload: LoginProps = {
            email: email,
            password: password,
            ...(isSignUp && { name: name }),
        };

        try {
            if (isSignUp) {
                const response = await SignUp(payload);
                if (response?.success) {
                    setIsSignUp(!isSignUp);
                }
            } else {
                const response = await SignIn(payload);
                if (response?.success) {
                    setAuth(response.data.token, response.data.user);
                    router.push("/home");
                }
            }
        } catch (error) {
            console.log("Error on sign up", error);
            NotFound();
        }

        return {
            values: {
                name: "",
                email: "",
                password: "",
            },
            message: `${isSignUp ? "Sign up" : "Sign in"} successfull`,
            error: {},
        };
    }
    return (
        <div className="p-6 text-center flex justify-center flex-col items-center">
            <form
                className="w-full max-w-md flex flex-col space-y-5 items-center"
                action={formAction}
            >
                <h1 className="font-light text-[#242424] font-poppins text-4xl mb-12">
                    Welcome back.
                </h1>

                {isSignUp && (
                    <div className="flex flex-col space-y-2 w-full">
                        <label htmlFor="name" className="text-base text-start">
                            Your name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            name="name"
                            aria-label="name"
                            defaultValue={state.values?.name}
                            className="w-full py-2 px-3 bg-gray-100 font-poppins rounded-lg"
                        />
                        {state.error.name && (
                            <p className="text-sm text-red-600 text-start">
                                {state.error.name}*
                            </p>
                        )}
                    </div>
                )}

                <div className="flex flex-col space-y-2 w-full">
                    <label htmlFor="email" className="text-base text-start">
                        Your email
                    </label>
                    <input
                        type="email"
                        defaultValue={state.values?.email}
                        name="email"
                        aria-label="email-address"
                        placeholder="Enter your email address"
                        className="w-full py-2 px-3 bg-gray-100 font-poppins rounded-lg"
                    />
                    {state.error.email && (
                        <p className="text-sm text-red-600 text-start">
                            {state.error.email}*
                        </p>
                    )}
                </div>

                <div className="flex flex-col space-y-2 w-full">
                    <label htmlFor="password" className="text-base text-start">
                        Your password
                    </label>
                    <input
                        type="password"
                        aria-label="password"
                        defaultValue={state.values?.password}
                        name="password"
                        placeholder="Enter your password"
                        className="w-full py-2 px-3 bg-gray-100 font-poppins rounded-lg"
                    />
                    {state.error.password && (
                        <p className="text-sm text-red-600 text-start">
                            {state.error.password}*
                        </p>
                    )}
                </div>
                <p className="text-center text-sm text-green-500">
                    {state.message}
                </p>
                <Button
                    name={isSignUp ? "Sign up" : "Sign in"}
                    type="submit"
                    disabled={isLoading}
                />
            </form>
            <p className="text-md mt-4">
                {!isSignUp ? "No account" : "Already have an account"}?{" "}
                <span
                    className="text-base underline cursor-pointer"
                    onClick={() => setIsSignUp(!isSignUp)}
                >
                    {!isSignUp ? "Create one" : "Sign in"}
                </span>
            </p>
        </div>
    );
};

export default LoginLayout;
