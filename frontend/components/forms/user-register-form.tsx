"use client"

import * as React from "react"

import { useMutation } from '@tanstack/react-query';
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from 'formik';
import { Checkbox } from "@/components/ui/checkbox"
import * as Yup from 'yup';
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function UserSignInForm({ className, ...props }: UserAuthFormProps) {
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: async (values: any) => {
            try {
                let response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
                    "avatar": 'https://res.cloudinary.com/dfoj6menm/image/upload/v1700982970/jw7rubbgpuftwz5lezoo.png',
                    "name": values.name,
                    "email": values.email,
                    "password": values.password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success("Đăng ký thành công")
                router.push('/login', { scroll: true })
                console.log(response)
                return response
            }
            catch (err: any) {
                console.log(err)
                toast.error("Đăng ký thất bại")
            }
        },
    })
    const [showpass, setShowPass] = React.useState<boolean>(false)
    const [showrepass, setShowRePass] = React.useState<boolean>(false)
    const signinform = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repassword: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().min(6, 'Phải có ít nhất 6 ký tự').required('Cần nhập họ và tên'),
            email: Yup.string().email('Địa chỉ email không hợp lệ').required('Cần nhập email'),
            password: Yup.string().min(9, 'Phải có ít nhất 8 ký tự').required('Cần nhập mật khẩu'),
            repassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Mật khẩu không khớp') // Kiểm tra khớp với trường 'password'
                .min(9, 'Phải có ít nhất 8 ký tự')
                .required('Cần nhập mật khẩu'),
        }),
        onSubmit: async (values) => {
            try {
                mutation.mutate(values);
            } catch (error: any) {
                
            }
        },
    });

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={signinform.handleSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="" htmlFor="name">
                            Họ và tên
                        </Label>
                        <Input
                            id="name"
                            placeholder="ví dụ: Nguyễn Văn A"
                            type="text"
                            autoCapitalize="true"
                            // autoComplete="email"
                            onBlur={(event) => signinform.handleBlur(event)}
                            onChange={(event) => signinform.handleChange(event)}
                            autoCorrect="off"
                            disabled={mutation.isPending}
                        />
                        {signinform.touched.name && signinform.errors.name ? (
                            <div className="text-red-600 ml-1 text-sm my-1">{signinform.errors.name}</div>
                        ) : <div className="opacity-0 text-sm my-1">OK</div>}
                        <Label className="" htmlFor="email">
                            Địa chỉ email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            onBlur={(event) => signinform.handleBlur(event)}
                            onChange={(event) => signinform.handleChange(event)}
                            disabled={mutation.isPending}
                        />
                        {signinform.touched.email && signinform.errors.email ? (
                            <div className="text-red-600 ml-1 text-sm my-1">{signinform.errors.email}</div>
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
                            onBlur={(event) => signinform.handleBlur(event)}
                            onChange={(event) => signinform.handleChange(event)}
                            value={signinform.values.password}
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
                        {signinform.touched.password && signinform.errors.password ? (
                            <div className="text-red-600 ml-1 text-sm my-1">{signinform.errors.password}</div>
                        ) : <div className="opacity-0 text-sm my-1">OK</div>}
                        <Label className="" htmlFor="repassword">
                            Nhập lại mật khẩu
                        </Label>
                        <Input
                            id="repassword"
                            placeholder="your password"
                            type={showrepass ? "text" : "password"}
                            autoCapitalize="none"
                            autoCorrect="off"
                            onBlur={(event) => signinform.handleBlur(event)}
                            onChange={(event) => signinform.handleChange(event)}
                            value={signinform.values.repassword}
                            disabled={mutation.isPending}
                        />
                        <div className="flex flex-row gap-4 my-1">
                            <Checkbox id="terms" onCheckedChange={() => {
                                setShowRePass(!showrepass)
                            }} />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Hiển thị mật khẩu
                            </label>
                        </div>
                        {signinform.touched.repassword && signinform.errors.repassword ? (
                            <div className="text-red-600 ml-1 text-sm my-1">{signinform.errors.repassword}</div>
                        ) : <div className="opacity-0 text-sm my-1">OK</div>}
                    </div>
                    <Button variant="outline" disabled={mutation.isPending}>
                        {mutation.isPending && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Đăng ký với Email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Hoặc tiếp tục đăng ký với
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