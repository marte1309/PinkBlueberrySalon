import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '@/store/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutButton } from '@/components/molecules/LogoutButton';
import { User, Settings, Calendar, Gift, ShoppingBag, LogOut, ChevronDown } from 'lucide-react';

export const UserMenu: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-4">
        <Link to="/login">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="luxury" size="sm">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  const userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-1 px-2 hover:bg-primary/10">
          <Avatar className="h-8 w-8 border border-primary/20">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=ec4899&color=fff&size=100`} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left">
            <span className="text-sm font-medium">{fullName}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[100px]">
              {user.rewardPoints} points
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/account" className="flex cursor-pointer items-center">
            <User className="mr-2 h-4 w-4" />
            <span>My Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/appointments" className="flex cursor-pointer items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>My Appointments</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/orders" className="flex cursor-pointer items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>My Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/rewards" className="flex cursor-pointer items-center">
            <Gift className="mr-2 h-4 w-4" />
            <span>Rewards ({user.rewardPoints} points)</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/settings" className="flex cursor-pointer items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton variant="ghost" size="sm" className="w-full justify-start p-0 h-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
