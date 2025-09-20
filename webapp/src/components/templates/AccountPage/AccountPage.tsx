import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/molecules/LogoutButton';
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

  // Obtener datos del usuario desde Redux
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Combinar datos reales del usuario con datos ficticios para completar la UI
  const userProfile = {
    name: user ? `${user.firstName} ${user.lastName}` : "Guest User",
    email: user ? user.email : "guest@example.com",
    phone: user?.phone || "(555) 123-4567",
    points: user ? user.rewardPoints : 0,
    nextTier: 1000, // Valor ficticio
    tier: user?.rewardPoints > 500 ? "Gold" : "Silver", // Cálculo ficticio basado en puntos
    joinDate: "March 15, 2025", // Dato ficticio
    profileImage: "/src/assets/images/avatar-placeholder.jpg", // Imagen ficticia
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
                        <span>{userProfile.points} / {userProfile.nextTier}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    {/* Botón de Logout */}
                    <div className="pt-4 mt-4 border-t border-border">
                      <LogoutButton 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-center"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Navigation */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <Button
                      variant={activeTab === "profile" ? "luxury" : "ghost"}
                      className="w-full justify-start mb-1"
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant={activeTab === "appointments" ? "luxury" : "ghost"}
                      className="w-full justify-start mb-1"
                      onClick={() => setActiveTab("appointments")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Appointments
                    </Button>
                    <Button
                      variant={activeTab === "orders" ? "luxury" : "ghost"}
                      className="w-full justify-start mb-1"
                      onClick={() => setActiveTab("orders")}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Orders
                    </Button>
                    <Button
                      variant={activeTab === "rewards" ? "luxury" : "ghost"}
                      className="w-full justify-start mb-1"
                      onClick={() => setActiveTab("rewards")}
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      Rewards
                    </Button>
                    <Button
                      variant={activeTab === "payment" ? "luxury" : "ghost"}
                      className="w-full justify-start mb-1"
                      onClick={() => setActiveTab("payment")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Methods
                    </Button>
                    <Button
                      variant={activeTab === "notifications" ? "luxury" : "ghost"}
                      className="w-full justify-start mb-1"
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "luxury" : "ghost"}
                      className="w-full justify-start mb-1"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Account Content Area */}
            <div className="lg:col-span-8">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl">Personal Information</CardTitle>
                        <CardDescription>Update your profile information</CardDescription>
                      </div>
                      <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                        <p className="text-foreground">{userProfile.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h3>
                        <p className="text-foreground">{userProfile.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                        <p className="text-foreground">{userProfile.phone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Member Since</h3>
                        <p className="text-foreground">{userProfile.joinDate}</p>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Communication Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Email Notifications</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Receive appointment reminders, order updates, and special offers
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">SMS Notifications</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Get text message reminders for upcoming appointments
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Appointments Tab */}
              {activeTab === "appointments" && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl">Your Appointments</CardTitle>
                        <CardDescription>Manage your salon visits</CardDescription>
                      </div>
                      <Button variant="luxury">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book New
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {appointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`p-4 rounded-lg border ${
                            appointment.status === "upcoming"
                              ? "border-blue-200 bg-blue-50"
                              : "border-border bg-card"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                              <h3 className="font-semibold text-lg">{appointment.service}</h3>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{appointment.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{appointment.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">with {appointment.stylist}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {appointment.status === "upcoming" ? (
                                <>
                                  <Button variant="outline" size="sm">Reschedule</Button>
                                  <Button variant="destructive" size="sm">Cancel</Button>
                                </>
                              ) : (
                                <>
                                  <Button variant="outline" size="sm">View Details</Button>
                                  <Button variant="secondary" size="sm">Book Again</Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl">Order History</CardTitle>
                        <CardDescription>View your past orders and deliveries</CardDescription>
                      </div>
                      <Button variant="luxury">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Shop Products
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="p-4 rounded-lg border border-border">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                                <Badge className={
                                  order.status === "delivered" ? "bg-green-100 text-green-800 border-green-200" :
                                  order.status === "shipped" ? "bg-blue-100 text-blue-800 border-blue-200" : ""
                                }>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{order.date}</p>
                              <div className="mt-2">
                                <p className="text-sm">Items: {order.items.join(", ")}</p>
                                <p className="text-sm font-semibold mt-1">Total: {order.total}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">View Details</Button>
                              <Button variant="secondary" size="sm">Track Order</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Rewards Tab */}
              {activeTab === "rewards" && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl">Rewards & Points</CardTitle>
                        <CardDescription>
                          You have <span className="font-semibold text-primary">{userProfile.points} points</span> to redeem
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {rewards.map((reward) => (
                        <div
                          key={reward.id}
                          className={`p-4 rounded-lg border ${
                            reward.available
                              ? "border-primary/20 bg-primary/5"
                              : "border-border bg-muted/20 opacity-75"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{reward.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {reward.description}
                              </p>
                              <div className="flex items-center mt-3">
                                <Gift className="h-4 w-4 text-primary mr-1" />
                                <span className="text-sm font-medium">{reward.points} points</span>
                              </div>
                            </div>
                            <Button
                              variant={reward.available ? "luxury" : "outline"}
                              size="sm"
                              disabled={!reward.available}
                            >
                              {reward.available ? "Redeem" : `${reward.points - userProfile.points} more points`}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-card border border-border rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">How to Earn More Points</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>Earn 1 point for every $1 spent on services</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>Earn 2 points for every $1 spent on products</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>Earn 100 bonus points on your birthday</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>Earn 50 points when you refer a friend</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Other tabs would follow the same pattern */}
              {activeTab === "payment" && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-2xl">Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Payment methods content would go here...</p>
                  </CardContent>
                </Card>
              )}

              {activeTab === "notifications" && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-2xl">Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Notification settings would go here...</p>
                  </CardContent>
                </Card>
              )}

              {activeTab === "settings" && (
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-2xl">Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Account settings would go here...</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};