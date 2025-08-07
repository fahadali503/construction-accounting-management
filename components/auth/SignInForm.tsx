"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInFormData } from "@/lib/validations/auth";
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
import { useSignIn } from "@/hooks";

interface SignInFormProps {
    onSuccess?: () => void;
    redirectTo?: string;
    showCard?: boolean;
    title?: string;
    description?: string;
}

export function SignInForm({
    onSuccess,
    redirectTo = "/dashboard",
    showCard = true,
    title = "Sign In",
    description = "Enter your credentials to access your account",
}: SignInFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const signInMutation = useSignIn();

    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            await signInMutation.mutateAsync(data);

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
                form.setError(error.response.data.field as keyof SignInFormData, {
                    message: error.response?.data?.message || "Failed to sign in. Please try again.",
                });
            }
        }
    };

    const FormContent = () => (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                    disabled={signInMutation.isPending}
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
                                        placeholder="Enter your password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        disabled={signInMutation.isPending}
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={signInMutation.isPending}
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

                <Button type="submit" className="w-full" disabled={signInMutation.isPending}>
                    {signInMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {signInMutation.isPending ? "Signing in..." : "Sign In"}
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
