import React, { useState } from 'react';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  User,
  Settings,
  Gift,
  Calendar,
  ShoppingBag,
  CreditCard,
  LogOut,
  Bell,
  Edit,
  CheckCircle2,
} from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';

export const AccountPage: React.FC = () => {
  const [progress, setProgress] = useState(65);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock data for the account page
  const userProfile = {
    name: "Samantha Johnson",
    email: "samantha.j@example.com",
    phone: "(555) 123-4567",
    points: 650,
    nextTier: 1000,
    tier: "Gold",
    joinDate: "March 15, 2025",
    profileImage: "/src/assets/images/avatar-placeholder.jpg",
  };

  const appointments = [
    {
      id: 1,
      service: "Full Balayage",
      date: "September 24, 2025",
      time: "2:00 PM",
      stylist: "Emma Rodriguez",
      status: "upcoming",
    },
    {
      id: 2,
      service: "Hair Cut & Style",
      date: "August 17, 2025",
      time: "11:30 AM",
      stylist: "James Wilson",
      status: "completed",
    },
    {
      id: 3,
      service: "Brazilian Blowout",
      date: "July 05, 2025",
      time: "3:45 PM",
      stylist: "Emma Rodriguez",
      status: "completed",
    },
  ];

  const orders = [
    {
      id: 1001,
      date: "September 15, 2025",
      items: ["Luxury Shampoo", "Repairing Hair Mask"],
      total: "$78.50",
      status: "delivered",
    },
    {
      id: 1002,
      date: "August 30, 2025",
      items: ["Heat Protection Spray", "Styling Brush"],
      total: "$45.99",
      status: "shipped",
    },
    {
      id: 1003,
      date: "August 02, 2025",
      items: ["Curl Defining Cream"],
      total: "$32.00",
      status: "delivered",
    },
  ];

  // Available rewards
  const rewards = [
    {
      id: 1,
      name: "Free Deep Conditioning Treatment",
      points: 200,
      description: "Revitalize your hair with our premium conditioning treatment",
      available: true,
    },
    {
      id: 2,
      name: "15% Off Next Service",
      points: 400,
      description: "Save on your next salon appointment",
      available: true,
    },
    {
      id: 3,
      name: "Luxury Product Bundle",
      points: 800,
      description: "Premium shampoo, conditioner and hair mask set",
      available: false,
    },
    {
      id: 4,
      name: "VIP Styling Session",
      points: 1200,
      description: "One-on-one session with our master stylist",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <User className="w-4 h-4 mr-2" />
              My Account
            </Badge>
            <h1 className="text-h1 font-light text-foreground mb-6">
              Welcome back, <span className="bg-gradient-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">{userProfile.name}</span>
            </h1>
            <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
              Manage your appointments, orders, and rewards all in one place.
            </p>
          </div>
          
          {/* Main Account Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Account Sidebar - Profile Summary */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="bg-gradient-to-br from-pink-50 to-blue-50 border border-pink-100 shadow-soft">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16 border-4 border-white shadow-soft">
                        <AvatarImage src={userProfile.profileImage} alt={userProfile.name} />
                        <AvatarFallback className="bg-gradient-to-r from-pink-300 to-blue-300 text-white text-lg">
                          {userProfile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{userProfile.name}</CardTitle>
                        <CardDescription>{userProfile.email}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full text-pink-500 hover:text-pink-600 hover:bg-pink-50">
                      <Edit className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Member Since</span>
                        <span className="text-sm">{userProfile.joinDate}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Loyalty Tier</span>
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200">
                          {userProfile.tier}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Reward Points</span>
                        <span className="text-sm font-semibold">{userProfile.points} points</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to Platinum</span>
                        <span>{userProfile.points}/{userProfile.nextTier}</span>
                      </div>
                      <Progress value={progress} className="h-2 bg-blue-100" 
                        indicatorClassName="bg-gradient-to-r from-pink-500 to-blue-500" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white" size="lg">
                    <Gift className="mr-2 h-4 w-4" />
                    Redeem Rewards
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Navigation Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={activeTab === "profile" ? "default" : "outline"}
                  className={`h-auto py-4 justify-start ${activeTab === "profile" ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white" : "bg-white"}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <User className={`h-5 w-5 mr-2 ${activeTab === "profile" ? "text-white" : "text-primary"}`} />
                  <span>Profile</span>
                </Button>
                <Button
                  variant={activeTab === "appointments" ? "default" : "outline"}
                  className={`h-auto py-4 justify-start ${activeTab === "appointments" ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white" : "bg-white"}`}
                  onClick={() => setActiveTab("appointments")}
                >
                  <Calendar className={`h-5 w-5 mr-2 ${activeTab === "appointments" ? "text-white" : "text-primary"}`} />
                  <span>Appointments</span>
                </Button>
                <Button
                  variant={activeTab === "orders" ? "default" : "outline"}
                  className={`h-auto py-4 justify-start ${activeTab === "orders" ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white" : "bg-white"}`}
                  onClick={() => setActiveTab("orders")}
                >
                  <ShoppingBag className={`h-5 w-5 mr-2 ${activeTab === "orders" ? "text-white" : "text-primary"}`} />
                  <span>Orders</span>
                </Button>
                <Button
                  variant={activeTab === "rewards" ? "default" : "outline"}
                  className={`h-auto py-4 justify-start ${activeTab === "rewards" ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white" : "bg-white"}`}
                  onClick={() => setActiveTab("rewards")}
                >
                  <Gift className={`h-5 w-5 mr-2 ${activeTab === "rewards" ? "text-white" : "text-primary"}`} />
                  <span>Rewards</span>
                </Button>
                <Button
                  variant={activeTab === "payment" ? "default" : "outline"}
                  className={`h-auto py-4 justify-start ${activeTab === "payment" ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white" : "bg-white"}`}
                  onClick={() => setActiveTab("payment")}
                >
                  <CreditCard className={`h-5 w-5 mr-2 ${activeTab === "payment" ? "text-white" : "text-primary"}`} />
                  <span>Payment</span>
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "outline"}
                  className={`h-auto py-4 justify-start ${activeTab === "settings" ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white" : "bg-white"}`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className={`h-5 w-5 mr-2 ${activeTab === "settings" ? "text-white" : "text-primary"}`} />
                  <span>Settings</span>
                </Button>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <Card className="shadow-soft border border-pink-100/50">
                <CardHeader className="pb-0">
                  <CardTitle className="text-2xl font-light">
                    {activeTab === "profile" && "My Profile"}
                    {activeTab === "appointments" && "My Appointments"}
                    {activeTab === "orders" && "Order History"}
                    {activeTab === "rewards" && "My Rewards"}
                    {activeTab === "payment" && "Payment Methods"}
                    {activeTab === "settings" && "Account Settings"}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === "profile" && "View and update your personal information"}
                    {activeTab === "appointments" && "Manage your upcoming and past salon appointments"}
                    {activeTab === "orders" && "Track your orders and view past purchases"}
                    {activeTab === "rewards" && `You have ${userProfile.points} points to redeem`}
                    {activeTab === "payment" && "Manage your payment methods and billing information"}
                    {activeTab === "settings" && "Update your account preferences and notifications"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6">
                  {/* Profile Tab */}
                  {activeTab === "profile" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Personal Information</h3>
                          <Card>
                            <CardContent className="p-4">
                              <dl className="space-y-2">
                                <div className="flex justify-between">
                                  <dt className="text-sm text-muted-foreground">Full Name</dt>
                                  <dd className="text-sm font-medium">{userProfile.name}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-sm text-muted-foreground">Email</dt>
                                  <dd className="text-sm font-medium">{userProfile.email}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-sm text-muted-foreground">Phone</dt>
                                  <dd className="text-sm font-medium">{userProfile.phone}</dd>
                                </div>
                              </dl>
                            </CardContent>
                            <CardFooter className="bg-gray-50 p-3 rounded-b-lg">
                              <Button variant="outline" size="sm" className="w-full">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Information
                              </Button>
                            </CardFooter>
                          </Card>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Preferences</h3>
                          <Card>
                            <CardContent className="p-4">
                              <dl className="space-y-2">
                                <div className="flex justify-between">
                                  <dt className="text-sm text-muted-foreground">Preferred Stylist</dt>
                                  <dd className="text-sm font-medium">Emma Rodriguez</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-sm text-muted-foreground">Hair Type</dt>
                                  <dd className="text-sm font-medium">Wavy, Color-Treated</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-sm text-muted-foreground">Favorite Services</dt>
                                  <dd className="text-sm font-medium">Balayage, Blowout</dd>
                                </div>
                              </dl>
                            </CardContent>
                            <CardFooter className="bg-gray-50 p-3 rounded-b-lg">
                              <Button variant="outline" size="sm" className="w-full">
                                <Edit className="h-4 w-4 mr-2" />
                                Update Preferences
                              </Button>
                            </CardFooter>
                          </Card>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Account Security</h3>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h4 className="text-sm font-medium">Password</h4>
                                <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                              </div>
                              <Button variant="outline" size="sm">Change Password</Button>
                            </div>
                            <Separator className="my-4" />
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                                <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                              </div>
                              <Button variant="outline" size="sm">Set Up</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                  
                  {/* Appointments Tab */}
                  {activeTab === "appointments" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Upcoming Appointments</h3>
                        <Button className="bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white">
                          <Calendar className="mr-2 h-4 w-4" />
                          Book New Appointment
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {appointments.filter(apt => apt.status === "upcoming").map(appointment => (
                          <Card key={appointment.id} className="overflow-hidden group hover:shadow-luxury transition-all duration-300">
                            <div className="bg-gradient-to-r from-pink-500 to-blue-600 h-1"></div>
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <h4 className="font-medium">{appointment.service}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {appointment.date} at {appointment.time} with {appointment.stylist}
                                  </p>
                                </div>
                                <Badge className="bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200">
                                  Upcoming
                                </Badge>
                              </div>
                            </CardContent>
                            <CardFooter className="bg-gray-50 p-4 flex justify-between">
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                Cancel
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                      
                      <h3 className="text-sm font-medium text-muted-foreground pt-4">Past Appointments</h3>
                      <div className="space-y-4">
                        {appointments.filter(apt => apt.status === "completed").map(appointment => (
                          <Card key={appointment.id} className="overflow-hidden">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <h4 className="font-medium">{appointment.service}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {appointment.date} at {appointment.time} with {appointment.stylist}
                                  </p>
                                </div>
                                <Badge className="bg-green-100 text-green-700 border-green-200">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Completed
                                </Badge>
                              </div>
                            </CardContent>
                            <CardFooter className="bg-gray-50 p-4 flex justify-end">
                              <Button variant="outline" size="sm">
                                Book Again
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Orders Tab */}
                  {activeTab === "orders" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Recent Orders</h3>
                        <Button className="bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Shop Products
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {orders.map(order => (
                          <Card key={order.id} className="overflow-hidden">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <h4 className="font-medium">Order #{order.id}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Placed on {order.date}
                                  </p>
                                  <div className="mt-2">
                                    <p className="text-sm font-medium">Items:</p>
                                    <ul className="text-sm text-muted-foreground">
                                      {order.items.map((item, idx) => (
                                        <li key={idx}>• {item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                <div className="text-right space-y-2">
                                  <Badge className={
                                    order.status === "delivered" 
                                      ? "bg-green-100 text-green-700 border-green-200" 
                                      : "bg-blue-100 text-blue-700 border-blue-200"
                                  }>
                                    {order.status === "delivered" ? (
                                      <><CheckCircle2 className="h-3 w-3 mr-1" /> Delivered</>
                                    ) : "Shipped"}
                                  </Badge>
                                  <p className="text-sm font-medium">{order.total}</p>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="bg-gray-50 p-4 flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                Track Order
                              </Button>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Rewards Tab */}
                  {activeTab === "rewards" && (
                    <div className="space-y-6">
                      <div>
                        <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-6 border border-pink-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium mb-1">{userProfile.tier} Member</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                You've earned {userProfile.points} points so far
                              </p>
                              <div className="space-y-1 mt-4">
                                <div className="flex justify-between text-sm">
                                  <span>Progress to Platinum</span>
                                  <span>{userProfile.points}/{userProfile.nextTier}</span>
                                </div>
                                <Progress value={progress} className="h-2 bg-blue-100" 
                                  indicatorClassName="bg-gradient-to-r from-pink-500 to-blue-500" />
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="bg-gradient-to-r from-pink-500 to-blue-600 text-white rounded-full h-24 w-24 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold">{userProfile.points}</span>
                                <span className="text-xs">POINTS</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                              <p className="font-medium">10% off services</p>
                              <p className="text-muted-foreground text-xs">Gold Tier Benefit</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                              <p className="font-medium">Free Birthday Gift</p>
                              <p className="text-muted-foreground text-xs">Gold Tier Benefit</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                              <p className="font-medium">2x Points Tuesdays</p>
                              <p className="text-muted-foreground text-xs">Gold Tier Benefit</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-sm font-medium text-muted-foreground pt-2">Available Rewards</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {rewards.map(reward => (
                          <Card key={reward.id} className={`overflow-hidden ${!reward.available ? "opacity-60" : ""}`}>
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1 flex-1">
                                  <h4 className="font-medium">{reward.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {reward.description}
                                  </p>
                                </div>
                                <div className="bg-gradient-to-r from-pink-100 to-blue-100 text-pink-700 rounded-full h-14 w-14 flex flex-col items-center justify-center">
                                  <span className="text-sm font-semibold">{reward.points}</span>
                                  <span className="text-xs">points</span>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="bg-gray-50 p-4 flex justify-center">
                              <Button 
                                disabled={!reward.available || userProfile.points < reward.points}
                                className={
                                  reward.available && userProfile.points >= reward.points
                                    ? "bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white w-full"
                                    : ""
                                }
                                variant={!(reward.available && userProfile.points >= reward.points) ? "outline" : "default"}
                              >
                                <Gift className="mr-2 h-4 w-4" />
                                {userProfile.points >= reward.points ? "Redeem Reward" : `Need ${reward.points - userProfile.points} more points`}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                      
                      <h3 className="text-sm font-medium text-muted-foreground pt-4">How to Earn Points</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="rounded-full bg-pink-100 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                              <Calendar className="h-6 w-6 text-pink-500" />
                            </div>
                            <h4 className="font-medium mb-1">Book Services</h4>
                            <p className="text-sm text-muted-foreground">
                              Earn 10 points for every $1 spent on services
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                              <ShoppingBag className="h-6 w-6 text-blue-500" />
                            </div>
                            <h4 className="font-medium mb-1">Buy Products</h4>
                            <p className="text-sm text-muted-foreground">
                              Earn 5 points for every $1 spent on products
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                              <User className="h-6 w-6 text-amber-500" />
                            </div>
                            <h4 className="font-medium mb-1">Refer Friends</h4>
                            <p className="text-sm text-muted-foreground">
                              Earn 250 points for each friend who visits
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                  
                  {/* Payment Tab */}
                  {activeTab === "payment" && (
                    <div className="space-y-6">
                      <h3 className="text-sm font-medium text-muted-foreground">Saved Payment Methods</h3>
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="bg-gray-100 p-2 rounded">
                                <CreditCard className="h-6 w-6 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium">Visa ending in 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 12/2027</p>
                              </div>
                            </div>
                            <Badge>Default</Badge>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 p-4 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                            Remove
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Add New Payment Method
                      </Button>
                      
                      <h3 className="text-sm font-medium text-muted-foreground pt-4">Billing History</h3>
                      <div className="bg-white rounded-lg border">
                        <div className="p-4 border-b">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">September 15, 2025</p>
                              <p className="text-sm text-muted-foreground">Order #1001</p>
                            </div>
                            <p className="font-medium">$78.50</p>
                          </div>
                        </div>
                        <div className="p-4 border-b">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">August 30, 2025</p>
                              <p className="text-sm text-muted-foreground">Order #1002</p>
                            </div>
                            <p className="font-medium">$45.99</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">August 17, 2025</p>
                              <p className="text-sm text-muted-foreground">Service: Hair Cut & Style</p>
                            </div>
                            <p className="font-medium">$85.00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Settings Tab */}
                  {activeTab === "settings" && (
                    <div className="space-y-6">
                      <h3 className="text-sm font-medium text-muted-foreground">Notification Preferences</h3>
                      <Card>
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Appointment Reminders</p>
                              <p className="text-sm text-muted-foreground">Receive notifications before your appointments</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-green-100 text-green-700 border-green-200">Email</Badge>
                              <Badge className="bg-green-100 text-green-700 border-green-200">SMS</Badge>
                            </div>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Order Updates</p>
                              <p className="text-sm text-muted-foreground">Get notifications about your orders</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-green-100 text-green-700 border-green-200">Email</Badge>
                              <Badge className="bg-gray-100 text-gray-700 border-gray-200">SMS</Badge>
                            </div>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Promotions & Offers</p>
                              <p className="text-sm text-muted-foreground">Learn about special deals and events</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-green-100 text-green-700 border-green-200">Email</Badge>
                              <Badge className="bg-gray-100 text-gray-700 border-gray-200">SMS</Badge>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 p-4 flex justify-end">
                          <Button variant="outline">
                            <Bell className="h-4 w-4 mr-2" />
                            Edit Notifications
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <h3 className="text-sm font-medium text-muted-foreground pt-4">Account Management</h3>
                      <Card>
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Privacy Settings</p>
                              <p className="text-sm text-muted-foreground">Manage how your information is used</p>
                            </div>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Communication Preferences</p>
                              <p className="text-sm text-muted-foreground">Control how we contact you</p>
                            </div>
                            <Button variant="outline" size="sm">Update</Button>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-red-500">Delete Account</p>
                              <p className="text-sm text-muted-foreground">Permanently remove your account and data</p>
                            </div>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <div className="pt-4">
                        <Button variant="outline" className="w-full">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-h1 font-light mb-6">Elevate Your Salon Experience</h2>
            <p className="text-h3 opacity-90 mb-8">
              Book your next appointment and earn more reward points to unlock exclusive benefits.
            </p>
            <Button variant="outline" size="xl" className="bg-white text-pink-600 hover:bg-white/90 border-0">
              Book an Appointment
              <Calendar className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};
