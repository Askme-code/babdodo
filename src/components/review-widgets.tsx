'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Star } from "lucide-react";

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#34A853" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l5.657,5.657C41.312,35.51,44,30.34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FBBC05" d="M12.961,11.039l-5.657,5.657C6.053,19.954,4,24,4,24c0,0.46,0.018,0.913,0.05,1.36l5.71-4.4C9.176,17.753,9.58,14.62,11.36,12.24c0.5-0.66,1.06-1.28,1.6-1.2z"/>
        <path fill="#EA4335" d="M24,44c5.166,0,9.86-1.977,13.2-5.2l-5.657-5.657c-1.856,1.406-4.087,2.237-6.543,2.237c-3.956,0-7.341-2.483-8.663-5.957l-5.71,4.4C7.994,38.384,15.467,44,24,44z"/>
        <path fill="none" d="M4,4h40v40H4z"/>
    </svg>
);

const TripAdvisorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 16c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm7 0c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm-3.5-7.104c-2.404 0-4.596 1.416-5.465 3.488-.235.544.133 1.116.701 1.116h1.229c.401 0 .752-.26.884-.648.567-1.655 2.115-2.823 3.901-2.823s3.334 1.168 3.901 2.823c.132.388.483.648.884.648h1.229c.568 0 .936-.572.701-1.116-1.04-2.271-3.232-3.488-5.465-3.488z"/>
    </svg>
);


export default function ReviewWidgets() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Real Reviews from Real Travelers</h2>
                    <p className="mt-4 text-muted-foreground">
                        See what our guests are saying on popular travel platforms.
                    </p>
                </div>

                <Tabs defaultValue="tripadvisor" className="w-full max-w-4xl mx-auto mt-12">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="tripadvisor">
                            <TripAdvisorIcon />
                            <span className="ml-2">TripAdvisor</span>
                        </TabsTrigger>
                        <TabsTrigger value="google">
                            <GoogleIcon />
                            <span className="ml-2">Google</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="tripadvisor">
                        <Card>
                            <CardHeader>
                                <CardTitle>TripAdvisor Reviews</CardTitle>
                                <CardDescription>Our latest reviews from TripAdvisor.</CardDescription>
                            </CardHeader>
                            <CardContent className="min-h-[200px] flex items-center justify-center text-center">
                                <div className="p-6 border-2 border-dashed rounded-lg">
                                    <h3 className="font-semibold text-lg">Embed TripAdvisor Widget Here</h3>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        1. Go to your TripAdvisor Widget Center. <br/>
                                        2. Choose your widget and copy the code. <br/>
                                        3. Paste the code inside this div to display your reviews.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="google">
                        <Card>
                             <CardHeader>
                                <CardTitle>Google Reviews</CardTitle>
                                <CardDescription>Our latest reviews from our Google Business Profile.</CardDescription>
                            </CardHeader>
                            <CardContent className="min-h-[200px] flex items-center justify-center text-center">
                                <div className="p-6 border-2 border-dashed rounded-lg">
                                    <h3 className="font-semibold text-lg">Embed Google Reviews Widget Here</h3>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        1. Find a third-party Google Reviews widget provider. <br/>
                                        2. Connect your Google Business Profile and copy the embed code. <br/>
                                        3. Paste the code inside this div to display your reviews.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
