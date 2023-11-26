"use client"

import * as React from "react"

import { useMutation } from '@tanstack/react-query';
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from 'formik';
import { useAppDispatch } from "@/app/redux/store"
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import axios from "axios"
import * as Yup from 'yup';
import { setInfor, setToken } from "@/app/redux/slices/authSlice"
import createAxiosInstance from "@/app/utils/axiosInstance";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function UserLoginForm({ className, ...props }: UserAuthFormProps) {
    const router = useRouter()
    const [showpass, setShowPass] = React.useState<boolean>(false)
    const mutation = useMutation({
        mutationFn: async (values: any) => {
            try {
                let response = await axios.post("http://localhost:3000/api/v1/auth/login", {
                    "email": values.email,
                    "password": values.password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setCookie('accessToken', response.data.accessToken);
                setCookie('refreshToken', response.data.refreshToken);
                dispatch(setToken(response.data))
                toast.success("Đăng nhập thành công")
                return response
            }
            catch (err: any) {
                toast.error(err)
            }
        },
    })
    const dispatch = useAppDispatch()
    const loginform = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Địa chỉ email không hợp lệ').required('Cần nhập email'),
            password: Yup.string().min(3, 'Phải có ít nhất 3 ký tự').required('Cần nhập mật khẩu'),
        }),
        onSubmit: async (values) => {
            try {
                mutation.mutate(values);
                let axiosJWT = createAxiosInstance()
                let userinfor = await axiosJWT.get("/user/me")
                dispatch(setInfor(userinfor.data))
                router.push('/', { scroll: false })
            } catch (error: any) {
                toast.error(error)
            }
        },
    });
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={loginform.handleSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="" htmlFor="email">
                            Địa chỉ Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            onBlur={(event) => loginform.handleBlur(event)}
                            onChange={(event) => loginform.handleChange(event)}
                            value={loginform.values.email}
                            disabled={mutation.isPending}
                        />
                        {loginform.touched.email && loginform.errors.email ? (
                            <div className="text-red-600 ml-1 text-sm my-1">{loginform.errors.email}</div>
                        ) : <div className="opacity-0 text-sm my-1">OK</div>}
                        <Label className="" htmlFor="password">
                            Mật khẩu
                        </Label>
                        <Input
                            id="password"
                            placeholder="your password"
                            type={showpass ? "text" : "password"}
                            autoCapitalize="none"
                            autoCorrect="off"
                            onBlur={(event) => loginform.handleBlur(event)}
                            onChange={(event) => loginform.handleChange(event)}
                            value={loginform.values.password}
                            disabled={mutation.isPending}
                        />
                        <div className="flex flex-row gap-4 my-1">
                            <Checkbox id="terms" onCheckedChange={() => {
                                setShowPass(!showpass)
                            }} />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Hiển thị mật khẩu
                            </label>
                        </div>
                        {loginform.touched.password && loginform.errors.password ? (
                            <div className="text-red-600 ml-1 text-sm my-1">{loginform.errors.password}</div>
                        ) : <div className="opacity-0 text-sm my-1">OK</div>}
                    </div>
                    <Button variant="outline" disabled={mutation.isPending} type="submit">
                        {mutation.isPending && (
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
            <Button variant="outline" type="button" disabled={mutation.isPending}>
                {mutation.isPending ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "}
                Github
            </Button>
        </div>
    )
}