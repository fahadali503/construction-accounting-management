"use client";

import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthTabsProps {
    defaultTab?: "signin" | "signup";
    onSuccess?: () => void;
    redirectTo?: string;
    showToggle?: boolean;
}

export function AuthTabs({
    defaultTab = "signin",
    onSuccess,
    redirectTo,
    showToggle = true,
}: AuthTabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    if (!showToggle) {
        return (
            <div className="w-full max-w-md mx-auto">
                {activeTab === "signin" ? (
                    <SignInForm onSuccess={onSuccess} redirectTo={redirectTo} />
                ) : (
                    <SignUpForm onSuccess={onSuccess} redirectTo={redirectTo} />
                )}
            </div>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center">
                    {activeTab === "signin" ? "Welcome back" : "Create account"}
                </CardTitle>
                <CardDescription className="text-center">
                    {activeTab === "signin"
                        ? "Enter your credentials to access your account"
                        : "Enter your information to create a new account"
                    }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "signin" | "signup")}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin" className="space-y-4">
                        <SignInForm
                            onSuccess={onSuccess}
                            redirectTo={redirectTo}
                            showCard={false}
                        />
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4">
                        <SignUpForm
                            onSuccess={onSuccess}
                            redirectTo={redirectTo}
                            showCard={false}
                        />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
