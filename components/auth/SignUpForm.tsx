"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpFormData } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useSignUp } from "@/hooks";

interface SignUpFormProps {
    onSuccess?: () => void;
    redirectTo?: string;
    showCard?: boolean;
    title?: string;
    description?: string;
}

export function SignUpForm({
    onSuccess,
    redirectTo = "/dashboard",
    showCard = true,
    title = "Create Account",
    description = "Enter your information to create a new account",
}: SignUpFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const signUpMutation = useSignUp();

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            // Remove confirmPassword from the request data
            const { confirmPassword, ...signUpData } = data;
            await signUpMutation.mutateAsync(signUpData);

            // Call success callback if provided
            if (onSuccess) {
                onSuccess();
            } else {
                // Default behavior: redirect
                router.push(redirectTo);
            }
        } catch (error: any) {
            // Handle field-specific errors
            if (error.response?.data?.field) {
                form.setError(error.response.data.field as keyof SignUpFormData, {
                    message: error.response?.data?.message || "Failed to create account. Please try again.",
                });
            }
        }
    };

    const FormContent = () => (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your full name"
                                    type="text"
                                    autoComplete="name"
                                    disabled={signUpMutation.isPending}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your email"
                                    type="email"
                                    autoComplete="email"
                                    disabled={signUpMutation.isPending}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="Create a password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        disabled={signUpMutation.isPending}
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={signUpMutation.isPending}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="Confirm your password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        disabled={signUpMutation.isPending}
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={signUpMutation.isPending}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={signUpMutation.isPending}>
                    {signUpMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {signUpMutation.isPending ? "Creating account..." : "Create Account"}
                </Button>
            </form>
        </Form>
    );

    if (showCard) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormContent />
                </CardContent>
            </Card>
        );
    }

    return <FormContent />;
}
