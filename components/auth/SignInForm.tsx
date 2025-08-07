"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, PasswordFormData } from "@/lib/validations/auth";
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
    title = "Access Construction Management",
    description = "Enter the system password to continue",
}: SignInFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { signIn, isLoading, error } = useSignIn();

    const form = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = async (data: PasswordFormData) => {
        try {
            await signIn(data);

            // Call success callback if provided
            if (onSuccess) {
                onSuccess();
            } else {
                // Default behavior: redirect
                router.push(redirectTo);
            }
        } catch (error: any) {
            // Handle errors
            form.setError("password", {
                message: error || "Invalid password. Please try again.",
            });
        }
    };

    const FormContent = () => (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                        {error}
                    </div>
                )}

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>System Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="Enter system password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
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

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Verifying..." : "Access System"}
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
