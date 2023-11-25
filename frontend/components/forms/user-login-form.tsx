"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from 'formik';
import axios from "axios"
import * as Yup from 'yup';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function UserLoginForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    // async function onSubmit(event: React.SyntheticEvent) {
    //     event.preventDefault()
    //     setIsLoading(true)

    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 3000)
    // }
    const loginform = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
        }),
        onSubmit: async (values) => {
            // console.log(values);
            setIsLoading(true)
            setIsLoading(false)
            let response = await axios.post("http://localhost:3000/api/v1/auth/login", {
                "email": values.email,
                "password": values.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
        },
    });
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={loginform.handleSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            onChange={(event) => loginform.handleChange(event)}
                            value={loginform.values.email}
                            disabled={isLoading}
                        />
                        {loginform.touched.email && loginform.errors.email ? (
                            <div className="text-red-700">{loginform.errors.email}</div>
                        ) : <div className="opacity-0">OK</div>}
                        <Input
                            id="password"
                            placeholder="your password"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            onChange={(event) => loginform.handleChange(event)}
                            value={loginform.values.password}
                            disabled={isLoading}
                        />
                        {loginform.touched.password && loginform.errors.password ? (
                            <div className="text-red-700">{loginform.errors.password}</div>
                        ) : <div className="opacity-0">OK</div>}
                    </div>
                    <Button variant="outline" disabled={isLoading} type="submit">
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Đăng nhập bằng Email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Hoặc đăng nhập bằng
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "}
                Github
            </Button>
        </div>
    )
}